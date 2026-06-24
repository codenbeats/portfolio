"use client";

import { useEffect, useState } from "react";
import { Placeholder } from "@untitledui/icons";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Button } from "@/components/base/buttons/button";
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

export const PlaceholderMenu = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <SlideoutMenu isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <SlideoutMenu.Header onClose={() => setIsOpen(false)} className="relative flex w-full items-start gap-3 px-4 pt-6 md:px-6">
                <FeaturedIcon size="md" color="gray" theme="modern" icon={Placeholder} />
                <section className="flex flex-col gap-0.5">
                    <h1 className="text-md font-semibold text-primary md:text-lg">Project settings</h1>
                    <p className="text-sm text-tertiary">Configure your project preferences.</p>
                </section>
            </SlideoutMenu.Header>
            <SlideoutMenu.Content>
                <section className="flex flex-col gap-4">
                    <span className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-secondary">Project name</p>
                        <p className="text-sm text-tertiary max-md:hidden">
                            Update your project name and description. This will be visible to all team members and appears in your dashboard and shared links.
                            Changes will take effect immediately.
                        </p>
                        <p className="text-sm text-tertiary md:hidden">
                            Update your project name and description. This will be visible to all team members and appears in your dashboard.
                        </p>
                    </span>
                    <span className="h-20 w-full rounded-lg bg-secondary" />
                </section>

                <div id="divider" className="w-full border-t border-secondary" />

                <section className="flex flex-col gap-4">
                    <span className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-secondary">Team permissions</p>
                        <p className="text-sm text-tertiary max-md:hidden">
                            Manage who can view, edit, and share your project. You can invite new team members or update existing permissions for current
                            collaborators at any time.
                        </p>
                        <p className="text-sm text-tertiary md:hidden">
                            Manage who can view, edit, and share your project. You can invite new team members or update existing permissions.
                        </p>
                    </span>
                    <span className="h-20 w-full rounded-lg bg-secondary" />
                </section>
                <div id="divider" className="w-full border-t border-secondary" />
                <section className="flex flex-col gap-4">
                    <span className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-secondary">Integration settings</p>
                        <p className="text-sm text-tertiary max-md:hidden">
                            Connect your project with external services like Slack, GitHub, or Figma. Enable notifications and sync data automatically to keep
                            your team updated on changes.
                        </p>
                        <p className="text-sm text-tertiary md:hidden">
                            Connect your project with external services like Slack, GitHub, or Figma. Enable notifications and sync data automatically.
                        </p>
                    </span>
                    <span className="h-20 w-full rounded-lg bg-secondary" />
                </section>
            </SlideoutMenu.Content>
            <SlideoutMenu.Footer className="flex w-full justify-end gap-3">
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
