"use client";

import { BookClosed, FileCode01, PlayCircle, Stars02 } from "@untitledui/icons";
import { NavMenuItemLink } from "./base-components/nav-menu-item";
import { FeatureCardVertical } from "./base-components/nav-menu-item-card";

const items = [
    { title: "Web development", subtitle: "Custom web applications built with modern frameworks and best practices.", href: "/services", Icon: FileCode01 },
    { title: "Mobile apps", subtitle: "Native and cross-platform mobile applications for iOS and Android.", href: "/services", Icon: PlayCircle },
    { title: "AI & ML solutions", subtitle: "Intelligent solutions powered by machine learning and artificial intelligence.", href: "/services", Icon: Stars02 },
    { title: "Cloud & DevOps", subtitle: "Scalable cloud infrastructure with CI/CD pipelines and monitoring.", href: "/services", Icon: BookClosed },
];

export const DropdownMenuFeatureCard = () => {
    return (
        <div className="px-3 pb-2 md:max-w-160 md:p-0">
            <nav className="flex flex-col overflow-hidden rounded-xl bg-primary shadow-xs ring-1 ring-secondary_alt md:w-max md:flex-row md:rounded-2xl md:shadow-lg">
                <ul className="flex flex-1 flex-col gap-0.5 pt-2 pb-3 md:p-2">
                    {items.map(({ title, subtitle, href, Icon }) => (
                        <li key={title + href}>
                            <NavMenuItemLink icon={Icon} title={title} subtitle={subtitle} href={href} />
                        </li>
                    ))}
                </ul>
                <div className="bg-secondary px-1 pt-2 pb-3 md:max-w-76 md:px-2">
                    <FeatureCardVertical
                        href="/contact"
                        imgSrc="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1280&h=720&fit=crop&q=80"
                        title="Ready to start your project?"
                        description="Talk to our engineering team and get a free project assessment."
                        actionsContent={
                            <div className="inline-flex gap-3">
                                <span className="text-sm font-semibold text-brand-secondary">Get a quote &rarr;</span>
                            </div>
                        }
                    />
                </div>
            </nav>
        </div>
    );
};
