"use client";

import { useEffect, useState } from "react";
import { FeedItem, type FeedItemType } from "@/components/application/activity-feed/activity-feed";
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

const tabs = [
    {
        id: "recent",
        value: "recent",
        label: "Recent",
    },
    {
        id: "groups",
        value: "groups",
        label: "Groups",
    },
    {
        id: "archive",
        value: "archive",
        label: "Archive",
    },
];

const messages: FeedItemType[] = [
    {
        id: "message-001",
        unseen: true,
        date: "Just now",
        message: "Looks good!",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
            name: "Phoenix Baker",
            href: "#",
            status: "online",
            username: "@phoenix",
        },
    },
    {
        id: "message-002",
        unseen: true,
        date: "2 mins ago",
        message: "Thanks so much, happy with that.",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
            name: "Lana Steiner",
            href: "#",
            status: "offline",
            username: "@lana",
        },
    },
    {
        id: "message-003",
        unseen: true,
        date: "2 mins ago",
        message: "Got you a coffee",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80",
            name: "Demi Wilkinson",
            href: "#",
            status: "online",
            username: "@demi",
        },
    },
    {
        id: "message-004",
        date: "3 hours ago",
        message: "Great to see you again!",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
            name: "Candice Wu",
            href: "#",
            status: "offline",
            username: "@candice",
        },
    },
    {
        id: "message-005",
        date: "6 hours ago",
        message: "We should ask Oli about this...",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
            name: "Natali Craig",
            href: "#",
            status: "online",
            username: "@natali",
        },
    },
    {
        id: "message-006",
        date: "12 hours ago",
        message: "Okay, see you then.",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80",
            name: "Drew Cano",
            href: "#",
            status: "online",
            username: "@drew",
        },
    },
    {
        id: "message-007",
        date: "3:42pm 20 Jan 2027",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/orlando-diggs?fm=webp&q=80",
            name: "Orlando Diggs",
            href: "#",
            status: "online",
            username: "@orlando",
        },
        attachment: {
            type: "pdf",
            name: "Datasheet_draft_02.pdf",
            size: "720 KB",
        },
    },
    {
        id: "message-008",
        date: "3:42pm 20 Jan 2027",
        message: "We should ask Oli about this...",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/andi-lane?fm=webp&q=80",
            name: "Andi Lane",
            href: "#",
            status: "online",
            username: "@andi",
        },
    },
    {
        id: "message-009",
        date: "2:12pm 20 Jan 2027",
        message: "That sounds like a good plan!",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/kate-morrison?fm=webp&q=80",
            name: "Kate Morrison",
            href: "#",
            status: "online",
            username: "@kate",
        },
    },
    {
        id: "message-010",
        date: "12:10pm 20 Jan 2027",
        message: "Yep! That checks out.",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/koray-okumus?fm=webp&q=80",
            name: "Koray Okumus",
            href: "#",
            status: "online",
            username: "@koray",
        },
    },
    {
        id: "message-011",
        date: "11:38am 20 Jan 2027",
        message: "We should ask Oli about this today.",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/ava-wright?fm=webp&q=80",
            name: "Ava Wright",
            href: "#",
            status: "online",
            username: "@ava",
        },
    },
    {
        id: "message-012",
        date: "11:30am 20 Jan 2027",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/eve-leroy?fm=webp&q=80",
            name: "Eve Leroy",
            href: "#",
            status: "online",
            username: "@eve",
        },
        attachment: {
            type: "jpg",
            name: "Design screenshot.jpg",
            size: "720 KB",
        },
    },
    {
        id: "message-013",
        date: "10:02am 20 Jan 2027",
        message: "Thanks for helping out with that!",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/zahir-mays?fm=webp&q=80",
            name: "Zahir Mays",
            href: "#",
            status: "online",
            username: "@zahir",
        },
    },
    {
        id: "message-014",
        date: "9:40am 20 Jan 2027",
        message: "Hey I've sent everything off now. All done.",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/joshua-wilson?fm=webp&q=80",
            name: "Joshua Wilson",
            href: "#",
            status: "online",
            username: "@joshua",
        },
    },
    {
        id: "message-015",
        date: "9:24am 20 Jan 2027",
        message: "Hey @olivia—just wanted to say thanks for your help on this. Really buried under!",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/rene-wells?fm=webp&q=80",
            name: "Rene Wells",
            href: "#",
            status: "online",
            username: "@rene",
        },
    },
];

export const MessagesMenu = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <SlideoutMenu isOpen={isOpen} onOpenChange={setIsOpen} isDismissable dialogClassName="gap-0">
            <SlideoutMenu.Header
                onClose={() => setIsOpen(false)}
                className="relative flex w-full flex-col gap-5 p-4 pt-6 shadow-[0px_1px_0px_0px] shadow-border-secondary_alt md:pr-3 md:pl-6"
            >
                <section className="flex flex-col gap-0.5">
                    <h1 className="text-md font-semibold text-primary md:text-lg">Messages</h1>
                    <p className="text-sm text-tertiary">Lorem ipsum dolor sit amet.</p>
                </section>

                <Tabs>
                    <TabList items={tabs} size="sm" fullWidth type="button-minimal" />
                </Tabs>
            </SlideoutMenu.Header>
            <SlideoutMenu.Content>
                <ol aria-label="Messages" className="flex flex-col gap-4 divide-y divide-border-secondary py-6">
                    {messages.map((item) => (
                        <li key={item.id} className="pb-4 last-of-type:pb-0">
                            <FeedItem {...item} connector={false} />
                        </li>
                    ))}
                </ol>
            </SlideoutMenu.Content>
        </SlideoutMenu>
    );
};
