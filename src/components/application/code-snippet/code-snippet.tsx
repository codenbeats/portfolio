"use client";

import { Fragment, type HTMLAttributes, type ReactNode, type RefObject, createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Check, Copy01, Expand06 } from "@untitledui/icons";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import type { TabListProps, TabPanelProps, TabProps, TabsProps } from "react-aria-components";
import { Tab as AriaTab, TabList as AriaTabList, TabPanel as AriaTabPanel, Tabs as AriaTabs } from "react-aria-components";
import { jsx, jsxs } from "react/jsx-runtime";
import type { SpecialLanguage, StringLiteralUnion } from "shiki/bundle/web";
import { codeToHast } from "shiki/bundle/web";
import "@/components/application/code-snippet/code-snippet.style.css";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { useClipboard } from "@/hooks/use-clipboard";
import { cx } from "@/utils/cx";

type SupportedLanguages = "tsx" | "js" | "jsx" | "ts" | "typescript" | "javascript" | "json" | "html" | "bash" | "css";
type Languages = StringLiteralUnion<SupportedLanguages | SpecialLanguage>;

export const highlight = async (code: string, lang: Languages) => {
    const out = await codeToHast(code, {
        lang: lang,
        defaultColor: "light",
        themes: {
            light: "github-light",
            dark: "github-dark",
        },
        colorReplacements: {
            "github-light": {
                "#24292e": "var(--color-text-primary)",
                "#005cc5": "var(--color-utility-blue-600)",
                "#d73a49": "var(--color-utility-pink-600)",
                "#6f42c1": "var(--color-utility-brand-600)",
                "#032f62": "var(--color-primary)",
            },
            "github-dark": {
                "#e1e4e8": "var(--color-text-primary)",
                "#79b8ff": "var(--color-utility-blue-600)",
                "#f97583": "var(--color-utility-pink-600)",
                "#b392f0": "var(--color-utility-brand-600)",
                "#9ecbff": "var(--color-primary)",
            },
        },
    });

    return toJsxRuntime(out, {
        Fragment,
        jsx,
        jsxs,
    });
};

/**
 * Tabs context – shares a root ref so the header copy button can find the
 * active panel's code text without fragile global DOM queries.
 */

const TabsRefContext = createContext<RefObject<HTMLDivElement | null> | null>(null);

/**
 * Gradient CSS custom properties for the "Show more" overlay.
 */
const gradientStyles = {
    "--gradient-light":
        "rgba(247, 248, 253, 0) 0%, rgba(247, 248, 253, 0.02) 4.7%, rgba(247, 248, 253, 0.04) 8.9%, rgba(247, 248, 253, 0.07) 12.8%, rgba(247, 248, 253, 0.10) 16.56%, rgba(247, 248, 253, 0.14) 20.37%, rgba(247, 248, 253, 0.18) 24.4%, rgba(247, 248, 253, 0.23) 28.83%, rgba(247, 248, 253, 0.29) 33.84%, rgba(247, 248, 253, 0.35) 39.6%, rgba(247, 248, 253, 0.43) 46.3%, rgba(247, 248, 253, 0.52) 54.1%, rgba(247, 248, 253, 0.62) 63.2%, rgba(247, 248, 253, 0.73) 73.76%, rgba(247, 248, 253, 0.86) 85.97%, rgb(247, 248, 253) 100%",
    "--gradient-dark":
        "rgba(15, 17, 28, 0) 0%, rgba(15, 17, 28, 0.02) 4.7%, rgba(15, 17, 28, 0.04) 8.9%, rgba(15, 17, 28, 0.07) 12.8%, rgba(15, 17, 28, 0.10) 16.56%, rgba(15, 17, 28, 0.14) 20.37%, rgba(15, 17, 28, 0.18) 24.4%, rgba(15, 17, 28, 0.23) 28.83%, rgba(15, 17, 28, 0.29) 33.84%, rgba(15, 17, 28, 0.35) 39.6%, rgba(15, 17, 28, 0.43) 46.3%, rgba(15, 17, 28, 0.52) 54.1%, rgba(15, 17, 28, 0.62) 63.2%, rgba(15, 17, 28, 0.73) 73.76%, rgba(15, 17, 28, 0.86) 85.97%, rgb(15, 17, 28) 100%",
} as React.CSSProperties;

