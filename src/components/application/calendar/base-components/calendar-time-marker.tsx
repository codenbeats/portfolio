"use client";

import type { HTMLAttributes } from "react";
import { cx } from "@/utils/cx";

export const CalendarTimeMarker = ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div {...props} className={cx("pointer-events-none absolute right-0 left-14 z-30 flex -translate-y-1/2 items-center md:left-18", className)}>
            {/* Dot */}
            <div className="absolute -left-[5px] size-2 rounded-full bg-fg-brand-primary_alt" />
            {/* Left line */}
            <div className="h-px flex-1 rounded-full bg-fg-brand-primary_alt md:hidden" />
            {/* Time */}
            <time className="px-1.5 text-right text-xs font-medium text-brand-tertiary_alt md:absolute md:left-0 md:-translate-x-full md:pr-2 md:pl-0">
                {children}
            </time>
            {/* Right line */}
            <div className="h-px flex-1 rounded-full bg-fg-brand-primary_alt" />
        </div>
    );
};
