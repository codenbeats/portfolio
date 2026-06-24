"use client";

import { type SVGProps, useEffect, useState } from "react";
import { MessageActionAdvanced } from "@/components/application/messaging/message-action.demo";
import type { Message } from "@/components/application/messaging/messaging";
import { MessageItem } from "@/components/application/messaging/messaging";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Button } from "@/components/base/buttons/button";
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

const Logo = () => {
    return (
        <svg viewBox="0 0 56 56" fill="none" className="size-14 rounded-full shadow-lg">
            <g clipPath="url(#clip0_9228_22962)">
                <path d="M0 28C0 12.536 12.536 0 28 0V0C43.464 0 56 12.536 56 28V28C56 43.464 43.464 56 28 56V56C12.536 56 0 43.464 0 28V28Z" fill="#0A0D12" />
                <rect width="56" height="56" fill="url(#paint0_radial_9228_22962)" fillOpacity="0.3" />
                <rect width="56" height="56" fill="url(#paint1_radial_9228_22962)" fillOpacity="0.05" />
                <rect width="56" height="56" fill="url(#paint2_radial_9228_22962)" fillOpacity="0.1" />
                <g filter="url(#filter0_d_9228_22962)">
                    <path
                        d="M12.9609 27.9997C12.9609 24.7542 13.9888 21.7489 15.7367 19.2913H23.2526V20.6997C20.8695 22.2535 19.2943 24.9426 19.2943 27.9997C19.2943 32.8092 23.1931 36.708 28.0026 36.708V43.0413C19.6953 43.0413 12.9609 36.307 12.9609 27.9997Z"
                        fill="url(#paint3_linear_9228_22962)"
                    />
                    <path
                        d="M40.2685 36.708C42.0164 34.2505 43.0443 31.2451 43.0443 27.9997C43.0443 19.6924 36.3099 12.958 28.0026 12.958V19.2913C32.8121 19.2913 36.7109 23.1902 36.7109 27.9997C36.7109 31.0567 35.1357 33.7459 32.7526 35.2997V36.708H40.2685Z"
                        fill="url(#paint4_linear_9228_22962)"
                    />
                </g>
                <path
                    d="M44.8 14.1446C44.8 18.8639 37.2783 15.8536 28 15.8536C18.7216 15.8536 11.2 18.8639 11.2 14.1446C11.2 9.42534 18.7216 5.59961 28 5.59961C37.2783 5.59961 44.8 9.42534 44.8 14.1446Z"
                    fill="url(#paint5_linear_9228_22962)"
                    fillOpacity="0.6"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_9228_22962"
                    x="9.79427"
                    y="8.20833"
                    width="36.4166"
                    height="44.3333"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feMorphology radius="1.58333" operator="erode" in="SourceAlpha" result="effect1_dropShadow_9228_22962" />
                    <feOffset dy="2.375" />
                    <feGaussianBlur stdDeviation="2.375" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0.1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_9228_22962" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_9228_22962" result="shape" />
                </filter>
                <radialGradient
                    id="paint0_radial_9228_22962"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(28 28) rotate(90) scale(28)"
                >
                    <stop offset="0.746599" stopColor="white" stopOpacity="0" />
                    <stop offset="1" stopColor="white" />
                </radialGradient>
                <radialGradient
                    id="paint1_radial_9228_22962"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(28 16.1) rotate(90) scale(24.5)"
                >
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </radialGradient>
                <radialGradient
                    id="paint2_radial_9228_22962"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(28) rotate(90) scale(42)"
                >
                    <stop stopColor="white" stopOpacity="0" />
                    <stop offset="0.5" stopColor="white" stopOpacity="0" />
                    <stop offset="0.99" stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="paint3_linear_9228_22962" x1="28.0026" y1="12.958" x2="28.0026" y2="43.0413" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0.8" />
                    <stop offset="1" stopColor="white" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="paint4_linear_9228_22962" x1="28.0026" y1="12.958" x2="28.0026" y2="43.0413" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" stopOpacity="0.8" />
                    <stop offset="1" stopColor="white" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="paint5_linear_9228_22962" x1="28" y1="5.59961" x2="28" y2="16.7996" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0.1" />
                </linearGradient>
                <clipPath id="clip0_9228_22962">
                    <path
                        d="M0 28C0 12.536 12.536 0 28 0V0C43.464 0 56 12.536 56 28V28C56 43.464 43.464 56 28 56V56C12.536 56 0 43.464 0 28V28Z"
                        fill="white"
                    />
                </clipPath>
            </defs>
        </svg>
    );
};

const GoogleCalendarIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <path
                d="M1.5 8.96667C1.5 6.35309 1.5 5.0463 2.00864 4.04804C2.45605 3.16995 3.16995 2.45605 4.04804 2.00864C5.0463 1.5 6.35309 1.5 8.96667 1.5H15.0333C17.6469 1.5 18.9537 1.5 19.952 2.00864C20.83 2.45605 21.544 3.16995 21.9914 4.04804C22.5 5.0463 22.5 6.35309 22.5 8.96667V15.0333C22.5 17.6469 22.5 18.9537 21.9914 19.952C21.544 20.83 20.83 21.544 19.952 21.9914C18.9537 22.5 17.6469 22.5 15.0333 22.5H8.96667C6.35309 22.5 5.0463 22.5 4.04804 21.9914C3.16995 21.544 2.45605 20.83 2.00864 19.952C1.5 18.9537 1.5 17.6469 1.5 15.0333V8.96667Z"
                fill="white"
            />
            <path d="M18.3694 4.5H15.9309V8.03344H19.499V5.49634C19.5 5.49634 19.3227 4.59636 18.3694 4.5Z" fill="#1967D2" />
            <path d="M15.9319 19.4839V19.4925V19.5002L19.5 15.9668H19.468L15.9319 19.4839Z" fill="#1967D2" />
            <path d="M19.4997 15.9662V15.9346L19.468 15.9662H19.4997Z" fill="#FBBC05" />
            <path d="M19.5 8.0332H15.9319V15.9345H19.5V8.0332Z" fill="#FBBC05" />
            <path d="M19.468 15.9668H15.9319V19.4839L19.468 15.9668Z" fill="#EA4335" />
            <path d="M15.9319 15.9662H19.468L19.5 15.9346H15.9319V15.9662Z" fill="#EA4335" />
            <path d="M15.9233 19.493H15.932V19.4844L15.9233 19.493Z" fill="#34A853" />
            <path d="M7.98779 15.9346V19.4921H15.9233L15.932 15.9346H7.98779Z" fill="#34A853" />
            <path d="M15.932 15.9664V15.9346L15.9233 19.4921L15.932 19.4834V15.9664Z" fill="#34A853" />
            <path d="M4.5 15.9346V18.4081C4.53197 19.2107 5.40002 19.4921 5.40002 19.4921H7.9877V15.9346H4.5Z" fill="#188038" />
            <path d="M7.9877 8.03344H15.9319V4.5H5.50078C5.50078 4.5 4.56394 4.59636 4.5 5.59173V15.9348H7.9877V8.03344Z" fill="#4285F4" />
            <path
                d="M10.5866 14.3354C10.4049 14.3354 10.2296 14.3117 10.0609 14.2643C9.89642 14.217 9.74497 14.146 9.60649 14.0513C9.46802 13.9523 9.34469 13.8296 9.2365 13.6833C9.13265 13.537 9.05259 13.367 8.99634 13.1733L9.79473 12.8569C9.85098 13.0721 9.94619 13.2357 10.0803 13.3476C10.2145 13.4552 10.3832 13.509 10.5866 13.509C10.6775 13.509 10.7641 13.4961 10.8463 13.4703C10.9285 13.4401 10.9999 13.3992 11.0605 13.3476C11.1211 13.296 11.1687 13.2357 11.2033 13.1668C11.2422 13.0937 11.2617 13.0119 11.2617 12.9215C11.2617 12.7321 11.1903 12.5836 11.0475 12.476C10.909 12.3684 10.7165 12.3146 10.4698 12.3146H10.0868V11.5464H10.4373C10.5239 11.5464 10.6083 11.5356 10.6905 11.5141C10.7727 11.4926 10.8441 11.4603 10.9047 11.4173C10.9696 11.3699 11.0194 11.3118 11.054 11.243C11.0929 11.1698 11.1124 11.0859 11.1124 10.9912C11.1124 10.8448 11.0605 10.7265 10.9566 10.6361C10.8528 10.5414 10.7121 10.4941 10.5347 10.4941C10.3443 10.4941 10.1972 10.5457 10.0933 10.649C9.99379 10.748 9.92455 10.8599 9.8856 10.9847L9.10668 10.6684C9.14563 10.5608 9.20405 10.451 9.28194 10.3391C9.35983 10.2229 9.4572 10.1196 9.57404 10.0292C9.6952 9.93455 9.83584 9.85923 9.99595 9.80327C10.1561 9.74302 10.34 9.71289 10.5477 9.71289C10.7597 9.71289 10.9523 9.74302 11.1254 9.80327C11.3028 9.86353 11.4543 9.94746 11.5798 10.0551C11.7052 10.1584 11.8026 10.2832 11.8718 10.4295C11.9411 10.5715 11.9757 10.7265 11.9757 10.8943C11.9757 11.0235 11.9584 11.1397 11.9238 11.243C11.8935 11.3462 11.8524 11.4388 11.8004 11.5206C11.7485 11.6023 11.6879 11.6734 11.6187 11.7336C11.5538 11.7896 11.4867 11.8348 11.4175 11.8692V11.9208C11.6252 12.0026 11.7961 12.1339 11.9303 12.3146C12.0687 12.4954 12.138 12.7235 12.138 12.999C12.138 13.1927 12.1012 13.3713 12.0276 13.5348C11.9541 13.6941 11.848 13.8339 11.7096 13.9545C11.5754 14.075 11.4131 14.1675 11.2227 14.2321C11.0323 14.3009 10.8203 14.3354 10.5866 14.3354Z"
                fill="#4285F4"
            />
            <path d="M13.6881 14.2321V10.8104L12.9026 11.1397L12.5911 10.423L13.8958 9.81619H14.5384V14.2321H13.6881Z" fill="#4285F4" />
        </svg>
    );
};

