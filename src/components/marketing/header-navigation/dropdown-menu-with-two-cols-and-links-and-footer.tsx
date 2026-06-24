"use client";

import type { FC, ReactNode } from "react";
import { BookClosed, BookOpen01, LifeBuoy01, PlayCircle, Stars02, Target04, Users01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { NavMenuItemLink } from "./base-components/nav-menu-item";

type MenuItem = {
    title: string;
    subtitle?: string;
    href: string;
    Icon: FC<{ className?: string }>;
    badge?: ReactNode;
};

type MenuColumn = {
    title: string;
    items: MenuItem[];
};

const columns: MenuColumn[] = [
    {
        title: "Learn",
        items: [
            {
                title: "Engineering blog",
                subtitle: "Technical deep-dives, architecture guides, and lessons from our team.",
                href: "#",
                Icon: BookClosed,
            },
            {
                title: "Case studies",
                subtitle: "See how we've helped companies ship better software, faster.",
                href: "#",
                Icon: Stars02,
            },
            {
                title: "Tech talks & webinars",
                subtitle: "Watch our engineers share insights on modern development practices.",
                href: "#",
                Icon: PlayCircle,
            },
        ],
    },
    {
        title: "Company",
        items: [
            {
                title: "About Mirimera",
                subtitle: "Our mission, values, and the team behind the code.",
                href: "/about",
                Icon: Users01,
            },
            {
                title: "Careers",
                subtitle: "Join our team of engineers building the next generation of software.",
                href: "/about",
                Icon: Target04,
            },
            {
                title: "Contact & support",
                subtitle: "Get in touch with our team for any questions or project inquiries.",
                href: "/contact",
                Icon: LifeBuoy01,
            },
        ],
    },
];

export const DropdownMenuWithTwoColsAndLinksAndFooter = () => {
    return (
        <div className="px-3 pb-2 md:max-w-200 md:p-0">
            <nav className="overflow-hidden rounded-xl bg-secondary shadow-xs ring-1 ring-secondary_alt md:rounded-2xl md:shadow-lg">
                <div className="flex flex-col gap-5 rounded-xl bg-primary pt-4 pb-5 ring-1 ring-secondary md:gap-6 md:rounded-t-2xl md:p-6 md:pt-5">
                    <div className="flex flex-col gap-1 px-4 md:p-0">
                        <p className="text-sm font-semibold text-primary">Resources</p>
                        <p className="text-sm text-tertiary">Insights, guides, and everything you need to know about Mirimera.</p>
                    </div>

                    <div className="flex flex-col gap-5 md:flex-row md:gap-8 md:py-0">
                        <div className="-mb-px flex flex-col gap-4 border-b border-b-secondary px-4 pb-5 md:mb-0 md:gap-5 md:border-none md:p-0">
                            <h3 className="text-sm font-semibold text-brand-tertiary">Quick links</h3>
                            <ul className="flex flex-col gap-3">
                                {[
                                    { title: "Our services", href: "/services" },
                                    { title: "Pricing plans", href: "/pricing" },
                                    { title: "About Mirimera", href: "/about" },
                                    { title: "Contact us", href: "/contact" },
                                    { title: "Get a quote", href: "/contact" },
                                ].map((item) => (
                                    <li key={item.title} className="flex">
                                        <Button href={item.href} color="link-gray" size="md">
                                            {item.title}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-2">
                            {columns.map((column) => (
                                <div key={column.title}>
                                    <h3 className="mb-2 px-4 text-sm font-semibold text-brand-tertiary md:px-0">{column.title}</h3>
                                    <ul className="flex flex-col gap-0.5">
                                        {column.items.map(({ title, subtitle, href, Icon }) => (
                                            <li key={title}>
                                                <NavMenuItemLink icon={Icon} title={title} subtitle={subtitle} href={href} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mx-auto flex max-w-container flex-col px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
                    <Button href="/about" color="secondary" size="md" iconLeading={BookOpen01} className="hidden md:flex">
                        About Mirimera
                    </Button>
                    <Button href="/contact" color="primary" size="md" className="hidden md:flex">
                        Start a project
                    </Button>
                    <Button href="/contact" color="primary" size="sm" className="md:hidden">
                        Start a project
                    </Button>
                </div>
            </nav>
        </div>
    );
};
