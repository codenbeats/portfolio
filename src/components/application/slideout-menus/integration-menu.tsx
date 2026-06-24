"use client";

import { useEffect, useState } from "react";
import { BookOpen01, Check, Copy01, Link01, SwitchHorizontal01 } from "@untitledui/icons";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { useClipboard } from "@/hooks/use-clipboard";
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

const AppIcon = ({ src, alt }: { src: string; alt: string }) => (
    <div className={cx("relative size-12 rounded-xl bg-primary_alt p-1 ring-1 ring-primary ring-inset sm:size-14 sm:rounded-[14px]", "")}>
        <img
            alt={alt}
            src={src}
            className={cx(
                "size-full rounded-lg object-cover sm:rounded-[10px]",
                "shadow-[0_-2px_2px_0_rgba(0,0,0,0.10)_inset,1px_8px_5px_0_rgba(0,0,0,0.05),0_3px_3px_0_rgba(0,0,0,0.10),0_1px_2px_0_rgba(0,0,0,0.10)]",
            )}
        />
    </div>
);

const permissions = [
    "Access basic information and details",
    "Access bug reports and create issues",
    "Change issue status and assignee of issues",
    "Open and resolve Intercom conversations",
    "Add or remove users and change user roles",
];

export const IntegrationMenu = () => {
    const [isOpen, setIsOpen] = useModalState();
    const { copy, copied } = useClipboard();
    const linkUrl = "untitledui.com/integrations/linear";

    return (
        <SlideoutMenu isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <SlideoutMenu.Header onClose={() => setIsOpen(false)} className="relative flex w-full flex-col items-center gap-4 px-4 pt-6 md:px-6 md:pt-8">
                <div className="flex items-center gap-3">
                    <AppIcon src="https://www.untitledui.com/logos/images/Shutterframe.jpg" alt="Untitled" />
                    <SwitchHorizontal01 className="size-5 text-fg-quaternary" />
                    <AppIcon src="https://www.untitledui.com/logos/images/Linear.png" alt="Linear" />
                </div>
                <div className="flex flex-col gap-0.5 text-center">
                    <h1 className="text-md font-semibold text-primary md:text-lg">Connect Untitled to Linear</h1>
                    <p className="text-sm text-tertiary">Prioritize work based on customer needs and build a tighter feedback loop with customers.</p>
                </div>
            </SlideoutMenu.Header>
            <SlideoutMenu.Content>
                {/* Dotted divider */}
                <svg height="2" className="w-full">
                    <line
                        x1="0"
                        y1="1"
                        x2="100%"
                        y2="1"
                        className="stroke-border-primary"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="0,6"
                    />
                </svg>

                {/* Permissions */}
                <div className="flex flex-col gap-3">
                    <p className="text-sm font-semibold text-primary">Untitled would like to</p>
                    <div className="flex flex-col gap-2">
                        {permissions.map((permission) => (
                            <div key={permission} className="flex gap-2">
                                <Check className="mt-0.5 size-4 shrink-0 text-fg-quaternary" />
                                <p className="text-sm text-tertiary">{permission}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dotted divider */}
                <svg height="2" className="w-full">
                    <line
                        x1="0"
                        y1="1"
                        x2="100%"
                        y2="1"
                        className="stroke-border-primary"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="0,6"
                    />
                </svg>

                {/* Link card */}
                <div className="relative flex items-start gap-2 rounded-lg bg-secondary p-3 ring-1 ring-secondary ring-inset">
                    <Link01 className="mt-0.5 size-4 shrink-0 text-fg-quaternary" />
                    <p className="flex-1 text-sm font-semibold text-primary">{linkUrl}</p>
                    <ButtonUtility
                        size="xs"
                        color="tertiary"
                        tooltip="Copy"
                        onClick={() => copy(linkUrl)}
                        icon={copied ? Check : Copy01}
                        className="absolute top-2 right-2"
                    />
                </div>
            </SlideoutMenu.Content>
            <SlideoutMenu.Footer className="flex w-full items-center justify-between gap-3">
                <Button size="sm" color="secondary" iconLeading={BookOpen01} onClick={() => setIsOpen(false)}>
                    Documentation
                </Button>
                <Button size="sm" onClick={() => setIsOpen(false)}>
                    Connect
                </Button>
            </SlideoutMenu.Footer>
        </SlideoutMenu>
    );
};
