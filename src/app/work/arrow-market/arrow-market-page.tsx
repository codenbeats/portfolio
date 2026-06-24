"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { useFadeUp } from "@/hooks/use-fade-up";

const metaRows = [
    { label: "Role", value: "Frontend / Web3 Engineer" },
    { label: "Type", value: "DeFi Trading dApp" },
    { label: "Stack", value: "React · TypeScript · ethers.js · Avalanche" },
    { label: "Live", value: "arrow.markets" },
];

const tags = ["React", "TypeScript", "Web3", "Avalanche", "ethers.js", "WebSockets", "Recharts", "Tailwind"];

export function ArrowMarketPage() {
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
                            Arrow Markets
                        </h1>
                        <p className="fade-up mt-4 font-[family-name:var(--font-serif)] text-lg italic text-brand-secondary md:mt-6 md:text-xl">
                            Centralized-exchange UX, on-chain settlement.
                        </p>
                        <p className="fade-up mt-4 text-md text-tertiary md:mt-6 md:max-w-120 md:text-lg">
                            A hybrid web3 options trading interface on Avalanche - real-time options chains, payoff
                            visualizations, and a strategy-based position builder that makes DeFi options feel as
                            smooth as Robinhood.
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

                        <div className="fade-up mt-8 md:mt-10">
                            <Button
                                href="https://arrow.markets/"
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
                        src="/arrowmarket/position-builder.png"
                        alt="Arrow Markets position builder showing a Long Put with leverage, max profit/risk, and a payoff chart"
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
                        {/* 01 - The Challenge */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            01 - The Challenge
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            On-chain options are powerful, but historically{" "}
                            <em className="text-brand-secondary italic">brutal to use.</em>
                        </h2>
                        <p className="fade-up">
                            Options give traders precise, leveraged exposure - but in DeFi they&apos;ve been
                            notoriously painful: confusing chains, slow quotes, illiquid markets, and risk that&apos;s
                            terrifyingly easy to misjudge. Most on-chain options venues feel like a spreadsheet bolted
                            onto a wallet.
                        </p>
                        <p className="fade-up">
                            <strong>Arrow Markets</strong> is a first-of-its-kind hybrid web3 options protocol on the
                            Avalanche C-Chain, built around one belief - borrowed from its namesake, economist
                            Kenneth Arrow - that markets work best when they&apos;re both efficient and accessible.
                            Its tagline says it plainly: <em>&quot;Leverage without Liquidation.&quot;</em>
                        </p>
                        <p className="fade-up">
                            The architecture is deliberately split. Pricing and hedging run through a network of
                            off-chain market makers via a <strong>Request-for-Execution (RFE)</strong> system - an
                            evolution of the classic RFQ - while settlement, ownership, and transfers all happen
                            on-chain. The goal for the frontend: a hybrid protocol whose interface is polished enough
                            to rival a centralized exchange. Backed by Framework Ventures and Delphi Ventures, the
                            bar was high.
                        </p>

                        <hr />

                        {/* 02 - Lite Mode */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            02 - Lite Mode
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            For most people, the answer is{" "}
                            <em className="text-brand-secondary italic">&quot;hide the complexity.&quot;</em>
                        </h2>
                        <p className="fade-up">
                            Lite Mode is a beginner-friendly, strategy-based flow. Instead of asking a newcomer to
                            assemble option legs by hand, it starts from a simple question - what&apos;s your outlook
                            on the market? - and recommends an option strategy that fits. The mechanics stay hidden;
                            the decision stays human.
                        </p>
                        <p className="fade-up">
                            Behind that simplicity is real engineering: translating a directional view into concrete
                            strategies, surfacing the trade-offs in plain language, and keeping the flow fast enough
                            that it never feels like you&apos;re wrestling with a protocol.
                        </p>

                        <figure className="fade-up not-prose my-8 md:my-12">
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full rounded-2xl"
                            >
                                <source src="/arrowmarket/lite-mode.mp4" type="video/mp4" />
                            </video>
                            <figcaption className="mt-3 text-sm text-tertiary italic md:text-md">
                                Lite Mode - a simplified, recommendation-driven flow that turns a market outlook into a
                                ready-to-trade option strategy.
                            </figcaption>
                        </figure>

                        <hr />

                        {/* 03 - The Position Builder */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            03 - The Position Builder
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            Every trade, shown as a{" "}
                            <em className="text-brand-secondary italic">picture of its risk.</em>
                        </h2>
                        <p className="fade-up">
                            The position builder is the heart of the interface. Pick a Long Put or a spread, and the
                            panel comes alive: live leverage (4.16x on the card shown), max profit ($3,940.79), max
                            risk ($759.21), and a total cost that already folds in fees. Alongside the numbers sits an
                            interactive payoff chart with a clearly marked breakeven, so traders can <em>see</em> the
                            shape of a position before committing capital.
                        </p>
                        <p className="fade-up">
                            That meant building financial payoff diagrams in the browser with{" "}
                            <strong>Recharts and custom SVG</strong>, formatting precise on-chain numbers without
                            floating-point drift, and reflecting market-maker quotes in real time - recomputing
                            payoffs and risk metrics on every quote update without ever blocking the UI.
                        </p>

                        <figure className="fade-up not-prose my-8 md:my-12">
                            <Image
                                src="/arrowmarket/position-builder.png"
                                alt="Long Put position card with leverage, max profit and risk, an expected P/L payoff chart, and a strategy rail"
                                width={1200}
                                height={675}
                                className="w-full rounded-2xl"
                            />
                            <figcaption className="mt-3 text-sm text-tertiary italic md:text-md">
                                The position builder - leverage, max profit/loss, total cost, and an expected-P/L
                                payoff chart with breakeven, beside a list of put-debit-spread strategies.
                            </figcaption>
                        </figure>

                        <hr />

                        {/* 04 - Pro Mode & the Options Chain */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            04 - Pro Mode &amp; the Options Chain
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            And for the pros, the{" "}
                            <em className="text-brand-secondary italic">full chain.</em>
                        </h2>
                        <p className="fade-up">
                            Pro Mode exposes everything. The full options chain spans Strike, Delta, Theta, Gamma,
                            Open Interest, Leverage, and live Sell/Buy prices across expiries - the kind of dense,
                            data-rich grid serious options traders expect, right down to the AVAX rebate banner.
                        </p>
                        <p className="fade-up">
                            The hard part is that none of it is static.{" "}
                            <strong>Live quotes stream over WebSockets</strong> from the RFE market-maker network, so
                            the challenge was keeping a wide grid responsive under rapid updates - diffing incoming
                            quotes, batching renders, and animating only what changed, so the table stays readable
                            instead of flickering on every tick.
                        </p>

                        <figure className="fade-up not-prose my-8 md:my-12">
                            <Image
                                src="/arrowmarket/options-chain.png"
                                alt="Pro Mode options chain with CALL/PUT tabs, expiry, and columns for Strike, Delta, Theta, Gamma, Open Interest, Leverage, Sell and Buy"
                                width={1200}
                                height={675}
                                className="w-full rounded-2xl"
                            />
                            <figcaption className="mt-3 text-sm text-tertiary italic md:text-md">
                                Pro Mode - the full options chain with greeks, open interest, and live sell/buy prices,
                                plus a position summary rail.
                            </figcaption>
                        </figure>

                        <hr />

                        {/* 05 - Wallet & On-Chain Settlement */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            05 - Wallet &amp; On-Chain Settlement
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            Off-chain speed, <em className="text-brand-secondary italic">on-chain truth.</em>
                        </h2>
                        <p className="fade-up">
                            This is where the hybrid model becomes real. The interface handles multi-chain wallet
                            connection across Avalanche, Arbitrum, and Berachain, then takes the quote a user accepts
                            and turns it into an <strong>Open Position</strong> transaction signed in their wallet.
                        </p>
                        <p className="fade-up">
                            Getting that right meant handling slippage tolerance against fast-moving quotes, surfacing
                            AVAX gas and rebates clearly, and making on-chain ownership and transfer of option
                            contracts feel like a normal action rather than a leap of faith - all with{" "}
                            <strong>ethers.js</strong> wiring the UI to the chain.
                        </p>

                        <figure className="fade-up not-prose my-8 md:my-12">
                            <Image
                                src="/arrowmarket/spread.png"
                                alt="Arrow Markets trade builder showing a spread being configured before on-chain settlement"
                                width={1200}
                                height={675}
                                className="w-full rounded-2xl"
                            />
                            <figcaption className="mt-3 text-sm text-tertiary italic md:text-md">
                                The spread builder - configuring a multi-leg position before it&apos;s opened and
                                settled on-chain.
                            </figcaption>
                        </figure>

                        <hr />

                        {/* 06 - The Result */}
                        <p className="fade-up not-prose text-sm font-semibold text-tertiary md:text-md">
                            - The Result -
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            DeFi options that finally feel like a{" "}
                            <em className="text-brand-secondary italic">centralized exchange.</em>
                        </h2>
                        <p className="fade-up">
                            The end product is an options platform that genuinely feels like a centralized exchange -
                            fast quotes, clear risk, and two modes for two audiences: Lite for newcomers, Pro for
                            traders who want the whole chain. The hybrid architecture stays invisible to the user;
                            what they feel is speed and confidence.
                        </p>
                        <p className="fade-up">
                            Looking back, the real work was on the frontend: streaming real-time data without melting
                            the UI, doing precise financial math in the browser, and designing Web3 UX that
                            doesn&apos;t scare people away. Done well, &quot;on-chain&quot; stops being a warning label
                            and just becomes how it works.
                        </p>

                        <div className="fade-up not-prose mt-8 md:mt-10">
                            <Button
                                href="https://arrow.markets"
                                target="_blank"
                                rel="noopener noreferrer"
                                size="lg"
                                iconTrailing={ArrowUpRight}
                            >
                                Visit Arrow Markets
                            </Button>
                        </div>
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
                        OG Edge -{" "}
                        <em className="text-brand-secondary italic">Edge infrastructure, end to end.</em>
                    </h2>
                    <div className="mt-8 flex flex-wrap justify-center gap-3 md:mt-10">
                        <Button href="/work/ogedge" size="lg" iconTrailing={ArrowUpRight}>
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
