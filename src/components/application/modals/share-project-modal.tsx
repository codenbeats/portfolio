"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown, Code02, Copy01, Link01, SearchLg, UsersPlus } from "@untitledui/icons";
import { Button as AriaButton, Heading as AriaHeading } from "react-aria-components";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
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

const teamMembers = [
    {
        name: "Sienna Hewitt",
        email: "sienna@untitledui.com",
        avatarUrl: "https://www.untitledui.com/images/avatars/sienna-hewitt?fm=webp&q=80",
        role: "Owner",
        isOnline: true,
    },
    {
        name: "Ammar Foley",
        email: "ammar@untitledui.com",
        avatarUrl: "https://www.untitledui.com/images/avatars/ammar-foley?fm=webp&q=80",
        role: "Can edit",
        isOnline: false,
    },
    {
        name: "Mathilde Lewis",
        email: "mathilde@untitledui.com",
        avatarUrl: "https://www.untitledui.com/images/avatars/mathilde-lewis?fm=webp&q=80",
        role: "Can edit",
        isOnline: false,
    },
];

export const ShareProjectModal = () => {
    const [isOpen, setIsOpen] = useModalState();
    const { copy, copied } = useClipboard();
    const shareUrl = "untitledui.com/project/untitled";

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-120">
                        <CloseButton onClick={() => setIsOpen(false)} theme="light" size="sm" className="absolute top-3 right-3 sm:top-4 sm:right-4" />

                        {/* Header */}
                        <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                            <FeaturedIcon color="gray" size="md" theme="modern" icon={UsersPlus} className="max-md:hidden" />
                            <div className="z-10 flex flex-col gap-0.5">
                                <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                    Share this project
                                </AriaHeading>
                                <p className="text-sm text-tertiary">Invite your team to review and collaborate.</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5 px-4 pt-5 pb-6 sm:px-6 sm:pb-8">
                            {/* Share link card */}
                            <div className="relative flex gap-2 rounded-lg bg-secondary p-3 ring-1 ring-secondary ring-inset">
                                <Link01 className="mt-0.5 size-4 shrink-0 text-fg-quaternary" />
                                <div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm font-semibold text-primary">Anyone with the link</span>

                                        <Dropdown.Root>
                                            <AriaButton className="flex cursor-pointer items-center gap-1 rounded-md text-sm font-semibold text-primary outline-offset-2 outline-focus-ring focus-visible:outline-2">
                                                can edit
                                                <ChevronDown className="size-3 shrink-0 stroke-3 text-fg-quaternary" />
                                            </AriaButton>

                                            <Dropdown.Popover className="w-24">
                                                <Dropdown.Menu>
                                                    <Dropdown.Item id="can-view">Can view</Dropdown.Item>
                                                    <Dropdown.Item id="can-edit">Can edit</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown.Popover>
                                        </Dropdown.Root>
                                    </div>
                                    <p className="text-sm text-tertiary">{shareUrl}</p>
                                </div>
                                <ButtonUtility
                                    size="xs"
                                    color="tertiary"
                                    tooltip="Copy"
                                    onClick={() => copy(shareUrl)}
                                    icon={copied ? Check : Copy01}
                                    className="absolute top-2 right-2"
                                />
                            </div>

                            {/* Dotted divider */}
                            <svg height="2" className="w-full">
                                <line
                                    x1="0"
                                    y1="1"
                                    x2="100%"
                                    y2="1"
                                    className="stroke-border-primary"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeDasharray="0,6"
                                />
                            </svg>

                            {/* Who has access */}
                            <div className="flex flex-col gap-4">
                                <div>
                                    <p className="text-sm font-semibold text-primary">Who has access</p>
                                    <p className="text-sm text-tertiary">Invite others to view and edit this project.</p>
                                </div>

                                <Input size="sm" placeholder="Search by name or email" icon={SearchLg} />

                                <ul className="flex flex-col gap-3">
                                    {teamMembers.map((member) => (
                                        <li key={member.email} className="flex items-start gap-3">
                                            <AvatarLabelGroup
                                                title={member.name}
                                                subtitle={member.email}
                                                size="md"
                                                src={member.avatarUrl}
                                                alt={member.name}
                                                status={member.isOnline ? "online" : undefined}
                                            />

                                            <Dropdown.Root>
                                                <AriaButton className="flex cursor-pointer items-center gap-1 rounded-md text-sm font-semibold text-tertiary outline-offset-2 outline-focus-ring focus-visible:outline-2">
                                                    {member.role}
                                                    <ChevronDown className="size-3 shrink-0 stroke-3 text-fg-quaternary" />
                                                </AriaButton>

                                                <Dropdown.Popover className="w-24">
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item id="owner">Owner</Dropdown.Item>
                                                        <Dropdown.Item id="can-view">Can view</Dropdown.Item>
                                                        <Dropdown.Item id="can-edit">Can edit</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown.Popover>
                                            </Dropdown.Root>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center gap-3 border-t border-secondary p-4 sm:flex-row sm:gap-3 sm:p-6">
                            <Button color="link-gray" size="md" iconLeading={Code02} className="mr-auto max-sm:hidden">
                                Get embed code
                            </Button>
                            <Button color="secondary" size="md" onClick={() => setIsOpen(false)} className="max-sm:flex-1">
                                Cancel
                            </Button>
                            <Button color="primary" size="md" onClick={() => setIsOpen(false)} className="max-sm:flex-1">
                                Done
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
