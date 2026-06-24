"use client";

import type { FC, ReactNode, RefObject } from "react";
import { createContext, isValidElement, useCallback, useContext, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronRight, DotsGrid } from "@untitledui/icons";
import type { Key, Selection } from "react-aria-components";
import {
    Button as AriaButton,
    Checkbox as AriaCheckbox,
    DropIndicator as AriaDropIndicator,
    Tree as AriaTree,
    TreeItem as AriaTreeItem,
    TreeItemContent as AriaTreeItemContent,
    type TreeItemProps as AriaTreeItemProps,
    type TreeProps as AriaTreeProps,
    type DragAndDropHooks,
    useDragAndDrop,
} from "react-aria-components";
import { CheckboxBase } from "@/components/base/checkbox/checkbox";
import { cx } from "@/utils/cx";
import { isReactComponent } from "@/utils/is-react-component";
import { type TreeCollection, cascadeSelection, createDragPreview, getDescendants } from "./tree-view-utils";

interface TreeViewContextType {
    size: "sm" | "md";
    showConnectors: boolean;
    selectedKeys: "all" | Iterable<Key>;
    collectionRef: RefObject<TreeCollection | null>;
}

const TreeViewContext = createContext<TreeViewContextType>({
    size: "sm",
    showConnectors: false,
    selectedKeys: new Set(),
    collectionRef: { current: null },
});

const INDENT_SIZE = 24;
const BASE_PADDING = 8;

const Connector = ({ type, size }: { type: "line" | "end" | "none"; size: "sm" | "md" }) => (
    <div className="relative size-4 shrink-0" data-tree-connector>
        {type === "line" && (
            <div
                className={cx("absolute top-1/2 left-1/2 w-px -translate-x-1/2 -translate-y-1/2 bg-border-secondary", size === "sm" ? "h-[42px]" : "h-[44px]")}
            />
        )}
        {type === "end" && (
            <div className={cx("absolute bottom-2 left-1/2 w-px -translate-x-1/2", size === "sm" ? "h-[22px]" : "h-[24px]")}>
                <div
                    className={cx(
                        "border-b border-l border-border-secondary",
                        size === "sm" ? "h-[22px] w-[10px] rounded-bl-[5px]" : "h-[24px] w-[12px] rounded-bl-[6px]",
                    )}
                />
            </div>
        )}
    </div>
);

/** Drop indicator line shown between items during drag and drop. */
const TreeViewDropIndicator = (props: { target: Parameters<typeof AriaDropIndicator>[0]["target"] }) => (
    <AriaDropIndicator
        {...props}
        className="relative h-0 outline-hidden before:absolute before:inset-x-0 before:-top-px before:z-10 before:h-0.5 before:rounded-full before:bg-brand-solid"
    />
);

interface TreeViewRootProps<T extends object> extends AriaTreeProps<T> {
    /** Size variant. Controls item padding and icon sizes. */
    size?: "sm" | "md";
    /** Show vertical connector lines between parent and child items. */
    showConnectors?: boolean;
    /** Enable built-in drag and drop. Pass `dragAndDropHooks` directly for full control instead. */
    draggable?: boolean;
    /** Called when items are reordered via drag and drop. */
    onReorder?: (e: { keys: Set<Key>; target: { key: Key; dropPosition: "before" | "after" | "on" } }) => void;
    /** Called when items are moved (reparented) onto a different parent. */
    onMove?: (e: { keys: Set<Key>; target: { key: Key; dropPosition: "before" | "after" | "on" } }) => void;
}

