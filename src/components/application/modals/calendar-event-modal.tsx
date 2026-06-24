"use client";

import { useEffect, useState } from "react";
import { BellRinging01, Calendar, Clock } from "@untitledui/icons";
import { Heading as AriaHeading } from "react-aria-components";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { AvatarAddButton } from "@/components/base/avatar/base-components";
import { Button } from "@/components/base/buttons/button";

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

export const CalendarEventModal = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                        <div className="flex justify-center px-4 pt-5 sm:px-6 sm:pt-6">
                            <div className="flex h-max w-16 flex-col overflow-hidden rounded-lg border border-secondary">
                                <span className="z-0 bg-secondary px-[7px] pt-[3px] pb-0.5 text-center">
                                    <p className="text-xs font-semibold text-quaternary">JAN</p>
                                </span>
                                <span className="px-[7px] pt-px pb-[2px] text-center">
                                    <p className="text-lg font-bold! text-brand-secondary">10</p>
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col gap-0.5 px-4 sm:px-6">
                            <AriaHeading slot="title" className="text-center text-md font-semibold text-primary">
                                Invitation: Product demo
                            </AriaHeading>
                            <p className="text-center text-sm text-tertiary">Sienna Hewitt @ Friday, Jan 8, 2028</p>
                        </div>
                        <div className="h-5 w-full" />
                        <div className="flex flex-col items-start justify-start gap-4 px-4 sm:px-6 md:gap-5">
                            <div className="flex flex-col gap-3">
                                <p className="text-sm font-semibold text-primary">Details</p>
                                <section className="flex flex-col gap-2">
                                    <span className="flex gap-2">
                                        <Calendar size={20} className="text-fg-quaternary" />
                                        <p className="text-sm text-tertiary">Friday, Jan 10, 2027</p>
                                    </span>
                                    <span className="flex gap-2">
                                        <Clock size={20} className="text-fg-quaternary" />
                                        <p className="text-sm text-tertiary">1:30 PM - 3:30 PM</p>
                                    </span>
                                    <span className="flex gap-2">
                                        <BellRinging01 size={20} className="text-fg-quaternary" />
                                        <p className="text-sm text-tertiary">10 min before</p>
                                    </span>
                                </section>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p className="text-sm font-semibold text-primary">Organizer</p>
                                <AvatarLabelGroup
                                    size="md"
                                    src="https://www.untitledui.com/images/avatars/sienna-hewitt?fm=webp&q=80"
                                    title="Sienna Hewitt"
                                    subtitle="sienna@untitledui.com"
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <p className="text-sm font-semibold text-primary">Attendees</p>
                                <div className="flex gap-2">
                                    <div className="flex flex-row -space-x-3">
                                        <Avatar
                                            className="ring-[1.5px] ring-bg-primary"
                                            src="https://www.untitledui.com/images/avatars/sienna-hewitt?fm=webp&q=80"
                                            alt="Sienna Hewitt"
                                        />
                                        <Avatar
                                            className="ring-[1.5px] ring-bg-primary"
                                            src="https://www.untitledui.com/images/avatars/ammar-foley?fm=webp&q=80"
                                            alt="Ammar Foley"
                                        />
                                        <Avatar
                                            className="ring-[1.5px] ring-bg-primary"
                                            src="https://www.untitledui.com/images/avatars/pippa-wilkinson?fm=webp&q=80"
                                            alt="Pippa Wilkinson"
                                        />
                                        <Avatar
                                            className="ring-[1.5px] ring-bg-primary"
                                            src="https://www.untitledui.com/images/avatars/olly-schroeder?fm=webp&q=80"
                                            alt="Olly Schroeder"
                                        />
                                        <Avatar
                                            className="ring-[1.5px] ring-bg-primary"
                                            src="https://www.untitledui.com/images/avatars/mathilde-lewis?fm=webp&q=80"
                                            alt="Mathilde Lewis"
                                        />
                                        <Avatar className="ring-[1.5px] ring-bg-primary" initials="OR" />
                                    </div>
                                    <AvatarAddButton size="md" />
                                </div>

                                <section className="flex items-center gap-2">
                                    <p className="text-sm font-semibold text-primary">6 guests</p>
                                    <span className="h-[13px] border-l border-primary" />
                                    <p className="text-sm text-tertiary">5 yes</p>
                                    <span className="h-[13px] border-l border-primary" />
                                    <p className="text-sm text-tertiary">1 awaiting</p>
                                </section>
                            </div>
                        </div>
                        <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:flex-row sm:items-center sm:justify-end sm:px-6 sm:pt-8 sm:pb-6">
                            <Button color="link-gray" size="md" className="mr-auto max-sm:hidden">
                                Maybe
                            </Button>
                            <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                Decline
                            </Button>
                            <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                Accept
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
