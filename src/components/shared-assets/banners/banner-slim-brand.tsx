"use client";

import { CloseButton } from "@/components/base/buttons/close-button";

export const BannerSlimBrand = () => {
    return (
        <div className="relative mx-2 mb-4 flex items-center gap-4 rounded-xl border-t border-brand_alt bg-brand-section_subtle p-4 shadow-lg md:m-0 md:gap-3 md:border-t-0 md:border-b md:px-12 md:py-4">
            <div className="flex w-0 flex-1 flex-col gap-0.5 md:flex-row md:justify-center md:gap-1.5 md:text-center">
                <p className="pr-8 text-sm font-semibold text-primary_on-brand md:truncate md:pr-0">We've just launched a new feature!</p>
                <p className="text-sm text-tertiary_on-brand md:truncate">
                    Check out the{" "}
                    <a
                        href="#"
                        className="rounded-xs underline decoration-utility-brand-500_alt underline-offset-3 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        new dashboard
                    </a>
                    .
                </p>
            </div>

            <div className="absolute top-2 right-2 flex shrink-0 items-center justify-center">
                <CloseButton size="sm" theme="dark" label="Dismiss" />
            </div>
        </div>
    );
};
