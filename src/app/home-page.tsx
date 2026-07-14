"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Badge } from "@/components/base/badges/badges";
import { InteractiveGrid } from "@/components/portfolio/interactive-grid";
import { Button } from "@/components/base/buttons/button";
import { ContraHireButton } from "@/components/portfolio/contra-hire-button";
import GitHub from "@/components/foundations/social-icons/github";
import LinkedIn from "@/components/foundations/social-icons/linkedin";
import Facebook from "@/components/foundations/social-icons/facebook";
import { useFadeUp } from "@/hooks/use-fade-up";
import { navigateWithTransition } from "@/utils/navigate-with-transition";

const projects = [
    {
        slug: "server-monitor",
        image: "/severmonitor/hero.webp",
        tag: "DevOps · Observability · Infrastructure",
        title: "Cloud Monitoring Dashboard",
        description:
            "A centralized observability stack built with Prometheus, Grafana, and Node Exporter - one live dashboard tracking health, CPU, memory, disk, and uptime across monitor, dev, and prod servers spanning AWS, GCP, and Hetzner.",
    },
    {
        slug: "site-auditor",
        image: "/siteautitor/report-perf.png",
        tag: "AI · Full-Stack SaaS · Web Intelligence",
        title: "Site Auditor",
        description:
            "An AI-powered website audit platform that crawls entire sites and scores them across SEO, performance, security, UX, AI visibility, and brand health - with automated reports, outreach pipelines, and LLM-driven insights.",
    },
    {
        slug: "unique-leverage",
        image: "/uniqueleverage/hero.jpg",
        tag: "AI · Automation · Full-Stack SaaS",
        title: "Unique Leverage",
        description:
            "An automation platform for automotive dealers - AI-generated ad creative per vehicle, automated Facebook Marketplace posting, feed integrations, and a Meta Pixel tracking layer for VIN-level lead attribution.",
    },
    {
        slug: "arrow-market",
        image: "/arrowmarket/position-builder.png",
        tag: "Web3 · Frontend · DeFi",
        title: "Arrow Markets",
        description:
            "A hybrid on-chain options trading interface on Avalanche. Real-time options chains, leverage and payoff visualizations, and a strategy-based position builder that brings a centralized-exchange UX to DeFi settlement.",
    },
    {
        slug: "ogedge",
        image: "/ogedge/hero.png",
        tag: "Full-Stack · E-commerce · Web",
        title: "OGEdge",
        description:
            "A gaming services marketplace for boosting, coaching, and leveling across Valorant, Apex, CoD, and more. Dynamic game catalogs, multi-currency checkout, live event countdowns, and an order-tracking backend.",
    },
    {
        slug: "big-rentals",
        image: "/bigrentals/hero.png",
        tag: "Full-Stack · Marketplace · Web",
        title: "Big Rentals",
        description:
            "A trailer and equipment rental marketplace with location-based search, date-range availability, category filtering, and SEO-optimized landing pages built to rank across hundreds of city and equipment combinations.",
    },
];

const services = [
    {
        num: "01",
        title: "AI Strategy + Prototyping",
        tagline: "Turn your AI idea into a working proof of concept.",
        forText: "Startups and teams exploring how AI can solve a real business problem - before committing to a full build.",
        items: [
            "Problem-fit analysis for AI/ML solutions",
            "Rapid prototyping with LLMs, embeddings, or custom models",
            "Architecture review and feasibility assessment",
            "Data pipeline design and evaluation",
            "Clear next-step roadmap with cost estimates",
        ],
        timeline: "Timeline: 1-3 weeks",
        ctaLabel: "Start with a Strategy Call →",
        ctaHref: "#contact",
    },
    {
        num: "02",
        title: "Full-Stack AI + Infrastructure",
        tagline: "From model to production. One engineer, zero gaps.",
        forText: "Products that need AI features shipped reliably - with proper CI/CD, monitoring, and scalable infrastructure.",
        items: [
            "End-to-end AI feature development",
            "Cloud infrastructure setup (AWS / GCP / Azure)",
            "CI/CD pipelines and GitOps workflows",
            "Containerization with Docker & Kubernetes",
            "Monitoring, alerting, and observability",
        ],
        timeline: "Timeline: 2-6 weeks",
        ctaLabel: "Let's build it →",
        ctaHref: "#contact",
        featured: true,
    },
    {
        num: "03",
        title: "Ongoing DevOps + AI Ops",
        tagline: "Keep your systems healthy. Ship with confidence.",
        forText: "Growing products that need continuous infrastructure improvements, model updates, and reliable deployments.",
        items: [
            "Infrastructure maintenance and optimization",
            "Model monitoring and retraining pipelines",
            "Security hardening and compliance",
            "Cost optimization across cloud providers",
            "On-call support for critical systems",
        ],
        timeline: "Ongoing collaboration",
        ctaLabel: "Let's talk →",
        ctaHref: "#contact",
    },
];

