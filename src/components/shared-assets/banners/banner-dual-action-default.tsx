"use client";

import { CheckVerified02 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";

export const BannerDualActionDefault = () => {
    return (
        <div className="relative mx-2 mb-4 flex flex-col gap-4 rounded-xl bg-secondary p-4 shadow-lg ring-1 ring-secondary_alt md:m-0 md:flex-row md:items-center md:gap-3 md:py-3 md:pr-3 md:pl-5">
            <div className="flex flex-1 flex-col gap-3 md:w-0 md:flex-row md:items-center md:gap-2">
                <CheckVerified02 className="size-5 text-fg-brand-primary_alt" />

                <div className="flex flex-col gap-2 overflow-hidden lg:flex-row lg:gap-1.5">
                    <p className="pr-8 text-sm font-semibold text-secondary md:truncate md:pr-0">
                        We use third-party cookies in order to personalise your experience
                    </p>
                    <p className="text-sm text-tertiary md:truncate">
                        Read our{" "}
                        <a
                            href="#"
                            className="rounded-xs underline decoration-utility-neutral-300 underline-offset-3 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            Cookie Policy
                        </a>
                        .
                    </p>
                </div>
            </div>

            <div className="flex gap-2">
                <div className="flex w-full flex-col-reverse gap-2 md:flex-row md:gap-3">
                    <Button color="secondary" size="sm">
                        Decline
                    </Button>
                    <Button color="primary" size="sm">
                        Allow
                    </Button>
                </div>
                <div className="absolute top-2 right-2 flex shrink-0 items-center justify-center md:static">
                    <CloseButton size="sm" label="Dismiss" />
                </div>
            </div>
        </div>
    );
};
