"use client";

import { Stars02 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

export const BannerSingleActionBrandFullWidth = () => {
    return (
        <div className="relative border-t border-brand_alt bg-brand-section_subtle md:border-t-0 md:border-b md:border-brand">
            <div className="mx-auto flex max-w-container flex-col gap-3 p-4 md:flex-row md:items-center md:px-8 md:py-3">
                <div className="flex flex-1 flex-col gap-3 md:w-0 md:flex-row md:items-center">
                    <FeaturedIcon icon={Stars02} color="brand" theme="dark" size="md" />

                    <div className="flex flex-col gap-0.5 overflow-hidden lg:flex-row lg:gap-1.5">
                        <p className="text-sm font-semibold text-primary_on-brand md:truncate">We've just announced our Series A!</p>
                        <p className="text-sm text-tertiary_on-brand md:truncate">Read about it from our CEO.</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                    <Button href="#" color="secondary" size="sm" className="shadow-xs! ring-0">
                        Read update
                    </Button>
                    <div className="absolute top-2 right-2 flex shrink-0 items-center justify-center md:static">
                        <CloseButton size="sm" theme="dark" label="Dismiss" />
                    </div>
                </div>
            </div>
        </div>
    );
};