const TreeViewRoot = <T extends object>({
    size = "sm",
    showConnectors = false,
    draggable = false,
    onReorder: onReorderProp,
    onMove: onMoveProp,
    className,
    selectedKeys: controlledSelectedKeys,
    defaultSelectedKeys,
    onSelectionChange: onSelectionChangeProp,
    selectionMode,
    dragAndDropHooks: externalDragAndDropHooks,
    ...props
}: TreeViewRootProps<T>) => {
    const treeRef = useRef<HTMLDivElement>(null);
    const collectionRef = useRef<TreeCollection | null>(null);

    /* Cascading selection state */
    const [internalSelectedKeys, setInternalSelectedKeys] = useState<Selection>(() =>
        defaultSelectedKeys === "all"
            ? ("all" as Selection)
            : defaultSelectedKeys
              ? (new Set<Key>(defaultSelectedKeys) as Selection)
              : (new Set<Key>() as Selection),
    );

    /*
     * Tracks the previous selection so we can diff against it in handleSelectionChange.
     * React Aria's onSelectionChange provides the full new selection set, not a diff.
     * To cascade correctly (e.g. selecting a parent must select all children, deselecting
     * a parent must deselect all children), we need to know which keys were added vs removed.
     * Without this diff we can't distinguish "user selected this parent" from "it was already selected."
     *
     * Must be re-synced after drag-and-drop moves change the tree structure (see syncPrevKeys).
     */
    const prevKeysRef = useRef<Set<Key>>(defaultSelectedKeys && defaultSelectedKeys !== "all" ? new Set<Key>(defaultSelectedKeys) : new Set<Key>());

    const isControlled = controlledSelectedKeys !== undefined;
    const selectedKeys = isControlled ? controlledSelectedKeys : internalSelectedKeys;

    /**
     * Custom cascading (tri-state) selection.
     *
     * React Aria's Tree does not support cascading selection natively — selecting
     * a parent does not auto-select descendants, and there is no indeterminate
     * state for partially-selected parents. We layer this on top by diffing
     * selection changes and propagating up/down the tree.
     *
     * Tracked upstream: https://github.com/adobe/react-spectrum/issues/6589
     */
    const handleSelectionChange = useCallback(
        (newSelection: Selection) => {
            if (selectionMode !== "multiple" || !collectionRef.current) {
                onSelectionChangeProp?.(newSelection);
                if (!isControlled) setInternalSelectedKeys(newSelection);
                return;
            }

            if (newSelection === "all") {
                onSelectionChangeProp?.(newSelection);
                if (!isControlled) setInternalSelectedKeys(newSelection);
                prevKeysRef.current = new Set<Key>();
                return;
            }

            const cascaded = cascadeSelection(newSelection as Set<Key>, prevKeysRef.current, collectionRef.current);

            prevKeysRef.current = cascaded;

            if (!isControlled) setInternalSelectedKeys(cascaded as Selection);
            onSelectionChangeProp?.(cascaded as Selection);
        },
        [isControlled, onSelectionChangeProp, selectionMode],
    );

    /** Re-snapshot current selection into prevKeysRef after DnD moves change the tree structure. */
    const syncPrevKeys = useCallback(() => {
        if (selectedKeys === "all") {
            prevKeysRef.current = new Set<Key>();
        } else {
            prevKeysRef.current = new Set<Key>(selectedKeys as Iterable<Key>);
        }
    }, [selectedKeys]);

    /* Built-in drag and drop */
    const { dragAndDropHooks: internalDragAndDropHooks } = useDragAndDrop({
        getItems: (keys) => [...keys].map((key) => ({ "text/plain": String(key) })),
        renderDragPreview: (items) => {
            if (!treeRef.current) return <div />;
            const keys = new Set<Key>(items.map((item) => item["text/plain"]));
            const el = createDragPreview(treeRef.current, keys);
            return (
                <div
                    style={{ display: "flex", flexDirection: "column", gap: "2px", position: "relative" }}
                    ref={(node) => {
                        if (node) node.replaceChildren(...Array.from(el.childNodes));
                    }}
                />
            );
        },
        renderDropIndicator: (target) => <TreeViewDropIndicator target={target} />,
        onReorder: onReorderProp
            ? (e) => {
                  onReorderProp({ keys: e.keys, target: e.target as { key: Key; dropPosition: "before" | "after" | "on" } });
                  syncPrevKeys();
              }
            : undefined,
        onMove: onMoveProp
            ? (e) => {
                  onMoveProp({ keys: e.keys, target: e.target as { key: Key; dropPosition: "before" | "after" | "on" } });
                  syncPrevKeys();
              }
            : undefined,
    });

    const dragAndDropHooks = externalDragAndDropHooks ?? (draggable ? internalDragAndDropHooks : undefined);

    const contextValue = useMemo<TreeViewContextType>(() => ({ size, showConnectors, selectedKeys, collectionRef }), [size, showConnectors, selectedKeys]);

    return (
        <TreeViewContext.Provider value={contextValue}>
            <AriaTree
                {...props}
                ref={treeRef}
                selectionMode={selectionMode}
                selectedKeys={selectedKeys}
                onSelectionChange={handleSelectionChange}
                dragAndDropHooks={dragAndDropHooks as DragAndDropHooks}
                className={(state) => cx("flex flex-col", typeof className === "function" ? className(state) : className)}
            />
        </TreeViewContext.Provider>
    );
};

type TreeViewItemProps = AriaTreeItemProps;

const TreeViewItem = ({ className, ...props }: TreeViewItemProps) => (
    <AriaTreeItem {...props} className={(state) => cx("mt-0.5 outline-hidden first:mt-0", typeof className === "function" ? className(state) : className)} />
);

interface TreeViewItemContentProps {
    /** Leading icon. Pass as component reference (e.g. `Folder`) or as element (e.g. `<Avatar />`). */
    icon?: FC<{ className?: string }> | ReactNode;
    /** Trailing action element (e.g. drag handle or menu trigger). */
    action?: ReactNode;
    /** The text label for the tree item. */
    children: ReactNode;
    className?: string;
}

