"use client";

import { useEffect, useState } from "react";
import { BarChart04, Edit04, File02, ImageUser, Stars02, Zap } from "@untitledui/icons";
import { MessageActionAdvanced } from "@/components/application/messaging/message-action.demo";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { BadgeWithIcon } from "@/components/base/badges/badges";

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

export const AIAssistantIntroMenu = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <SlideoutMenu isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <SlideoutMenu.Header className="flex flex-col items-center gap-5 pt-12 pb-2 text-center md:pt-16">
                <Logo />

                <div className="w-full">
                    <p className="text-lg font-semibold text-quaternary">Hi Olivia,</p>
                    <h2 slot="title" className="text-lg font-semibold text-primary">
                        Welcome back! How can I help?
                    </h2>
                    <p className="mt-2 text-sm text-tertiary">I'm here to help tackle your tasks. Choose from the prompts below or tell me what you need!</p>
                </div>
            </SlideoutMenu.Header>
            <SlideoutMenu.Content className="gap-0">
                <div className="flex flex-wrap justify-center gap-2">
                    <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeWithIcon color="success" size="lg" type="modern" iconLeading={ImageUser}>
                            Create image
                        </BadgeWithIcon>
                    </button>
                    <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeWithIcon color="blue" size="lg" type="modern" iconLeading={BarChart04}>
                            Analyze data
                        </BadgeWithIcon>
                    </button>
                    <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeWithIcon color="purple" size="lg" type="modern" iconLeading={Zap}>
                            Make a plan
                        </BadgeWithIcon>
                    </button>
                    <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeWithIcon color="pink" size="lg" type="modern" iconLeading={File02}>
                            Summarize text
                        </BadgeWithIcon>
                    </button>
                    <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeWithIcon color="orange" size="lg" type="modern" iconLeading={Edit04}>
                            Help me write
                        </BadgeWithIcon>
                    </button>
                    <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                        <BadgeWithIcon color="gray" size="lg" type="modern" iconLeading={Stars02}>
                            More
                        </BadgeWithIcon>
                    </button>
                </div>
                <div className="mt-auto flex flex-col pb-4 md:pb-5">
                    <MessageActionAdvanced />
                </div>
            </SlideoutMenu.Content>
        </SlideoutMenu>
    );
};
