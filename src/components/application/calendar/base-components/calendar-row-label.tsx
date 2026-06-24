"use client";

import type { HTMLAttributes } from "react";
import { cx } from "@/utils/cx";

export const CalendarRowLabel = ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div {...props} className={cx("group relative flex h-24 items-start justify-end bg-secondary pr-2", className)}>
            <span className="-translate-y-1/2 text-right text-xs font-medium whitespace-nowrap text-quaternary group-first:translate-y-1">{children}</span>
        </div>
    );
};