const TreeViewItemContent = ({ icon: Icon, action, children, className }: TreeViewItemContentProps) => {
    const { size, showConnectors, selectedKeys: ctxSelectedKeys, collectionRef } = useContext(TreeViewContext);
    return (
        <AriaTreeItemContent>
            {(state) => {
                const {
                    id: itemKey,
                    state: itemState,
                    hasChildItems,
                    isExpanded,
                    isSelected,
                    isDisabled,
                    selectionMode,
                    isFocusVisible,
                    allowsDragging,
                    isDropTarget,
                    level,
                } = state;

                const collection = itemState.collection as TreeCollection;

                /*
                 * Sync collection ref for the parent's handleSelectionChange callback.
                 * The collection is only available inside the render callback, but
                 * handleSelectionChange is defined in the parent above <AriaTree>.
                 * The ref bridges this gap. Guarded to write only once.
                 */
                if (!collectionRef.current) {
                    collectionRef.current = collection;
                }

                const isIndeterminate =
                    itemKey != null &&
                    selectionMode === "multiple" &&
                    hasChildItems &&
                    ctxSelectedKeys !== "all" &&
                    (() => {
                        const descendants = getDescendants(itemKey, collection);
                        if (descendants.length === 0) return false;
                        const selectedCount = descendants.filter((k) => (ctxSelectedKeys as Set<Key>).has(k)).length;
                        // Not selected but has selected descendants, or selected but not ALL descendants are selected (stale after move)
                        return selectedCount > 0 && (!isSelected || selectedCount < descendants.length);
                    })();

                /* Connector lines — walk up from current item, prepending the connector for each ancestor level */
                const connectors: ReactNode[] = [];
                if (showConnectors && itemKey != null && level > 1) {
                    let key: Key = itemKey;

                    for (let depth = 0; depth < level - 1; depth++) {
                        const node = collection.getItem(key);
                        if (!node?.parentKey) break;

                        const siblings = [...collection.getChildren!(node.parentKey)];
                        const isLast = siblings[siblings.length - 1]?.key === key;

                        connectors.unshift(<Connector key={depth} size={size} type={isLast ? (depth === 0 ? "end" : "none") : "line"} />);

                        key = node.parentKey;
                    }
                }

                const paddingLeft = showConnectors && level > 1 ? BASE_PADDING : BASE_PADDING + (level - 1) * INDENT_SIZE;

                return (
                    <div
                        className={cx(
                            "flex w-full cursor-pointer items-center gap-2 rounded-sm -outline-offset-2 outline-focus-ring transition duration-100 ease-linear",
                            size === "sm" ? "py-1.5 pr-2" : "py-2 pr-2",
                            isDropTarget && "bg-secondary_hover outline-2",
                            !isDropTarget && (isSelected || isIndeterminate) && "bg-secondary hover:bg-secondary_hover",
                            !isDropTarget && !isSelected && !isIndeterminate && "hover:bg-primary_hover",
                            isDisabled && "cursor-not-allowed opacity-50",
                            isFocusVisible && "outline-2",
                            className,
                        )}
                        style={{ paddingLeft }}
                    >
                        {connectors}

                        {hasChildItems && (
                            <AriaButton slot="chevron" className="flex shrink-0 items-center justify-center outline-hidden">
                                {isExpanded ? <ChevronDown className="size-4 text-fg-quaternary" /> : <ChevronRight className="size-4 text-fg-quaternary" />}
                            </AriaButton>
                        )}

                        {selectionMode !== "none" && (
                            <AriaCheckbox slot="selection" className="flex shrink-0 items-center justify-center outline-hidden">
                                {({ isSelected: checkSelected, isDisabled: checkDisabled, isFocusVisible: checkFocus }) => (
                                    <CheckboxBase
                                        size="sm"
                                        isSelected={checkSelected || isIndeterminate}
                                        isIndeterminate={isIndeterminate}
                                        isDisabled={checkDisabled}
                                        isFocusVisible={checkFocus}
                                    />
                                )}
                            </AriaCheckbox>
                        )}

                        <div className={cx("flex min-w-0 flex-1 items-center", size === "sm" ? "gap-1.5" : "gap-2")}>
                            {Icon &&
                                (isReactComponent(Icon) ? (
                                    <Icon className={cx("shrink-0 text-fg-quaternary", size === "sm" ? "size-4" : "size-5")} />
                                ) : isValidElement(Icon) ? (
                                    Icon
                                ) : null)}

                            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-tertiary">{children}</span>

                            {action}

                            {allowsDragging && (
                                <AriaButton slot="drag" className={cx("shrink-0 cursor-grab outline-hidden", !isSelected && "hidden")}>
                                    <DotsGrid className="size-4 text-fg-quaternary" />
                                </AriaButton>
                            )}
                        </div>
                    </div>
                );
            }}
        </AriaTreeItemContent>
    );
};

const TreeView = TreeViewRoot as typeof TreeViewRoot & {
    Item: typeof TreeViewItem;
    ItemContent: typeof TreeViewItemContent;
    DropIndicator: typeof TreeViewDropIndicator;
};
TreeView.Item = TreeViewItem;
TreeView.ItemContent = TreeViewItemContent;
TreeView.DropIndicator = TreeViewDropIndicator;

export { TreeView };
