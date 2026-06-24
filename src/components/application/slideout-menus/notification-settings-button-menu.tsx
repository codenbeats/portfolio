"use client";

import { useEffect, useState } from "react";
import { Plus } from "@untitledui/icons";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
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

export const NotificationSettingsButtonMenu = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <SlideoutMenu isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <SlideoutMenu.Header onClose={() => setIsOpen(false)} className="relative flex w-full flex-col gap-0.5 px-4 pt-6 md:px-6">
                <h1 className="text-md font-semibold text-primary md:text-lg">Notifications</h1>
                <p className="text-sm text-tertiary">Manage when you'll receive notifications.</p>
            </SlideoutMenu.Header>
            <SlideoutMenu.Content>
                <section className="flex flex-col gap-4">
                    <span className="flex flex-col gap-1">
                        <p className="text-sm font-semibold text-primary">Message mentions</p>
                        <p className="text-sm text-tertiary">I'm mentioned in a message or comment.</p>
                    </span>
                    <ButtonGroup aria-label="Message mentions" size="sm" defaultSelectedKeys={["email"]} selectionMode="single">
                        <ButtonGroupItem id="none">None</ButtonGroupItem>
                        <ButtonGroupItem id="in-app">In-app</ButtonGroupItem>
                        <ButtonGroupItem id="email">Email</ButtonGroupItem>
                    </ButtonGroup>
                </section>
                <section className="flex flex-col gap-4">
                    <span className="flex flex-col gap-1">
                        <p className="text-sm font-semibold text-primary">Message replies</p>
                        <p className="text-sm text-tertiary">Someone replies to any message or comment.</p>
                    </span>
                    <ButtonGroup aria-label="Message replies" size="sm" defaultSelectedKeys={["email"]} selectionMode="single">
                        <ButtonGroupItem id="none">None</ButtonGroupItem>
                        <ButtonGroupItem id="in-app">In-app</ButtonGroupItem>
                        <ButtonGroupItem id="email">Email</ButtonGroupItem>
                    </ButtonGroup>
                </section>
                <section className="flex flex-col gap-4">
                    <span className="flex flex-col gap-1">
                        <p className="text-sm font-semibold text-primary">New projects</p>
                        <p className="text-sm text-tertiary">New projects are created on my team.</p>
                    </span>
                    <ButtonGroup aria-label="New projects" size="sm" defaultSelectedKeys={["in-app"]} selectionMode="single">
                        <ButtonGroupItem id="none">None</ButtonGroupItem>
                        <ButtonGroupItem id="in-app">In-app</ButtonGroupItem>
                        <ButtonGroupItem id="email">Email</ButtonGroupItem>
                    </ButtonGroup>
                </section>
                <section className="flex flex-col gap-4">
                    <span className="flex flex-col gap-1">
                        <p className="text-sm font-semibold text-primary">Outstanding tasks</p>
                        <p className="text-sm text-tertiary">I've had outstanding tasks for more than.</p>
                    </span>
                    <span className="flex justify-start gap-3">
                        <Input aria-label="Custom notification interval amount" size="md" defaultValue="24" className="w-13" />

                        <Select aria-label="Custom notification interval unit" size="md" className="w-26" defaultValue="hours">
                            <Select.Item id="hours">Hours</Select.Item>
                            <Select.Item id="days">Days</Select.Item>
                            <Select.Item id="weeks">Weeks</Select.Item>
                            <Select.Item id="months">Months</Select.Item>
                            <Select.Item id="years">Years</Select.Item>
                        </Select>
                    </span>
                    <ButtonGroup aria-label="Outstanding tasks" size="sm" defaultSelectedKeys={["in-app"]} selectionMode="single">
                        <ButtonGroupItem id="none">None</ButtonGroupItem>
                        <ButtonGroupItem id="in-app">In-app</ButtonGroupItem>
                        <ButtonGroupItem id="email">Email</ButtonGroupItem>
                    </ButtonGroup>
                </section>
                <section className="flex flex-col gap-4">
                    <span className="flex flex-col gap-1">
                        <p className="text-sm font-semibold text-primary">New team members</p>
                        <p className="text-sm text-tertiary">New users have been added to my team.</p>
                    </span>
                    <ButtonGroup aria-label="New team members" size="sm" defaultSelectedKeys={["in-app"]} selectionMode="single">
                        <ButtonGroupItem id="none">None</ButtonGroupItem>
                        <ButtonGroupItem id="in-app">In-app</ButtonGroupItem>
                        <ButtonGroupItem id="email">Email</ButtonGroupItem>
                    </ButtonGroup>
                </section>
                <Button size="md" color="link-color" iconLeading={Plus} className="w-max">
                    Add custom notification
                </Button>
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
