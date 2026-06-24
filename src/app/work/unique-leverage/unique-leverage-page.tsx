"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { useFadeUp } from "@/hooks/use-fade-up";

const tags = [
    "Python",
    "AI / LLMs",
    "Meta Marketing API",
    "Facebook Marketplace",
    "PostgreSQL",
    "React",
    "Webhooks",
    "CAPI",
];

const metaRows = [
    { label: "Role", value: "AI Specialist / Full-Stack Engineer" },
    { label: "Type", value: "SaaS Platform" },
    { label: "Stack", value: "Python · LLMs · Meta API · React" },
    { label: "Scope", value: "Automation · AI Ads · Attribution" },
    { label: "Live", value: "uniqueleverage.com" },
    { label: "Staging", value: "ul-cursor.onrender.com" },
];

const feedProviders = [
    {
        name: "DealerCenter",
        desc: "Pull live inventory, pricing, and photos straight from the DMS.",
    },
    {
        name: "Frazer",
        desc: "Sync used-car stock and keep units current as they move.",
    },
    {
        name: "vAuto",
        desc: "Ingest appraisal and pricing data for accurate listings.",
    },
    {
        name: "CarsforSale",
        desc: "Mirror the dealer's existing feed without double entry.",
    },
];

const replacedTools = [
    <>
        A <strong>Marketplace auto-poster</strong> that lists from real user profiles
    </>,
    <>
        An <strong>ad manager</strong> for Facebook &amp; Instagram campaigns
    </>,
    <>
        <strong>VIN-specific retargeting</strong> and lead forms via CAPI
    </>,
    <>
        A <strong>CRM</strong> that captures every lead with auto-reply SMS
    </>,
    <>
        An <strong>AI assistant</strong> for ad copy and campaign analytics
    </>,
];

