"use client";

import { CloseButton } from "@/components/base/buttons/close-button";

export const BannerSlimDefaultFullWidth = () => {
    return (
        <div className="relative border-b border-primary bg-secondary">
            <div className="p-4 md:py-3.5">
                <div className="flex flex-col gap-0.5 md:flex-row md:justify-center md:gap-1.5 md:text-center">
                    <p className="pr-8 text-sm font-semibold text-secondary md:truncate md:pr-0">We've just launched a new feature!</p>
                    <p className="text-sm text-tertiary md:truncate">
                        Check out the{" "}
                        <a
                            href="#"
                            className="rounded-xs underline decoration-utility-neutral-300 underline-offset-3 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            new dashboard
                        </a>
                        .
                    </p>
                </div>
            </div>
            <div className="absolute top-2 right-2 md:top-1.5">
                <CloseButton size="sm" label="Dismiss" />
            </div>
        </div>
    );
};
