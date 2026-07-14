"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { ThemeToggle, ThemeToggleFab } from "@/components/portfolio/theme-toggle";
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
    const [mobileOpen, setMobileOpen] = useState(false);

    const closeMobile = useCallback(() => setMobileOpen(false), []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    return (
        <>
            <header
                ref={headerRef}
                className={cx(
                    "fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-center md:h-19 md:pt-3",
                    className,
                )}
            >
                <div className="flex size-full max-w-container flex-1 items-center pr-3 pl-4 md:px-8">
                    <div className={cx(
                        "flex w-full items-center justify-between gap-4 ring-secondary_alt md:rounded-2xl md:bg-bg-primary/60 md:py-3 md:pr-4 md:pl-4 md:shadow-xs md:ring-1 md:backdrop-blur-xl",
                        !mobileOpen && "max-md:backdrop-blur-xl max-md:bg-bg-primary/60 max-md:rounded-2xl max-md:py-2 max-md:pr-2 max-md:pl-3",
                        mobileOpen && "max-md:py-2 max-md:pr-2 max-md:pl-3",
                    )}>
                        {/* Logo */}
                        <div className="flex flex-1 items-center gap-5">
                            <Link href="/" className="flex items-center gap-2.5" onClick={closeMobile}>
                                <div className="size-10 shrink-0 overflow-hidden rounded-[22%]">
                                    <Image
                                        src={logoMini}
                                        alt="Kittipong Sorasuchart"
                                        className="size-full object-cover"
                                    />
                                </div>
                                <span className="text-md font-semibold text-primary md:hidden">Kittipong</span>
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
                            <ThemeToggle />
                            <Button
                                color="primary"
                                size="md"
                                href="#contact"
                            >
                                Get in Touch
                            </Button>
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            type="button"
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileOpen}
                            onClick={() => setMobileOpen((v) => !v)}
                            className="ml-auto cursor-pointer rounded-lg p-2 transition duration-100 ease-linear hover:bg-black/8 dark:hover:bg-white/10 md:hidden"
                        >
                            <svg
                                aria-hidden="true"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                {mobileOpen ? (
                                    <path
                                        className="text-secondary"
                                        d="M18 6L6 18M6 6L18 18"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                ) : (
                                    <path
                                        className="text-secondary"
                                        d="M3 12H21M3 6H21M3 18H21"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile full-screen menu — always mounted for reliable transitions */}
            <div
                className="fixed inset-0 z-40 flex flex-col bg-bg-primary/80 pt-16 backdrop-blur-xl backdrop-saturate-150 md:hidden"
                style={{
                    transition: `transform ${mobileOpen ? "500ms" : "300ms"} ease-out, opacity ${mobileOpen ? "500ms" : "300ms"} ease-out, visibility 0ms ${mobileOpen ? "0ms" : "300ms"}`,
                    transform: mobileOpen ? "translateY(0)" : "translateY(-100%)",
                    opacity: mobileOpen ? 1 : 0,
                    visibility: mobileOpen ? "visible" : "hidden",
                    pointerEvents: mobileOpen ? "auto" : "none",
                }}
            >
                <nav className="flex flex-1 flex-col">
                    <ul className="flex flex-col gap-0.5 px-4 pt-6">
                        {items.map((navItem, i) => (
                            <li
                                key={navItem.label}
                                style={{
                                    transition: `opacity ${mobileOpen ? "450ms" : "200ms"} ease-out, transform ${mobileOpen ? "450ms" : "200ms"} ease-out`,
                                    transitionDelay: mobileOpen ? `${200 + i * 80}ms` : `${(items.length - 1 - i) * 40}ms`,
                                    opacity: mobileOpen ? 1 : 0,
                                    transform: mobileOpen ? "translateY(0)" : "translateY(-20px)",
                                }}
                            >
                                <Link
                                    href={navItem.href}
                                    onClick={closeMobile}
                                    className="flex items-center rounded-xl px-3 py-3.5 text-base font-semibold text-primary transition duration-100 ease-linear hover:bg-black/5 dark:hover:bg-white/8"
                                >
                                    {navItem.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div
                        className="mt-auto border-t border-secondary px-4 py-6"
                        style={{
                            transition: `opacity ${mobileOpen ? "450ms" : "200ms"} ease-out, transform ${mobileOpen ? "450ms" : "200ms"} ease-out`,
                            transitionDelay: mobileOpen ? `${200 + items.length * 80}ms` : "0ms",
                            opacity: mobileOpen ? 1 : 0,
                            transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                        }}
                    >
                        <Link
                            href="#contact"
                            onClick={closeMobile}
                            className="flex w-full items-center justify-center rounded-lg bg-brand-solid px-4 py-3 text-base font-semibold text-white shadow-xs transition duration-100 ease-linear hover:bg-brand-solid_hover"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </nav>
            </div>

            {/* Mobile theme FAB — hidden when menu is open */}
            {!mobileOpen && <ThemeToggleFab />}
        </>
    );
}
