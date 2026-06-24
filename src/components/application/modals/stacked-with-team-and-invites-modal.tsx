"use client";

import { useEffect, useState } from "react";
import { Heading as AriaHeading } from "react-aria-components";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";

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

export const StackedWithTeamAndInvitesModal = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                        <div className="flex flex-row items-end justify-center -space-x-2 px-4 pt-5 sm:px-6 sm:pt-6">
                            <Avatar size="md" src="https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80" alt="Phoenix Baker" />
                            <div className="relative z-10 inline-flex rounded-full ring-[1.5px] ring-bg-primary">
                                <Avatar size="lg" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" alt="Olivia Rhye" />
                            </div>
                            <Avatar size="md" src="https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80" alt="Lana Steiner" />
                        </div>
                        <div className="z-10 flex flex-col items-center justify-center gap-0.5 px-4 pt-4 sm:px-6">
                            <AriaHeading slot="title" className="text-center text-md font-semibold text-primary">
                                Add your team members
                            </AriaHeading>
                            <p className="text-center text-sm text-tertiary">You've created a new project! Invite colleagues to collaborate on this project.</p>
                        </div>
                        <div className="h-5 w-full" />
                        <div className="flex flex-col gap-3 px-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-row items-center justify-center gap-3">
                                    <Checkbox defaultSelected />
                                    <AvatarLabelGroup
                                        size="md"
                                        src="https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80"
                                        title="Candice Wu"
                                        subtitle="@candice"
                                    />
                                </div>
                                <p className="text-xs font-medium text-tertiary">Admin</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-row items-center justify-center gap-3">
                                    <Checkbox defaultSelected />
                                    <AvatarLabelGroup
                                        size="md"
                                        src="https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80"
                                        title="Demi Wilkinson"
                                        subtitle="@demi"
                                    />
                                </div>
                                <p className="text-xs font-medium text-tertiary">Admin</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-row items-center justify-center gap-3">
                                    <Checkbox defaultSelected />
                                    <AvatarLabelGroup
                                        size="md"
                                        src="https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80"
                                        title="Drew Cano"
                                        subtitle="@drew"
                                    />
                                </div>
                                <p className="text-xs font-medium text-tertiary">Editor</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-row items-center justify-center gap-3">
                                    <Checkbox defaultSelected />
                                    <AvatarLabelGroup
                                        size="md"
                                        src="https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80"
                                        title="Natali Crag"
                                        subtitle="@natali"
                                    />
                                </div>
                                <p className="text-xs font-medium text-tertiary">Editor</p>
                            </div>
                        </div>
                        <div className="pt-6 sm:pt-8">
                            <div className="z-10 flex flex-1 flex-col-reverse gap-3 border-t border-secondary p-4 *:grow sm:grid sm:grid-cols-2 sm:p-6">
                                <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                                <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                    Add to project
                                </Button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
