"use client";

import { useEffect, useState } from "react";
import { Tag01, XClose } from "@untitledui/icons";
import { Heading as AriaHeading } from "react-aria-components";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { BadgeWithButton } from "@/components/base/badges/badges";
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

const labels = [
    {
        id: "in-progress",
        label: "In progress",
        value: "in-progress",
        color: "sky",
    },
    {
        id: "design",
        label: "Design",
        value: "design",
        color: "indigo",
    },
    {
        id: "web",
        label: "Web",
        value: "web",
        color: "pink",
    },
];

export const LabelsModal = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                        <CloseButton onClick={() => setIsOpen(false)} theme="light" size="sm" className="absolute top-3 right-3 sm:top-4 sm:right-4" />
                        <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                            <div className="relative w-max">
                                <FeaturedIcon color="gray" size="md" theme="modern" icon={Tag01} />
                            </div>
                            <div className="z-10 flex flex-col gap-0.5">
                                <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                    Add labels to project
                                </AriaHeading>
                                <p className="text-sm text-tertiary">Labels help organize projects.</p>
                            </div>
                        </div>
                        <div className="h-5 w-full" />
                        <div className="relative z-20 flex flex-col gap-3 px-4 sm:px-6">
                            <Select.ComboBox aria-label="Labels" placeholder="Search for label" size="md" items={labels}>
                                {(item) => (
                                    <Select.Item key={item.id} id={item.id}>
                                        {item.label}
                                    </Select.Item>
                                )}
                            </Select.ComboBox>
                            <div className="flex flex-row gap-2">
                                <BadgeWithButton size="md" color="sky" type="pill-color" icon={XClose} buttonLabel="Remove" onButtonClick={() => {}}>
                                    In progress
                                </BadgeWithButton>
                                <BadgeWithButton size="md" color="indigo" type="pill-color" icon={XClose} buttonLabel="Remove" onButtonClick={() => {}}>
                                    Design
                                </BadgeWithButton>
                                <BadgeWithButton size="md" color="pink" type="pill-color" icon={XClose} buttonLabel="Remove" onButtonClick={() => {}}>
                                    Web
                                </BadgeWithButton>
                            </div>
                        </div>
                        <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                            <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                Add labels
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
