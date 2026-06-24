"use client";

import { useEffect, useState } from "react";
import { CheckCircle, User01 } from "@untitledui/icons";
import { Heading as AriaHeading } from "react-aria-components";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Select } from "@/components/base/select/select";
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

const people = [
    { label: "Phoenix Baker", id: "@phoenix", icon: User01 },
    { label: "Olivia Rhye", id: "@olivia", icon: User01 },
    { label: "Lana Steiner", id: "@lana", icon: User01 },
    { label: "Demi Wilkinson", id: "@demi", icon: User01 },
    { label: "Candice Wu", id: "@candice", icon: User01 },
    { label: "Natali Craig", id: "@natali", icon: User01 },
    { label: "Abraham Baker", id: "@abraham", icon: User01 },
    { label: "Adem Lane", id: "@adem", icon: User01 },
    { label: "Jackson Reed", id: "@jackson", icon: User01 },
    { label: "Jessie Meyton", id: "@jessie", icon: User01 },
];

export const DropdownModal = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                        <CloseButton onClick={() => setIsOpen(false)} theme="light" size="sm" className="absolute top-3 right-3 sm:top-4 sm:right-4" />
                        <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                            <div className="relative w-max">
                                <FeaturedIcon color="success" size="md" theme="modern" icon={CheckCircle} />
                            </div>
                            <div className="z-10 flex flex-col gap-0.5">
                                <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                    Blog post published
                                </AriaHeading>
                                <p className="hidden text-sm text-tertiary sm:flex">
                                    This blog post has been published. Team members will be able to edit this post and republish changes.
                                </p>
                                <p className="text-sm text-tertiary sm:hidden">
                                    This blog post has been published. Team members will be able to edit this post.
                                </p>
                            </div>
                        </div>
                        <div className="h-5 w-full" />
                        <div className="flex flex-col px-4 sm:px-6">
                            <Select
                                defaultValue={people[1].id}
                                label="Team member"
                                placeholder="Select team member"
                                icon={User01}
                                size="md"
                                items={people}
                            >
                                {(item) => (
                                    <Select.Item key={item.id} id={item.id} icon={item.icon}>
                                        {item.label}
                                    </Select.Item>
                                )}
                            </Select>
                        </div>
                        <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
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
