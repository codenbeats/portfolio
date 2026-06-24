"use client";

import { cx } from "@/utils/cx";
import { type EventViewColor, eventViewColors } from "./calendar-month-view-event";

interface CalendarDwViewEventProps {
    label: string;
    supportingText?: string;
    withDot?: boolean;
    color?: EventViewColor;
}

export const CalendarDwViewEvent = ({ label, supportingText, withDot, color = "gray" }: CalendarDwViewEventProps) => {
    return (
        <div className={cx("flex h-full w-full flex-1 cursor-pointer flex-col gap-0.5 rounded-md px-2 py-1.5 ring-1 ring-inset", eventViewColors[color].root)}>
            <div className="flex w-full justify-between gap-0.5">
                <span className={cx("flex-1 truncate text-xs font-semibold", eventViewColors[color].label)}>{label}</span>
                {withDot && (
                    <div className="inline-flex size-2 items-center justify-center">
                        <span className={cx("size-1.5 rounded-full", eventViewColors[color].dot)}></span>
                    </div>
                )}
            </div>
            {supportingText && <time className={cx("text-xs", eventViewColors[color].time)}>{supportingText}</time>}
        </div>
    );
};
