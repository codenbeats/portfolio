"use client";

import { Stars02 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

export const BannerSingleActionDefault = () => {
    return (
        <div className="relative mx-2 mb-4 flex flex-col gap-3 rounded-xl bg-secondary p-4 shadow-lg ring-1 ring-secondary_alt md:m-0 md:flex-row md:items-center md:p-3">
            <div className="flex flex-1 flex-col gap-3 md:w-0 md:flex-row md:items-center">
                <FeaturedIcon icon={Stars02} color="gray" theme="modern" size="md" />

                <div className="flex flex-col gap-0.5 overflow-hidden lg:flex-row lg:gap-1.5">
                    <p className="text-sm font-semibold text-secondary md:truncate">We've just announced our Series A!</p>
                    <p className="text-sm text-tertiary md:truncate">Read about it from our CEO.</p>
                </div>
            </div>

            <div className="flex flex-col gap-2 md:flex-row">
                <Button href="#" color="secondary" size="sm">
                    Read update
                </Button>
                <div className="absolute top-2 right-2 flex shrink-0 items-center justify-center md:static">
                    <CloseButton size="sm" label="Dismiss" />
                </div>
            </div>
        </div>
    );
};
