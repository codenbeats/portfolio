"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { useFadeUp } from "@/hooks/use-fade-up";

const tags = ["Python", "FastAPI", "Playwright", "Lighthouse", "LLMs", "PostgreSQL", "React", "Celery"];

const metaRows = [
    { label: "Role", value: "AI Specialist / Full-Stack Engineer" },
    { label: "Type", value: "SaaS Platform" },
    { label: "Stack", value: "Python · FastAPI · Playwright · LLMs · React" },
    { label: "Scope", value: "Crawling · Scoring · AI Insights · Outreach" },
    { label: "Live", value: "reviewmysite.app" },
];

const dimensions = [
    {
        num: "- i.",
        title: "SEO",
        body: (
            <>
                Meta tags, heading structure, canonical signals, sitemap and robots, and crawlability. Parsed
                directly from the rendered DOM so single-page apps are graded on what users actually see.
            </>
        ),
    },
    {
        num: "- ii.",
        title: "Performance",
        body: (
            <>
                Lighthouse-driven measurement of real loading behavior - render-blocking resources, payload weight,
                and time-to-interactive across the crawled pages.
            </>
        ),
    },
    {
        num: "- iii.",
        title: "Security",
        body: (
            <>
                HTTPS enforcement, security headers (CSP, HSTS, X-Frame-Options), and exposed-resource checks. A
                missing header set is exactly what drives a score to <em>zero</em> until it&apos;s fixed.
            </>
        ),
    },
    {
        num: "- iv.",
        title: "UX",
        body: (
            <>
                Core Web Vitals and accessibility signals - layout stability, tap targets, contrast, and semantic
                structure - measured per page, not just on the homepage.
            </>
        ),
    },
    {
        num: "- v.",
        title: "AI Visibility",
        body: (
            <>
                The new axis. How citeable and discoverable the content is to LLMs - structured data, clear
                answer-shaped content, and machine-readable context that earns citations in AI search.
            </>
        ),
    },
    {
        num: "- vi.",
        title: "Brand Health",
        body: (
            <>
                Trust and consistency signals - naming, messaging, and presentation coherence across pages that
                shape how credible a site feels at a glance.
            </>
        ),
    },
];

const outreachItems = [
    <>
        <strong>Leads &amp; Pipeline</strong> - every audited domain becomes a tracked record with industry, last
        audit, and stage.
    </>,
    <>
        <strong>Insights &amp; Signals</strong> - recurring issues surfaced across a portfolio of sites, not one at a
        time.
    </>,
    <>
        <strong>Brand Profile</strong> - a synthesized view an LLM can reference to personalize outreach.
    </>,
    <>
        <strong>Emails</strong> - findings turned into a concrete, specific opening message instead of a generic
        pitch.
    </>,
];

function ImageFigure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
    return (
        <figure>
            <div className="overflow-hidden rounded-xl bg-black">
                <Image
                    src={src}
                    alt={alt}
                    width={1200}
                    height={675}
                    className="aspect-[16/9] w-full object-cover"
                />
            </div>
            <figcaption className="not-prose mt-3 text-sm text-tertiary italic md:text-md">{caption}</figcaption>
        </figure>
    );
}

