"use client";

import { useEffect, useState } from "react";
import { CreditCard02, Mail01 } from "@untitledui/icons";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { PaymentInput, formatCardNumber } from "@/components/base/input/input-payment";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";

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

export const PaymentDetailsMenu = () => {
    const [isOpen, setIsOpen] = useModalState();
    const [cardDetails, setCardDetails] = useState({
        name: "Olivia Rhye",
        expiry: "06 / 2028",
        card: "1234 1234 1234 1234",
        cvv: "123",
    });

    return (
        <SlideoutMenu isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <SlideoutMenu.Header onClose={() => setIsOpen(false)} className="relative flex w-full items-start gap-4 px-4 pt-6 md:px-6">
                <FeaturedIcon size="md" color="gray" theme="modern" icon={CreditCard02} />
                <section className="flex flex-col gap-0.5">
                    <h1 className="text-md font-semibold text-primary md:text-lg">Payment details</h1>
                    <p className="text-sm text-tertiary">Update your plan payment details.</p>
                </section>
            </SlideoutMenu.Header>
            <SlideoutMenu.Content>
                <div className="relative flex min-h-53 w-full items-center justify-center overflow-hidden rounded-xl py-6 md:min-h-59.5">
                    <img
                        src="https://www.untitledui.com/application/card-mockup.webp"
                        alt="Card Mockup"
                        aria-hidden="true"
                        className="absolute inset-0 size-full object-cover"
                    />
                    <CreditCard
                        width={316}
                        className="max-md:hidden"
                        type="transparent"
                        cardExpiration={cardDetails.expiry}
                        cardHolder={cardDetails.name}
                        cardNumber={formatCardNumber(cardDetails.card)}
                    />
                    <CreditCard
                        width={272}
                        className="md:hidden"
                        type="transparent"
                        cardExpiration={cardDetails.expiry}
                        cardHolder={cardDetails.name}
                        cardNumber={formatCardNumber(cardDetails.card)}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <Input
                        isRequired
                        size="md"
                        label="Name on card"
                        value={cardDetails.name}
                        onChange={(value) => {
                            setCardDetails((prev) => ({ ...prev, name: value }));
                        }}
                    />

                    <PaymentInput
                        size="md"
                        label="Card number"
                        isRequired
                        value={cardDetails.card}
                        onChange={(value) => {
                            setCardDetails((prev) => ({ ...prev, card: value }));
                        }}
                    />

                    <span className="flex gap-4">
                        <Input
                            isRequired
                            size="md"
                            label="Expiry"
                            className="w-28"
                            maxLength={9}
                            value={cardDetails.expiry}
                            onChange={(value) => {
                                // Remove any non-numeric characters.
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
                        <Input
                            size="md"
                            isRequired
                            label="CVV"
                            className="w-28"
                            type="password"
                            maxLength={3}
                            value={cardDetails.cvv}
                            onChange={(value) => {
                                // Remove any non-numeric characters.
                                value = value.replace(/\D/g, "");

                                // Make sure max length is 3 characters long.
                                value = value.slice(0, 3);

                                setCardDetails((prev) => ({ ...prev, cvv: value }));
                            }}
                        />
                    </span>
                </div>
                <div id="divider" className="w-full border-t border-secondary" />
                <div className="flex flex-col gap-4">
                    <section className="flex flex-col gap-1">
                        <p className="text-sm font-semibold text-primary">Billing contact</p>
                        <p className="text-sm text-tertiary">Add a second billing contact email.</p>
                    </section>
                    <Input
                        size="md"
                        isRequired
                        icon={Mail01}
                        placeholder="Email"
                        label="Email address"
                        tooltip="This is tooltip"
                        defaultValue="accounts@untitledui.com"
                    />
                </div>
            </SlideoutMenu.Content>
            <SlideoutMenu.Footer className="flex w-full justify-end gap-3">
                <Button size="sm" color="secondary" onClick={() => setIsOpen(false)}>
                    Cancel
                </Button>
                <Button size="sm" onClick={() => setIsOpen(false)}>
                    Confirm
                </Button>
            </SlideoutMenu.Footer>
        </SlideoutMenu>
    );
};
