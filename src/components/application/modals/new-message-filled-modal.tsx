"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Attachment01, Brackets, ChevronDown, ChevronUp, ClockFastForward, Paperclip, Plus, Save01, Trash01 } from "@untitledui/icons";
import type { DropEvent } from "react-aria";
import { Button as AriaButton, DropZone as AriaDropZone, Heading as AriaHeading, isFileDropItem } from "react-aria-components";
import type { Selection } from "react-aria-components";
import { useListData } from "react-stately";
import { getReadableFileSize } from "@/components/application/file-upload/file-upload-base";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { FileTrigger } from "@/components/base/file-upload-trigger/file-upload-trigger";
import { InputBase } from "@/components/base/input/input";
import type { SelectItemType } from "@/components/base/select/select";
import { TagSelect } from "@/components/base/select/tag-select";
import { TagCloseX } from "@/components/base/tags/base-components/tag-close-x";
import { TextEditor } from "@/components/base/text-editor/text-editor";
import { useBreakpoint } from "@/hooks/use-breakpoint";
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

const contacts = [
    {
        label: "mathilde@untitledui.com",
        id: "mathilde",
        supportingText: "Mathilde",
        avatarUrl: "https://www.untitledui.com/images/avatars/mathilde-lewis?fm=webp&q=80",
    },
    {
        label: "caitlyn@untitledui.com",
        id: "caitlyn",
        supportingText: "Caitlyn",
        avatarUrl: "https://www.untitledui.com/images/avatars/caitlyn-king?fm=webp&q=80",
    },
    {
        label: "ammar@untitledui.com",
        id: "ammar",
        supportingText: "Ammar",
        avatarUrl: "https://www.untitledui.com/images/avatars/ammar-foley?fm=webp&q=80",
    },
    {
        label: "phoenix@untitledui.com",
        id: "phoenix",
        supportingText: "Phoenix",
        avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
    },
    {
        label: "olivia@untitledui.com",
        id: "olivia",
        supportingText: "Olivia",
        avatarUrl: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
    },
    {
        label: "lana@untitledui.com",
        id: "lana",
        supportingText: "Lana",
        avatarUrl: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
    },
    {
        label: "demi@untitledui.com",
        id: "demi",
        supportingText: "Demi",
        avatarUrl: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80",
    },
    {
        label: "candice@untitledui.com",
        id: "candice",
        supportingText: "Candice",
        avatarUrl: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
    },
    {
        label: "natali@untitledui.com",
        id: "natali",
        supportingText: "Natali",
        avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
    },
];

interface Attachment {
    id: string;
    name: string;
    size: number;
    progress: number;
}

const LineSpinner = () => (
    <svg className="size-4 shrink-0 animate-spin" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" className="text-utility-neutral-300" />
        <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-fg-brand-primary" />
    </svg>
);

const AttachmentChip = ({ attachment, onRemove }: { attachment: Attachment; onRemove: (id: string) => void }) => {
    const isUploading = attachment.progress < 100;
    const loaded = getReadableFileSize(Math.floor((attachment.size * attachment.progress) / 100));
    const total = getReadableFileSize(attachment.size);

    return (
        <span className="flex items-center gap-1 rounded-md bg-secondary px-1.5 py-1 ring-[0.5px] ring-secondary ring-inset">
            <span className="flex items-center gap-1.5">
                <Attachment01 className="size-4 shrink-0 text-fg-quaternary" />
                <span className="text-sm font-medium whitespace-nowrap text-primary">{attachment.name}</span>
                {isUploading && (
                    <span className="flex items-center gap-1">
                        <LineSpinner />
                        <span className="text-sm whitespace-nowrap text-quaternary">
                            {loaded} of {total}
                        </span>
                    </span>
                )}
            </span>
            <TagCloseX size="md" slot={null} onPress={() => onRemove(attachment.id)} />
        </span>
    );
};

