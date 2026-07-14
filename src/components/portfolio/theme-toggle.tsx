"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon01, Sun } from "@untitledui/icons";
import { cx } from "@/utils/cx";

export function ThemeToggle({ className }: { className?: string }) {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <div className={cx("size-9 shrink-0 rounded-lg", className)} />
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cx(
                "flex size-9 cursor-pointer items-center justify-center rounded-lg border border-secondary text-fg-quaternary shadow-xs transition duration-100 ease-linear hover:border-primary hover:text-fg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
                "hover:bg-primary_hover dark:hover:bg-white/10",
                className,
            )}
        >
            {isDark ? <Sun className="size-5" /> : <Moon01 className="size-5" />}
        </button>
    );
}

export function ThemeToggleFab() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const isDark = resolvedTheme === "dark";

    return (
        <button
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="fixed right-4 bottom-4 z-50 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-black/10 transition duration-150 ease-linear hover:bg-black/8 hover:ring-black/15 active:scale-95 dark:bg-white/10 dark:ring-white/15 dark:hover:bg-white/20 md:hidden"
        >
            {isDark ? (
                <Sun className="size-5 text-fg-primary" />
            ) : (
                <Moon01 className="size-5 text-fg-secondary" />
            )}
        </button>
    );
}
