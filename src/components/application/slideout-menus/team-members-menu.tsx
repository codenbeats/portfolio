"use client";

import { useEffect, useState } from "react";
import { Mail01 } from "@untitledui/icons";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { Button } from "@/components/base/buttons/button";
import { Select } from "@/components/base/select/select";

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

export const TeamMembersMenu = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <SlideoutMenu isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <SlideoutMenu.Header onClose={() => setIsOpen(false)} className="relative flex w-full flex-col gap-4 px-4 pt-6 md:px-6">
                <h1 className="text-md font-semibold text-primary md:text-lg">Team members</h1>
            </SlideoutMenu.Header>
            <SlideoutMenu.Content>
                <Select.ComboBox size="md" aria-label="Search" placeholder="Search">
                    <Select.Item id="olivia-rhye">Olivia Rhye</Select.Item>
                    <Select.Item id="natali-craig">Natali Craig</Select.Item>
                    <Select.Item id="drew-cano">Drew Cano</Select.Item>
                    <Select.Item id="orlando-diggs">Orlando Diggs</Select.Item>
                    <Select.Item id="phoenix-baker">Phoenix Baker</Select.Item>
                    <Select.Item id="lana-steiner">Lana Steiner</Select.Item>
                    <Select.Item id="demi-wilkinson">Demi Wilkinson</Select.Item>
                    <Select.Item id="candice-wu">Candice Wu</Select.Item>
                    <Select.Item id="andi-lane">Andi Lane</Select.Item>
                </Select.ComboBox>
                <div className="flex flex-col gap-4">
                    <p className="text-sm font-semibold text-primary">Design</p>
                    <section className="flex flex-col gap-3">
                        <span className="flex justify-between">
                            <AvatarLabelGroup
                                size="md"
                                src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                                title="Olivia Rhye"
                                subtitle="Product Designer"
                            />
                            <Button size="sm" color="tertiary" iconLeading={Mail01} />
                        </span>
                        <span className="flex justify-between">
                            <AvatarLabelGroup
                                size="md"
                                src="https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80"
                                title="Natali Craig"
                                subtitle="UX Designer"
                            />
                            <Button size="sm" color="tertiary" iconLeading={Mail01} />
                        </span>
                        <span className="flex justify-between">
                            <AvatarLabelGroup
                                size="md"
                                src="https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80"
                                title="Drew Cano"
                                subtitle="UX Designer"
                            />
                            <Button size="sm" color="tertiary" iconLeading={Mail01} />
                        </span>
                        <span className="flex justify-between">
                            <AvatarLabelGroup
                                size="md"
                                src="https://www.untitledui.com/images/avatars/orlando-diggs?fm=webp&q=80"
                                title="Orlando Diggs"
                                subtitle="UI Designer"
                            />
                            <Button size="sm" color="tertiary" iconLeading={Mail01} />
                        </span>
                    </section>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-sm font-semibold text-primary">Product</p>
                    <section className="flex flex-col gap-3">
                        <span className="flex justify-between">
                            <AvatarLabelGroup
                                size="md"
                                src="https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80"
                                title="Phoenix Baker"
                                subtitle="Product Manager"
                            />
                            <Button size="sm" color="tertiary" iconLeading={Mail01} />
                        </span>
                        <span className="flex justify-between">
                            <AvatarLabelGroup
                                size="md"
                                src="https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80"
                                title="Lana Steiner"
                                subtitle="Frontend Developer"
                            />
                            <Button size="sm" color="tertiary" iconLeading={Mail01} />
                        </span>
                        <span className="flex justify-between">
                            <AvatarLabelGroup
                                size="md"
                                src="https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80"
                                title="Demi Wilkinson"
                                subtitle="Backend Developer"
                            />
                            <Button size="sm" color="tertiary" iconLeading={Mail01} />
                        </span>
                        <span className="flex justify-between">
                            <AvatarLabelGroup
                                size="md"
                                src="https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80"
                                title="Candice Wu"
                                subtitle="Fullstack Developer"
                            />
                            <Button size="sm" color="tertiary" iconLeading={Mail01} />
                        </span>
                        <span className="flex justify-between">
                            <AvatarLabelGroup
                                size="md"
                                src="https://www.untitledui.com/images/avatars/andi-lane?fm=webp&q=80"
                                title="Andi Lane"
                                subtitle="Product Manager"
                            />
                            <Button size="sm" color="tertiary" iconLeading={Mail01} />
                        </span>
                        <span className="flex justify-between">
                            <AvatarLabelGroup
                                size="md"
                                src="https://www.untitledui.com/images/avatars/kate-morrison?fm=webp&q=80"
                                title="Kate Morrison"
                                subtitle="QA Engineer"
                            />
                            <Button size="sm" color="tertiary" iconLeading={Mail01} />
                        </span>
                    </section>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-sm font-semibold text-primary">Marketing</p>
                    <section className="flex flex-col gap-3">
                        <span className="flex justify-between">
                            <AvatarLabelGroup
                                size="md"
                                src="https://www.untitledui.com/images/avatars/kelly-williams?fm=webp&q=80"
                                title="Kelly Wiliams"
                                subtitle="Growth Marketer"
                            />
                            <Button size="sm" color="tertiary" iconLeading={Mail01} />
                        </span>
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
                    Confirm
                </Button>
            </SlideoutMenu.Footer>
        </SlideoutMenu>
    );
};
