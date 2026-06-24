"use client";

import { useEffect, useState } from "react";
import { Check, Copy07 } from "@untitledui/icons";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { useClipboard } from "@/hooks/use-clipboard";

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

export const OrderSummaryMenu = () => {
    const [isOpen, setIsOpen] = useModalState();
    const [discount, setDiscount] = useState("FRIENDS");
    const { copy, copied } = useClipboard();

    return (
        <SlideoutMenu isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <SlideoutMenu.Header onClose={() => setIsOpen(false)} className="relative flex w-full flex-col gap-0.5 px-4 pt-6 md:px-6">
                <h1 className="text-md font-semibold text-primary md:text-lg">Order summary</h1>
            </SlideoutMenu.Header>
            <SlideoutMenu.Content>
                <section className="flex items-center justify-between">
                    <BadgeWithDot size="md" type="modern" color="brand">
                        4 items
                    </BadgeWithDot>
                    <p className="text-xl font-semibold text-primary">$49.00</p>
                </section>

                <span id="divider" className="h-px w-full bg-border-secondary" />

                <section className="flex flex-col gap-4">
                    <Select size="md" defaultValue="express-post" label="Shipping method">
                        <Select.Item id="express-post" supportingText="+$3.99">
                            Express post
                        </Select.Item>
                        <Select.Item id="standard-post" supportingText="+$1.99">
                            Standard post
                        </Select.Item>
                        <Select.Item id="pickup" supportingText="Free">
                            Pickup
                        </Select.Item>
                    </Select>
                    <span className="flex items-end gap-3">
                        <Input isReadOnly size="md" defaultValue={discount} onChange={setDiscount} label="Discount code" />
                        <Button color="secondary" size="md" iconLeading={copied ? Check : Copy07} onClick={() => copy(discount)} />
                    </span>
                </section>
                <span id="divider" className="w-full border-t border-secondary" />
                <section className="flex flex-col gap-4">
                    <span className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                            <p className="text-sm font-medium text-secondary">Discount</p>
                            <Badge size="md" type="modern" color="gray">
                                {discount}
                            </Badge>
                        </span>
                        <p className="text-sm text-tertiary">10% ($4.90)</p>
                    </span>
                    <span className="flex items-center justify-between">
                        <p className="text-sm font-medium text-secondary">Express shipping</p>
                        <p className="text-sm text-tertiary">$3.99</p>
                    </span>
                    <span className="flex items-center justify-between">
                        <p className="text-sm font-medium text-secondary">Subtotal</p>
                        <p className="text-sm text-tertiary">$48.09</p>
                    </span>
                </section>
                <span id="divider" className="w-full border-t border-secondary" />
                <Button size="md">Continue to checkout</Button>
            </SlideoutMenu.Content>
        </SlideoutMenu>
    );
};