const skills = [
    "Python",
    "PyTorch & TensorFlow",
    "LLMs & Prompt Engineering",
    "RAG & Vector Databases",
    "MLOps & Model Serving",
    "Docker & Kubernetes",
    "Terraform & IaC",
    "AWS · GCP · Azure",
    "CI/CD & GitOps",
    "Linux & Networking",
    "Monitoring & Observability",
    "TypeScript & React",
];

const socials = [
    {
        label: "GitHub",
        href: "https://github.com/kittisora",
        icon: <GitHub size={20} aria-hidden="true" />,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/kittisora",
        icon: <LinkedIn size={20} aria-hidden="true" />,
    },
    {
        label: "Facebook",
        href: "https://facebook.com/kittisoras",
        icon: <Facebook size={20} aria-hidden="true" />,
    },
];

export function HomePage() {
    const ref = useFadeUp();
    const router = useRouter();
    const cardRefs = useRef<Map<string, HTMLElement>>(new Map());

    return (
        <div ref={ref} className="bg-primary text-primary">
            {/* Hero */}
            <div className="relative overflow-hidden bg-primary">
                <InteractiveGrid className="absolute inset-0 z-0 size-full" />

                <section id="hero" className="relative pt-44 pb-60 md:pt-60 md:pb-84">
                    <div className="mx-auto w-full max-w-container px-4 md:px-8">
                        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
                            <p className="fade-up text-sm font-semibold tracking-[0.15em] uppercase text-brand-secondary md:text-md">
                                AI Specialist · DevOps Engineer · Cloud Architect
                            </p>

                            <h1 className="fade-up delay-1 mt-4 font-[family-name:var(--font-serif)] text-display-md font-semibold text-primary md:text-display-lg lg:text-display-xl">
                                Building intelligence{" "}
                                <span className="italic text-brand-secondary">
                                    into infrastructure.
                                </span>
                            </h1>

                            <p className="fade-up delay-2 mt-4 max-w-3xl text-lg text-balance text-tertiary md:mt-6 md:text-xl">
                                I build AI systems that ship and stay running - from model development
                                and data pipelines to production infrastructure that scales without breaking at 3 AM.
                            </p>

                            <div className="fade-up delay-3 mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start md:mt-12">
                                <Button href="#contact" color="secondary" size="xl">
                                    Get in Touch
                                </Button>
                                <Button href="#work" size="xl">
                                    View My Work
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Work */}
            <section id="work" className="scroll-mt-24 bg-secondary py-16 text-primary md:py-24">
                <div className="mx-auto w-full max-w-container px-4 md:px-8">
                    <p className="text-sm font-semibold text-brand-secondary md:text-md">Selected Works</p>
                    <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">
                        Projects that solve real problems
                    </h2>

                    <div className="mt-12 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <article
                                key={project.slug}
                                ref={(el) => {
                                    if (el) cardRefs.current.set(project.slug, el);
                                }}
                                onClick={() =>
                                    navigateWithTransition(
                                        router,
                                        `/work/${project.slug}`,
                                        cardRefs.current.get(project.slug),
                                    )
                                }
                                className="fade-up group relative cursor-pointer overflow-hidden rounded-xl bg-primary_alt shadow-xs ring-1 ring-secondary ring-inset transition-all duration-[350ms] ease-out hover:-translate-y-1.5 hover:shadow-lg"
                            >
                                <div className="h-[220px] overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={`${project.title} preview`}
                                        width={400}
                                        height={220}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                    />
                                </div>
                                <div className="flex flex-col gap-2.5 p-6">
                                    <span className="text-xs font-semibold tracking-[0.12em] uppercase text-brand-secondary">
                                        {project.tag}
                                    </span>
                                    <h3 className="font-[family-name:var(--font-serif)] text-lg font-semibold leading-[1.3] text-primary">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm leading-[1.65] text-tertiary">
                                        {project.description}
                                    </p>
                                    <Link
                                        href={`/work/${project.slug}`}
                                        onClick={(e) => e.preventDefault()}
                                        className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-secondary transition-all duration-200 group-hover:gap-2.5 group-hover:underline"
                                    >
                                        View Case Study →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section id="services" className="scroll-mt-24 bg-primary py-16 md:py-24">
                <div className="mx-auto w-full max-w-container px-4 md:px-8">
                    <p className="text-sm font-semibold text-brand-secondary md:text-md">How we work together</p>
                    <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">
                        Three ways to start
                    </h2>
                    <p className="mt-4 max-w-3xl text-lg text-tertiary md:mt-5 md:text-xl">
                        Whether you need an AI proof-of-concept, production infrastructure, or a long-term
                        engineering partner - here&apos;s how most engagements begin.
                    </p>

                    <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3">
                        {services.map((service) => (
                            <article
                                key={service.num}
                                className={`fade-up relative flex flex-col gap-3 rounded-xl p-7 shadow-xs transition-all duration-[350ms] ease-out hover:-translate-y-1 hover:shadow-md ${
                                    service.featured
                                        ? "bg-brand-primary ring-2 ring-brand-600 ring-inset"
                                        : "bg-primary_alt ring-1 ring-secondary ring-inset"
                                }`}
                            >
                                {service.featured && (
                                    <div className="absolute top-[1px] left-[1px] z-2 rounded-br-xl rounded-tl-[10px] bg-brand-solid px-4 py-2 text-xs font-semibold tracking-[0.1em] uppercase text-white">
                                        ☆ Most Popular
                                    </div>
                                )}
                                <div className={`flex items-baseline justify-between border-b border-secondary pb-4 ${service.featured ? "mt-6" : "mt-1"}`}>
                                    <p className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold tracking-[0.15em] text-brand-secondary">
                                        {service.num}
                                    </p>
                                </div>
                                <h3 className="mt-1 font-[family-name:var(--font-serif)] text-xl font-bold leading-[1.25] text-primary">
                                    {service.title}
                                </h3>
                                <p className="mb-1 text-sm italic leading-[1.5] text-brand-secondary">
                                    {service.tagline}
                                </p>
                                <p className="text-sm leading-[1.6] text-tertiary">
                                    <strong className="font-medium text-primary">For:</strong>{" "}
                                    {service.forText}
                                </p>
                                <ul className="mt-1 flex flex-col gap-2">
                                    {service.items.map((item) => (
                                        <li
                                            key={item}
                                            className="relative pl-5 text-sm leading-[1.6] text-tertiary before:absolute before:left-0 before:text-brand-secondary before:content-['→']"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-3 border-t border-secondary pt-4 text-xs tracking-[0.05em] text-tertiary">
                                    {service.timeline}
                                </p>
                                <Button
                                    href={service.ctaHref}
                                    color={service.featured ? "primary" : "secondary"}
                                    size="md"
                                    className="mt-auto w-full justify-center"
                                >
                                    {service.ctaLabel}
                                </Button>
                            </article>
                        ))}
                    </div>

                    <p className="mt-12 text-center text-md text-tertiary">
                        Need something different? Custom AI solutions, infrastructure audits, and
                        consulting engagements are available.{" "}
                        <Button href="#contact" color="link-color" size="md">
                            Let&apos;s talk →
                        </Button>
                    </p>
                </div>
            </section>

            {/* About */}
            <section id="about" className="scroll-mt-24 bg-secondary py-16 md:py-24">
                <div className="mx-auto w-full max-w-container px-4 md:px-8">
                    <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-[1fr_1.4fr] md:gap-20">
                        <div className="fade-up sticky top-[100px] max-md:static max-md:mx-auto max-md:max-w-[320px]">
                            <Image
                                src="/photo.png"
                                alt="Kittipong Sorasuchart - AI Specialist and DevOps Engineer"
                                width={400}
                                height={533}
                                className="aspect-[3/4] w-full rounded-xl object-cover shadow-lg max-md:aspect-square"
                            />
                        </div>

                        <div className="fade-up flex flex-col">
                            <p className="text-sm font-semibold text-brand-secondary md:text-md">About Me</p>
                            <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">
                                Where artificial intelligence
                                <br />
                                meets reliable infrastructure.
                            </h2>

                            <div className="mt-5 mb-8 flex flex-col gap-4">
                                <p className="text-lg font-medium text-primary">I&apos;m Kittipong</p>
                                <p className="text-md leading-[1.8] text-tertiary">
                                    I work at the intersection of AI and infrastructure - building intelligent
                                    systems that don&apos;t just work in a notebook, but hold up in production
                                    under real load. From training custom models and designing RAG pipelines
                                    to orchestrating containers across cloud providers, I own the full
                                    lifecycle from experiment to deployment.
                                </p>
                                <p className="text-md leading-[1.8] text-tertiary">
                                    My background spans machine learning research, cloud architecture, and
                                    platform engineering. I think in systems - how a model&apos;s latency
                                    affects user experience, how a poorly designed pipeline turns a 10-minute
                                    deploy into a 3-hour firefight, how the right abstraction today saves the
                                    team six months of refactoring next year. That systems-level thinking is
                                    what I bring to every project.
                                </p>
                                <p className="text-md leading-[1.8] text-tertiary">
                                    I&apos;ve built inference APIs that serve millions of requests, designed
                                    CI/CD pipelines that make deployments boring (in the best way), and
                                    architected monitoring stacks that catch problems before users do. Whether
                                    it&apos;s fine-tuning an LLM, setting up a Kubernetes cluster, or writing
                                    Terraform modules that the whole team actually wants to use - I care about
                                    the craft at every layer.
                                </p>
                                <p className="text-md leading-[1.8] text-tertiary">
                                    Right now I&apos;m open to roles and collaborations where AI meets
                                    production engineering - especially in teams building products that need
                                    both intelligence and reliability. I&apos;m particularly drawn to
                                    healthtech, fintech, and developer tooling.
                                </p>
                            </div>

                            <div className="mt-2 flex flex-wrap gap-2">
                                {skills.map((skill) => (
                                    <Badge key={skill} color="brand" size="md" type="pill-color">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="scroll-mt-24 bg-primary py-16 md:py-24">
                <div className="mx-auto w-full max-w-container px-4 md:px-8">
                    <div className="fade-up mx-auto flex max-w-3xl flex-col items-center text-center">
                        <p className="text-sm font-semibold text-brand-secondary md:text-md">Get In Touch</p>

                        <h2 className="mt-3 font-[family-name:var(--font-serif)] text-display-sm font-semibold text-primary md:text-display-md">
                            Let&apos;s build something{" "}
                            <span className="italic text-brand-secondary">that scales.</span>
                        </h2>

                        <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">
                            Have an AI challenge or infrastructure problem? I&apos;d love to hear about it.
                            Reach out and I&apos;ll get back to you within 48 hours.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-3 md:mt-12">
                            <Button
                                href="mailto:kittisoras@gmail.com"
                                size="xl"
                            >
                                Send Me an Email
                            </Button>
                            <Button
                                href="#about"
                                color="secondary"
                                size="xl"
                            >
                                Learn More About Me
                            </Button>
                        </div>

                        <a
                            href="mailto:kittisoras@gmail.com"
                            className="mt-6 mb-12 text-md text-tertiary transition-colors duration-200"
                        >
                            or reach me at{" "}
                            <span className="border-b border-brand pb-[1px] text-brand-secondary transition-colors duration-200 hover:border-brand_alt">
                                kittisoras@gmail.com
                            </span>
                        </a>

                        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
                            <ul className="flex items-center gap-6">
                                {socials.map((social) => (
                                    <li key={social.label}>
                                        <a
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                            className="flex size-10 items-center justify-center rounded-lg border border-primary text-fg-secondary shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:text-fg-brand-primary hover:bg-brand-secondary dark:hover:border-brand-600/40 dark:hover:bg-brand-600/10 dark:hover:text-brand-400"
                                        >
                                            {social.icon}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <ContraHireButton />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
