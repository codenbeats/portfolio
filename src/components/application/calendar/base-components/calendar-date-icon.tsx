"use client";

import { cx } from "@/utils/cx";

interface CalendarDateIconProps {
    month: string;
    day: number;
    className?: string;
}

export const CalendarDateIcon = ({ month: label, day, className }: CalendarDateIconProps) => {
    return (
        <div className={cx("inline-flex min-w-16 flex-col items-center overflow-hidden rounded-lg ring-1 ring-secondary", className)}>
            <div className="flex w-full justify-center bg-secondary px-2 pt-1 pb-0.5">
                <span className="text-xs font-semibold text-quaternary">{label}</span>
            </div>
            <div className="flex w-full justify-center px-2 pt-px pb-[3px]">
                <span className="text-lg leading-7 font-bold text-brand-secondary">{day}</span>
            </div>
        </div>
    );
};