type AssistantMessage = Message & {
    meetings?: { id: string; title: string; description: string }[];
    actions?: { id: string; text: string; type: "primary" | "secondary" }[];
};

const messages: AssistantMessage[] = [
    {
        id: "message-001",
        text: "Welcome back! How can I help?",
    },
    {
        id: "message-002",
        text: "Welcome back! How can I help?",
        user: {
            me: true,
        },
    },
    {
        id: "message-003",
        text: "Okay! Here’s what I recommend:",
    },
    {
        id: "message-004",
        meetings: [
            {
                id: "meeting-1",
                title: "Sync with Rhea",
                description: "move to 1:30 PM",
            },
            {
                id: "meeting-2",
                title: "Strategy session with Sienna",
                description: "move to Thursday at 3 PM",
            },
        ],
    },
    {
        id: "message-005",
        text: "Shall I update your calendar and notify Sienna and the team?",
        actions: [
            {
                id: "cancel",
                text: "Cancel",
                type: "secondary",
            },
            {
                id: "update",
                text: "Yes, update",
                type: "primary",
            },
        ],
    },
    {
        id: "message-006",
        text: "Yes, but can we do the strategy session on Friday instead?",
        user: {
            me: true,
        },
    },
    {
        id: "message-007",
        audio: {
            duration: "00:28",
        },
        user: {
            me: true,
        },
    },
    {
        id: "typing-indicator",
        typing: true,
    },
];

export const AIAssistantMessageMenu = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <SlideoutMenu isOpen={isOpen} onOpenChange={setIsOpen} isDismissable className="overflow-auto">
            <SlideoutMenu.Header className="sticky top-0 right-0 left-0 bg-primary/70 px-4 pt-6 pb-8 backdrop-blur-sm md:px-6">
                <Logo />
            </SlideoutMenu.Header>
            <SlideoutMenu.Content className="size-auto w-full gap-0 overflow-visible overscroll-none p-0 md:px-0">
                <ol aria-label="Conversation" className="flex flex-col px-4 pb-8 md:px-6">
                    {messages.map((msg) => {
                        const marginTop = msg.user?.me ? "mt-6 [[data-self=true]+&]:mt-3" : "mt-3 [[data-self=true]+&]:mt-6";
                        if (msg.meetings) {
                            return (
                                <li
                                    key={msg.id}
                                    data-self={msg.user?.me}
                                    className={cx("peer flex flex-col gap-3 rounded-lg bg-primary p-3 ring-1 ring-secondary ring-inset", marginTop)}
                                >
                                    {msg.meetings.map((meeting) => (
                                        <div key={meeting.id} className="flex gap-2">
                                            <div className="size-6 rounded-md ring-1 ring-secondary ring-inset">
                                                <GoogleCalendarIcon className="shrink-0" />
                                            </div>

                                            <p className="mt-0.5 text-sm text-tertiary">
                                                <span className="font-semibold text-primary underline underline-offset-2">{meeting.title}</span>{" "}
                                                {meeting.description}.
                                            </p>
                                        </div>
                                    ))}
                                </li>
                            );
                        }

                        if (msg.actions) {
                            return (
                                <li key={msg.id} data-self={msg.user?.me} className={cx("peer flex flex-col gap-3", marginTop)}>
                                    <MessageItem msg={msg} showUserLabel={false} />
                                    <div className="flex gap-3">
                                        {msg.actions.map((action) => (
                                            <Button
                                                size="sm"
                                                key={action.id}
                                                color={action.type === "secondary" ? "link-gray" : "link-color"}
                                                onClick={() => {}}
                                            >
                                                {action.text}
                                            </Button>
                                        ))}
                                    </div>
                                </li>
                            );
                        }

                        return <MessageItem key={msg.id} data-self={msg.user?.me} msg={msg} className={cx("peer", marginTop)} showUserLabel={false} />;
                    })}
                </ol>
                <div className="sticky bottom-0 mt-auto flex flex-col bg-primary px-4 pb-4 md:px-6 md:pb-5">
                    <MessageActionAdvanced />
                </div>
            </SlideoutMenu.Content>
        </SlideoutMenu>
    );
};
