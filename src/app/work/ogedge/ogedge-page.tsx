"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { useFadeUp } from "@/hooks/use-fade-up";

const HERO_IMG = "/ogedge/hero.png";

const tags = ["Next.js", "TypeScript", "Node.js", "Stripe", "PostgreSQL", "Tailwind", "Redis", "REST API"];

const metaRows = [
    { label: "Role", value: "Full-Stack Developer" },
    { label: "Type", value: "E-commerce Marketplace" },
    { label: "Stack", value: "Next.js · Node.js · Stripe · PostgreSQL" },
    { label: "Scope", value: "Catalog · Checkout · Order Tracking" },
    { label: "Live", value: "ogedge.netlify.app" },
];

function Figure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
    return (
        <figure>
            <Image
                src={src}
                alt={alt}
                width={1200}
                height={675}
                className="w-full rounded-xl border border-secondary shadow-lg"
            />
            <figcaption className="not-prose mt-3 text-sm text-quaternary italic">{caption}</figcaption>
        </figure>
    );
}

export function OgedgePage() {
    const ref = useFadeUp();

    return (
        <div ref={ref} className="bg-primary pt-32 text-primary">
            {/* HERO */}
            <section id="cs-hero">
                <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2">
                    <div className="flex flex-col items-start px-4 pb-16 md:pb-0 md:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] md:pr-12">
                        <Link
                            href="/#work"
                            className="fade-up text-sm font-semibold text-brand-secondary transition duration-100 ease-linear hover:text-brand-secondary_hover md:text-md"
                        >
                            ← All Projects
                        </Link>
                        <span className="fade-up mt-6 text-sm font-semibold text-brand-secondary md:mt-8 md:text-md">
                            Case Study
                        </span>
                        <h1 className="fade-up mt-3 font-[family-name:var(--font-serif)] text-display-md font-semibold text-primary md:mt-4 md:text-display-lg">
                            OGEdge
                        </h1>
                        <p className="fade-up mt-4 font-[family-name:var(--font-serif)] text-lg italic text-brand-secondary md:mt-6 md:text-xl">
                            Your competitive edge, delivered.
                        </p>
                        <p className="fade-up mt-4 text-md text-tertiary md:mt-6 md:max-w-120 md:text-lg">
                            A gaming services marketplace for boosting, coaching, and leveling across dozens of
                            titles - dynamic per-game catalogs, multi-currency checkout, live event countdowns,
                            and order tracking.
                        </p>

                        <div className="fade-up mt-6 flex flex-wrap gap-2 md:mt-8">
                            {tags.map((tag) => (
                                <Badge key={tag} color="brand" size="md" type="pill-color">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <dl className="fade-up mt-8 flex flex-col gap-3 md:mt-10">
                            {metaRows.map((row) => (
                                <div key={row.label} className="flex items-baseline gap-3">
                                    <dt className="min-w-16 text-sm font-semibold tracking-wide text-brand-secondary uppercase">
                                        {row.label}
                                    </dt>
                                    <dd className="text-sm text-secondary md:text-md">{row.value}</dd>
                                </div>
                            ))}
                        </dl>

                        <div className="fade-up mt-8 flex flex-wrap gap-3 md:mt-10">
                            <Button
                                href="https://ogedge.netlify.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                size="lg"
                                iconTrailing={ArrowUpRight}
                            >
                                View Live Site
                            </Button>
                        </div>
                    </div>

                    <Image
                        src={HERO_IMG}
                        alt="OGEdge gaming marketplace homepage"
                        width={1200}
                        height={675}
                        priority
                        className="fade-up order-first h-60 w-screen max-w-none object-cover md:order-1 md:h-180 md:w-full md:max-w-full"
                    />
                </div>
            </section>

            {/* BODY */}
            <div className="mx-auto max-w-container px-4 py-16 md:px-8 md:py-24">
                <div className="mx-auto max-w-prose md:max-w-180">
                    <div className="prose-minimal-quote mx-auto prose md:prose-lg">
                        {/* 01 - The Problem */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            01 - The Problem
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            Selling a service is easy.{" "}
                            <em className="text-brand-secondary italic">Earning trust is hard.</em>
                        </h2>
                        <p className="fade-up">
                            Gaming-services sites juggle dozens of games, each with its own ranks, modes, and pricing
                            logic. A Valorant rank boost is configured nothing like a Destiny 2 raid carry, which is
                            nothing like a CoD power-leveling package. The catalog has to flex to all of them.
                        </p>
                        <p className="fade-up">
                            And then there&apos;s the harder part: customers need a fast way to configure{" "}
                            <em>exactly</em> what they want, pay in their own currency, and trust a stranger with
                            their account. OGEdge has been doing this since 2006 - so the product had to feel as
                            established and safe as that history implies.
                        </p>

                        <hr />

                        {/* 02 - The Game Catalog */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            02 - The Game Catalog
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            One content model.{" "}
                            <em className="text-brand-secondary italic">Dozens of games.</em>
                        </h2>
                        <p className="fade-up">
                            The heart of OGEdge is a data-driven catalog. Each game - Valorant, Apex Legends, Call of
                            Duty, Destiny 2, Dota 2, Escape from Tarkov, and more - carries its own service types and
                            dynamic pricing rules. The homepage surfaces them as a browsable grid so players land
                            straight on the title they care about.
                        </p>

                        <div className="fade-up not-prose my-8 md:my-12">
                            <Figure
                                src={HERO_IMG}
                                alt="OGEdge homepage with featured games grid"
                                caption="The homepage: hero offer, 4.9★ social proof, and a grid of supported games."
                            />
                        </div>

                        <p className="fade-up">
                            I modeled the domain as <strong>games → services → options</strong>, so the structure of
                            a new title is data, not code. Adding a game, a new mode, or a seasonal service type is a
                            content change - the configurator, pricing engine, and checkout all adapt automatically.
                        </p>

                        <div className="fade-up not-prose my-8 md:my-12">
                            <Figure
                                src="/ogedge/games.png"
                                alt="OGEdge game catalog and selection view"
                                caption="The catalog view - every supported title, driven by the same content schema."
                            />
                        </div>

                        <hr />

                        {/* 03 - Dynamic Configurators & Pricing */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            03 - Dynamic Configurators &amp; Pricing
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            Price the order{" "}
                            <em className="text-brand-secondary italic">as you build it.</em>
                        </h2>
                        <p className="fade-up">
                            Each service has its own configurator. For Valorant rank boosting, the customer picks a
                            current rank and a target rank; the price is computed live from the rank delta, selected
                            options, and modifiers - duo queue, priority, streaming, agent or role preferences. The
                            total updates the moment any input changes.
                        </p>

                        <div className="fade-up not-prose my-8 md:my-12">
                            <Figure
                                src="/ogedge/valorant.png"
                                alt="Valorant boosting configurator with live event countdown"
                                caption="Valorant boosting - a seasonal Act banner and live event countdown timers driving urgency above the configurator."
                            />
                        </div>

                        <p className="fade-up">
                            The pricing logic lives server-side so it stays consistent and tamper-proof, while the UI
                            mirrors it for instant feedback. Seasonal context - like the{" "}
                            <em>Season 2026: Act 1</em> banner with its live countdown - is wired into the same model,
                            so limited-time events and rewards surface right where buyers make decisions.
                        </p>

                        <hr />

                        {/* 04 - Checkout & Payments */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            04 - Checkout &amp; Payments
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            Real money,{" "}
                            <em className="text-brand-secondary italic">handled carefully.</em>
                        </h2>
                        <p className="fade-up">
                            Prices render in the customer&apos;s currency, and checkout runs on Stripe. When an order
                            is placed, the backend creates the order record, captures payment, and kicks off an
                            order-tracking flow so customers can follow progress from purchase to completion.
                        </p>

                        <div className="fade-up not-prose my-8 md:my-12">
                            <Figure
                                src="/ogedge/services.png"
                                alt="OGEdge services and packages selection"
                                caption="Service packages feed straight into a Stripe-powered, multi-currency checkout."
                            />
                        </div>

                        <p className="fade-up">
                            Order state, payment status, and fulfillment progress are kept in sync, with Redis backing
                            the fast-changing pieces. The result is a checkout that feels effortless to the buyer and
                            auditable for the business.
                        </p>

                        <div className="fade-up not-prose my-8 md:my-12">
                            <Figure
                                src="/ogedge/checkout.png"
                                alt="OGEdge cart and checkout view"
                                caption="Cart and checkout - clear totals, currency, and what happens after payment."
                            />
                        </div>

                        <hr />

                        {/* 05 - Trust & Conversion */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            05 - Trust &amp; Conversion
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            Trust is{" "}
                            <em className="text-brand-secondary italic">the real product.</em>
                        </h2>
                        <p className="fade-up">
                            Because customers are handing over account access, trust signals run throughout the site:
                            SSL security, VPN protection, a safest-service guarantee, 24/7 support, a refund
                            guarantee, and loyalty rewards. The 4.9★ rating across 10,000 reviews and two decades of
                            operation anchor the homepage.
                        </p>
                        <p className="fade-up">
                            On top of credibility, conversion is driven by{" "}
                            <strong>seasonal events and live countdowns</strong> that create genuine urgency without
                            feeling manipulative - limited Act windows, weekly events, and time-boxed rewards.
                        </p>

                        <div className="fade-up not-prose my-8 md:my-12">
                            <Figure
                                src="/ogedge/coaching.png"
                                alt="OGEdge coaching options"
                                caption="Coaching packages - another service type built from the same flexible model."
                            />
                        </div>

                        <hr />

                        {/* 06 - The Result */}
                        <p className="fade-up not-prose text-sm font-semibold text-tertiary md:text-md">
                            06 - The Result
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            A marketplace that{" "}
                            <em className="text-brand-secondary italic">scales with the games.</em>
                        </h2>
                        <p className="fade-up">
                            OGEdge is a polished, conversion-focused marketplace that scales across many games from a
                            single content model, handles real money safely, and keeps customers informed end to end.
                            New titles, services, and seasonal events ship as configuration - not rewrites.
                        </p>
                        <p className="fade-up">
                            Building it pushed me to design flexible commerce data models and a trustworthy checkout -
                            the two things that make or break a services marketplace. The hardest engineering wasn&apos;t
                            any single screen; it was the model underneath that lets one codebase sell hundreds of
                            very different things.
                        </p>
                    </div>
                </div>
            </div>

            {/* NEXT PROJECT CTA */}
            <section id="cs-next" className="border-t border-secondary bg-secondary py-16 md:py-24">
                <div className="fade-up mx-auto max-w-container px-4 text-center md:px-8">
                    <p className="text-sm font-semibold tracking-wide text-tertiary uppercase md:text-md">
                        Next Project
                    </p>
                    <h2 className="mt-4 font-[family-name:var(--font-serif)] text-display-sm font-semibold text-primary md:mt-5 md:text-display-md">
                        Big Rentals -{" "}
                        <em className="text-brand-secondary italic">Equipment, booked online.</em>
                    </h2>
                    <div className="mt-8 flex flex-wrap justify-center gap-3 md:mt-10">
                        <Button href="/work/big-rentals" size="lg" iconTrailing={ArrowUpRight}>
                            View Case Study
                        </Button>
                        <Button href="/#work" color="secondary" size="lg">
                            Back to All Work
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
