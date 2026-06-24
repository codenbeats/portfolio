"use client";

import { useEffect, useState } from "react";
import { LayersTwo02, Plus } from "@untitledui/icons";
import { Checkbox as AriaCheckbox, CheckboxGroup as AriaCheckboxGroup } from "react-aria-components";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import type { BadgeColors } from "@/components/base/badges/badge-types";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { CheckboxBase } from "@/components/base/checkbox/checkbox";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
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

const labels: Array<{ name: string; value: string; color: BadgeColors }> = [
    { name: "Design", value: "design", color: "brand" },
    { name: "Product", value: "product", color: "blue" },
    { name: "Marketing", value: "marketing", color: "indigo" },
    { name: "Management", value: "management", color: "pink" },
    { name: "Sales", value: "sales", color: "success" },
    { name: "Product design", value: "product-design", color: "slate" },
    { name: "Operations", value: "operations", color: "sky" },
    { name: "Customer Success", value: "customer-success", color: "purple" },
    { name: "Human Resources", value: "human-resources", color: "blue" },
    { name: "Compliance", value: "compliance", color: "orange" },
    { name: "Finance", value: "finance", color: "gray" },
];

export const LabelsMenu = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <SlideoutMenu isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <SlideoutMenu.Header onClose={() => setIsOpen(false)} className="flex w-full items-start gap-3">
                <FeaturedIcon size="md" color="gray" theme="modern" icon={LayersTwo02} />
                <section className="flex flex-col gap-0.5">
                    <h1 className="text-md font-semibold text-primary md:text-lg">Add labels to project</h1>
                    <p className="text-sm text-tertiary">Labels help organize projects.</p>
                </section>
            </SlideoutMenu.Header>
            <SlideoutMenu.Content>
                <Select.ComboBox aria-label="Labels" size="md" placeholder="Search for label">
                    <Select.Item id="design">Design</Select.Item>
                    <Select.Item id="product">Product</Select.Item>
                    <Select.Item id="marketing">Marketing</Select.Item>
                    <Select.Item id="management">Management</Select.Item>
                    <Select.Item id="sales">Sales</Select.Item>
                    <Select.Item id="operations">Operations</Select.Item>
                </Select.ComboBox>
                <AriaCheckboxGroup defaultValue={["design", "product", "marketing", "management"]} className="flex flex-col gap-4">
                    <Label className="text-sm font-semibold text-primary">Custom labels</Label>
                    <section className="flex flex-col items-start gap-3 pl-2">
                        {labels.map((label) => (
                            <AriaCheckbox
                                key={label.name}
                                value={label.value}
                                className={(state) => cx("flex cursor-pointer items-center gap-2", state.isDisabled && "cursor-not-allowed")}
                            >
                                {({ isSelected, isDisabled, isFocusVisible }) => (
                                    <>
                                        <CheckboxBase isSelected={isSelected} isDisabled={isDisabled} isFocusVisible={isFocusVisible} />
                                        <Badge size="md" type="pill-color" color={label.color}>
                                            {label.name}
                                        </Badge>
                                    </>
                                )}
                            </AriaCheckbox>
                        ))}

                        <Button size="md" color="link-color" iconLeading={Plus}>
                            Add label
                        </Button>
                    </section>
                </AriaCheckboxGroup>
            </SlideoutMenu.Content>
            <SlideoutMenu.Footer className="flex w-full items-center justify-end gap-3">
                <Button size="sm" color="link-color" className="mr-auto">
                    Manage labels
                </Button>
                <Button size="sm" color="secondary" onClick={() => setIsOpen(false)}>
                    Cancel
                </Button>
                <Button size="sm" onClick={() => setIsOpen(false)}>
                    Apply
                </Button>
            </SlideoutMenu.Footer>
        </SlideoutMenu>
    );
};
