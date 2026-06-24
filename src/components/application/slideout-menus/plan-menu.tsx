"use client";

import { useEffect, useState } from "react";
import { CreditCard02, LayersThree01, LayersTwo01, Zap } from "@untitledui/icons";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Button } from "@/components/base/buttons/button";
import { RadioGroupIconCard } from "@/components/base/radio-groups/radio-group-icon-card";
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

const iconCardPlans = [
    {
        value: "basic",
        title: "Basic plan",
        secondaryTitle: "per month",
        price: "$10",
        badge: "Limited time only",
        description: "Includes up to 10 users, 20 GB individual data and access to all features.",
        icon: LayersTwo01,
    },

    {
        value: "business",
        title: "Business plan",
        secondaryTitle: "per month",
        price: "$20",
        description: "Includes up to 20 users, 40 GB individual data and access to all features.",
        icon: LayersThree01,
    },

    {
        value: "enterprise",
        title: "Enterprise plan",
        secondaryTitle: "per month",
        price: "$40",
        description: "Unlimited users, unlimited individual data and access to all features.",
        icon: Zap,
    },
];

export const PlanMenu = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <SlideoutMenu isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <SlideoutMenu.Header onClose={() => setIsOpen(false)} className="relative flex w-full items-start gap-3 px-4 pt-6 md:px-6">
                <FeaturedIcon size="md" color="gray" theme="modern" icon={CreditCard02} />
                <section className="flex flex-col gap-0.5">
                    <h1 className="text-md font-semibold text-primary md:text-lg">Change your plan</h1>
                    <p className="text-sm text-tertiary">Flexible pricing that grows with you.</p>
                </section>
            </SlideoutMenu.Header>
            <SlideoutMenu.Content>
                <RadioGroupIconCard aria-label="Payment methods" defaultValue={iconCardPlans[0]?.value} items={iconCardPlans} className="w-full" />
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
