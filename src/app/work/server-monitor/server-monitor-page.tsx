"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { useFadeUp } from "@/hooks/use-fade-up";

const HERO_IMG = "/severmonitor/hero.webp";

const tags = ["Prometheus", "Grafana", "Node Exporter", "Docker", "Linux", "AWS", "GCP", "Hetzner"];

const metaRows = [
    { label: "Role", value: "Full-Stack Developer / DevOps" },
    { label: "Type", value: "Infrastructure & Observability" },
    { label: "Stack", value: "Prometheus · Grafana · Node Exporter · Docker · Linux" },
    { label: "Scope", value: "Multi-cloud (AWS · GCP · Hetzner)" },
];

export function ServerMonitorPage() {
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
                            Cloud Monitoring Dashboard
                        </h1>
                        <p className="fade-up mt-4 font-[family-name:var(--font-serif)] text-lg italic text-brand-secondary md:mt-6 md:text-xl">
                            Know your servers are healthy - before users do.
                        </p>
                        <p className="fade-up mt-4 text-md text-tertiary md:mt-6 md:max-w-120 md:text-lg">
                            A centralized monitoring stack that collects metrics from dev, prod, and multi-cloud
                            servers through Node Exporter, stores them in Prometheus, and visualizes everything in
                            Grafana.
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
                    </div>

                    <Image
                        src={HERO_IMG}
                        alt="Cloud Monitoring Dashboard - Prometheus + Grafana + Node Exporter"
                        width={1200}
                        height={750}
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
                            Servers fail{" "}
                            <em className="text-brand-secondary italic">silently</em>.
                        </h2>
                        <p className="fade-up">
                            Without centralized monitoring, you find out about a server in trouble the worst possible
                            way: from the people using it. A disk fills up overnight, a runaway process pins the CPU
                            at 100%, memory leaks until the kernel starts killing things - and the first signal you
                            get is an <strong>angry message</strong>, not a clean alert from your own tooling.
                        </p>
                        <p className="fade-up">
                            The problem compounds across providers. Dev runs on one box, production on another, and
                            the fleet is spread across <strong>AWS, GCP, and Hetzner</strong>. Each cloud has its own
                            console, its own login, its own way of showing graphs. There is no{" "}
                            <strong>single pane of glass</strong> - just a dozen tabs that each tell you a fraction of
                            the story.
                        </p>
                        <p className="fade-up">
                            I wanted the opposite of that: one place to open, where the health of every machine I run
                            is visible at a glance, and where problems announce themselves before they ever reach a
                            user.
                        </p>

                        <hr />

                        {/* 02 - The Architecture */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            02 - The Architecture
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            One monitor server.{" "}
                            <em className="text-brand-secondary italic">The whole fleet in view.</em>
                        </h2>
                        <p className="fade-up">
                            The design follows a classic, dependable pattern: a single dedicated{" "}
                            <strong>monitoring server</strong> that pulls metrics from everything else. Every machine
                            in the fleet runs <strong>Node Exporter</strong>, a lightweight agent that exposes
                            hardware and OS metrics - CPU, memory, disk, network, load - on port{" "}
                            <strong>:9100</strong>.
                        </p>
                        <p className="fade-up">
                            <strong>Prometheus</strong>, running on <strong>:9090</strong> on the monitor server,
                            scrapes every one of those targets on a fixed interval of a few seconds and stores the
                            results as <strong>time-series data</strong>. Because it pulls rather than waiting to be
                            pushed to, adding a new server is just one more line in the scrape config.
                        </p>
                        <p className="fade-up">
                            <strong>Grafana</strong>, on <strong>:3000</strong>, reads from Prometheus as its data
                            source and turns those raw series into live dashboards and alerts. The monitor server
                            even <strong>monitors itself</strong> - it runs its own Node Exporter on localhost, so the
                            watchdog never becomes a blind spot.
                        </p>

                        <figure className="fade-up not-prose my-10 md:my-12">
                            <Image
                                src="/severmonitor/architecture.webp"
                                alt="Architecture diagram: Prometheus scraping Node Exporter on port 9100 across Dev, Prod, Monitor, AWS, GCP, and Hetzner servers, with Grafana on 3000 and Prometheus on 9090"
                                width={1200}
                                height={700}
                                className="w-full rounded-xl border border-secondary"
                            />
                            <figcaption className="mt-4 text-center text-sm text-tertiary md:text-md">
                                Node Exporter on every host exposes metrics on :9100. Prometheus (:9090) scrapes them
                                all and Grafana (:3000) renders the live view.
                            </figcaption>
                        </figure>

                        <hr />

                        {/* 03 - Security & Access */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            03 - Security & Access
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            Metrics are useful internally -{" "}
                            <em className="text-brand-secondary italic">and dangerous if exposed.</em>
                        </h2>
                        <p className="fade-up">
                            A Node Exporter endpoint hands out a detailed map of a machine: its processes, its load,
                            its filesystems. That is exactly what you want your monitor server to see, and exactly
                            what you never want open to the public internet. So <strong>port discipline</strong> is
                            part of the design, not an afterthought.
                        </p>
                        <p className="fade-up">
                            Firewall rules keep <strong>:9100</strong> reachable <strong>only from the monitor
                            server&apos;s address</strong>, never from anywhere else. Prometheus on{" "}
                            <strong>:9090</strong> stays <strong>fully internal</strong> - there is no reason for it to
                            be reachable from outside. Only Grafana on <strong>:3000</strong> is exposed, and only
                            behind <strong>secure, authenticated access</strong>. SSH on <strong>:22</strong> is used
                            for setup and stays locked down to known keys.
                        </p>
                        <p className="fade-up">
                            The rule of thumb is simple:{" "}
                            <strong>expose the dashboard, hide the plumbing.</strong> Anything that reveals internal
                            detail stays behind the firewall, and the one door that is open is the one with a lock on
                            it.
                        </p>

                        <hr />

                        {/* 04 - The Dashboards */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            04 - The Dashboards
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            Raw metrics are noise.{" "}
                            <em className="text-brand-secondary italic">Dashboards are answers.</em>
                        </h2>
                        <p className="fade-up">
                            The first dashboard is <strong>Node Exporter Full</strong> - a deep, per-server view for
                            when you need to actually diagnose something. It breaks a single machine down into
                            everything that matters: <strong>CPU busy</strong> and <strong>system load</strong>,{" "}
                            <strong>RAM used</strong> and <strong>SWAP</strong>, <strong>root filesystem</strong>{" "}
                            usage, plus live graphs of <strong>network traffic</strong> and{" "}
                            <strong>disk space</strong> over time.
                        </p>

                        <figure className="fade-up not-prose my-10 md:my-12">
                            <Image
                                src="/severmonitor/node-exporter.webp"
                                alt="Grafana Node Exporter Full dashboard showing CPU, RAM and disk gauges alongside network traffic graphs"
                                width={1200}
                                height={700}
                                className="w-full rounded-xl border border-secondary"
                            />
                            <figcaption className="mt-4 text-center text-sm text-tertiary md:text-md">
                                The Node Exporter Full dashboard - the detail view for diagnosing a single host.
                            </figcaption>
                        </figure>

                        <p className="fade-up">
                            The second dashboard is the one I keep open all day: an{" "}
                            <strong>at-a-glance server status board</strong>. Instead of dense graphs, it leads with
                            large <strong>UP / DOWN</strong> panels for each server, so the most important question -{" "}
                            <em>&quot;is everything alive?&quot;</em> - is answered in a single glance. Below that sit
                            compact <strong>CPU, memory, and disk gauges</strong> and per-server{" "}
                            <strong>uptime</strong>, color-coded so anything unhealthy jumps out.
                        </p>

                        <figure className="fade-up not-prose my-10 md:my-12">
                            <Image
                                src="/severmonitor/server-status.webp"
                                alt="Grafana dashboard with large UP server status panels, CPU, memory and disk gauges, and uptime per server"
                                width={1200}
                                height={700}
                                className="w-full rounded-xl border border-secondary"
                            />
                            <figcaption className="mt-4 text-center text-sm text-tertiary md:text-md">
                                The at-a-glance status board - big UP/DOWN panels, gauges, and uptime for the whole
                                fleet.
                            </figcaption>
                        </figure>

                        <hr />

                        {/* 05 - Alerting */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            05 - Alerting
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            A dashboard you have to watch{" "}
                            <em className="text-brand-secondary italic">isn&apos;t monitoring.</em>
                        </h2>
                        <p className="fade-up">
                            Dashboards are for investigating; <strong>alerts</strong> are for being told. Prometheus
                            evaluates a set of <strong>alert rules</strong> against the same time-series it collects -
                            <strong> high CPU</strong> sustained over a threshold, <strong>low disk space</strong>{" "}
                            crossing a danger line, <strong>high memory pressure</strong> - and fires the moment a
                            condition holds true.
                        </p>
                        <p className="fade-up">
                            Those alerts surface directly in Grafana with clear{" "}
                            <strong>FIRING</strong> and <strong>RESOLVED</strong> states, so I see a problem the
                            moment it starts trending the wrong way - not after it has cascaded into an outage. The
                            goal is to <strong>catch the small thing before it becomes the big thing.</strong>
                        </p>

                        <hr />

                        {/* 06 - The Result */}
                        <p className="fade-up not-prose text-sm font-semibold text-brand-secondary md:text-md">
                            06 - The Result
                        </p>
                        <h2 className="fade-up font-[family-name:var(--font-serif)]">
                            One live view for{" "}
                            <em className="text-brand-secondary italic">the entire fleet.</em>
                        </h2>
                        <p className="fade-up">
                            The whole stack runs in <strong>Docker</strong>, which makes the setup{" "}
                            <strong>reproducible</strong>: the monitoring server can be torn down and rebuilt from the
                            same compose definition, and spinning up a fresh instance is measured in minutes, not a
                            day of manual configuration. The coverage spans <strong>AWS, GCP, and Hetzner</strong>{" "}
                            from a single dashboard, regardless of which console each provider ships.
                        </p>
                        <p className="fade-up">
                            What I value most is what monitoring quietly enables.{" "}
                            <strong>Deploys get boring</strong> - I can watch the graphs hold steady instead of hoping
                            nothing broke. <strong>Incident response gets fast</strong>, because the first place to
                            look already has the answer. And <strong>capacity planning gets honest</strong>, because
                            weeks of real history show exactly when a server is starting to run out of room.
                        </p>
                        <p className="fade-up">
                            Good monitoring doesn&apos;t feel exciting, and that&apos;s the point. It turns surprises
                            into signals - and lets you trust that your servers are healthy{" "}
                            <strong>before your users ever have to tell you they aren&apos;t.</strong>
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
                        Site Auditor -{" "}
                        <em className="text-brand-secondary italic">Performance, on demand.</em>
                    </h2>
                    <div className="mt-8 flex flex-wrap justify-center gap-3 md:mt-10">
                        <Button href="/work/site-auditor" size="lg" iconTrailing={ArrowUpRight}>
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
