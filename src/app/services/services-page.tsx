"use client";

import { Button } from "@/components/base/buttons/button";
import { useFadeUp } from "@/hooks/use-fade-up";

const packages = [
    {
        num: "01",
        name: "AI Strategy + Prototyping",
        subtitle: "Discovery & Proof of Concept",
        timeline: "Timeline: 1-3 weeks",
        tagline: "Turn your AI idea into a working proof of concept.",
        description:
            "Before committing to a full build, validate that AI is the right tool for the job. I map the problem, prototype a solution with the right models, and give you a clear, costed roadmap.",
        features: [
            "Problem-fit analysis for AI/ML solutions",
            "Rapid prototyping with LLMs, embeddings, or custom models",
            "Architecture review and feasibility assessment",
            "Data pipeline design and evaluation",
            "Clear next-step roadmap with cost estimates",
        ],
        bestFor:
            "Startups and teams exploring how AI can solve a real business problem - before committing to a full build.",
        cta: "Start with a strategy call →",
    },
    {
        num: "02",
        featuredTag: true,
        name: "Full-Stack AI + Infrastructure",
        subtitle: "End-to-End Delivery",
        timeline: "Timeline: 2-6 weeks",
        tagline: "From model to production. One engineer, zero gaps.",
        description:
            "End-to-end delivery for AI-powered products - model development, application code, and the cloud infrastructure to run it reliably. No handoff friction, no translation layer.",
        features: [
            "End-to-end AI feature development",
            "Cloud infrastructure setup (AWS / GCP / Azure)",
            "CI/CD pipelines and GitOps workflows",
            "Containerization with Docker & Kubernetes",
            "Monitoring, alerting, and observability",
        ],
        bestFor:
            "Products that need AI features shipped reliably - with proper CI/CD, monitoring, and scalable infrastructure.",
        cta: "Let's build it →",
    },
    {
        num: "03",
        name: "Ongoing DevOps + AI Ops",
        subtitle: "Retainer & Support",
        timeline: "Ongoing collaboration",
        tagline: "Keep your systems healthy. Ship with confidence.",
        description:
            "For teams that need a reliable engineering partner without hiring full-time - continuous infrastructure improvements, model updates, and dependable deployments.",
        features: [
            "Infrastructure maintenance and optimization",
            "Model monitoring and retraining pipelines",
            "Security hardening and compliance",
            "Cost optimization across cloud providers",
            "On-call support for critical systems",
        ],
        bestFor:
            "Growing products that need continuous infrastructure improvements, model updates, and reliable deployments.",
        cta: "Let's talk →",
    },
];

const scopeIn = [
    "AI/ML feature development - LLMs, RAG, embeddings, custom models",
    "Cloud infrastructure across AWS, GCP, and Azure",
    "CI/CD pipelines, GitOps, and deployment automation",
    "Containerization and orchestration with Docker & Kubernetes",
    "Monitoring, alerting, and observability stacks",
    "Full-stack web apps and APIs (TypeScript, React, Python)",
];

const scopeOut = [
    "Native mobile apps (iOS/Android) requiring Swift, Kotlin, or Flutter",
    "Brand identity, logo, or print design work",
    "Ongoing content writing or copywriting",
];

const terms = [
    {
        label: "Engagement",
        text: (
            <>
                <strong className="font-medium text-primary">Fixed-scope projects or retainers.</strong> We&apos;ll
                shape the right model together on our first call.
            </>
        ),
    },
    {
        label: "Communication",
        text: (
            <>
                <strong className="font-medium text-primary">Regular updates</strong>, async-friendly, calls when
                needed.
            </>
        ),
    },
    {
        label: "Stack",
        text: (
            <>
                Cloud-native by default -{" "}
                <strong className="font-medium text-primary">AWS, GCP, Azure</strong>, Docker, and Kubernetes.
            </>
        ),
    },
    {
        label: "Reliability",
        text: (
            <>
                <strong className="font-medium text-primary">Monitoring and observability</strong> built into every
                deployment.
            </>
        ),
    },
    {
        label: "Timezone",
        text: (
            <>
                <strong className="font-medium text-primary">Flexible</strong> - I collaborate across international
                hours.
            </>
        ),
    },
    {
        label: "Availability",
        text: (
            <>
                Open to <strong className="font-medium text-primary">roles, contracts, and collaborations</strong>{" "}
                worldwide.
            </>
        ),
    },
];

const whyMe = [
    {
        title: "No handoff gaps",
        desc: "Model, application, and infrastructure handled by one engineer who thinks in systems.",
    },
    {
        title: "Built to scale",
        desc: "Infrastructure and pipelines designed to grow with your product, not fight it.",
    },
    {
        title: "Production-ready",
        desc: "AI that holds up under real load - with monitoring that catches problems before users do.",
    },
];

