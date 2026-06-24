"use client";

import { useEffect, useState } from "react";
import { Check, Copy01 } from "@untitledui/icons";
import { Heading as AriaHeading } from "react-aria-components";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
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

export const CenteredPhotoModal = () => {
    const [isOpen, setIsOpen] = useModalState();
    const { copy, copied } = useClipboard();

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                        <div className="px-4 pt-4 sm:px-6 sm:pt-6">
                            <img
                                className="aspect-4/3 w-full max-w-88 self-stretch rounded-lg object-cover object-center"
                                src="https://www.untitledui.com/application/plants.webp"
                                alt="Flowers for Modal"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                            <div className="z-10 flex flex-col items-center justify-center gap-0.5">
                                <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                    Blog post published
                                </AriaHeading>
                                <p className="text-center text-sm text-tertiary">
                                    This blog post has been published. Team members will be able to edit this post and republish changes.
                                </p>
                            </div>
                        </div>
                        <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                            <Button color="secondary" size="md" onClick={() => copy("https://www.untitledui.com/")} iconLeading={copied ? Check : Copy01}>
                                {copied ? "Copied" : "Copy link"}
                            </Button>
                            <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                Finish
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
