import Image from "next/image";
import Link from "next/link";
import logoMini from "@/assets/logo/logo-mini.png";
import { Button } from "@/components/base/buttons/button";
import GitHub from "@/components/foundations/social-icons/github";
import LinkedIn from "@/components/foundations/social-icons/linkedin";
import Facebook from "@/components/foundations/social-icons/facebook";

const footerSocials = [
    { label: "GitHub", href: "https://github.com/kittisora", icon: GitHub },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kittisora", icon: LinkedIn },
    { label: "Facebook", href: "https://facebook.com/kittisoras", icon: Facebook },
];

export function Footer() {
    return (
        <footer className="border-t border-secondary bg-primary py-12 md:pt-16">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="mb-8 flex flex-col items-center justify-between gap-6 md:flex-row">
                    <Link href="/" className="flex items-center gap-1.5">
                        <div className="size-10 shrink-0 overflow-hidden rounded-[22%]">
                            <Image
                                src={logoMini}
                                alt="Kittipong Sorasuchart"
                                className="size-full object-cover"
                            />
                        </div>
                    </Link>

                    <nav>
                        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                            {[
                                { href: "/#work", label: "Works" },
                                { href: "/#about", label: "About" },
                                { href: "/#services", label: "Services" },
                                { href: "/#contact", label: "Contact" },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Button href={item.href} color="link-gray" size="md">
                                        {item.label}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <ul className="flex items-center gap-3">
                        {footerSocials.map((social) => (
                            <li key={social.label}>
                                <a
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="flex size-9 items-center justify-center rounded-lg border border-primary text-fg-secondary shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:text-fg-brand-primary hover:bg-brand-secondary dark:hover:border-brand-600/40 dark:hover:bg-brand-600/10 dark:hover:text-brand-400"
                                >
                                    <social.icon size={18} aria-hidden="true" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 border-t border-secondary pt-6 md:flex-row">
                    <p className="text-xs tracking-[0.05em] text-quaternary">
                        AI Specialist · DevOps Engineer · Building intelligence into infrastructure ✧
                    </p>
                    <p className="text-sm text-quaternary">&copy; 2026 Kittipong Sorasuchart</p>
                </div>
            </div>
        </footer>
    );
}
