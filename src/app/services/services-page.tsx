"use client";

import { useFadeUp } from "@/hooks/use-fade-up";

const packages = [
    {
        tags: ["Package 01"],
        name: "The Product Blueprint",
        subtitle: "Discovery & UX",
        price: "from €500",
        timeline: "Timeline: 1-2 weeks",
        tagline: "Validate your idea before building the wrong thing.",
        description:
            "Before pixels and polish comes clarity. This package maps out what you're building, who it's for, and how it should work - so you don't waste money designing the wrong thing.",
        features: [
            "User flow mapping and information architecture",
            "Low-fidelity wireframes (the skeleton)",
            "Interactive prototype for testing",
            "Developer handoff: annotated UX documentation",
        ],
        bestFor:
            "You have a web product/ mobile app idea but need to validate and structure it before full design begins.",
        cta: "Start with the blueprint →",
        ctaHref: "https://client-questionnaire.onrender.com/",
    },
    {
        tags: ["Package 02"],
        name: "The High-Fidelity Interface",
        subtitle: "Full UI Design",
        price: "from €800",
        timeline: "Timeline: 3-5 weeks",
        tagline: "For websites, web apps and mobile apps ready to be built.",
        description: "Your product is validated. Now it needs to look like something people trust and pay for.",
        features: [
            "High-fidelity visual design (all core screens, responsive across devices)",
            "Custom iconography and typography system",
            "High-fidelity clickable prototype (for investors or user testing)",
            "Developer handoff: assets exported + style guide",
        ],
        bestFor: "You already know what you're building and need a designer to make it real.",
        cta: "Let's design it →",
        ctaHref: "https://client-questionnaire.onrender.com/",
    },
    {
        tags: ["Package 03"],
        name: "The Product Bridge",
        subtitle: "Full Product Build",
        price: "from €1,800",
        timeline: "Timeline: 5-8 weeks",
        tagline: "Design and frontend. One person. Zero handoff.",
        description:
            "End-to-end delivery for web products. Design and frontend code handled by one person - no translation layer, no handoff friction.",
        features: [
            "Full design (everything in Package 02)",
            'Frontend "shell" implementation of core screens (HTML/CSS/JS)',
            "Component documentation",
            "Responsive, production-ready code for web browsers",
        ],
        bestFor: "You need to ship a web product fast without managing a designer-and-developer handoff.",
        cta: "Build with me →",
        ctaHref: "https://client-questionnaire.onrender.com/",
    },
    {
        tags: ["Package 04", "☆ Most Popular"],
        featuredTag: true,
        name: "The Single Page Specialist",
        subtitle: "Design + Code",
        price: "from €900",
        timeline: "Timeline: 2 weeks",
        tagline: "One page. One goal. Designed and coded to convert.",
        description:
            "For high-converting landing pages, marketing sites, or personal brand websites where every detail counts.",
        features: [
            "Custom UX/UI design",
            "Responsive frontend implementation (HTML/CSS/JS)",
            "Basic SEO and performance optimization",
            "Analytics setup guidance",
        ],
        bestFor:
            "You have a specific landing page, portfolio, or single-page website that needs to look and perform excellently.",
        cta: "Let's ship it →",
        ctaHref: "https://client-questionnaire.onrender.com/",
    },
    {
        tags: [],
        name: "The Component Architect",
        subtitle: "Library + Code",
        price: "from €1,400",
        timeline: "Timeline: 4-6 weeks",
        tagline: "For tech teams who need the front-of-the-frontend built.",
        description:
            "A design system isn't a luxury - it's how fast-moving teams stay consistent without slowing down. I design it and code it for the web, ready for your engineers to build with.",
        features: [
            "Full UI design system (for web applications)",
            "Coded component library (HTML/CSS)",
            "Clean, reusable, documented code",
            "Integration guidance for your dev team",
        ],
        bestFor:
            "Your team is building a substantial web product and needs a proper foundation rather than one-off screens.",
        cta: "Build my system →",
        ctaHref: "https://client-questionnaire.onrender.com/",
    },
];

