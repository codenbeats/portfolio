"use client";

import { useEffect, useState } from "react";
import { Code02, HelpCircle } from "@untitledui/icons";
import { Heading as AriaHeading, Radio as AriaRadio, RadioGroup as AriaRadioGroup } from "react-aria-components";
import { DefaultBanner, DefaultBannerSM, NoneBanner, NoneBannerSM, SimplifiedBanner } from "@/components/application/modals/base-components/banners";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { RadioButtonBase } from "@/components/base/radio-buttons/radio-buttons";
import { cx } from "@/utils/cx";

/**
 * This is a utility hook that automatically reopens the modal after
 * it's closed. It's used only for demo purposes and can be safely
 * removed and replaced with a regular `useState` hook.
 */
const useModalState = (defaultValue: boolean = true) => {
    const [isOpen, setIsOpen] = useState(defaultValue);

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setIsOpen(true);
            }, 700);
        }
    }, [isOpen]);

    return [isOpen, setIsOpen] as const;
};

const banners = [
    {
        value: "default",
        label: "Default",
        description: "Default solid brand color.",
        component: DefaultBanner,
        componentSM: DefaultBannerSM,
    },
    {
        value: "simplified",
        label: "Simplified",
        description: "Minimal and simplified.",
        component: SimplifiedBanner,
        componentSM: NoneBannerSM,
    },
    {
        value: "none",
        label: "None",
        description: "Hide all banners.",
        component: NoneBanner,
        componentSM: NoneBannerSM,
    },
    {
        value: "custom",
        label: "Custom styling",
        description: "Manage styling with CSS.",
        component: NoneBanner,
        componentSM: NoneBannerSM,
    },
];

export const BannerAppearanceModal = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-137">
                        <CloseButton onClick={() => setIsOpen(false)} theme="light" size="sm" className="absolute top-3 right-3 sm:top-4 sm:right-4" />
                        <div className="flex flex-col gap-0.5 px-4 pt-5 sm:px-6 sm:pt-6">
                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                Banner appearance
                            </AriaHeading>
                            <p className="text-sm text-tertiary">Change how banners appear to visitors.</p>
                        </div>
                        <div className="h-5 w-full" />
                        <AriaRadioGroup
                            aria-label="Banner appearances"
                            defaultValue={banners[1].value}
                            className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:gap-5 sm:px-6"
                        >
                            {banners.map((banner) => (
                                <AriaRadio
                                    key={banner.value}
                                    value={banner.value}
                                    className="flex h-max w-full flex-row gap-3 transition-all duration-150 ease-in sm:flex-col"
                                >
                                    {({ isSelected, isDisabled, isFocusVisible }) => (
                                        <>
                                            <section className="relative h-16 w-24 rounded-md bg-utility-neutral-100 sm:h-40 sm:w-60 sm:rounded-[10px]">
                                                <banner.component className="h-full object-cover object-center max-sm:hidden" />
                                                <banner.componentSM className="h-full object-cover object-center sm:hidden" />

                                                <span
                                                    className={cx(
                                                        "pointer-events-none absolute top-0 left-0 z-1 size-full rounded-md ring-1 ring-primary ring-inset sm:rounded-[10px]",
                                                        isSelected && "ring-2 ring-brand",
                                                    )}
                                                />

                                                {banner.value === "custom" && (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            iconLeading={Code02}
                                                            color="secondary"
                                                            className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 max-sm:hidden"
                                                        >
                                                            Edit CSS
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            iconLeading={Code02}
                                                            color="secondary"
                                                            className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 sm:hidden"
                                                        />
                                                        <span className="absolute top-0 left-0 size-full rounded-md bg-linear-to-b from-[rgba(0,0,0,0.02)] to-[rgba(0,0,0,0.17)] to-90% backdrop-blur-[2.14px] sm:rounded-[10px]" />
                                                    </>
                                                )}
                                            </section>
                                            <section className="flex w-full gap-3 sm:gap-3">
                                                <span className="w-full">
                                                    <p className="text-sm font-semibold text-primary">{banner.label}</p>
                                                    <p className="text-sm text-tertiary">{banner.description}</p>
                                                </span>

                                                <RadioButtonBase size="sm" isSelected={isSelected} isDisabled={isDisabled} isFocusVisible={isFocusVisible} />
                                            </section>
                                        </>
                                    )}
                                </AriaRadio>
                            ))}
                        </AriaRadioGroup>
                        <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:flex-row sm:items-center sm:justify-end sm:px-6 sm:pt-8 sm:pb-6">
                            <Button size="md" color="link-gray" iconLeading={HelpCircle} className="mr-auto max-sm:hidden">
                                Need help?
                            </Button>
                            <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                Save changes
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
