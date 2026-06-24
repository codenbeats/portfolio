"use client";

import { cx } from "@/utils/cx";

interface CalendarColumnHeaderProps {
    weekDay: string;
    day?: number;
    state?: "default" | "selected" | "current";
    className?: string;
    onClick?: () => void;
}

export const CalendarColumnHeader = ({ state, weekDay, day, className, onClick }: CalendarColumnHeaderProps) => {
    return (
        <div
            onClick={onClick}
            className={cx(
                "relative flex w-full flex-col items-center justify-center gap-1.5 bg-primary p-2 md:flex-row md:gap-1",
                "before:pointer-events-none before:absolute before:inset-0 before:border-secondary not-last:before:border-r",
                className,
            )}
        >
            <span className="text-xs font-medium text-quaternary">{weekDay}</span>
            {typeof day === "number" && (
                <span
                    className={cx(
                        "flex h-6 items-center justify-center text-xs font-semibold text-secondary",
                        state === "selected" && "w-6 rounded-full bg-brand-solid text-white",
                        state === "current" && "w-6 rounded-full bg-secondary",
                    )}
                >
                    {day}
                </span>
            )}
        </div>
    );
};
