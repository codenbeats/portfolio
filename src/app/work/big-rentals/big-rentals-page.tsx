"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { useFadeUp } from "@/hooks/use-fade-up";

const metaRows = [
    { label: "Role", value: "Full-Stack Developer" },
    { label: "Type", value: "Rental Marketplace" },
    { label: "Stack", value: "Next.js · PostgreSQL · Prisma" },
    { label: "Scope", value: "Search · Listings · Programmatic SEO" },
    { label: "Live", value: "bigrentals.com" },
];

export function BigRentalsPage() {
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
                            BigRentals
                        </h1>
                        <p className="fade-up mt-4 font-[family-name:var(--font-serif)] text-lg italic text-brand-secondary md:mt-6 md:text-xl">
                            The right trailer, in the right city.
                        </p>
                        <p className="fade-up mt-4 text-md text-tertiary md:mt-6 md:max-w-120 md:text-lg">
                            A trailer and equipment rental marketplace with location-aware search, date-range
                            availability, and programmatically generated SEO landing pages that rank across hundreds
                            of city-and-equipment combinations.
                        </p>

                        <div className="fade-up mt-6 flex flex-wrap gap-2 md:mt-8">
                            {[
                                "Next.js",
                                "TypeScript",
                                "PostgreSQL",
                                "Prisma",
                                "Programmatic SEO",
                                "Tailwind",
                                "Vercel",
                                "REST API",
                            ].map((tag) => (
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
                                href="http://bigrentals.com/"
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
                        src="/bigrentals/hero.png"
                        alt="BigRentals trailer rental marketplace homepage"
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
                            Equipment rental is{" "}
                            <em className="text-brand-secondary italic">intensely local</em>.
                        </h2>
                        <p className="fade-up">
                            Someone in Los Angeles searching for a &quot;dump trailer rental&quot; doesn&apos;t want
                            options three states away - they want nearby inventory and instant confirmation that it&apos;s
                            available on the dates they need. The whole experience hinges on proximity and timing.
                        </p>
                        <p className="fade-up">
                            That creates two hard problems at once. The marketplace has to{" "}
                            <strong>surface the right equipment in the right city</strong> within seconds, and it has to
                            be <strong>findable on Google</strong> for thousands of long-tail queries like &quot;flatbed
                            trailer rental in San Diego&quot; - searches that no single hand-written page could ever
                            cover.
                        </p>

                        <hr />

                        {/* 02 - Search & Availability */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            02 - Search &amp; Availability
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            Search built around{" "}
                            <em className="text-brand-secondary italic">place and time</em>.
                        </h2>
                        <p className="fade-up">
                            The search experience is organized around the three things that actually matter to a renter:
                            where they are, when they need it, and what they&apos;re after. The bar combines a{" "}
                            <strong>rental location</strong>, a <strong>pickup and return date range</strong>, and a{" "}
                            <strong>rental category</strong> - then queries inventory by proximity and date
                            availability in one pass.
                        </p>

                        <figure className="fade-up not-prose my-8 md:my-12">
                            <Image
                                src="/bigrentals/hero.png"
                                alt="BigRentals homepage with location and date search bar and trailer category tabs"
                                width={1200}
                                height={675}
                                className="w-full rounded-xl border border-secondary"
                            />
                            <figcaption className="mt-3 text-center text-sm text-tertiary">
                                The search bar pairs location and a pickup/return date range with category tabs - All
                                Trailers, Enclosed, Flatbed, Car Hauler, Utility, Dump - for fast filtering.
                            </figcaption>
                        </figure>

                        <p className="fade-up">
                            Category tabs let renters narrow the catalog instantly without re-running a full search,
                            while the date range quietly filters out anything already booked. The goal was to make the
                            common case - &quot;I need this kind of trailer, here, on these days&quot; - feel like a
                            single, obvious motion.
                        </p>

                        <hr />

                        {/* 03 - Listings & Detail */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            03 - Listings &amp; Detail
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            From a grid of options to{" "}
                            <em className="text-brand-secondary italic">one confident booking</em>.
                        </h2>
                        <p className="fade-up">
                            Results render as trailer cards that lead with what renters compare on:{" "}
                            <strong>capacity, dimensions, and weekly pricing</strong> ($650/week and up). Each card is
                            scannable enough to shortlist in seconds, and a click opens a detail page with full specs and
                            a booking flow tied to the selected dates.
                        </p>

                        <figure className="fade-up not-prose my-8 md:my-12">
                            <Image
                                src="/bigrentals/listings.png"
                                alt="BigRentals listing results grid with trailer cards"
                                width={1200}
                                height={675}
                                className="w-full rounded-xl border border-secondary"
                            />
                            <figcaption className="mt-3 text-center text-sm text-tertiary">
                                Listing results - trailer cards surface capacity, dimensions, and weekly pricing at a
                                glance.
                            </figcaption>
                        </figure>

                        <figure className="fade-up not-prose my-8 md:my-12">
                            <Image
                                src="/bigrentals/detail.png"
                                alt="BigRentals trailer detail page with specs and booking"
                                width={1200}
                                height={675}
                                className="w-full rounded-xl border border-secondary"
                            />
                            <figcaption className="mt-3 text-center text-sm text-tertiary">
                                The detail view carries full specifications and a date-aware booking flow.
                            </figcaption>
                        </figure>

                        <p className="fade-up">
                            Underneath, the hard part was the data model. Equipment, locations, and{" "}
                            <strong>availability windows</strong> are modeled in PostgreSQL through Prisma, so a single
                            query can answer &quot;which trailers of this type are within range of this city and free on
                            these dates?&quot; Getting those relationships right is what makes the search feel instant
                            instead of brittle.
                        </p>

                        <hr />

                        {/* 04 - Programmatic SEO */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            04 - Programmatic SEO
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            The <em className="text-brand-secondary italic">growth engine</em>.
                        </h2>
                        <p className="fade-up">
                            The biggest lever wasn&apos;t a feature renters click - it was pages they find. BigRentals
                            programmatically generates a landing page for{" "}
                            <strong>every city × equipment-type combination</strong>, like{" "}
                            <code>/locations/us/california/los-angeles/trailer-rentals</code>. One template, fed by the
                            data model, becomes hundreds of pages that each target a specific local query.
                        </p>
                        <p className="fade-up">
                            Each page ships with <strong>structured data</strong>, fast static rendering, and{" "}
                            <strong>clean internal linking</strong> between nearby cities and related categories - so
                            search engines can crawl the whole network efficiently and the site ranks for hundreds of
                            long-tail local queries it would never have covered by hand.
                        </p>

                        <hr />

                        {/* 05 - Performance */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            05 - Performance
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            Fast pages are{" "}
                            <em className="text-brand-secondary italic">ranking pages</em>.
                        </h2>
                        <p className="fade-up">
                            Speed isn&apos;t just polish here - it feeds directly back into rankings. The SEO landing
                            pages use <strong>static generation and ISR</strong> so they serve instantly and stay fresh
                            as inventory changes, while image optimization keeps the visually heavy catalog light.
                        </p>
                        <p className="fade-up">
                            The challenge was keeping large catalog pages both <strong>quick and crawlable</strong> at
                            scale - fast load times for renters, lean markup and predictable rendering for crawlers. Good
                            performance and good SEO ended up being the same problem solved from two angles.
                        </p>

                        <hr />

                        {/* 06 - The Result */}
                        <p className="fade-up not-prose text-sm font-semibold text-tertiary md:text-md">
                            - The result -
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            Local matches in seconds, traffic that{" "}
                            <em className="text-brand-secondary italic">compounds</em>.
                        </h2>
                        <p className="fade-up">
                            BigRentals matches renters to nearby inventory almost as fast as they can type a city, and
                            quietly compounds organic traffic through programmatic SEO in the background. The thing I&apos;m
                            most proud of is how the pieces reinforce each other.
                        </p>
                        <p className="fade-up">
                            A solid data model, location-aware search, and SEO-driven page generation aren&apos;t three
                            separate features - they&apos;re one system. Get the model right, and search, listings, and
                            thousands of ranking pages all fall out of it. That&apos;s what made building this at scale
                            feel less like brute force and more like leverage.
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
                        Server Monitor -{" "}
                        <em className="text-brand-secondary italic">Back to the start.</em>
                    </h2>
                    <div className="mt-8 flex flex-wrap justify-center gap-3 md:mt-10">
                        <Button href="/work/server-monitor" size="lg" iconTrailing={ArrowUpRight}>
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
