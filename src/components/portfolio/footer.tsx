import Image from "next/image";
import Link from "next/link";
import logoMini from "@/assets/logo/logo-mini.png";
import { Button } from "@/components/base/buttons/button";

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
                                {
                                    href: "https://github.com/codenbeats",
                                    label: "GitHub",
                                    external: true,
                                },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Button
                                        href={item.href}
                                        color="link-gray"
                                        size="md"
                                        {...(item.external
                                            ? { target: "_blank", rel: "noopener" }
                                            : {})}
                                    >
                                        {item.label}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <p className="text-sm text-quaternary">&copy; 2026 Kittipong Sorasuchart</p>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 border-t border-secondary pt-6 md:flex-row">
                    <p className="text-xs tracking-[0.05em] text-quaternary">
                        AI Specialist · DevOps Engineer · Building intelligence into infrastructure ✧
                    </p>
                </div>
            </div>
        </footer>
    );
}
