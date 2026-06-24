"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
    Button as AriaButton,
    Dialog as AriaDialog,
    DialogTrigger as AriaDialogTrigger,
    Popover as AriaPopover,
} from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import logoMini from "@/assets/logo/logo-mini.png";
import { cx } from "@/utils/cx";

type NavItem = {
    label: string;
    href: string;
};

interface PortfolioHeaderProps {
    items?: NavItem[];
    className?: string;
}

const defaultNavItems: NavItem[] = [
    { label: "Works", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Contact", href: "/#contact" },
];

export function PortfolioHeader({ items = defaultNavItems, className }: PortfolioHeaderProps) {
    const headerRef = useRef<HTMLElement>(null);

    return (
        <header
            ref={headerRef}
            className={cx(
                "fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-center md:h-19 md:pt-3",
                "max-md:has-aria-expanded:bg-bg-primary/95 max-md:has-aria-expanded:backdrop-blur-xl",
                className,
            )}
        >
            <div className="flex size-full max-w-container flex-1 items-center pr-3 pl-4 md:px-8">
                <div className="flex w-full justify-between gap-4 max-md:backdrop-blur-xl max-md:bg-bg-primary/60 max-md:rounded-2xl max-md:py-2 max-md:pr-2 max-md:pl-3 ring-secondary_alt md:rounded-2xl md:bg-bg-primary/60 md:py-3 md:pr-4 md:pl-4 md:shadow-xs md:ring-1 md:backdrop-blur-xl">
                    {/* Logo */}
                    <div className="flex flex-1 items-center gap-5">
                        <Link href="/" className="flex items-center gap-1.5">
                            <div className="size-10 shrink-0 overflow-hidden rounded-[22%]">
                                <Image
                                    src={logoMini}
                                    alt="Kittipong Sorasuchart"
                                    className="size-full object-cover"
                                />
                            </div>
                        </Link>

                        {/* Desktop navigation */}
                        <nav className="max-md:hidden">
                            <ul className="flex items-center gap-0.5">
                                {items.map((navItem) => (
                                    <li key={navItem.label}>
                                        <Link
                                            href={navItem.href}
                                            className="flex cursor-pointer items-center gap-0.5 rounded-lg px-2 py-1 text-sm font-semibold text-secondary outline-focus-ring transition duration-100 ease-linear hover:text-secondary_hover focus-visible:outline-2 focus-visible:outline-offset-2"
                                        >
                                            <span className="px-0.5">{navItem.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden items-center gap-3 md:flex">
                        <Button
                            color="primary"
                            size="md"
                            href="#contact"
                        >
                            Get in Touch
                        </Button>
                    </div>

                    {/* Mobile menu */}
                    <AriaDialogTrigger>
                        <AriaButton
                            aria-label="Toggle navigation menu"
                            className={({ isFocusVisible, isHovered }) =>
                                cx(
                                    "group ml-auto cursor-pointer rounded-lg p-2 md:hidden",
                                    isHovered && "bg-primary_hover",
                                    isFocusVisible &&
                                        "outline-2 outline-offset-2 outline-focus-ring",
                                )
                            }
                        >
                            <svg
                                aria-hidden="true"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    className="hidden text-secondary group-aria-expanded:block"
                                    d="M18 6L6 18M6 6L18 18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    className="text-secondary group-aria-expanded:hidden"
                                    d="M3 12H21M3 6H21M3 18H21"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </AriaButton>
                        <AriaPopover
                            triggerRef={headerRef}
                            className="scrollbar-hide h-[calc(100%-64px)] w-full overflow-y-auto shadow-lg md:hidden"
                            offset={0}
                            crossOffset={0}
                            containerPadding={0}
                            placement="bottom left"
                        >
                            <AriaDialog className="outline-hidden">
                                <nav className="w-full bg-primary/95 shadow-lg backdrop-blur-xl">
                                    <ul className="flex flex-col gap-0.5 py-5">
                                        {items.map((navItem) => (
                                            <li key={navItem.label}>
                                                <Link
                                                    href={navItem.href}
                                                    className="flex items-center px-4 py-3 text-sm font-semibold text-primary hover:bg-primary_hover"
                                                >
                                                    {navItem.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex flex-col gap-3 border-t border-secondary px-4 py-6">
                                        <Button
                                            size="md"
                                            href="#contact"
                                        >
                                            Get in Touch
                                        </Button>
                                    </div>
                                </nav>
                            </AriaDialog>
                        </AriaPopover>
                    </AriaDialogTrigger>
                </div>
            </div>
        </header>
    );
}
