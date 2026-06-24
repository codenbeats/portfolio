"use client";

import { useEffect, useState } from "react";
import { CreditCardShield } from "@untitledui/icons";
import { Heading as AriaHeading } from "react-aria-components";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Input } from "@/components/base/input/input";
import { PaymentInput } from "@/components/base/input/input-payment";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

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

export const PaymentDetailsModal = () => {
    const [isOpen, setIsOpen] = useModalState();
    const [isCvvFocused, setIsCvvFocused] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        name: "Olivia Rhye",
        expiry: "06 / 2028",
        card: "1234 1234 1234 1234",
        cvv: "123",
    });

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-120">
                        <CloseButton onClick={() => setIsOpen(false)} theme="light" size="sm" className="absolute top-3 right-3 sm:top-4 sm:right-4" />
                        <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                            <div className="relative w-max">
                                <FeaturedIcon color="gray" size="md" theme="modern" icon={CreditCardShield} />
                            </div>
                            <div className="z-10 flex flex-col gap-0.5">
                                <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                    Update payment method
                                </AriaHeading>
                                <p className="text-sm text-tertiary">Update your card details.</p>
                            </div>
                        </div>
                        <div className="h-5 w-full" />
                        <div className="relative grid grid-flow-row grid-cols-2 gap-4 px-4 sm:grid-cols-[1fr_112px] sm:px-6">
                            <Input
                                size="lg"
                                label="Name on card"
                                className="order-first max-sm:col-span-2"
                                value={cardDetails.name}
                                onChange={(value) => {
                                    setCardDetails((prev) => ({ ...prev, name: value }));
                                }}
                            />
                            <Input
                                size="lg"
                                label="Expiry"
                                type="tel"
                                className="order-3 col-span-1 sm:order-2"
                                maxLength={9}
                                value={cardDetails.expiry}
                                onChange={(value) => {
                                    // Remove any non-numeric characters
                                    value = value.replace(/\D/g, "");

                                    // Make sure max length is 6 characters long.
                                    value = value.slice(0, 6);

                                    if (value.length > 2) {
                                        // Format the value as MM/YY.
                                        value = value.slice(0, 2) + " / " + value.slice(2, 6);
                                    }

                                    setCardDetails((prev) => ({ ...prev, expiry: value }));
                                }}
                            />
                            <PaymentInput
                                size="md"
                                label="Card number"
                                type="tel"
                                className="order-2 col-span-1 max-sm:col-span-2 sm:order-3"
                                value={cardDetails.card}
                                onChange={(value) => {
                                    setCardDetails((prev) => ({ ...prev, card: value }));
                                }}
                            />
                            <Input
                                size="lg"
                                label="CVV"
                                type={isCvvFocused ? "tel" : "password"}
                                className="order-last col-span-1"
                                placeholder="•••"
                                maxLength={3}
                                value={cardDetails.cvv}
                                onFocus={() => setIsCvvFocused(true)}
                                onBlur={() => setIsCvvFocused(false)}
                                onChange={(value) => {
                                    // Remove any non-numeric characters
                                    value = value.replace(/\D/g, "");

                                    // Make sure max length is 3 characters long.
                                    value = value.slice(0, 3);

                                    setCardDetails((prev) => ({ ...prev, cvv: value }));
                                }}
                            />
                        </div>
                        <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                            <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                Update
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