interface CodeSnippetProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The code to be syntax highlighted. Can be provided in two ways:
     * 1. As a string via this prop for client-side highlighting
     * 2. As pre-highlighted nodes via children prop for server-side highlighting
     */
    code?: string;

    /**
     * The programming language of the code snippet.
     * Determines syntax highlighting rules.
     */
    language: Languages;

    /**
     * Whether to display line numbers alongside the code.
     * When true, renders with a simple border.
     * When false, renders inside a modern shadow wrapper.
     * @default true
     */
    showLineNumbers?: boolean;

    /**
     * Maximum height (in px) before the "Show more" overlay appears.
     * When omitted, the code block displays at full height.
     */
    maxHeight?: number;

    /**
     * Callback fired when the expand button is clicked.
     * The expand button is only rendered when this prop is provided.
     */
    onExpand?: () => void;

    /**
     * Pre-highlighted code nodes that were generated on the server.
     * Alternative to passing raw code string via the `code` prop.
     */
    children?: ReactNode;

    /**
     * Whether to show the modern shadow wrapper.
     */
    modern?: boolean;
}

const CodeSnippetComponent = ({
    children,
    code,
    language,
    showLineNumbers = true,
    maxHeight,
    onExpand,
    className,
    modern = true,
    ...otherProps
}: CodeSnippetProps) => {
    const [nodes, setNodes] = useState(children);
    const { copy, copied } = useClipboard();
    const contentRef = useRef<HTMLDivElement>(null);
    const [expanded, setExpanded] = useState(false);
    const [exceedsMaxHeight, setExceedsMaxHeight] = useState(false);
    const isInsideTabs = useContext(TabsRefContext) !== null;

    useLayoutEffect(() => {
        if (!code) return;
        void highlight(code, language).then(setNodes);
    }, [code, language]);

    // Measure whether content exceeds maxHeight
    useEffect(() => {
        if (!maxHeight || !contentRef.current) return;
        setExceedsMaxHeight(contentRef.current.scrollHeight > maxHeight - 10);
    }, [maxHeight, nodes, children]);

    const codeText = code ?? "";
    const isCollapsible = maxHeight != null && exceedsMaxHeight;
    const isModern = isInsideTabs || modern;

    const codeBlock = (
        <div
            {...otherProps}
            className={cx(
                "group/code-snippet relative max-w-full overflow-clip rounded-xl bg-primary ring-1",
                isModern ? "shadow-lg ring-secondary_alt" : "ring-secondary",
                className,
            )}
        >
            {/* Code content */}
            <div
                ref={contentRef}
                className={cx(
                    "[&>.shiki]:overflow-x-auto [&>code]:w-full",
                    "font-mono text-sm leading-[22px] whitespace-pre",
                    showLineNumbers ? "line-numbers" : "p-4",
                    !expanded && isCollapsible && "overflow-y-hidden",
                    isCollapsible && "pb-12",
                )}
                style={{
                    maxHeight: expanded || !maxHeight ? "none" : maxHeight,
                }}
            >
                {nodes ?? code ?? <p>Loading...</p>}
            </div>

            {/* Show more / Show less */}
            {isCollapsible && (
                <div
                    style={gradientStyles}
                    className={cx(
                        "inset-x-0 bottom-0 flex items-end justify-center bg-linear-(--gradient-light) pb-6 dark:bg-linear-(--gradient-dark)",
                        expanded ? "sticky h-17" : "absolute h-47",
                    )}
                >
                    <Button color="secondary" size="sm" onClick={() => setExpanded(!expanded)}>
                        {expanded ? "Show less" : "Show more"}
                    </Button>
                </div>
            )}

            {/* Action buttons – visible on hover */}
            {(codeText || onExpand) && (
                <div className="absolute top-2 right-2 z-10 flex items-center gap-1 opacity-0 transition duration-100 ease-linear group-hover/code-snippet:opacity-100 has-[:focus-visible]:opacity-100">
                    {onExpand && <ButtonUtility size="xs" color="tertiary" icon={Expand06} tooltip="Expand" onClick={onExpand} />}
                    {codeText && <ButtonUtility size="xs" color="tertiary" icon={copied ? Check : Copy01} tooltip="Copy" onClick={() => copy(codeText)} />}
                </div>
            )}
        </div>
    );

    // Inside tabs: tabs component already provides the outer wrapper
    if (isInsideTabs) return codeBlock;

    // Modern style (no line numbers): wrap in the shadow container
    if (isModern) {
        return <div className="rounded-[20px] bg-secondary_alt p-2 ring-1 ring-secondary ring-inset">{codeBlock}</div>;
    }

    // Line numbers: just the code block with a simple border
    return codeBlock;
};

