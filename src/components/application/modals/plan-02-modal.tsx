"use client";

import { useEffect, useState } from "react";
import { CheckCircle, LayersThree01, LayersTwo01, MessageChatCircle } from "@untitledui/icons";
import { Heading as AriaHeading, Radio as AriaRadio, RadioGroup as AriaRadioGroup } from "react-aria-components";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { RadioButtonBase } from "@/components/base/radio-buttons/radio-buttons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
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

const plans = [
    {
        value: "basic",
        title: "$10/mth",
        secondaryTitle: "Basic plan",
        description: "Up to 10 users and 20 GB individual data.",
        icon: LayersTwo01,
        features: ["Basic features", "Basic reporting", "Up to 10 individual users", "20 GB data per user"],
    },

    {
        value: "business",
        title: "$20/mth",
        secondaryTitle: "Business plan",
        description: "Up to 20 users and 40 GB individual data.",
        icon: LayersThree01,
        features: ["Advanced features", "Advanced reporting", "Up to 20 individual users", "40 GB data per user"],
    },
];

export const Plan02Modal = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-140">
                        <CloseButton onClick={() => setIsOpen(false)} theme="light" size="sm" className="absolute top-3 right-3 z-20 sm:top-4 sm:right-4" />
                        <div className="flex items-start gap-4 px-4 pt-5 max-sm:flex-col sm:px-6 sm:pt-6">
                            <div className="relative">
                                <FeaturedIcon color="gray" size="md" theme="modern" icon={LayersTwo01} />
                            </div>

                            <div className="z-10 flex flex-col gap-0.5">
                                <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                    Select plan
                                </AriaHeading>
                                <p className="text-sm text-tertiary">Simple and flexible per-user pricing.</p>
                            </div>
                        </div>
                        <div className="h-5 w-full" />
                        <div className="w-full border-t border-secondary" />

                        <AriaRadioGroup
                            defaultValue={plans[0].value}
                            aria-label="Pricing plans"
                            className="grid size-full grid-cols-1 gap-3 px-4 pt-5 pb-6 sm:grid-cols-2 sm:gap-4 sm:px-6 sm:pb-8"
                        >
                            {plans.map((plan) => (
                                <AriaRadio
                                    key={plan.value}
                                    value={plan.value}
                                    className={({ isSelected }) =>
                                        cx(
                                            "relative flex cursor-pointer flex-col items-start rounded-xl bg-primary shadow-xs ring-1 ring-secondary ring-inset",
                                            isSelected && "ring-2 ring-brand",
                                        )
                                    }
                                >
                                    {(state) => (
                                        <>
                                            <div className="flex w-full flex-col gap-1 p-4 sm:gap-2 sm:px-5 sm:pt-5 sm:pb-0">
                                                <h3 className="text-xl font-semibold text-primary">{plan.title}</h3>
                                                <div className="flex items-center gap-0.5 sm:flex-col sm:items-start">
                                                    <p className="w-full text-sm font-semibold text-primary">{plan.secondaryTitle}</p>
                                                    <p className="text-sm whitespace-nowrap text-tertiary">Billed annually</p>
                                                </div>
                                            </div>

                                            <RadioButtonBase {...state} size="sm" className="absolute top-4 right-4 z-10" />

                                            <ul className="flex flex-col gap-2 p-5 pt-4 max-sm:hidden">
                                                {plan.features.map((feature) => (
                                                    <li key={feature} className="flex gap-2">
                                                        <CheckCircle className="size-5 shrink-0 text-fg-brand-primary" />
                                                        <span className="text-sm text-tertiary">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </AriaRadio>
                            ))}
                        </AriaRadioGroup>

                        <div className="z-10 flex w-full flex-1 flex-col-reverse gap-3 px-4 pb-4 sm:flex-row sm:px-6 sm:pb-6">
                            <Button size="md" color="secondary" className="max-sm:hidden" iconLeading={MessageChatCircle}>
                                Chat to us
                            </Button>
                            <div className="flex w-full flex-col-reverse justify-end gap-3 sm:flex-row">
                                <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                                <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                    Select plan
                                </Button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
