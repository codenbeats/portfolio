"use client";

import { useEffect, useState } from "react";
import { UserPlus01 } from "@untitledui/icons";
import { Heading as AriaHeading } from "react-aria-components";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
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

export const AccessRequestModal = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                        <CloseButton onClick={() => setIsOpen(false)} theme="light" size="sm" className="absolute top-3 right-3 sm:top-4 sm:right-4" />
                        <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                            <div className="relative w-max">
                                <FeaturedIcon color="gray" size="md" theme="modern" icon={UserPlus01} />
                            </div>
                            <div className="z-10 flex flex-col gap-0.5">
                                <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                    Candice has requested edit access
                                </AriaHeading>
                                <p className="text-sm text-tertiary">
                                    One of your team has requested edit access to your project&nbsp;
                                    <span className="text-sm font-semibold text-brand-secondary">Marketing Website Design.</span>&nbsp;
                                </p>
                            </div>
                        </div>
                        <div className="h-5 w-full" />
                        <div className="px-4 sm:px-6">
                            <AvatarLabelGroup
                                size="md"
                                src="https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80"
                                title="Candice Wu"
                                subtitle="candice@untitledui.com"
                            />
                        </div>
                        <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:flex-row sm:justify-end sm:px-6 sm:pt-8 sm:pb-6">
                            <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                Confirm
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
