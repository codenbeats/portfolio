"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, UsersCheck } from "@untitledui/icons";
import { Heading as AriaHeading } from "react-aria-components";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
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

export const UserSelectionModal = () => {
    const [isOpen, setIsOpen] = useModalState();
    const [count, setCount] = useState(32);

    const handleIncrement = () => {
        setCount((prevCount) => Math.min(prevCount + 1, 100));
    };

    const handleDecrement = () => {
        setCount((prevCount) => Math.max(prevCount - 1, 1));
    };

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-120">
                        <CloseButton onClick={() => setIsOpen(false)} theme="light" size="sm" className="absolute top-3 right-3 z-10 sm:top-4 sm:right-4" />
                        <div className="flex gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                            <FeaturedIcon color="gray" size="md" theme="modern" icon={UsersCheck} className="max-sm:hidden" />

                            <div className="z-10 flex flex-col gap-0.5">
                                <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                    Purchase seats
                                </AriaHeading>
                                <p className="text-sm text-tertiary">Select how many seats you need.</p>
                            </div>
                        </div>
                        <div className="h-5 w-full" />
                        <div className="w-full border-t border-secondary" />
                        <div className="flex flex-col gap-3 px-4 pt-5 sm:px-6">
                            <div className="flex items-center justify-center gap-6">
                                <Button
                                    aria-label="Decrease"
                                    size="lg"
                                    color="secondary"
                                    iconLeading={Minus}
                                    className="max-sm:hidden"
                                    onClick={handleDecrement}
                                />
                                <Button aria-label="Decrease" size="sm" color="secondary" iconLeading={Minus} className="sm:hidden" onClick={handleDecrement} />

                                <h1 className="text-display-lg font-semibold text-primary tabular-nums sm:text-display-xl">{count}</h1>

                                <Button
                                    aria-label="Increase"
                                    size="lg"
                                    color="secondary"
                                    iconLeading={Plus}
                                    className="max-sm:hidden"
                                    onClick={handleIncrement}
                                />
                                <Button aria-label="Increase" size="sm" color="secondary" iconLeading={Plus} className="sm:hidden" onClick={handleIncrement} />
                            </div>
                            <div className="w-full border-t border-secondary" />
                            <div className="flex flex-col gap-3">
                                <span className="flex justify-between">
                                    <p className="text-md font-semibold text-primary">Price per seat</p>
                                    <p className="text-md text-tertiary">$10</p>
                                </span>
                                <span className="flex justify-between">
                                    <p className="text-md font-semibold text-primary">Total</p>
                                    <p className="text-md text-tertiary">${count * 10}</p>
                                </span>
                            </div>
                        </div>

                        <div className="z-10 flex flex-col pt-6 pb-4 sm:pt-8 sm:pb-6">
                            <div className="w-full border-t border-secondary" />

                            <div className="h-4 w-full sm:h-6" />
                            <div className="flex flex-1 flex-col-reverse gap-3 px-4 sm:grid sm:grid-cols-2 sm:px-6">
                                <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                                <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                    Purchase seats
                                </Button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
