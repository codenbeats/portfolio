"use client";

import { useEffect, useState } from "react";
import { Check, Copy01, Link01, Plus } from "@untitledui/icons";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { TextAreaBase } from "@/components/base/textarea/textarea";
import { Dot } from "@/components/foundations/dot-icon";
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

export const ProjectDetailsMenu = () => {
    const [isOpen, setIsOpen] = useModalState();
    const { copy, copied } = useClipboard();

    return (
        <SlideoutMenu isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <SlideoutMenu.Header onClose={() => setIsOpen(false)} className="relative flex w-full flex-col gap-0.5 px-4 pt-6 md:px-6">
                <h1 className="text-md font-semibold text-primary md:text-lg">Marketing site redesign</h1>
                <p className="text-sm text-tertiary">Redesign of untitledui.com</p>
            </SlideoutMenu.Header>
            <SlideoutMenu.Content>
                <section className="flex flex-col gap-4">
                    <span className="flex flex-col gap-1">
                        <p className="text-sm font-semibold text-primary">Share project</p>
                        <span className="flex items-center gap-1.5">
                            <Link01 size={16} className="text-fg-quaternary" />
                            <p className="text-sm text-tertiary">untitledui.com/project/marketing-site</p>
                        </span>
                    </span>
                    <Button
                        size="sm"
                        color="secondary"
                        iconLeading={copied ? Check : Copy01}
                        onClick={() => copy("untitledui.com/project/marketing-site")}
                        className="w-max"
                    >
                        {copied ? "Copied" : "Copy link"}
                    </Button>
                </section>
                <Form className="flex flex-col gap-4">
                    <Input size="md" isRequired label="Name of project" defaultValue="Marketing site redesign" />
                    <section className="flex h-36 flex-col gap-1.5">
                        <Label className="flex gap-0.5" tooltip="This will be public">
                            Description
                        </Label>
                        <TextAreaBase className="h-full" defaultValue="A little about the company and the team that you'll be working with." />
                    </section>
                    <Select
                        size="md"
                        label="Project status"
                        defaultValue="item-progress"
                        icon={<Dot className="size-2.5 text-fg-success-secondary" />}
                    >
                        <Select.Item id="item-draft" icon={<Dot className="size-2.5 text-fg-warning-secondary" />}>
                            Draft
                        </Select.Item>
                        <Select.Item id="item-progress" icon={<Dot className="size-2.5 text-fg-success-secondary" />}>
                            In progress
                        </Select.Item>
                        <Select.Item id="item-completed" icon={<Dot className="size-2.5 text-fg-brand-secondary" />}>
                            Completed
                        </Select.Item>
                        <Select.Item id="item-cancelled" icon={<Dot className="size-2.5 text-fg-error-secondary" />}>
                            Cancelled
                        </Select.Item>
                    </Select>
                </Form>
                <div className="flex flex-col gap-4">
                    <span className="flex flex-col gap-1">
                        <p className="text-sm font-semibold text-primary">Team members</p>
                        <p className="text-sm text-tertiary">The following are working on this project.</p>
                    </span>
                    <section className="flex flex-col gap-3">
                        <span id="divider" className="w-full border-t border-secondary" />
                        <span className="flex items-center justify-between">
                            <AvatarLabelGroup
                                size="md"
                                src="https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80"
                                title="Candice Wu"
                                subtitle="candice@untitledui.com"
                            />
                            <Button size="sm" color="link-destructive">
                                Remove
                            </Button>
                        </span>
                        <span id="divider" className="w-full border-t border-secondary" />
                        <span className="flex items-center justify-between">
                            <AvatarLabelGroup size="md" initials="DW" title="Demi Wilkinson" subtitle="demi@untitledui.com" />
                            <Button size="sm" color="link-destructive">
                                Remove
                            </Button>
                        </span>
                        <span id="divider" className="w-full border-t border-secondary" />
                        <span className="flex items-center justify-between">
                            <AvatarLabelGroup
                                size="md"
                                src="https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80"
                                title="Drew Cano"
                                subtitle="drew@untitledui.com"
                            />
                            <Button size="sm" color="link-destructive">
                                Remove
                            </Button>
                        </span>
                        <span id="divider" className="w-full border-t border-secondary" />
                    </section>
                    <Button size="md" color="link-color" iconLeading={Plus} className="w-max">
                        Add team member
                    </Button>
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
