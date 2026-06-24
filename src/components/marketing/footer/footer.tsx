"use client";

import type { ReactNode } from "react";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";

type FooterNavItem = {
    label: string;
    href: string;
    badge?: ReactNode;
};

type FooterNavCategory = {
    label: string;
    items: FooterNavItem[];
};

const footerNavList: FooterNavCategory[] = [
    {
        label: "Services",
        items: [
            { label: "Web development", href: "/services" },
            { label: "Mobile apps", href: "/services" },
            {
                label: "AI & ML solutions",
                href: "/services",
                badge: (
                    <Badge color="gray" type="modern" size="sm" className="ml-1">
                        New
                    </Badge>
                ),
            },
            { label: "Cloud & DevOps", href: "/services" },
            { label: "API development", href: "/services" },
            { label: "UI/UX design", href: "/services" },
        ],
    },
    {
        label: "Company",
        items: [
            { label: "About us", href: "/about" },
            { label: "Careers", href: "/about" },
            { label: "Case studies", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Partners", href: "/about" },
            { label: "Contact", href: "/contact" },
        ],
    },
    {
        label: "Resources",
        items: [
            { label: "Documentation", href: "#" },
            { label: "Engineering blog", href: "#" },
            { label: "Open source", href: "#" },
            { label: "Webinars", href: "#" },
            { label: "Tech stack", href: "#" },
            { label: "Support", href: "/contact" },
        ],
    },
    {
        label: "Industries",
        items: [
            { label: "Fintech", href: "/services" },
            { label: "Healthcare", href: "/services" },
            { label: "E-commerce", href: "/services" },
            { label: "SaaS", href: "/services" },
            { label: "Logistics", href: "/services" },
            { label: "Education", href: "/services" },
        ],
    },
    {
        label: "Social",
        items: [
            { label: "X", href: "#" },
            { label: "LinkedIn", href: "#" },
            { label: "GitHub", href: "#" },
            { label: "Dribbble", href: "#" },
            { label: "YouTube", href: "#" },
            { label: "Discord", href: "#" },
        ],
    },
    {
        label: "Legal",
        items: [
            { label: "Terms", href: "#" },
            { label: "Privacy", href: "#" },
            { label: "Cookies", href: "#" },
            { label: "Security", href: "#" },
            { label: "SLA", href: "#" },
            { label: "Pricing", href: "/pricing" },
        ],
    },
];

export const Footer = () => {
    return (
        <footer className="dark-mode bg-primary py-12 md:pt-16">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="flex flex-col justify-center text-center">
                    <h2 className="text-display-xs font-semibold text-primary md:text-display-sm">Ready to build something great?</h2>
                    <p className="mt-2 text-md text-tertiary md:mt-4 md:text-xl">
                        Talk to our engineering team and get a free project assessment.
                    </p>
                    <div className="mt-8 flex flex-col-reverse gap-3 self-stretch md:mt-12 md:flex-row md:self-center">
                        <Button color="secondary" size="xl" href="/about">
                            About Mirimera
                        </Button>
                        <Button size="xl" href="/contact">
                            Get a quote
                        </Button>
                    </div>
                </div>

                <nav className="mt-12 md:mt-16">
                    <ul className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
                        {footerNavList.map((category) => (
                            <li key={category.label}>
                                <h4 className="text-sm font-semibold text-quaternary">{category.label}</h4>
                                <ul className="mt-4 flex flex-col gap-3">
                                    {category.items.map((item) => (
                                        <li key={item.label} className="flex">
                                            <Button color="link-gray" size="md" href={item.href} iconTrailing={item.badge} className="max-h-5 gap-1">
                                                {item.label}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="mt-12 flex flex-col justify-between gap-6 border-t border-secondary pt-8 md:mt-16 md:flex-row md:items-center">
                    <UntitledLogo className="h-10" />
                    <p className="text-sm text-quaternary">&copy; 2026 Mirimera. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
