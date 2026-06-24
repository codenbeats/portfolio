"use client";

import { CloseButton } from "@/components/base/buttons/close-button";

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex items-center gap-1.5">
        <div className="flex min-w-7 items-center justify-center rounded-md bg-primary p-1 shadow-xs ring-1 ring-primary ring-inset">
            <p className="min-w-0 flex-1 text-center text-xs font-medium text-primary">{value}</p>
        </div>
        <p className="text-sm text-tertiary">{label}</p>
    </div>
);

export const BannerCountdownDefault = () => {
    return (
        <div className="relative mx-2 mb-4 flex flex-col gap-3 rounded-xl bg-secondary p-4 shadow-lg ring-1 ring-secondary_alt md:m-0 md:flex-row md:items-center md:justify-center md:px-12 md:py-3">
            <div className="flex flex-col gap-0.5 md:flex-row md:items-center md:gap-2">
                <p className="pr-8 text-sm font-semibold text-secondary md:pr-0">30% off PRO ends soon</p>
                <hr className="hidden h-4 w-px border-none bg-border-secondary md:block" />
                <p className="text-sm text-tertiary">Lock in your annual plan today.</p>
            </div>

            <div className="flex items-center gap-2">
                <CountdownUnit value={8} label="hrs" />
                <CountdownUnit value={16} label="mins" />
                <CountdownUnit value={24} label="secs" />
            </div>

            <div className="absolute top-2 right-2 flex shrink-0 items-center justify-center md:top-1/2 md:-translate-y-1/2">
                <CloseButton size="sm" label="Dismiss" />
            </div>
        </div>
    );
};
