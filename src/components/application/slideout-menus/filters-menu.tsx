"use client";

import { useEffect, useState } from "react";
import { FilterLines } from "@untitledui/icons";
import { Checkbox as AriaCheckbox } from "react-aria-components";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import type { BadgeColors } from "@/components/base/badges/badge-types";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Checkbox, CheckboxBase } from "@/components/base/checkbox/checkbox";
import { Select } from "@/components/base/select/select";
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

const teams: Array<{ name: string; color: BadgeColors }> = [
    { name: "Design", color: "brand" },
    { name: "Product", color: "blue" },
    { name: "Marketing", color: "indigo" },
    { name: "Management", color: "pink" },
    { name: "Sales", color: "success" },
    { name: "Product", color: "slate" },
    { name: "Operations", color: "sky" },
];

export const FiltersMenu = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <SlideoutMenu isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <SlideoutMenu.Header onClose={() => setIsOpen(false)} className="relative flex w-full flex-col gap-0.5 px-4 pt-6 md:px-6">
                <h1 className="text-md font-semibold text-primary md:text-lg">Filters</h1>
                <p className="text-sm text-tertiary">Apply filters to table data.</p>
            </SlideoutMenu.Header>
            <SlideoutMenu.Content>
                <Select aria-label="Filters" size="md" placeholder="Select saved filter" icon={FilterLines}>
                    <Select.Item id="product-designers">Product designers</Select.Item>
                    <Select.Item id="backend-developers">Backend developers</Select.Item>
                    <Select.Item id="frontend-developers">Frontend developers</Select.Item>
                    <Select.Item id="fullstack-developers">Fullstack developers</Select.Item>
                    <Select.Item id="product-managers">Product managers</Select.Item>
                    <Select.Item id="qa-engineers">QA engineers</Select.Item>
                </Select>
                <div className="flex flex-col gap-4">
                    <p className="text-sm font-semibold text-primary">Teams</p>
                    <section className="flex flex-col items-start gap-3 pl-2">
                        {teams.map((team, index) => (
                            <AriaCheckbox
                                key={`${team.name}-${index}`}
                                className={(state) => cx("flex cursor-pointer items-center gap-2", state.isDisabled && "cursor-not-allowed")}
                            >
                                {({ isSelected, isDisabled, isFocusVisible }) => (
                                    <>
                                        <CheckboxBase isSelected={isSelected} isDisabled={isDisabled} isFocusVisible={isFocusVisible} />
                                        <Badge size="md" type="pill-color" color={team.color}>
                                            {team.name}
                                        </Badge>
                                    </>
                                )}
                            </AriaCheckbox>
                        ))}
                    </section>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-sm font-semibold text-primary">Role</p>
                    <Select.ComboBox size="md" aria-label="Search" placeholder="Search">
                        <Select.Item id="backend-developer">Backend Developer</Select.Item>
                        <Select.Item id="frontend-developer">Frontend Developer</Select.Item>
                        <Select.Item id="fullstack-developer">Fullstack Developer</Select.Item>
                        <Select.Item id="product-designer">Product Designer</Select.Item>
                        <Select.Item id="product-manager">Product Manager</Select.Item>
                        <Select.Item id="qa-engineer">QA Engineer</Select.Item>
                        <Select.Item id="ux-copywriter">UX Copywriter</Select.Item>
                    </Select.ComboBox>
                    <section className="flex flex-col gap-3 pl-2">
                        <Checkbox label="Backend Developer" />
                        <Checkbox label="Frontend Developer" />
                        <Checkbox label="Fullstack Developer" />
                        <Checkbox label="Product Designer" />
                        <Checkbox label="Product Manager" />
                        <Checkbox label="QA Engineer" />
                        <Checkbox label="UX Copywriter" />
                        <Checkbox label="UX Designer" />
                        <Button size="md" color="link-color">
                            Show 10 more
                        </Button>
                    </section>
                </div>
            </SlideoutMenu.Content>
            <SlideoutMenu.Footer className="flex w-full items-center justify-end gap-3">
                <Button size="sm" color="link-color" className="mr-auto">
                    Save filter
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
