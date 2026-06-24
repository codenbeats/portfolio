"use client";

import { cx } from "@/utils/cx";

export const eventViewColors = {
    gray: {
        root: "bg-utility-neutral-50 ring-utility-neutral-200 hover:bg-utility-neutral-100",
        label: "text-utility-neutral-700",
        time: "text-utility-neutral-600",
        dot: "bg-utility-neutral-500",
    },
    brand: {
        root: "bg-utility-brand-50 ring-utility-brand-200 hover:bg-utility-brand-100",
        label: "text-utility-brand-700",
        time: "text-utility-brand-600",
        dot: "bg-utility-brand-500",
    },
    green: {
        root: "bg-utility-green-50 ring-utility-green-200 hover:bg-utility-green-100",
        label: "text-utility-green-700",
        time: "text-utility-green-600",
        dot: "bg-utility-green-500",
    },
    blue: {
        root: "bg-utility-blue-50 ring-utility-blue-200 hover:bg-utility-blue-100",
        label: "text-utility-blue-700",
        time: "text-utility-blue-600",
        dot: "bg-utility-blue-500",
    },
    indigo: {
        root: "bg-utility-indigo-50 ring-utility-indigo-200 hover:bg-utility-indigo-100",
        label: "text-utility-indigo-700",
        time: "text-utility-indigo-600",
        dot: "bg-utility-indigo-500",
    },
    purple: {
        root: "bg-utility-purple-50 ring-utility-purple-200 hover:bg-utility-purple-100",
        label: "text-utility-purple-700",
        time: "text-utility-purple-600",
        dot: "bg-utility-purple-500",
    },
    pink: {
        root: "bg-utility-pink-50 ring-utility-pink-200 hover:bg-utility-pink-100",
        label: "text-utility-pink-700",
        time: "text-utility-pink-600",
        dot: "bg-utility-pink-500",
    },
    orange: {
        root: "bg-utility-orange-50 ring-utility-orange-200 hover:bg-utility-orange-100",
        label: "text-utility-orange-700",
        time: "text-utility-orange-600",
        dot: "bg-utility-orange-500",
    },
    yellow: {
        root: "bg-utility-yellow-50 ring-utility-yellow-200 hover:bg-utility-yellow-100",
        label: "text-utility-yellow-700",
        time: "text-utility-yellow-600",
        dot: "bg-utility-yellow-500",
    },
};

export type EventViewColor = keyof typeof eventViewColors;

interface CalendarMonthViewEventProps {
    label: string;
    supportingText?: string;
    withDot?: boolean;
    color?: EventViewColor;
    collapseOnMobile?: boolean;
}

export const CalendarMonthViewEvent = ({ label, supportingText, color = "gray", collapseOnMobile = false }: CalendarMonthViewEventProps) => {
    return (
        <>
            <div className={cx("inline-flex size-2 items-center justify-center md:hidden", !collapseOnMobile && "hidden")}>
                <span className={cx("size-1.5 rounded-full", eventViewColors[color].dot)}></span>
            </div>

            <div
                className={cx(
                    "flex w-full cursor-pointer items-center gap-1 rounded-md px-2 py-1 ring-1 ring-inset",
                    collapseOnMobile && "max-md:hidden",
                    eventViewColors[color].root,
                )}
            >
                <div className="flex w-full items-center justify-between gap-0.5">
                    <span className={cx("flex-1 truncate text-xs font-semibold", eventViewColors[color].label)}>{label}</span>
                    {supportingText && <time className={cx("text-xs", eventViewColors[color].time)}>{supportingText}</time>}
                </div>
            </div>
        </>
    );
};
