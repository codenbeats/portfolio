"use client";

import { useEffect, useState } from "react";
import { ContentDivider } from "@/components/application/content-divider/content-divider";
import { MessageActionMinimal } from "@/components/application/messaging/message-action.demo";
import type { Message } from "@/components/application/messaging/messaging";
import { MessageItem } from "@/components/application/messaging/messaging";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { TabList, Tabs } from "@/components/application/tabs/tabs";

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

const messages: Message[] = [
    {
        id: "message-001",
        user: {
            name: "Lana Steiner",
            avatarUrl: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
            status: "online",
        },
        text: "Hey team, I've finished with the requirements doc!",
        sentAt: "Thursday 11:40am",
    },
    {
        id: "message-002",
        user: {
            name: "Lana Steiner",
            avatarUrl: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
            status: "online",
        },
        attachment: {
            type: "pdf",
            name: "Tech requirements.pdf",
            size: "1.2 MB",
        },
        sentAt: "Thursday 11:40am",
    },
    {
        id: "message-003",
        user: {
            name: "You",
            me: true,
        },
        status: "read",
        text: "Awesome! Thanks.",
        sentAt: "Thursday 11:41am",
    },
    {
        id: "message-004",
        user: {
            name: "Demi Wilkinson",
            avatarUrl: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80",
            status: "online",
        },
        text: "Good timing—was just looking at this.",
        sentAt: "Thursday 11:44am",
    },
    {
        id: "message-005",
        user: {
            name: "Phoenix Baker",
            avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
            status: "online",
        },
        text: "Hey Olivia, can you please review the latest design when you can?",
        sentAt: "Friday 2:20pm",
    },
    {
        id: "message-006",
        user: {
            name: "You",
            me: true,
        },
        status: "read",
        text: "Sure thing, I'll have a look today.",
        sentAt: "Friday 2:20pm",
    },
];

const tabs = [
    { id: "recent", label: "Recent" },
    { id: "groups", label: "Groups" },
    { id: "archive", label: "Archive" },
];

export const MessageChatMenu = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <SlideoutMenu isOpen={isOpen} onOpenChange={setIsOpen} isDismissable dialogClassName="gap-0">
            <SlideoutMenu.Header
                onClose={() => setIsOpen(false)}
                className="relative flex w-full flex-col gap-5 p-4 pt-6 shadow-[0px_1px_0px_0px] shadow-border-secondary_alt md:pr-3 md:pl-6"
            >
                <section className="flex flex-col gap-0.5">
                    <h1 className="text-md font-semibold text-primary md:text-lg">Group chat</h1>
                </section>

                <Tabs>
                    <TabList items={tabs} size="sm" fullWidth type="button-minimal" />
                </Tabs>
            </SlideoutMenu.Header>
            <ol
                aria-label="Conversation"
                className="flex h-full flex-col gap-4 overflow-y-auto px-4 py-6 md:px-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-primary"
            >
                {messages.slice(0, 4).map((msg) => (
                    <MessageItem key={msg.id} msg={msg} />
                ))}

                <ContentDivider type="single-line" className="my-4">
                    <span className="text-sm font-medium text-tertiary">Today</span>
                </ContentDivider>

                {messages.slice(4, 6).map((msg) => (
                    <MessageItem key={msg.id} msg={msg} />
                ))}
            </ol>
            <SlideoutMenu.Footer>
                <MessageActionMinimal size="md" />
            </SlideoutMenu.Footer>
        </SlideoutMenu>
    );
};
