"use client";

import { useEffect, useState } from "react";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { RadioButton, RadioGroup } from "@/components/base/radio-buttons/radio-buttons";

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

export const NotificationSettingsCheckboxMenu = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <SlideoutMenu isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <SlideoutMenu.Header onClose={() => setIsOpen(false)} className="relative flex w-full flex-col gap-0.5 px-4 pt-6 md:px-6">
                <h1 className="text-md font-semibold text-primary md:text-lg">Notifications</h1>
                <p className="text-sm text-tertiary">Manage when you'll receive notifications.</p>
            </SlideoutMenu.Header>
            <SlideoutMenu.Content>
                <Form className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <span className="flex flex-col gap-1">
                            <p className="text-sm font-semibold text-primary">In-app notifications</p>
                            <p className="text-sm text-tertiary">Select when you'll be notified in-app.</p>
                        </span>
                        <section className="flex flex-col gap-3 pl-2">
                            <Checkbox defaultSelected label="Message mentions" hint="I'm mentioned in a message or comment." />
                            <Checkbox defaultSelected label="Message replies" hint="Someone replies to any message or comment." />
                            <Checkbox defaultSelected label="New projects" hint="New projects are created on my team." />
                            <Checkbox defaultSelected label="Outstanding tasks" hint="I've had outstanding tasks for more than:" />
                            <RadioGroup aria-label="Outstanding tasks" defaultValue="1 hour" className="flex flex-col gap-3 pl-6">
                                <RadioButton value="1 hour" label="1 hour" />
                                <RadioButton value="24 hour" label="24 hours" />
                                <RadioButton value="1 week" label="1 week" />
                            </RadioGroup>
                            <Checkbox defaultSelected label="Outstanding tasks" hint="I've had outstanding tasks for more than:" />
                        </section>
                    </div>
                    <span id="divider" className="w-full border-t border-secondary" />
                    <div className="flex flex-col gap-4">
                        <span className="flex flex-col gap-1">
                            <p className="text-sm font-semibold text-primary">Email notifications </p>
                            <p className="text-sm text-tertiary">Select when you'll be notified in-app.</p>
                        </span>
                        <section className="flex flex-col gap-3 pl-2">
                            <Checkbox defaultSelected label="Message mentions" hint="I'm mentioned in a message or comment." />
                            <Checkbox defaultSelected label="Message replies" hint="Someone replies to any message or comment." />
                            <Checkbox defaultSelected label="Outstanding tasks" hint="I've had outstanding tasks for more than:" />
                        </section>
                    </div>
                </Form>
            </SlideoutMenu.Content>
            <SlideoutMenu.Footer className="flex w-full items-center justify-end gap-3">
                <Button size="sm" color="secondary" onClick={() => setIsOpen(false)}>
                    Cancel
                </Button>
                <Button size="sm" onClick={() => setIsOpen(false)}>
                    Save
                </Button>
            </SlideoutMenu.Footer>
        </SlideoutMenu>
    );
};