export function SiteAuditorPage() {
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
                            Site Auditor
                        </h1>
                        <p className="fade-up mt-4 font-[family-name:var(--font-serif)] text-lg italic text-brand-secondary md:mt-6 md:text-xl">
                            Every page, scored - and explained by AI.
                        </p>
                        <p className="fade-up mt-4 text-md text-tertiary md:mt-6 md:max-w-120 md:text-lg">
                            A full-stack platform that crawls an entire website and grades it across SEO,
                            performance, security, UX, AI visibility, and brand health - then turns raw findings into
                            prioritized, plain-English recommendations.
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
                                href="https://www.reviewmysite.app/"
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
                        src="/siteautitor/audit-overview.png"
                        alt="Site Auditor dashboard showing a six-dimension audit of bigrentals.com"
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
                        {/* 01 - Problem */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            01 - The Problem
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            Audit tools check one thing and{" "}
                            <em className="text-brand-secondary italic">dump a wall of metrics.</em>
                        </h2>
                        <p className="fade-up">
                            Most audit tools are single-purpose: one checks SEO, another checks speed, a third scans
                            headers. Each hands back a pile of raw numbers and leaves you to make sense of it. Teams
                            stare at a dashboard and still don&apos;t know what to fix first.
                        </p>
                        <p className="fade-up">
                            Worse, nothing explains <em>why</em> an issue matters or <em>how</em> to resolve it. A red
                            metric is a symptom, not a plan. The gap between &quot;here&apos;s a score&quot; and
                            &quot;here&apos;s what to do Monday morning&quot; is where most tools quietly give up.
                        </p>
                        <p className="fade-up">
                            And there&apos;s a brand-new dimension nobody was measuring. As AI search grows - LLMs
                            citing sources directly in their answers -{" "}
                            <strong>AI visibility</strong> has become a real traffic channel. If a model can&apos;t
                            parse and cite your content, you&apos;re invisible in a place that didn&apos;t exist a
                            year ago.
                        </p>

                        <hr />

                        {/* 02 - Crawler */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            02 - The Crawler
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            A headless browser that{" "}
                            <em className="text-brand-secondary italic">walks the whole site.</em>
                        </h2>
                        <p className="fade-up">
                            The foundation is a Playwright-driven crawler that renders each page in a real headless
                            browser - executing JavaScript so single-page apps and dynamically loaded content are
                            captured exactly as a user (or a search engine) would see them.
                        </p>
                        <p className="fade-up">
                            For every page it records HTTP status, load time, transferred size, and resource count.
                            It&apos;s built to crawl 20+ pages per site, manage work through background workers with{" "}
                            <strong>Celery</strong> so long audits never block the API, and persist every result in{" "}
                            <strong>PostgreSQL</strong> for repeatable, comparable runs.
                        </p>

                        <div className="fade-up not-prose">
                            <ImageFigure
                                src="/siteautitor/audit-overview.png"
                                alt="Audit overview dashboard with six score gauges and a per-page table"
                                caption="The audit overview - six dimension gauges plus a per-page table with load times, sizes, and resource counts."
                            />
                        </div>

                        <hr />

                        {/* 03 - Scoring */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            03 - Six-Dimension Scoring
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            One crawl,{" "}
                            <em className="text-brand-secondary italic">six independent scores.</em>
                        </h2>
                        <p className="fade-up">
                            Raw crawl data feeds six independent scoring engines. Each produces a 0-100 grade with
                            color-coded severity, so a critical failure - like a security score of zero - stands out
                            instantly instead of hiding inside a spreadsheet.
                        </p>

                        <div className="fade-up not-prose flex flex-col">
                            {dimensions.map((dim, i, arr) => (
                                <div
                                    key={dim.title}
                                    className={`border-t border-secondary py-7 ${i === arr.length - 1 ? "border-b" : ""}`}
                                >
                                    <p className="mb-2 font-[family-name:var(--font-serif)] text-sm tracking-wide text-brand-secondary italic">
                                        {dim.num}
                                    </p>
                                    <h3 className="mb-2.5 font-[family-name:var(--font-serif)] text-md font-bold text-primary md:text-lg">
                                        {dim.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-tertiary md:text-md [&_em]:text-primary [&_em]:italic">
                                        {dim.body}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <hr />

                        {/* 04 - AI Insights */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            04 - AI-Powered Insights
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            The differentiator:{" "}
                            <em className="text-brand-secondary italic">findings that explain themselves.</em>
                        </h2>
                        <p className="fade-up">
                            A score tells you something is wrong. It doesn&apos;t tell you what to do. That&apos;s the
                            job of the LLM layer - and it&apos;s what sets this platform apart from every metrics
                            dashboard.
                        </p>
                        <p className="fade-up">
                            The model reads the raw findings across all six dimensions and produces a{" "}
                            <strong>prioritized, plain-English report</strong>: what each issue means, why it matters
                            for this specific site, and the concrete next action. Critical, high-impact fixes rise to
                            the top; cosmetic ones sink. The output reads like advice from a senior consultant, not a
                            log file.
                        </p>

                        <div className="fade-up not-prose">
                            <ImageFigure
                                src="/siteautitor/report.png"
                                alt="Printable website audit report for bigrentals.com with six score rings"
                                caption="The printable Website Audit Report - six score rings, 20 pages audited in 1061s, and grouped issue counts ready to hand to a client."
                            />
                        </div>

                        <hr />

                        {/* 05 - Outreach */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            05 - From Audit to Outreach
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            An audit is the start of a{" "}
                            <em className="text-brand-secondary italic">conversation, not a PDF.</em>
                        </h2>
                        <p className="fade-up">
                            The platform doesn&apos;t stop at a single report. It tracks many domains at once - each
                            with its industry, last-audit date, and history - and groups them so an agency or sales
                            team can work a whole portfolio instead of one URL at a time.
                        </p>

                        <div className="fade-up not-prose">
                            <ImageFigure
                                src="/siteautitor/sites.png"
                                alt="Sites view listing all tracked domains with industry, last audit, and created date"
                                caption="The Sites view - every tracked domain with industry, last audit, and created date in one place."
                            />
                        </div>

                        <p className="fade-up">
                            From there, audits feed an outreach and intelligence layer that turns insight into action:
                        </p>

                        <ul className="fade-up not-prose mt-6 flex flex-col gap-3 md:mt-8">
                            {outreachItems.map((item, i) => (
                                <li
                                    key={i}
                                    className="rounded-r-md border-l-2 border-brand-secondary bg-secondary px-5 py-4 text-sm leading-relaxed text-tertiary md:text-md [&_strong]:font-medium [&_strong]:text-primary"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <hr />

                        {/* 06 - Result */}
                        <p className="fade-up not-prose text-sm font-semibold text-tertiary md:text-md">
                            - The result -
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            From URL to action plan in{" "}
                            <em className="text-brand-secondary italic">~17 minutes.</em>
                        </h2>
                        <p className="fade-up">
                            One platform takes a bare URL and returns a prioritized action plan - 20 pages crawled in
                            1061 seconds, scored across six dimensions including the new AI-visibility axis, with AI
                            explanations that make every finding actionable.
                        </p>
                        <p className="fade-up">
                            The hard part wasn&apos;t any single feature - it was making the whole pipeline{" "}
                            <strong>reliable and repeatable</strong>. Crawling infrastructure that handles real,
                            messy sites without falling over, and an LLM evaluation layer engineered to produce
                            consistent, trustworthy output instead of plausible-sounding noise. That combination -
                            dependable data plus genuinely useful explanation - is what turns an audit from a report
                            into a decision.
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
                        Unique Leverage -{" "}
                        <em className="text-brand-secondary italic">A different kind of build.</em>
                    </h2>
                    <div className="mt-8 flex flex-wrap justify-center gap-3 md:mt-10">
                        <Button href="/work/unique-leverage" size="lg" iconTrailing={ArrowUpRight}>
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
