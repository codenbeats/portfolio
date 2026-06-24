"use client";

import { useEffect, useState } from "react";
import { BookOpen01, Check, Copy01, Link01, SwitchHorizontal01 } from "@untitledui/icons";
import { Heading as AriaHeading } from "react-aria-components";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
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

const permissions = [
    { long: "Access basic company information and details", short: "Access basic company information" },
    { long: "Access and edit bug reports and create new issues", short: "Edit bug reports and create new issues" },
    { long: "Change issue status and assignee of issues", short: "Change issue status and assignee" },
    { long: "Open and resolve Intercom conversations", short: "Open and resolve Intercom conversations" },
    { long: "Add or remove users and change user roles", short: "Add or remove users and change roles" },
];

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

export const IntegrationModal = () => {
    const [isOpen, setIsOpen] = useModalState();
    const { copy, copied } = useClipboard();
    const linkUrl = "untitledui.com/integrations/linear";

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-110">
                        {/* Integration logos */}
                        <div className="flex items-center justify-center gap-3 px-4 pt-6 sm:pt-8">
                            <AppIcon src="https://www.untitledui.com/logos/images/Shutterframe.jpg" alt="Untitled" />
                            <SwitchHorizontal01 className="size-5 text-fg-quaternary" />
                            <AppIcon src="https://www.untitledui.com/logos/images/Linear.png" alt="Linear" />
                        </div>

                        {/* Header */}
                        <div className="flex flex-col items-center gap-0.5 px-4 pt-4 text-center sm:px-6">
                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                Connect Untitled to Linear
                            </AriaHeading>
                            <p className="text-sm text-tertiary">Prioritize work based on customer needs and build a tighter feedback loop with customers.</p>
                        </div>

                        <div className="h-5 w-full" />

                        {/* Permissions section */}
                        <div className="flex flex-col gap-4 px-4 sm:gap-5 sm:px-6 sm:pb-8">
                            <div className="flex flex-col gap-3">
                                <p className="text-sm font-semibold text-primary">Untitled would like to</p>
                                <div className="flex flex-col gap-2">
                                    {permissions.map((permission) => (
                                        <div key={permission.short} className="flex gap-2">
                                            <Check className="mt-0.5 size-4 text-fg-quaternary" />
                                            <p className="text-sm text-tertiary max-sm:hidden">{permission.long}</p>
                                            <p className="text-sm text-tertiary sm:hidden">{permission.short}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

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
                        </div>

                        {/* Footer */}
                        <div className="flex w-full flex-col-reverse gap-3 p-4 pt-6 *:max-sm:grow sm:flex-row sm:items-center sm:justify-between sm:border-t sm:border-secondary sm:p-6">
                            <Button color="secondary" size="md" iconLeading={BookOpen01} onClick={() => setIsOpen(false)}>
                                Documentation
                            </Button>
                            <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                Connect
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
