"use client";

import { useEffect, useRef, useState } from "react";
import { Brackets, ChevronDown, ChevronUp, ClockFastForward, Paperclip, Plus, Save01, Trash01 } from "@untitledui/icons";
import { Button as AriaButton, Heading as AriaHeading } from "react-aria-components";
import type { Selection } from "react-aria-components";
import { useListData } from "react-stately";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import type { SelectItemType } from "@/components/base/select/select";
import { TagSelect } from "@/components/base/select/tag-select";
import { TextEditor } from "@/components/base/text-editor/text-editor";
import { cx } from "@/utils/cx";

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

const contacts: SelectItemType[] = [
    { label: "Phoenix Baker", id: "@phoenix", supportingText: "@phoenix", avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80" },
    { label: "Olivia Rhye", id: "@olivia", supportingText: "@olivia", avatarUrl: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" },
    { label: "Lana Steiner", id: "@lana", supportingText: "@lana", avatarUrl: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80" },
    { label: "Demi Wilkinson", id: "@demi", supportingText: "@demi", avatarUrl: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80" },
    { label: "Candice Wu", id: "@candice", supportingText: "@candice", avatarUrl: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80" },
    { label: "Natali Craig", id: "@natali", supportingText: "@natali", avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80" },
];

export const NewMessageEmptyModal = () => {
    const [isOpen, setIsOpen] = useModalState();
    const toItems = useListData<SelectItemType>({ initialItems: [] });
    const ccItems = useListData<SelectItemType>({ initialItems: [] });
    const ccRef = useRef<HTMLDivElement>(null);
    const [ccPopoverOpen, setCcPopoverOpen] = useState(false);
    const ccWasOpenRef = useRef(false);
    const [selectedAccount, setSelectedAccount] = useState<Selection>(new Set(["olivia"]));

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-160">
                        {/* Header */}
                        <div className="flex flex-col px-4 pt-5 sm:px-6 sm:pt-6">
                            <CloseButton onClick={() => setIsOpen(false)} theme="light" size="sm" className="absolute top-3 right-3 sm:top-4 sm:right-4" />

                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                New message
                            </AriaHeading>
                        </div>

                        <div className="h-5 w-full" />

                        {/* Recipients and subject */}
                        <div className="flex flex-col gap-3 px-4 sm:px-6">
                            {/* TO field */}
                            <div className="flex items-center gap-1">
                                <span className="w-8 shrink-0 text-sm font-semibold text-secondary">TO</span>
                                <div className="flex-1">
                                    <TagSelect aria-label="TO" size="md" selectedItems={toItems} placeholder="" items={contacts} icon={null}>
                                        {(item) => (
                                            <TagSelect.Item id={item.id} supportingText={item.supportingText} avatarUrl={item.avatarUrl}>
                                                {item.label}
                                            </TagSelect.Item>
                                        )}
                                    </TagSelect>
                                </div>
                            </div>

                            {/* CC field */}
                            <div className="flex items-center gap-1">
                                <span className="w-8 shrink-0 text-sm font-semibold text-secondary">CC</span>
                                <div ref={ccRef} className="flex-1">
                                    <TagSelect
                                        aria-label="CC"
                                        size="md"
                                        selectedItems={ccItems}
                                        placeholder=""
                                        items={contacts}
                                        icon={null}
                                        onOpenChange={setCcPopoverOpen}
                                    >
                                        {(item) => (
                                            <TagSelect.Item id={item.id} supportingText={item.supportingText} avatarUrl={item.avatarUrl}>
                                                {item.label}
                                            </TagSelect.Item>
                                        )}
                                    </TagSelect>
                                </div>
                                <div
                                    onPointerDown={() => {
                                        ccWasOpenRef.current = ccPopoverOpen;
                                    }}
                                >
                                    <ButtonUtility
                                        size="xs"
                                        color="tertiary"
                                        icon={ccPopoverOpen ? ChevronUp : ChevronDown}
                                        onClick={() => {
                                            const input = ccRef.current?.querySelector("input");
                                            if (ccWasOpenRef.current) {
                                                input?.blur();
                                            } else {
                                                input?.focus();
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="flex flex-col gap-1.5">
                                <div className="border-t border-secondary" />
                                <input
                                    aria-label="Subject"
                                    type="text"
                                    placeholder="Subject"
                                    className="w-full bg-transparent py-2 text-md text-primary outline-hidden placeholder:text-placeholder"
                                />
                                <div className="border-t border-secondary" />
                            </div>
                        </div>

                        {/* Text editor area */}
                        <div className="flex flex-col px-4 py-5 sm:px-6">
                            <TextEditor.Root placeholder="Say hello" inputClassName="h-86  sm:h-77 resize-y rounded-none p-0 shadow-none ring-0 focus:ring-0">
                                <TextEditor.Tooltip />
                                <TextEditor.Content />
                            </TextEditor.Root>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center gap-2 border-t border-secondary p-4 sm:px-6 sm:py-5">
                            <Dropdown.Root>
                                <AriaButton
                                    className={({ isPressed, isFocused }) =>
                                        cx(
                                            "relative flex w-38 cursor-pointer items-center gap-1.5 rounded-lg bg-primary_alt p-2 text-left inset-ring-1 inset-ring-border-secondary outline-focus-ring max-sm:hidden",
                                            (isPressed || isFocused) && "outline-2 outline-offset-2",
                                        )
                                    }
                                >
                                    <Avatar size="xs" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" className="size-5" />

                                    <p className="text-sm font-semibold text-primary">Olivia Rhye</p>

                                    <div className="absolute top-1 right-1 flex size-7 items-center justify-center rounded-md">
                                        <ChevronDown className="size-4 shrink-0 stroke-[2.25px] text-fg-quaternary" />
                                    </div>
                                </AriaButton>

                                <Dropdown.Popover className="w-50">
                                    <Dropdown.Menu
                                        aria-label="Switch Account"
                                        selectionMode="single"
                                        selectedKeys={selectedAccount}
                                        onSelectionChange={setSelectedAccount}
                                    >
                                        <Dropdown.Item
                                            id="olivia"
                                            avatarUrl="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                                            selectionIndicator="radio"
                                        >
                                            Olivia Rhye
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            id="sienna"
                                            avatarUrl="https://www.untitledui.com/images/avatars/sienna-hewitt?fm=webp&q=80"
                                            selectionIndicator="radio"
                                        >
                                            Sienna Hewitt
                                        </Dropdown.Item>

                                        <Dropdown.Item icon={Plus}>Add account</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown.Root>

                            <div className="mr-auto flex items-center gap-0.5 sm:mr-0 sm:ml-auto">
                                <ButtonUtility tooltip="Discard" size="sm" color="tertiary" icon={Trash01} />
                                <ButtonUtility tooltip="Save" size="sm" color="tertiary" icon={Save01} />
                                <ButtonUtility tooltip="Use snippet" size="sm" color="tertiary" icon={Brackets} className="max-sm:hidden" />
                                <ButtonUtility tooltip="Attach" size="sm" color="tertiary" icon={Paperclip} />
                                <ButtonUtility tooltip="Schedule" size="sm" color="tertiary" icon={ClockFastForward} className="max-sm:hidden" />
                            </div>

                            <div className="flex items-center gap-3">
                                <Button color="secondary" size="sm" onClick={() => setIsOpen(false)}>
                                    Send later
                                </Button>
                                <Button color="primary" size="sm" onClick={() => setIsOpen(false)}>
                                    Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