const terms = [
    {
        label: "Payment",
        text: (
            <>
                <strong className="font-medium text-[#0F111C]">50% upfront deposit, 50% on completion.</strong> Bank
                transfer via Revolut or PayPal.
            </>
        ),
    },
    {
        label: "Revisions",
        text: (
            <>
                <strong className="font-medium text-[#0F111C]">2 rounds included per phase.</strong> Additional revisions
                available at hourly rate.
            </>
        ),
    },
    {
        label: "Communication",
        text: (
            <>
                <strong className="font-medium text-[#0F111C]">Weekly updates</strong>, async-friendly, calls when
                needed.
            </>
        ),
    },
    {
        label: "Global-ready",
        text: (
            <>
                English documentation, <strong className="font-medium text-[#0F111C]">WCAG accessibility standards</strong>{" "}
                built in.
            </>
        ),
    },
    {
        label: "Timezone",
        text: (
            <>
                <strong className="font-medium text-[#0F111C]">Flexible</strong> - I work across EU and international
                hours.
            </>
        ),
    },
    {
        label: "Location",
        text: (
            <>
                Based in the <strong className="font-medium text-[#0F111C]">Netherlands</strong>, serving clients
                worldwide.
            </>
        ),
    },
];

function ArrowIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function ServicesPage() {
    const ref = useFadeUp();

    return (
        <div ref={ref} className="portfolio-page">
            <main>
                {/* Hero */}
                <section
                    id="services-hero"
                    className="relative overflow-hidden bg-[#0F111C] bg-cover bg-center pt-[180px] pb-20 max-md:pt-[120px] max-md:pb-[60px]"
                    style={{
                        backgroundImage:
                            "url(https://res.cloudinary.com/dnnfhyeuv/image/upload/v1779023903/Services_hero_gcppap.png)",
                    }}
                >
                    <div
                        className="pointer-events-none absolute inset-0 z-0"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle, rgba(108,109,116,0.14) 1px, transparent 1px)",
                            backgroundSize: "36px 36px",
                            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 80%)",
                            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 80%)",
                        }}
                    />
                    <div className="portfolio-container relative z-10">
                        <p className="mb-4 text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-[#8A8D98]">
                            Services
                        </p>
                        <h1 className="mb-6 font-[family-name:var(--font-serif)] text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[1.1] text-[#D2D4DB]">
                            Work <em className="italic text-[#8A8D98]">with me</em>
                        </h1>
                        <p className="max-w-[680px] text-[1.02rem] leading-[1.8] text-[#B3B7C0]">
                            I design mobile apps and build websites and web applications - from landing pages to full
                            SaaS products. Every project is mobile-responsive by default. Native mobile apps
                            (iOS/Android) are outside my current scope, but if you need a web app that works beautifully
                            on mobile browsers or just mobile app design, you&apos;re in the right place.
                        </p>
                        <p className="mt-4 max-w-[680px] text-[1.02rem] leading-[1.8] text-[#B3B7C0]">
                            Every project is unique - these packages are starting points, not rigid boxes. We&apos;ll
                            shape the right scope together during our first call. All prices in EUR. Custom quotes
                            available for projects outside these ranges.
                        </p>
                    </div>
                </section>

                {/* Packages */}
                <section id="services-packages" className="bg-[#0F111C] py-[100px]">
                    <div className="portfolio-container">
                        {packages.map((pkg, index) => (
                            <div
                                key={pkg.name}
                                className={`border-t border-[rgba(108,109,116,0.18)] py-[60px] ${index === 0 ? "border-t-0 pt-0" : ""}`}
                            >
                                <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[380px_1fr] md:gap-20">
                                    <div className="sticky top-[100px] max-md:static">
                                        {pkg.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className={`mb-4 mr-2 inline-block rounded-[3px] px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.15em] uppercase ${
                                                    pkg.featuredTag && tag.includes("Popular")
                                                        ? "bg-[#8A8D98] text-[#0F111C]"
                                                        : "bg-[rgba(108,109,116,0.15)] text-[#B3B7C0]"
                                                }`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        <h2 className="mb-2 font-[family-name:var(--font-serif)] text-[2rem] font-bold leading-[1.2] text-[#D2D4DB]">
                                            {pkg.name}
                                        </h2>
                                        <p className="mb-4 text-[0.88rem] font-medium text-[#B3B7C0]">{pkg.subtitle}</p>
                                        <p className="mb-5 font-[family-name:var(--font-serif)] text-[1.5rem] font-bold text-[#8A8D98]">
                                            {pkg.price}
                                        </p>
                                        <p className="text-[0.82rem] tracking-[0.05em] text-[#B3B7C0]">{pkg.timeline}</p>
                                    </div>

                                    <div className="pt-2">
                                        <p className="mb-6 font-[family-name:var(--font-serif)] text-[1.3rem] italic leading-[1.4] text-[#8A8D98]">
                                            {pkg.tagline}
                                        </p>
                                        <p className="mb-7 text-[0.98rem] leading-[1.85] text-[#B3B7C0]">
                                            {pkg.description}
                                        </p>
                                        <p className="mt-6 mb-4 text-[0.72rem] font-semibold tracking-[0.15em] uppercase text-[#8A8D98]">
                                            What&apos;s included
                                        </p>
                                        <ul className="mb-7 flex flex-col gap-2.5">
                                            {pkg.features.map((feature) => (
                                                <li
                                                    key={feature}
                                                    className="flex items-start gap-2.5 text-[0.92rem] leading-[1.7] text-[#B3B7C0] before:mt-0.5 before:shrink-0 before:text-[#8A8D98] before:content-['→']"
                                                >
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mb-6 rounded border-l-2 border-[#8A8D98] bg-[rgba(108,109,116,0.08)] px-5 py-4 text-[0.9rem] leading-[1.65] text-[#B3B7C0]">
                                            <strong className="font-medium text-[#D2D4DB]">Best if:</strong> {pkg.bestFor}
                                        </div>
                                        <a
                                            href={pkg.ctaHref}
                                            target="_blank"
                                            rel="noopener"
                                            className="btn-portfolio btn-portfolio-primary inline-flex"
                                        >
                                            {pkg.cta}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Retainer */}
                <section id="services-retainer" className="bg-[#D2D4DB] py-[100px] text-[#0F111C]">
                    <div className="portfolio-container">
                        <p className="mb-4 text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-[#8A8D98]">
                            Ongoing support
                        </p>
                        <h2 className="mb-6 font-[family-name:var(--font-serif)] text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[1.1] text-[#0F111C]">
                            Ongoing <em className="italic text-[#6C6D74]">partnership</em>
                        </h2>
                        <p className="max-w-[680px] text-[1.02rem] leading-[1.8] text-[#4A4F54]">
                            For teams needing consistent design and web development help without the commitment of
                            hiring full-time.
                        </p>

                        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div className="rounded-xl border border-[rgba(108,109,116,0.25)] bg-[#E2E3EA] p-8 transition-all duration-350 hover:-translate-y-1 hover:border-[#8A8D98] md:px-8 md:py-9">
                                <p className="mb-3 text-[0.72rem] font-semibold tracking-[0.15em] uppercase text-[#6C6D74]">
                                    Hourly
                                </p>
                                <p className="mb-1.5 font-[family-name:var(--font-serif)] text-[2.2rem] font-bold leading-[1.1] text-[#0F111C]">
                                    €40<span className="text-base font-normal text-[#4A4F54]">/hr</span>
                                </p>
                                <p className="mb-3 font-[family-name:var(--font-serif)] text-[1.2rem] font-bold text-[#0F111C]">
                                    On-demand support
                                </p>
                                <p className="mb-4 text-[0.9rem] leading-[1.65] text-[#4A4F54]">
                                    <strong className="font-medium text-[#0F111C]">Best if:</strong> Occasional need -
                                    design tweaks, quick iterations, ad-hoc work without a fixed commitment.
                                </p>
                                <a href="mailto:alivedesignstudio00@gmail.com" className="btn-portfolio btn-portfolio-primary inline-flex">
                                    Start a partnership →
                                </a>
                            </div>

                            <div className="rounded-xl border border-[rgba(108,109,116,0.25)] bg-[#E2E3EA] p-8 transition-all duration-350 hover:-translate-y-1 hover:border-[#8A8D98] md:px-8 md:py-9">
                                <p className="mb-3 text-[0.72rem] font-semibold tracking-[0.15em] uppercase text-[#6C6D74]">
                                    Monthly Partner
                                </p>
                                <p className="mb-1.5 font-[family-name:var(--font-serif)] text-[2.2rem] font-bold leading-[1.1] text-[#0F111C]">
                                    €950<span className="text-base font-normal text-[#4A4F54]">/month</span>
                                </p>
                                <p className="mb-3 font-[family-name:var(--font-serif)] text-[1.2rem] font-bold text-[#0F111C]">
                                    30 hours/month
                                </p>
                                <p className="mb-4 text-[0.9rem] leading-[1.65] text-[#4A4F54]">
                                    <strong className="font-medium text-[#0F111C]">Best if:</strong> Regular iteration -
                                    continuous improvement, weekly reviews, new features every month.
                                </p>
                                <a href="mailto:alivedesignstudio00@gmail.com" className="btn-portfolio btn-portfolio-primary inline-flex">
                                    Start a partnership →
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Scope */}
                <section id="services-scope" className="bg-[#0F111C] py-[100px]">
                    <div className="portfolio-container">
                        <p className="mb-4 text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-[#8A8D98]">
                            Scope
                        </p>
                        <h2 className="mb-6 font-[family-name:var(--font-serif)] text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[1.1] text-[#D2D4DB]">
                            What I <em className="italic text-[#8A8D98]">build</em> - and what I don&apos;t
                        </h2>
                        <p className="max-w-[680px] text-[1.02rem] leading-[1.8] text-[#B3B7C0]">
                            To save everyone time upfront, here&apos;s what falls inside and outside my scope.
                        </p>

                        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
                            <div className="rounded-xl border border-[rgba(108,109,116,0.2)] bg-[#252A38] p-8">
                                <h3 className="mb-2 font-[family-name:var(--font-serif)] text-[1.2rem] font-bold text-[#D2D4DB]">
                                    <span className="mr-2 text-[#8A8D98]">✓</span>
                                    What I do
                                </h3>
                                <p className="mb-5 text-[0.82rem] text-[#B3B7C0]">Inside my scope</p>
                                <ul className="flex flex-col gap-2">
                                    {[
                                        "Websites - marketing sites, landing pages, portfolios, blogs",
                                        "Web applications - SaaS tools, dashboards, browser-based products",
                                        "Design systems and component libraries for web",
                                        "Responsive designs that work beautifully on mobile browsers",
                                        "Frontend code in HTML, CSS, and JavaScript",
                                        "Mobile app design",
                                    ].map((item) => (
                                        <li
                                            key={item}
                                            className="relative pl-4 text-[0.9rem] leading-[1.65] text-[#B3B7C0] before:absolute before:left-0 before:text-[#8A8D98] before:content-['·']"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="rounded-xl border border-[rgba(108,109,116,0.2)] bg-[#252A38] p-8">
                                <h3 className="mb-2 font-[family-name:var(--font-serif)] text-[1.2rem] font-bold text-[#D2D4DB]">
                                    <span className="mr-2 text-[#C77B6B]">✗</span>
                                    What I don&apos;t currently offer
                                </h3>
                                <p className="mb-5 text-[0.82rem] text-[#B3B7C0]">Outside my scope</p>
                                <ul className="flex flex-col gap-2">
                                    {[
                                        "Native mobile apps (iOS/Android requiring Swift, Kotlin, React Native, or Flutter) building",
                                        "Backend development or server architecture",
                                        "Mobile app store submissions",
                                    ].map((item) => (
                                        <li
                                            key={item}
                                            className="relative pl-4 text-[0.9rem] leading-[1.65] text-[#B3B7C0] before:absolute before:left-0 before:text-[#C77B6B] before:content-['·']"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <p className="mx-auto mt-8 max-w-[680px] text-center text-[0.9rem] leading-[1.75] text-[#B3B7C0] italic">
                            If you need a native mobile app, I&apos;m happy to recommend trusted specialists. If you
                            need a <strong className="font-medium text-[#D2D4DB] not-italic">mobile-responsive web app</strong>{" "}
                            that feels great on a phone browser - that&apos;s very much in my wheelhouse.
                        </p>
                    </div>
                </section>

                {/* Terms */}
                <section id="services-terms" className="bg-[#D2D4DB] py-[100px] text-[#0F111C]">
                    <div className="portfolio-container">
                        <p className="mb-4 text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-[#8A8D98]">
                            How we work
                        </p>
                        <h2 className="mb-12 font-[family-name:var(--font-serif)] text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[1.1] text-[#0F111C]">
                            Terms & <em className="italic text-[#6C6D74]">process</em>
                        </h2>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {terms.map((term) => (
                                <div
                                    key={term.label}
                                    className="rounded-[10px] border border-[rgba(108,109,116,0.25)] bg-[#E2E3EA] p-7"
                                >
                                    <p className="mb-2.5 text-[0.68rem] font-semibold tracking-[0.12em] uppercase text-[#6C6D74]">
                                        {term.label}
                                    </p>
                                    <p className="text-[0.88rem] leading-[1.65] text-[#4A4F54]">{term.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Me */}
                <section id="services-why" className="bg-[#0F111C] py-[100px]">
                    <div className="portfolio-container">
                        <p className="section-label text-center">Why me</p>
                        <p className="fade-up mx-auto mb-12 max-w-[820px] text-center font-[family-name:var(--font-serif)] text-[clamp(1.4rem,2.5vw,2rem)] italic leading-[1.45] text-[#D2D4DB]">
                            &ldquo;I bridge the gap between visual strategy and technical implementation. By combining
                            cognitive psychology with systems thinking, I deliver{" "}
                            <span className="text-[#8A8D98]">
                                web interfaces that aren&apos;t just beautiful - they&apos;re buildable.
                            </span>
                            &rdquo;
                        </p>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {[
                                {
                                    title: "No translation layer",
                                    desc: "Web designs that are technically feasible from day one.",
                                },
                                {
                                    title: "Built to scale",
                                    desc: "System-driven design that grows with your web product.",
                                },
                                {
                                    title: "Production-ready",
                                    desc: "Beautiful and ready to ship, saving weeks of back-and-forth.",
                                },
                            ].map((card) => (
                                <div key={card.title} className="border-l-2 border-[#6C6D74] p-7">
                                    <h3 className="mb-2.5 font-[family-name:var(--font-serif)] text-[1.1rem] font-bold text-[#D2D4DB]">
                                        {card.title}
                                    </h3>
                                    <p className="text-[0.9rem] leading-[1.7] text-[#B3B7C0]">{card.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <section
                    id="contact"
                    className="relative overflow-hidden bg-cover bg-center py-[120px] max-md:bg-none"
                    style={{
                        backgroundImage:
                            "url(https://res.cloudinary.com/dnnfhyeuv/image/upload/v1779012162/Hero_2_ygobkf.png)",
                    }}
                >
                    <div
                        className="pointer-events-none absolute right-0 bottom-0 left-0 z-0 h-[340px] bg-cover bg-[center_bottom] md:hidden"
                        style={{
                            backgroundImage:
                                "url(https://res.cloudinary.com/dnnfhyeuv/image/upload/v1779095202/Phonecontact3_ksii6m.png)",
                        }}
                    />
                    <div className="portfolio-container relative z-10 max-md:mb-14">
                        <div className="fade-up mx-auto flex max-w-[680px] flex-col items-center text-center">
                            <p className="section-label">Ready to start?</p>

                            <h2 className="mb-6 font-[family-name:var(--font-serif)] text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.2] text-[#D2D4DB]">
                                Tell me about your
                                <br />
                                <span className="block italic text-[#8A8D98]">project.</span>
                            </h2>

                            <p className="mb-10 text-base leading-[1.75] text-[#B3B7C0]">
                                I&apos;ll get back to you within 48 hours with thoughts and next steps.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href="https://client-questionnaire.onrender.com/"
                                    className="btn-portfolio btn-portfolio-primary"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    Start a project
                                    <ArrowIcon />
                                </a>

                                <a
                                    href="https://calendly.com/alivedesignstudio00/30min"
                                    className="btn-portfolio btn-portfolio-secondary"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    Intro Call - 20 min
                                    <ArrowIcon />
                                </a>
                            </div>

                            <a
                                href="mailto:alivedesignstudio00@gmail.com"
                                className="mt-6 mb-12 text-[0.9rem] text-[#B3B7C0] transition-colors duration-200"
                            >
                                or email me directly at{" "}
                                <span className="border-b border-[#8A8D98]/30 pb-px text-[#8A8D98] transition-colors duration-200 hover:border-[#8A8D98]">
                                    alivedesignstudio00@gmail.com
                                </span>
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
