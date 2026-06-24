import type { Collection, Key, Node } from "@react-types/shared";

export type TreeCollection = Collection<Node<unknown>>;

/** Returns all descendant keys of a given node using the collection API. */
export const getDescendants = (key: Key, collection: TreeCollection): Key[] => {
    const result: Key[] = [];
    const stack: Key[] = [key];
    while (stack.length > 0) {
        const current = stack.pop()!;
        const children = collection.getChildren?.(current);
        if (!children) continue;
        for (const child of children) {
            result.push(child.key);
            stack.push(child.key);
        }
    }
    return result;
};

/** Returns all ancestor keys from a node up to the root using the collection API. */
export const getAncestors = (key: Key, collection: TreeCollection): Key[] => {
    const result: Key[] = [];
    let node = collection.getItem(key);
    while (node?.parentKey != null) {
        result.push(node.parentKey);
        node = collection.getItem(node.parentKey);
    }
    return result;
};

/**
 * Cascades a selection change through the tree using the collection API:
 * - Selecting a parent selects all its descendants.
 * - Deselecting a parent deselects all its descendants.
 * - If all descendants of a parent become selected, the parent becomes selected.
 * - If some (but not all) descendants are selected, the parent becomes indeterminate.
 */
export const cascadeSelection = (newKeys: Set<Key>, prevKeys: Set<Key>, collection: TreeCollection): Set<Key> => {
    const result = new Set(newKeys);

    const added = new Set<Key>();
    const removed = new Set<Key>();
    for (const k of newKeys) {
        if (!prevKeys.has(k)) added.add(k);
    }
    for (const k of prevKeys) {
        if (!newKeys.has(k)) removed.add(k);
    }

    // Cascade down
    for (const key of added) {
        for (const desc of getDescendants(key, collection)) result.add(desc);
    }
    for (const key of removed) {
        for (const desc of getDescendants(key, collection)) result.delete(desc);
    }

    // Cascade up (deepest parents first)
    const parentsToCheck = new Set<Key>();
    for (const key of [...added, ...removed]) {
        for (const ancestor of getAncestors(key, collection)) parentsToCheck.add(ancestor);
    }

    const sorted = [...parentsToCheck].sort((a, b) => {
        const levelA = collection.getItem(a)?.level ?? 0;
        const levelB = collection.getItem(b)?.level ?? 0;
        return levelB - levelA;
    });

    for (const parentKey of sorted) {
        const allDescendants = getDescendants(parentKey, collection);
        if (allDescendants.length === 0) continue;

        const selectedCount = allDescendants.filter((k) => result.has(k)).length;
        if (selectedCount === allDescendants.length) {
            result.add(parentKey);
        } else {
            result.delete(parentKey);
        }
    }

    return result;
};

/**
 * Clones the actual DOM content of dragged rows to produce a pixel-perfect
 * drag preview. Strips connector spacers and normalises padding so items
 * are aligned. Adds a count badge when multiple items are dragged.
 */
export const createDragPreview = (treeEl: HTMLElement, keys: Set<Key>): HTMLElement => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "2px";
    container.style.position = "relative";

    const keyStrings = new Set([...keys].map(String));
    const rows = Array.from(treeEl.querySelectorAll('[role="row"]'));
    let count = 0;

    for (const row of rows) {
        const rowKey = row.getAttribute("data-key") ?? row.id;
        if (!rowKey || !keyStrings.has(rowKey)) continue;

        const content = row.querySelector("div");
        if (!content) continue;

        const clone = content.cloneNode(true) as HTMLElement;
        clone.style.paddingLeft = "8px";
        clone.style.width = `${content.offsetWidth}px`;

        clone.querySelectorAll("[data-tree-connector]").forEach((el) => el.remove());

        container.appendChild(clone);
        count++;
    }

    if (count > 1) {
        const badge = document.createElement("div");
        badge.textContent = String(count);
        Object.assign(badge.style, {
            position: "absolute",
            top: "-6px",
            right: "-6px",
            width: "20px",
            height: "20px",
            borderRadius: "9999px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "600",
            color: "white",
            backgroundColor: "var(--color-bg-brand-solid, #7f56d9)",
        });
        container.appendChild(badge);
    }

    return container;
};
