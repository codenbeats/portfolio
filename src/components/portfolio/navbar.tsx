"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface NavbarProps {
    variant?: "home" | "back";
    backHref?: string;
    backLabel?: string;
}

export function Navbar({ variant = "home", backHref = "/#work", backLabel = "Back to Work" }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 z-100 w-full transition-all duration-350 ${
                scrolled
                    ? "border-b border-white/[0.08] bg-[#090F15]/60 shadow-[0_4px_24px_rgba(0,0,0,0.3)] backdrop-blur-[20px] backdrop-saturate-[180%]"
                    : "bg-transparent"
            }`}
        >
            <nav className="portfolio-container flex h-[72px] items-center justify-between">
                <Link href="/" className="flex flex-col leading-[1.1]">
                    <span className="font-[family-name:var(--font-serif)] text-[1.4rem] font-bold tracking-[0.05em] text-[#88867A]">
                        ALIVE
                    </span>
                    <span className="text-[0.65rem] font-normal tracking-[0.12em] uppercase text-[#B3B7BA]">
                        Design Studio
                    </span>
                </Link>

                {variant === "home" ? (
                    <>
                        <ul
                            className={`hidden items-center gap-10 md:flex ${
                                menuOpen
                                    ? "!fixed top-[72px] left-0 !flex w-full flex-col items-center gap-0 border-b border-white/[0.08] bg-[#090F15]/97 px-0 py-6 backdrop-blur-[12px]"
                                    : ""
                            }`}
                        >
                            {[
                                { href: "/#work", label: "Works" },
                                { href: "/#about", label: "About" },
                                { href: "/#contact", label: "Contact" },
                                { href: "/#services", label: "Services" },
                            ].map((item) => (
                                <li key={item.href} className={menuOpen ? "w-full text-center" : ""}>
                                    <Link
                                        href={item.href}
                                        className="group relative pb-1 text-[0.9rem] font-medium tracking-[0.05em] text-[#D3D1CE] transition-colors duration-350 hover:text-[#88867A]"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {item.label}
                                        <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#88867A] transition-all duration-350 group-hover:w-full" />
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <button
                            className="flex flex-col gap-[5px] border-none bg-none p-1 md:hidden"
                            aria-label="Open menu"
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <span
                                className={`block h-[2px] w-6 rounded-sm bg-[#D3D1CE] transition-all duration-350 ${
                                    menuOpen ? "translate-y-[7px] rotate-45" : ""
                                }`}
                            />
                            <span
                                className={`block h-[2px] w-6 rounded-sm bg-[#D3D1CE] transition-all duration-350 ${
                                    menuOpen ? "opacity-0" : ""
                                }`}
                            />
                            <span
                                className={`block h-[2px] w-6 rounded-sm bg-[#D3D1CE] transition-all duration-350 ${
                                    menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                                }`}
                            />
                        </button>
                    </>
                ) : (
                    <Link
                        href={backHref}
                        className="inline-flex items-center gap-2 text-[0.85rem] font-medium text-[#B3B7BA] transition-colors duration-350 hover:text-[#88867A] [&:hover_svg]:translate-x-[-4px]"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                            className="transition-transform duration-350"
                        >
                            <path
                                d="M13 8H3M7 4L3 8l4 4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        {backLabel}
                    </Link>
                )}
            </nav>
        </header>
    );
}
