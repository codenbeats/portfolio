"use client";

import { useEffect, useState } from "react";
import { FeedItem, type FeedItemType } from "@/components/application/activity-feed/activity-feed";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";

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

const feed: FeedItemType[] = [
    {
        id: "user-1",
        unseen: true,
        date: "Just now",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
            name: "Phoenix Baker",
            href: "#",
            status: "online",
        },
        attachment: {
            type: "pdf",
            name: "Tech requirements.pdf",
            size: "720 KB",
        },
        action: {
            content: "Added a file to",
            target: "Marketing site redesign",
            href: "#",
        },
    },
    {
        id: "user-2",
        unseen: true,
        date: "2 mins ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
            name: "Lana Steiner",
            href: "#",
            status: "offline",
        },
        action: {
            content: "Was invited to the team by",
            target: "Alina Hester",
            href: "#",
        },
    },
    {
        id: "user-3",
        unseen: true,
        date: "2 mins ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80",
            name: "Demi Wilkinson",
            href: "#",
            status: "online",
        },
        action: {
            content: "Was invited to the team by",
            target: "Alina Hester",
            href: "#",
        },
    },
    {
        id: "user-4",
        unseen: true,
        date: "3 hours ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
            name: "Candice Wu",
            href: "#",
            status: "offline",
        },
        action: {
            content: "Commented in",
            target: "Marketing site redesign",
            href: "#",
        },
    },
    {
        id: "user-41",
        date: "3 hours ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
            name: "Candice Wu",
            href: "#",
            status: "offline",
        },
        action: {
            content: "Was added to",
            target: "Marketing site redesign",
            href: "#",
        },
    },
    {
        id: "user-5",
        date: "6 hours ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
            name: "Natali Craig",
            href: "#",
            status: "online",
        },
        action: {
            content: "Added 3 labels to the project",
            target: "Marketing site redesign",
            href: "#",
        },
    },
    {
        id: "user-511",
        date: "6 hours ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
            name: "Natali Craig",
            href: "#",
            status: "online",
        },
        action: {
            content: "Invited to the team",
            target: "Lana Steiner",
            href: "#",
        },
    },
    {
        id: "user-512",
        date: "11 hours ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/orlando-diggs?fm=webp&q=80",
            name: "Orlando Diggs",
            href: "#",
            status: "online",
        },
        action: {
            content: "Created 7 tasks in",
            target: "Marketing site redesign",
            href: "#",
        },
    },
    {
        id: "user-7",
        date: "12 hours ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80",
            name: "Drew Cano",
            href: "#",
            status: "online",
        },
        attachment: {
            type: "txt",
            name: "Design brief and ideas.txt",
            size: "2.2 MB",
        },
        action: {
            content: "Added a file to",
            target: "Marketing site redesign",
            href: "#",
        },
    },
    {
        id: "user-70",
        date: "12 hours ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80",
            name: "Drew Cano",
            href: "#",
            status: "online",
        },
        action: {
            content: "Created the project",
            target: "Marketing site redesign",
            href: "#",
        },
    },
    {
        id: "user-6",
        date: "5:20pm 20 Jan 2027",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/kate-morrison?fm=webp&q=80",
            name: "Kate Morrison",
            href: "#",
            status: "online",
        },
        action: {
            content: "Sent you a message",
        },
        message: '"We should ask Oli about this today."',
    },
    {
        id: "user-78",
        date: "4:16pm 20 Jan 2027",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/koray-okumus?fm=webp&q=80",
            name: "Koray Okumus",
            href: "#",
            status: "online",
        },
        attachment: {
            type: "mp4",
            name: "Prototype draft 03.mp4",
            size: "6.6 MB",
        },
        action: {
            content: "Sent you a file",
        },
    },
    {
        id: "user-71",
        date: "4:16pm 20 Jan 2027",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/koray-okumus?fm=webp&q=80",
            name: "Koray Okumus",
            href: "#",
            status: "online",
        },
        action: {
            content: "Sent you a message",
        },
        message: "@olivia This is starting to look really good! I'll polish it up a bit and send it.",
    },
    {
        id: "user-72",
        date: "2 mins ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/ava-wright?fm=webp&q=80",
            name: "Ava Wright",
            href: "#",
            status: "online",
        },
        action: {
            content: "Invited to the team",
            target: "Alisa Hester",
            href: "#",
        },
    },
    {
        id: "user-73",
        unseen: true,
        date: "2 mins ago",
        user: {
            avatarUrl: "https://www.untitledui.com/images/avatars/eve-leroy?fm=webp&q=80",
            name: "Eve Leroy",
            href: "#",
            status: "online",
        },
        action: {
            content: "Invited to the team",
            target: "Ava Wright",
            href: "#",
        },
    },
];

export const NotificationsMenu = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <SlideoutMenu isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <SlideoutMenu.Header onClose={() => setIsOpen(false)} className="relative flex w-full gap-0.5 px-4 pt-6 md:px-6">
                <h1 className="text-md font-semibold text-primary md:text-lg">Notifications</h1>
            </SlideoutMenu.Header>
            <SlideoutMenu.Content className="pb-6">
                <ul>
                    {feed.map((item, index) => (
                        <li key={item.id}>
                            <FeedItem {...item} connector={index !== feed.length - 1} />
                        </li>
                    ))}
                </ul>
            </SlideoutMenu.Content>
        </SlideoutMenu>
    );
};
