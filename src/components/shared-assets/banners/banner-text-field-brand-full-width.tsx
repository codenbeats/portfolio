"use client";

import { Mail01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

export const BannerTextFieldBrandFullWidth = () => {
    return (
        <div className="relative border-t border-brand_alt bg-brand-section_subtle md:border-t-0 md:border-b md:border-brand">
            <div className="mx-auto flex max-w-container flex-col gap-4 p-4 md:flex-row md:items-center md:gap-3 md:px-8 md:py-3">
                <div className="flex flex-1 items-center gap-3 md:w-0">
                    <FeaturedIcon className="hidden md:flex" icon={Mail01} color="brand" theme="dark" size="md" />

                    <div className="flex flex-col gap-0.5 overflow-auto">
                        <p className="pr-8 text-sm font-semibold text-primary_on-brand md:truncate md:pr-0">
                            Stay up to date with the latest news <span className="hidden md:inline">and updates</span>
                        </p>
                        <p className="text-sm text-tertiary_on-brand md:truncate">Be the first to hear about new components, updates, and design resources.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const data = Object.fromEntries(new FormData(e.currentTarget));
                            console.log("Form data:", data);
                        }}
                        className="flex flex-1 flex-col gap-3 md:w-90 md:flex-row md:gap-3"
                    >
                        <Input isRequired size="sm" placeholder="Enter your email" inputClassName="border-white" wrapperClassName="flex-1" />
                        <Button type="submit" color="secondary" size="sm" className="shadow-xs! ring-0">
                            Subscribe
                        </Button>
                    </Form>
                    <div className="absolute top-2 right-2 flex shrink-0 items-center justify-center md:static">
                        <CloseButton size="sm" theme="dark" label="Dismiss" />
                    </div>
                </div>
            </div>
        </div>
    );
};