export const NewMessageFilledModal = () => {
    const [isOpen, setIsOpen] = useModalState();
    const isDesktop = useBreakpoint("sm");
    const toItems = useListData<SelectItemType>({ initialItems: [contacts[0], contacts[1]] });
    const ccItems = useListData<SelectItemType>({ initialItems: [contacts[2]] });
    const ccRef = useRef<HTMLDivElement>(null);
    const ccWasOpenRef = useRef(false);
    const [ccPopoverOpen, setCcPopoverOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<Selection>(new Set(["olivia"]));
    const [attachments, setAttachments] = useState<Attachment[]>([
        { id: "1", name: "Q3_brief_final.pdf", size: 2_400_000, progress: 100 },
        { id: "2", name: "Q3_launch_assets.zip", size: 12_000_000, progress: 40 },
    ]);
    const [content, setContent] = useState<string>(
        "<p>Hi all,</p><p>I've just wrapped up the first round of copy edits for the launch landing page. Next step is to review the staging link and confirm the timings before we hand everything over to development.</p><p>If you spot anything that feels off or missing, just drop me a note!</p><p>Thanks,<br>Sienna</p>",
    );

    // Show email on desktop and name on mobile in TO and CC fields.
    const valueFormatter = useCallback((item: SelectItemType) => (isDesktop ? (item.label ?? "") : (item.supportingText ?? item.label ?? "")), [isDesktop]);

    // Placeholder upload function.
    const uploadFiles = useCallback((ids: string[]) => {
        const idSet = new Set(ids);
        const interval = setInterval(() => {
            setAttachments((prev) => {
                const updated = prev.map((a) =>
                    idSet.has(a.id) && a.progress < 100 ? { ...a, progress: Math.min(100, a.progress + Math.floor(Math.random() * 11) + 5) } : a,
                );
                if (updated.every((a) => !idSet.has(a.id) || a.progress >= 100)) {
                    clearInterval(interval);
                }
                return updated;
            });
        }, 300);
    }, []);

    const removeAttachment = useCallback((id: string) => {
        setAttachments((prev) => prev.filter((a) => a.id !== id));
    }, []);

    const addFiles = useCallback(
        (files: File[]) => {
            const newAttachments: Attachment[] = files.map((file) => ({
                id: `${Date.now()}-${file.name}`,
                name: file.name,
                size: file.size,
                progress: 0,
            }));
            setAttachments((prev) => [...prev, ...newAttachments]);
            uploadFiles(newAttachments.map((a) => a.id));
        },
        [uploadFiles],
    );

    const handleDrop = useCallback(
        async (e: DropEvent) => {
            const files = await Promise.all(e.items.filter(isFileDropItem).map((item) => item.getFile()));
            const validFiles = files.filter(Boolean) as File[];
            if (validFiles.length > 0) addFiles(validFiles);
        },
        [addFiles],
    );

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <AriaDropZone
                        aria-label="Drop files to attach"
                        getDropOperation={() => "copy"}
                        onDrop={handleDrop}
                        className={({ isDropTarget }) =>
                            cx(
                                "relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl outline-hidden sm:max-w-160",
                                isDropTarget && "ring-2 ring-brand",
                            )
                        }
                    >
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
                                    <TagSelect
                                        aria-label="TO"
                                        size="md"
                                        selectedItems={toItems}
                                        placeholder=""
                                        items={contacts}
                                        icon={null}
                                        valueFormatter={valueFormatter}
                                    >
                                        {(item) => (
                                            <TagSelect.Item id={item.id} avatarUrl={item.avatarUrl}>
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
                                        valueFormatter={valueFormatter}
                                    >
                                        {(item) => (
                                            <TagSelect.Item id={item.id} avatarUrl={item.avatarUrl}>
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
                            <div className="border-y border-secondary py-1.5">
                                <InputBase
                                    aria-label="Subject"
                                    placeholder="Subject"
                                    defaultValue="Q3 Product Launch Update"
                                    wrapperClassName="rounded-none shadow-none ring-0 outline-hidden"
                                    inputClassName="py-2 px-0"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 pt-5 pb-7">
                            {/* Text editor area */}
                            <div className="flex flex-col px-4 sm:px-6">
                                <TextEditor.Root
                                    content={content}
                                    onUpdate={({ editor }) => setContent(editor.getHTML())}
                                    placeholder="Say hello"
                                    inputClassName="h-86 space-y-4 sm:h-66 resize-y rounded-none p-0 shadow-none ring-0 focus:ring-0"
                                >
                                    <TextEditor.Tooltip />
                                    <TextEditor.Content />
                                </TextEditor.Root>
                            </div>

                            {/* Attachments */}
                            {attachments.length > 0 && (
                                <div className="flex items-center gap-2 overflow-x-auto px-4 sm:flex-wrap sm:px-6">
                                    {attachments.map((a) => (
                                        <AttachmentChip key={a.id} attachment={a} onRemove={removeAttachment} />
                                    ))}
                                </div>
                            )}
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
                                <FileTrigger
                                    allowsMultiple
                                    onSelect={(files) => {
                                        if (files) addFiles(Array.from(files));
                                    }}
                                >
                                    <ButtonUtility tooltip="Attach" size="sm" color="tertiary" icon={Paperclip} />
                                </FileTrigger>
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
                    </AriaDropZone>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
