"use client";

import { useEffect, useState } from "react";
import { Check, Copy01 } from "@untitledui/icons";
import { Heading as AriaHeading } from "react-aria-components";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
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

export const StackedWithTeamAndLinkModal = () => {
    const [isOpen, setIsOpen] = useModalState();
    const [value, setValue] = useState("join.untitledui.com/project");
    const { copy, copied } = useClipboard();

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                        <div className="flex flex-row items-end justify-center -space-x-2 px-4 pt-5 sm:px-6 sm:pt-6">
                            <Avatar size="md" src="https://www.untitledui.com/images/avatars/transparent/caitlyn-king?bg=%23E0E0E0" alt="Caitlyn King" />
                            <div className="relative z-10 inline-flex rounded-full ring-[1.5px] ring-bg-primary">
                                <Avatar size="lg" src="https://www.untitledui.com/images/avatars/transparent/sienna-hewitt?bg=%23E0E0E0" alt="Sienna Hewitt" />
                            </div>
                            <Avatar size="md" src="https://www.untitledui.com/images/avatars/transparent/olly-schroeder?bg=%23E0E0E0" alt="Olly Schroeder" />
                        </div>
                        <div className="z-10 flex flex-col items-center justify-center gap-0.5 px-4 pt-4 sm:px-6">
                            <AriaHeading slot="title" className="text-center text-md font-semibold text-primary">
                                Invite your team
                            </AriaHeading>
                            <p className="text-center text-sm text-tertiary">You've created a new project! Invite colleagues to collaborate on this project.</p>
                        </div>
                        <div className="h-5 w-full" />
                        <div className="flex flex-row items-end justify-end gap-1 px-4 sm:px-6">
                            <Input isReadOnly label="Share link" value={value} onChange={setValue} inputClassName="py-2.5!" />
                            <Button size="md" color="tertiary" onClick={() => copy(value)} iconLeading={copied ? Check : Copy01} />
                        </div>
                        <div className="pt-6 sm:pt-8">
                            <div className="z-10 flex flex-1 flex-col-reverse gap-3 border-t border-secondary p-4 *:grow sm:grid sm:grid-cols-2 sm:p-6">
                                <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                                <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                    Continue
                                </Button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
