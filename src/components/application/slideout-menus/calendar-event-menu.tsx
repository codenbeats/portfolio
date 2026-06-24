"use client";

import { useEffect, useState } from "react";
import { BellRinging01, Calendar, Clock, Copy01, Edit01, Trash01 } from "@untitledui/icons";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { AvatarAddButton } from "@/components/base/avatar/base-components";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { ButtonUtility } from "@/components/base/buttons/button-utility";

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

export const CalendarEventMenu = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <SlideoutMenu isOpen={isOpen} onOpenChange={setIsOpen} dialogClassName="gap-0" isDismissable>
            <SlideoutMenu.Header onClose={() => setIsOpen(false)} className="relative flex w-full flex-col items-start gap-3 px-4 pt-5 md:px-6">
                <div className="flex h-max w-16 flex-col overflow-hidden rounded-lg border border-secondary">
                    <span className="z-0 bg-secondary px-[7px] pt-[3px] pb-0.5 text-center">
                        <p className="text-xs font-semibold text-quaternary">JAN</p>
                    </span>
                    <span className="px-[7px] pt-px pb-[2px] text-center">
                        <p className="text-lg font-bold! text-brand-secondary">10</p>
                    </span>
                </div>
                <h1 className="text-md font-semibold text-primary md:text-lg">Product demo</h1>
            </SlideoutMenu.Header>
            <SlideoutMenu.Content className="px-4 py-6 md:px-6">
                <div className="flex flex-col gap-4">
                    <section className="flex w-full justify-between">
                        <p className="text-sm font-semibold text-primary">Details</p>
                        <span className="-mt-2 -mb-1 flex gap-0.5">
                            <ButtonUtility size="xs" color="tertiary" tooltip="Copy link" icon={Copy01} />
                            <ButtonUtility size="xs" color="tertiary" tooltip="Delete" icon={Trash01} />
                            <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                        </span>
                    </section>
                    <section className="flex flex-col gap-2">
                        <span className="flex items-center gap-2">
                            <Calendar size={20} className="text-fg-quaternary" />
                            <p className="text-sm text-tertiary">Friday, Jan 10, 2027</p>
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock size={20} className="text-fg-quaternary" />
                            <p className="text-sm text-tertiary">1:30 PM - 3:30 PM</p>
                        </span>
                        <span className="flex items-center gap-2">
                            <BellRinging01 size={20} className="text-fg-quaternary" />
                            <p className="text-sm text-tertiary">10 min before</p>
                        </span>
                    </section>
                </div>
                <section className="flex flex-col gap-4">
                    <p className="text-sm font-semibold text-primary">Organizer</p>
                    <AvatarLabelGroup
                        size="md"
                        src="https://www.untitledui.com/images/avatars/sienna-hewitt?fm=webp&q=80"
                        title="Sienna Hewitt"
                        subtitle="sienna@untitledui.com"
                    />
                </section>
                <div className="flex flex-col gap-4">
                    <p className="text-sm font-semibold text-primary">Attendees</p>
                    <div className="flex flex-col gap-3">
                        <section className="flex gap-2">
                            <section className="flex flex-row -space-x-3">
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
                            </section>
                            <AvatarAddButton size="md" />
                        </section>

                        <section className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-primary">6 guests</p>
                            <span className="h-[13px] border-l border-primary" />
                            <p className="text-sm text-tertiary">5 yes</p>
                            <span className="h-[13px] border-l border-primary" />
                            <p className="text-sm text-tertiary">1 awaiting</p>
                        </section>
                    </div>
                </div>

                <section className="flex flex-col gap-3">
                    <p className="text-sm font-semibold text-primary">About this event</p>
                    <div className="text-sm text-tertiary">
                        <p>Sienna is inviting you to a scheduled Zoom meeting.</p>
                        <br />
                        <p>Topic: Product demo for the new dashboard and Q&A session.</p>
                        <br />
                        <p className="break-words whitespace-normal">
                            Join Zoom Meeting:&nbsp;
                            <span className="break-all underline">https://us02web.zoom.us/j/86341969512</span>&nbsp;
                        </p>
                        <br />
                        <p>Meeting ID: 863 4196 9512</p>
                    </div>
                </section>
            </SlideoutMenu.Content>
            <SlideoutMenu.Footer className="flex w-full items-center gap-4">
                <p className="w-full text-sm font-medium text-secondary">Going?</p>
                <ButtonGroup defaultSelectedKeys={["yes"]}>
                    <ButtonGroupItem id="yes">Yes</ButtonGroupItem>
                    <ButtonGroupItem id="no">No</ButtonGroupItem>
                    <ButtonGroupItem id="maybe">Maybe</ButtonGroupItem>
                </ButtonGroup>
            </SlideoutMenu.Footer>
        </SlideoutMenu>
    );
};
