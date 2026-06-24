"use client";

import { CloseButton } from "@/components/base/buttons/close-button";

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex items-center gap-1.5">
        <div className="flex min-w-7 items-center justify-center rounded-md p-1 ring-1 ring-utility-brand-500_alt ring-inset">
            <p className="min-w-0 flex-1 text-center text-xs font-medium text-primary_on-brand">{value}</p>
        </div>
        <p className="text-sm text-tertiary_on-brand">{label}</p>
    </div>
);

export const BannerCountdownBrand = () => {
    return (
        <div className="relative mx-2 mb-4 flex flex-col gap-3 rounded-xl border-t border-brand_alt bg-brand-section_subtle p-4 shadow-lg md:m-0 md:flex-row md:items-center md:justify-center md:border-t-0 md:border-b md:px-12 md:py-4">
            <div className="flex flex-col gap-0.5 md:flex-row md:items-center md:gap-2">
                <p className="pr-8 text-sm font-semibold text-primary_on-brand md:pr-0">30% off PRO ends soon</p>
                <hr className="hidden h-4 w-px border-none bg-white/20 md:block" />
                <p className="text-sm text-tertiary_on-brand">Lock in your annual plan today.</p>
            </div>

            <div className="flex items-center gap-2">
                <CountdownUnit value={8} label="hrs" />
                <CountdownUnit value={16} label="mins" />
                <CountdownUnit value={24} label="secs" />
            </div>

            <div className="absolute top-2 right-2 flex shrink-0 items-center justify-center md:top-1/2 md:right-2 md:-translate-y-1/2">
                <CloseButton size="sm" theme="dark" label="Dismiss" />
            </div>
        </div>
    );
};