export function ServicesPage() {
    const ref = useFadeUp();

    return (
        <div ref={ref} className="bg-primary text-primary">
            <main>
                {/* Hero */}
                <section id="services-hero" className="scroll-mt-24 bg-secondary pt-36 pb-16 md:pt-44 md:pb-24">
                    <div className="mx-auto w-full max-w-container px-4 md:px-8">
                        <p className="fade-up text-sm font-semibold tracking-[0.15em] uppercase text-brand-secondary md:text-md">
                            Services
                        </p>
                        <h1 className="fade-up delay-1 mt-4 font-[family-name:var(--font-serif)] text-display-md font-semibold text-primary md:text-display-lg">
                            Work <em className="italic text-brand-secondary">with me</em>
                        </h1>
                        <p className="fade-up delay-2 mt-5 max-w-3xl text-lg leading-[1.8] text-tertiary md:text-xl">
                            I build intelligent systems that hold up in production - from AI prototypes and
                            full-stack features to the cloud infrastructure that runs them. Every engagement is
                            shaped around what your product actually needs.
                        </p>
                        <p className="fade-up delay-3 mt-4 max-w-3xl text-md leading-[1.8] text-tertiary">
                            These packages are starting points, not rigid boxes. We&apos;ll define the right scope
                            together on our first call. Custom quotes are available for anything outside these ranges.
                        </p>
                    </div>
                </section>

                {/* Packages */}
                <section id="services-packages" className="bg-primary py-16 md:py-24">
                    <div className="mx-auto w-full max-w-container px-4 md:px-8">
                        {packages.map((pkg, index) => (
                            <div
                                key={pkg.name}
                                className={`fade-up border-t border-secondary py-12 md:py-16 ${index === 0 ? "border-t-0 pt-0" : ""}`}
                            >
                                <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[360px_1fr] md:gap-16">
                                    <div className="md:sticky md:top-[100px]">
                                        {pkg.featuredTag && (
                                            <span className="mb-4 inline-block rounded-md bg-brand-solid px-3 py-1 text-xs font-semibold tracking-[0.12em] uppercase text-white">
                                                ☆ Most Popular
                                            </span>
                                        )}
                                        <p className="mb-3 inline-block rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold tracking-[0.15em] text-brand-secondary">
                                            {pkg.num}
                                        </p>
                                        <h2 className="mb-2 font-[family-name:var(--font-serif)] text-display-xs font-bold leading-[1.2] text-primary">
                                            {pkg.name}
                                        </h2>
                                        <p className="mb-4 text-sm font-medium text-tertiary">{pkg.subtitle}</p>
                                        <p className="text-xs tracking-[0.05em] text-tertiary">{pkg.timeline}</p>
                                    </div>

                                    <div>
                                        <p className="mb-5 font-[family-name:var(--font-serif)] text-xl italic leading-[1.4] text-brand-secondary">
                                            {pkg.tagline}
                                        </p>
                                        <p className="mb-6 text-md leading-[1.85] text-tertiary">{pkg.description}</p>
                                        <p className="mt-6 mb-3 text-xs font-semibold tracking-[0.15em] uppercase text-brand-secondary">
                                            What&apos;s included
                                        </p>
                                        <ul className="mb-6 flex flex-col gap-2.5">
                                            {pkg.features.map((feature) => (
                                                <li
                                                    key={feature}
                                                    className="relative pl-5 text-sm leading-[1.7] text-tertiary before:absolute before:left-0 before:text-brand-secondary before:content-['→']"
                                                >
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mb-6 rounded-lg border-l-2 border-brand bg-secondary px-5 py-4 text-sm leading-[1.65] text-tertiary">
                                            <strong className="font-medium text-primary">Best if:</strong> {pkg.bestFor}
                                        </div>
                                        <Button href="/#contact" color={pkg.featuredTag ? "primary" : "secondary"} size="lg">
                                            {pkg.cta}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Scope */}
                <section id="services-scope" className="bg-secondary py-16 md:py-24">
                    <div className="mx-auto w-full max-w-container px-4 md:px-8">
                        <p className="text-sm font-semibold tracking-[0.15em] uppercase text-brand-secondary md:text-md">
                            Scope
                        </p>
                        <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">
                            What I <em className="italic text-brand-secondary">build</em> - and what I don&apos;t
                        </h2>
                        <p className="mt-4 max-w-3xl text-lg leading-[1.8] text-tertiary">
                            To save everyone time upfront, here&apos;s what falls inside and outside my scope.
                        </p>

                        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="rounded-xl bg-primary_alt p-8 shadow-xs ring-1 ring-secondary ring-inset">
                                <h3 className="mb-2 font-[family-name:var(--font-serif)] text-xl font-bold text-primary">
                                    <span className="mr-2 text-success-primary">✓</span>
                                    What I do
                                </h3>
                                <p className="mb-5 text-sm text-tertiary">Inside my scope</p>
                                <ul className="flex flex-col gap-2">
                                    {scopeIn.map((item) => (
                                        <li
                                            key={item}
                                            className="relative pl-4 text-sm leading-[1.65] text-tertiary before:absolute before:left-0 before:text-brand-secondary before:content-['·']"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="rounded-xl bg-primary_alt p-8 shadow-xs ring-1 ring-secondary ring-inset">
                                <h3 className="mb-2 font-[family-name:var(--font-serif)] text-xl font-bold text-primary">
                                    <span className="mr-2 text-error-primary">✗</span>
                                    What I don&apos;t currently offer
                                </h3>
                                <p className="mb-5 text-sm text-tertiary">Outside my scope</p>
                                <ul className="flex flex-col gap-2">
                                    {scopeOut.map((item) => (
                                        <li
                                            key={item}
                                            className="relative pl-4 text-sm leading-[1.65] text-tertiary before:absolute before:left-0 before:text-error-primary before:content-['·']"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-[1.75] text-tertiary italic">
                            Need something adjacent? If it&apos;s outside my wheelhouse, I&apos;m happy to recommend
                            trusted specialists. If it&apos;s{" "}
                            <strong className="font-medium text-primary not-italic">AI or infrastructure</strong> - that&apos;s
                            exactly what I do.
                        </p>
                    </div>
                </section>

                {/* Terms */}
                <section id="services-terms" className="bg-primary py-16 md:py-24">
                    <div className="mx-auto w-full max-w-container px-4 md:px-8">
                        <p className="text-sm font-semibold tracking-[0.15em] uppercase text-brand-secondary md:text-md">
                            How we work
                        </p>
                        <h2 className="mt-3 mb-12 text-display-sm font-semibold text-primary md:text-display-md">
                            Terms & <em className="italic text-brand-secondary">process</em>
                        </h2>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {terms.map((term) => (
                                <div
                                    key={term.label}
                                    className="rounded-xl bg-primary_alt p-7 shadow-xs ring-1 ring-secondary ring-inset"
                                >
                                    <p className="mb-2.5 text-xs font-semibold tracking-[0.12em] uppercase text-brand-secondary">
                                        {term.label}
                                    </p>
                                    <p className="text-sm leading-[1.65] text-tertiary">{term.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Me */}
                <section id="services-why" className="bg-secondary py-16 md:py-24">
                    <div className="mx-auto w-full max-w-container px-4 md:px-8">
                        <p className="text-center text-sm font-semibold tracking-[0.15em] uppercase text-brand-secondary md:text-md">
                            Why me
                        </p>
                        <p className="fade-up mx-auto mt-6 mb-12 max-w-4xl text-center font-[family-name:var(--font-serif)] text-2xl italic leading-[1.45] text-primary md:text-3xl">
                            &ldquo;I bridge the gap between AI research and production engineering. By owning the full
                            lifecycle from experiment to deployment, I deliver{" "}
                            <span className="text-brand-secondary">
                                intelligent systems that aren&apos;t just clever - they&apos;re reliable.
                            </span>
                            &rdquo;
                        </p>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {whyMe.map((card) => (
                                <div key={card.title} className="border-l-2 border-brand p-7">
                                    <h3 className="mb-2.5 font-[family-name:var(--font-serif)] text-lg font-bold text-primary">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm leading-[1.7] text-tertiary">{card.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <section id="contact" className="scroll-mt-24 bg-primary py-16 md:py-24">
                    <div className="mx-auto w-full max-w-container px-4 md:px-8">
                        <div className="fade-up mx-auto flex max-w-3xl flex-col items-center text-center">
                            <p className="text-sm font-semibold text-brand-secondary md:text-md">Ready to start?</p>

                            <h2 className="mt-3 font-[family-name:var(--font-serif)] text-display-sm font-semibold text-primary md:text-display-md">
                                Tell me about your{" "}
                                <span className="italic text-brand-secondary">project.</span>
                            </h2>

                            <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">
                                Have an AI challenge or infrastructure problem? I&apos;ll get back to you within 48
                                hours with thoughts and next steps.
                            </p>

                            <div className="mt-8 flex flex-wrap justify-center gap-3 md:mt-12">
                                <Button href="mailto:kittisoras@gmail.com" size="xl">
                                    Send Me an Email
                                </Button>
                                <Button href="/#work" color="secondary" size="xl">
                                    View My Work
                                </Button>
                            </div>

                            <a
                                href="mailto:kittisoras@gmail.com"
                                className="mt-6 text-md text-tertiary transition-colors duration-200"
                            >
                                or reach me at{" "}
                                <span className="border-b border-brand pb-[1px] text-brand-secondary transition-colors duration-200 hover:border-brand_alt">
                                    kittisoras@gmail.com
                                </span>
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