const CodeSnippetTabs = ({ children, className, ...otherProps }: TabsProps) => {
    const rootRef = useRef<HTMLDivElement>(null);

    return (
        <TabsRefContext value={rootRef}>
            <AriaTabs
                ref={rootRef}
                keyboardActivation="manual"
                {...otherProps}
                className={(values) =>
                    cx(
                        "group/code-tabs rounded-t-xl rounded-b-[20px] bg-secondary_alt shadow-xs ring-1 ring-secondary ring-inset",
                        typeof className === "function" ? className(values) : className,
                    )
                }
            >
                {children}
            </AriaTabs>
        </TabsRefContext>
    );
};

const CodeSnippetTabList = <T extends object>({ children, className, ...otherProps }: TabListProps<T>) => {
    const { copy, copied } = useClipboard();
    const tabsRef = useContext(TabsRefContext);

    const handleCopy = () => {
        const root = tabsRef?.current;
        if (!root) return;
        const activePanel = root.querySelector('[role="tabpanel"]:not([hidden])');
        const text = activePanel?.textContent?.trim() ?? "";
        if (text) copy(text);
    };

    return (
        <div className="relative flex items-start">
            <AriaTabList
                {...otherProps}
                className={(values) =>
                    cx("flex flex-1 items-center overflow-auto px-3 pt-2 pb-2", typeof className === "function" ? className(values) : className)
                }
            >
                {children}
            </AriaTabList>

            <div className="flex shrink-0 items-center pt-2 pr-2">
                <ButtonUtility size="xs" color="tertiary" icon={copied ? Check : Copy01} tooltip="Copy" onClick={handleCopy} />
            </div>
        </div>
    );
};

interface CodeSnippetTabProps extends TabProps {
    children: ReactNode;
}

const CodeSnippetTab = ({ children, className, ...otherProps }: CodeSnippetTabProps) => {
    return (
        <AriaTab
            {...otherProps}
            className={(state) =>
                cx(
                    "z-10 flex cursor-pointer items-center justify-center gap-2 rounded-md px-2 py-1 text-sm font-semibold whitespace-nowrap text-quaternary outline-0 outline-offset-2 outline-focus-ring transition duration-100 ease-linear",
                    (state.isSelected || state.isHovered) && "text-primary",
                    state.isFocusVisible && "outline-2",
                    typeof className === "function" ? className(state) : className,
                )
            }
        >
            {children}
        </AriaTab>
    );
};

const CodeSnippetTabPanel = ({ children, className, ...otherProps }: TabPanelProps) => {
    return (
        <AriaTabPanel {...otherProps} className={(state) => cx("px-2 pb-2", typeof className === "function" ? className(state) : className)}>
            {children}
        </AriaTabPanel>
    );
};

export const CodeSnippet = CodeSnippetComponent as typeof CodeSnippetComponent & {
    Tabs: typeof CodeSnippetTabs;
    TabList: typeof CodeSnippetTabList;
    Tab: typeof CodeSnippetTab;
    TabPanel: typeof CodeSnippetTabPanel;
};

CodeSnippet.Tabs = CodeSnippetTabs;
CodeSnippet.TabList = CodeSnippetTabList;
CodeSnippet.Tab = CodeSnippetTab;
CodeSnippet.TabPanel = CodeSnippetTabPanel;
