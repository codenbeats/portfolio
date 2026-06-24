"use client";

import { Globe01, Monitor01, Phone01, Server01, Stars02 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { NavMenuItemLink } from "./base-components/nav-menu-item";

const items = [
    {
        title: "Web applications",
        subtitle: "Custom web apps built with React, Next.js, and modern frameworks.",
        href: "/services",
        Icon: Globe01,
    },
    {
        title: "Mobile apps",
        subtitle: "Native and cross-platform apps for iOS and Android.",
        href: "/services",
        Icon: Phone01,
    },
    {
        title: "AI & ML platforms",
        subtitle: "Intelligent systems powered by machine learning and automation.",
        href: "/services",
        Icon: Stars02,
    },
    {
        title: "Cloud solutions",
        subtitle: "Scalable infrastructure on AWS, GCP, and Azure.",
        href: "/services",
        Icon: Server01,
    },
    {
        title: "SaaS products",
        subtitle: "End-to-end SaaS development from MVP to enterprise scale.",
        href: "/services",
        Icon: Monitor01,
    },
];

export const DropdownMenuSimpleWithFooter = () => {
    return (
        <div className="px-3 pb-2 md:max-w-84 md:p-0">
            <nav className="overflow-hidden rounded-xl bg-secondary shadow-xs ring-1 ring-secondary_alt md:rounded-2xl md:shadow-lg">
                <ul className="flex flex-col gap-0.5 rounded-xl bg-primary py-2 ring-1 ring-secondary md:rounded-t-2xl md:p-2">
                    {items.map(({ title, subtitle, href, Icon }) => (
                        <li key={title}>
                            <NavMenuItemLink icon={Icon} title={title} subtitle={subtitle} href={href} />
                        </li>
                    ))}
                </ul>
                <div className="flex justify-center px-4 py-5 text-center sm:px-5">
                    <Button href="/services" color="link-color" size="md">
                        View all services
                    </Button>
                </div>
            </nav>
        </div>
    );
};
