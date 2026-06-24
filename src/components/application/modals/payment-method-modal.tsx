"use client";

import { useEffect, useState } from "react";
import { CurrencyDollarCircle } from "@untitledui/icons";
import { Heading as AriaHeading } from "react-aria-components";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { RadioGroupPaymentIcon } from "@/components/base/radio-groups/radio-group-payment-icon";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { MastercardIcon, VisaIcon } from "@/components/foundations/payment-icons";

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

const paymentCards = [
    {
        value: "card-1",
        title: "Visa ending in 1234",
        description: "Expiry 06/2028",
        logo: <VisaIcon className="h-8 w-11.5" />,
    },
    {
        value: "card-2",
        title: "Mastercard ending in 1234",
        description: "Expiry 06/2028",
        logo: <MastercardIcon className="h-8 w-11.5" />,
    },
    {
        value: "card-3",
        title: "Visa ending in 1234",
        description: "Expiry 06/2028",
        logo: <VisaIcon className="h-8 w-11.5" />,
    },
];

export const PaymentMethodModal = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-120">
                        <CloseButton onClick={() => setIsOpen(false)} theme="light" size="sm" className="absolute top-3 right-3 sm:top-4 sm:right-4" />
                        <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                            <div className="relative w-max">
                                <FeaturedIcon color="gray" size="md" theme="modern" icon={CurrencyDollarCircle} />
                            </div>
                            <div className="z-10 flex flex-col gap-0.5">
                                <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                    Change your payment method
                                </AriaHeading>
                                <p className="text-sm text-tertiary">Update your plan payment details.</p>
                            </div>
                        </div>
                        <div className="h-5 w-full" />
                        <div className="px-4 sm:px-6">
                            <RadioGroupPaymentIcon aria-label="Payment methods" defaultValue={paymentCards[0]?.value} items={paymentCards} />
                        </div>
                        <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                            <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                Confirm
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