export function UniqueLeveragePage() {
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
                            Unique Leverage
                        </h1>
                        <p className="fade-up mt-4 font-[family-name:var(--font-serif)] text-lg italic text-brand-secondary md:mt-6 md:text-xl">
                            Automation for the way dealerships <em>actually</em> sell.
                        </p>
                        <p className="fade-up mt-4 text-md text-tertiary md:mt-6 md:max-w-120 md:text-lg">
                            A marketing-automation platform that posts inventory to Facebook Marketplace
                            automatically, generates ads per vehicle with AI, and tracks every lead down to the
                            exact VIN.
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
                                href="https://uniqueleverage.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                size="lg"
                                iconTrailing={ArrowUpRight}
                            >
                                View Live Site
                            </Button>
                            <Button
                                href="https://ul-cursor.onrender.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                color="secondary"
                                size="lg"
                                iconTrailing={ArrowUpRight}
                            >
                                View Staging
                            </Button>
                        </div>
                    </div>

                    <Image
                        src="/uniqueleverage/hero.jpg"
                        alt="Unique Leverage landing page - automation for salespeople"
                        width={1200}
                        height={1600}
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
                            Selling cars online is{" "}
                            <em className="text-brand-secondary italic">death by a thousand tabs.</em>
                        </h2>
                        <p className="fade-up">
                            Dealers and salespeople burn hours every day manually posting cars to Facebook
                            Marketplace - one listing at a time, by hand. The work never ends: new units need
                            posting, prices drift, and sold cars sit live for days, generating leads for vehicles
                            that are already gone.
                        </p>
                        <p className="fade-up">
                            The ad creative is generic - the same boilerplate copy stretched across every vehicle,
                            with no thought to what actually makes a specific car sell. And once a lead does come
                            in, it scatters: a Marketplace message here, a text there, a missed call somewhere
                            else. There&apos;s <strong>no attribution</strong> back to which vehicle drove the
                            interest, so nobody really knows what&apos;s working.
                        </p>
                        <p className="fade-up">
                            The result is a stack of disconnected tools and a lot of manual labor - the exact kind
                            of repetitive, high-volume work that should be automated.
                        </p>

                        <hr />

                        {/* 02 - Inventory, Synced */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            02 - Inventory, Synced
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            Your inventory,{" "}
                            <em className="text-brand-secondary italic">handled.</em>
                        </h2>
                        <p className="fade-up">
                            Dealers already have their stock somewhere - a DMS, a feed provider, a spreadsheet.
                            Rather than ask them to re-enter anything, Unique Leverage connects directly to the feed
                            providers they already use and keeps everything continuously in sync.
                        </p>

                        <figure className="fade-up">
                            <Image
                                src="/uniqueleverage/features.jpg"
                                alt="Marketplace listing automation and inventory feed connections"
                                width={1200}
                                height={1500}
                                className="rounded-xl"
                            />
                            <figcaption>
                                Phone mockups of automated Facebook Marketplace car listings, with inventory feeds
                                wired in from CarsforSale, Gen Systems, and Dealer Center.
                            </figcaption>
                        </figure>

                        <p className="fade-up">
                            New units get posted automatically, prices and photos update as they change, and sold
                            inventory is pulled down before it can waste another lead. The feed becomes the single
                            source of truth - the platform handles the rest.
                        </p>

                        <div className="fade-up not-prose flex flex-col">
                            {feedProviders.map((provider, i, arr) => (
                                <div
                                    key={provider.name}
                                    className={`border-t border-secondary py-7 ${i === arr.length - 1 ? "border-b" : ""}`}
                                >
                                    <h3 className="mb-2.5 font-[family-name:var(--font-serif)] text-md font-bold text-primary md:text-lg">
                                        {provider.name}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-tertiary md:text-md">
                                        {provider.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <hr />

                        {/* 03 - AI Ad Wizard */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            03 - AI Ad Wizard
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            One car. One click.{" "}
                            <em className="text-brand-secondary italic">A campaign writes itself.</em>
                        </h2>
                        <p className="fade-up">
                            This is the layer I cared about most. For every vehicle, an LLM generates tailored ad
                            copy and selects the right creative - so instead of writing copy by hand, a dealer can
                            launch a <strong>VIN-specific Facebook or Instagram campaign in a single click</strong>.
                            The model reasons about the actual car: make, model, trim, mileage, price, and the kind
                            of buyer it&apos;s for.
                        </p>

                        <figure className="fade-up">
                            <Image
                                src="/uniqueleverage/3.jpg"
                                alt="AI Ad Wizard generating per-vehicle ad copy and creative"
                                width={1200}
                                height={800}
                                className="rounded-xl"
                            />
                            <figcaption>
                                The AI Ad Wizard turns a single VIN into a ready-to-launch campaign.
                            </figcaption>
                        </figure>

                        <p className="fade-up">
                            On top of generation sits a conversational analytics assistant - &quot;
                            <strong>use AI to chat with your ads data</strong>&quot;. Instead of digging through
                            dashboards, a dealer can just ask: which cars are getting the most leads, where the
                            budget is going, what to push harder. The LLM does double duty - creating the campaigns
                            and explaining how they perform.
                        </p>

                        <hr />

                        {/* 04 - Marketplace Automation */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            04 - Marketplace Automation
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            Posting from{" "}
                            <em className="text-brand-secondary italic">real profiles</em>, at scale.
                        </h2>
                        <p className="fade-up">
                            Here&apos;s the detail that makes Marketplace actually work: reach comes from{" "}
                            <strong>individual user profiles</strong>, not business pages. Buyers browse and trust
                            person-to-person listings. So the automation posts from individual profiles - exactly
                            the way a real salesperson would - while removing all of the manual grind.
                        </p>
                        <p className="fade-up">
                            The system handles the heavy lifting end to end: posting new units, renewing listings so
                            they stay visible, and de-listing cars the moment they sell. What would take a team
                            hours of repetitive clicking runs unattended, around the clock, across an entire
                            inventory.
                        </p>

                        <figure className="fade-up">
                            <Image
                                src="/uniqueleverage/4.jpg"
                                alt="Marketplace automation posting, renewing, and de-listing inventory"
                                width={1200}
                                height={800}
                                className="rounded-xl"
                            />
                            <figcaption>
                                Posting, renewing, and de-listing handled automatically across the full feed.
                            </figcaption>
                        </figure>

                        <hr />

                        {/* 05 - Attribution & CRM */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            05 - Attribution &amp; CRM
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            Every lead, tied to{" "}
                            <em className="text-brand-secondary italic">an exact VIN.</em>
                        </h2>
                        <p className="fade-up">
                            A Meta Pixel and CAPI tracking layer connects every click, form submission, and call
                            back to the specific vehicle that drove it. For the first time, a dealer can see not
                            just <em>that</em> a lead came in, but which car on the lot earned it - turning a guess
                            into real, VIN-level attribution.
                        </p>
                        <p className="fade-up">
                            And nothing slips. Every lead - a Marketplace message, a credit application, a booking,
                            a callback - becomes a <strong>CRM contact automatically</strong>, with an instant
                            auto-reply SMS so the conversation starts the moment interest appears. The
                            lead-to-follow-up gap, where most deals quietly die, just closes.
                        </p>

                        <figure className="fade-up">
                            <Image
                                src="/uniqueleverage/docs.png"
                                alt="Unique Leverage platform documentation and Business Manager"
                                width={1200}
                                height={750}
                                className="rounded-xl"
                            />
                            <figcaption>
                                Platform documentation and the Business Manager that ties tracking, leads, and the
                                CRM together.
                            </figcaption>
                        </figure>

                        <hr />

                        {/* 06 - The Result */}
                        <p className="fade-up not-prose text-sm font-semibold text-tertiary md:text-md">
                            - The result -
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            One platform that{" "}
                            <em className="text-brand-secondary italic">replaces the whole stack.</em>
                        </h2>
                        <p className="fade-up">
                            Unique Leverage collapses several disconnected tools into one system, purpose-built for
                            how dealers actually sell:
                        </p>

                        <ul className="fade-up not-prose mt-6 flex flex-col gap-3 md:mt-8">
                            {replacedTools.map((item, i) => (
                                <li
                                    key={i}
                                    className="rounded-r-md border-l-2 border-brand-secondary bg-secondary px-5 py-4 text-sm leading-relaxed text-tertiary md:text-md [&_strong]:font-medium [&_strong]:text-primary"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <p className="fade-up">
                            Building it meant solving three hard problems well: integrating third-party APIs -
                            especially Meta&apos;s - reliably enough to run without supervision; designing automation
                            that operates unattended at scale without breaking; and applying LLMs to a concrete
                            revenue task rather than a demo. Per-vehicle ad generation isn&apos;t AI for its own
                            sake - it&apos;s the model doing real work that directly helps a car get sold.
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
                        Arrow Market -{" "}
                        <em className="text-brand-secondary italic">Commerce, reimagined.</em>
                    </h2>
                    <div className="mt-8 flex flex-wrap justify-center gap-3 md:mt-10">
                        <Button href="/work/arrow-market" size="lg" iconTrailing={ArrowUpRight}>
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
