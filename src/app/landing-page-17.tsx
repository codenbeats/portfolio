"use client";

import { type ComponentProps, type ComponentPropsWithRef, type FC, type ReactNode, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, PlayCircle } from "@untitledui/icons";
import { Carousel } from "@/components/application/carousel/carousel-base";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { Badge, type BadgeColor } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { VideoPlayer } from "@/components/base/video-player/video-player";
import { Footer } from "@/components/marketing/footer/footer";
import { Header } from "@/components/marketing/header-navigation/header";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { cx } from "@/utils/cx";
import { isReactComponent } from "@/utils/is-react-component";

const textLogo = (name: string, color = "%23171717") =>
    `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${name.length * 10 + 20} 40"><text x="${(name.length * 10 + 20) / 2}" y="24" font-family="system-ui,-apple-system,sans-serif" font-size="16" font-weight="700" letter-spacing="-0.02em" fill="${color}" text-anchor="middle">${name}</text></svg>`)}`;

const HeaderPrimary = (props: ComponentProps<typeof Header>) => {
    return (
        <Header
            {...props}
            className="bg-utility-brand-50_alt [&_nav>ul>li>a]:text-brand-primary [&_nav>ul>li>a]:hover:text-brand-primary [&_nav>ul>li>button]:text-brand-primary [&_nav>ul>li>button]:hover:text-brand-primary [&_nav>ul>li>button>svg]:text-fg-brand-secondary_alt"
        />
    );
};

export const BackgroundStripes = () => {
    return (
        <div className="absolute top-0 h-108 w-full overflow-hidden pt-[152px] md:pt-[94px] 2xl:h-128 2xl:pt-[136px]">
            <div className="-skew-y-[7deg] [--column-width:minmax(0,calc(1280px/var(--content-columns)))] [--content-columns:12] [--gutter-columns:4] [--stripe-height:34px] sm:[--stripe-height:48px] lg:[--stripe-height:72px]">
                {/* BG MASK */}
                <div className="absolute bottom-[var(--stripe-height)] h-110 w-full bg-utility-brand-50_alt"></div>
                {/* STRIPES */}
                <div
                    className="relative grid h-full"
                    style={{
                        gridTemplateRows: "repeat(3,var(--stripe-height))",
                        gridTemplateColumns:
                            "[viewport-start] 1fr [left-gutter-start] repeat(var(--gutter-columns),var(--column-width)) [left-gutter-end content-start] repeat(var(--content-columns),var(--column-width)) [content-end right-gutter-start] repeat(var(--gutter-columns),var(--column-width)) [right-gutter-end] 1fr [viewport-end]",
                    }}
                >
                    <div style={{ gridArea: "2 / left-gutter-start / auto / span 5" }} className="bg-utility-brand-100_alt"></div>
                    <div style={{ gridArea: "3 / viewport-start / auto / span 4" }} className="bg-utility-brand-400_alt"></div>
                    <div style={{ gridArea: "1 / span 7 / auto / viewport-end" }} className="bg-utility-brand-400_alt"></div>
                    <div style={{ gridArea: "2 / span 8 / auto / right-gutter-end" }} className="bg-utility-brand-200_alt"></div>
                    <div style={{ gridArea: "3 / span 3 / auto / viewport-end" }} className="bg-utility-brand-100_alt"></div>
                </div>
            </div>
        </div>
    );
};

const HeroAbstractAngles01 = () => {
    return (
        <div className="bg-primary">
            <HeaderPrimary />
            <section>
                <div className="flex flex-col items-center bg-utility-brand-50_alt pt-16 md:pt-24">
                    <div className="mx-auto flex w-full max-w-container flex-col px-4 md:px-8">
                        <div className="flex flex-col items-start sm:items-center sm:text-center">
                            <a href="#" className="rounded-full outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                <BadgeGroup className="hidden md:flex" size="lg" addonText="Just launched" iconTrailing={ArrowRight} theme="light" color="brand">
                                    See our latest case study
                                </BadgeGroup>
                                <BadgeGroup className="md:hidden" size="md" addonText="Just launched" iconTrailing={ArrowRight} theme="light" color="brand">
                                    See our latest case study
                                </BadgeGroup>
                            </a>

                            <h1 className="mt-4 text-display-md font-semibold text-brand-primary md:text-display-lg lg:text-display-xl">
                                Software that drives growth. <br /> Built for your vision.
                            </h1>
                            <p className="mt-4 max-w-3xl text-lg text-brand-secondary md:mt-6 md:text-xl">
                                From custom web and mobile applications to scalable cloud solutions, Mirimera engineers the software your business needs to thrive.
                            </p>
                            <div className="relative z-1 mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start md:mt-12">
                                <Button iconLeading={PlayCircle} color="secondary" size="xl">
                                    Watch demo
                                </Button>
                                <Button size="xl">Get a quote</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative pt-16">
                    <BackgroundStripes />
                </div>

                <div className="relative pb-16 md:pb-24">
                    <div className="mx-auto w-full max-w-container px-4 md:px-8">
                        <div className="flex justify-center">
                            <VideoPlayer
                                size="lg"
                                thumbnailUrl="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1280&h=720&fit=crop&q=80"
                                src="https://lorem.video/1080p_h264_30s.mp4"
                                className="aspect-video w-full overflow-hidden rounded-xl shadow-3xl md:max-w-240"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const SocialProofFullWidth = () => {
    return (
        <section className="bg-primary pb-16 md:pb-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="flex flex-col gap-8">
                    <p className="text-center text-md font-medium text-tertiary">Trusted by innovative companies worldwide</p>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 xl:gap-x-6">
                        {/* Light mode images (hidden in dark mode) */}
                        <img alt="Odeaolabs" src="https://www.untitledui.com/logos/logotype/color/odeao-labs.svg" className="h-9 md:h-10 dark:hidden" />
                        <img alt="Kintsugi" src="https://www.untitledui.com/logos/logotype/color/kintsugi.svg" className="h-9 md:h-10 dark:hidden" />
                        {/* <img alt="Stackedlab" src="https://www.untitledui.com/logos/logotype/color/stacked-lab.svg" className="h-9 md:h-10 dark:hidden" /> */}
                        <img alt="Magnolia" src="https://www.untitledui.com/logos/logotype/color/magnolia.svg" className="h-9 md:h-10 dark:hidden" />
                        <img alt="Warpspeed" src="https://www.untitledui.com/logos/logotype/color/warpspeed.svg" className="h-9 md:h-10 dark:hidden" />
                        <img alt="Sisyphus" src="https://www.untitledui.com/logos/logotype/color/sisyphus.svg" className="h-9 md:h-10 dark:hidden" />

                        {/* Dark mode images (hidden in light mode) */}
                        <img
                            alt="Odeaolabs"
                            src="https://www.untitledui.com/logos/logotype/white/odeao-labs.svg"
                            className="h-9 opacity-85 not-dark:hidden md:h-10"
                        />
                        <img
                            alt="Kintsugi"
                            src="https://www.untitledui.com/logos/logotype/white/kintsugi.svg"
                            className="h-9 opacity-85 not-dark:hidden md:h-10"
                        />
                        {/* <img
                            alt="Stackedlab"
                            src="https://www.untitledui.com/logos/logotype/white/stacked-lab.svg"
                            className="h-9 opacity-85 not-dark:hidden md:h-10"
                        /> */}
                        <img
                            alt="Magnolia"
                            src="https://www.untitledui.com/logos/logotype/white/magnolia.svg"
                            className="h-9 opacity-85 not-dark:hidden md:h-10"
                        />
                        <img
                            alt="Warpspeed"
                            src="https://www.untitledui.com/logos/logotype/white/warpspeed.svg"
                            className="h-9 opacity-85 not-dark:hidden md:h-10"
                        />
                        <img
                            alt="Sisyphus"
                            src="https://www.untitledui.com/logos/logotype/white/sisyphus.svg"
                            className="h-9 opacity-85 not-dark:hidden md:h-10"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

interface FeatureTabProps {
    title: string;
    subtitle: string;
    footer?: ReactNode;
    isCurrent?: boolean;
}

const FeatureTabHorizontal = ({ title, subtitle, footer, isCurrent }: FeatureTabProps) => (
    <div
        className={cx(
            "relative flex cursor-pointer flex-col items-start gap-4 border-l-4 border-tertiary py-4 pl-5 transition duration-100 ease-linear hover:border-brand",
            isCurrent && "border-brand",
        )}
    >
        <div>
            <h3 className="text-lg font-semibold text-primary">{title}</h3>
            <p className="mt-1 text-md text-tertiary">{subtitle}</p>
        </div>

        {footer}
    </div>
);

const FeaturesTabsMockup07 = () => {
    const [currentTab, setCurrentTab] = useState(0);

    return (
        <section className="overflow-hidden bg-primary py-16 md:py-24">
            <div className="mx-auto w-full max-w-container px-4 md:px-8">
                <div className="flex w-full flex-col lg:max-w-3xl">
                    <span className="text-sm font-semibold text-brand-secondary md:text-md">Our process</span>

                    <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">End-to-end software development</h2>
                    <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">
                        From discovery to deployment, we build robust solutions tailored to your unique business challenges.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:gap-16 lg:grid-cols-2 lg:items-center">
                    <ul className="flex flex-col">
                        {[
                            {
                                title: "Discovery & architecture",
                                subtitle: "We dive deep into your requirements, map out the technical architecture, and create a roadmap that aligns with your business goals.",
                            },
                            {
                                title: "Agile development",
                                subtitle: "Our engineering teams deliver iterative builds with full transparency - so you see progress every sprint, not just at launch.",
                            },
                            {
                                title: "Deployment & ongoing support",
                                subtitle:
                                    "We handle CI/CD pipelines, cloud infrastructure, and post-launch monitoring to keep your software running flawlessly at scale.",
                            },
                        ].map((item, index) => (
                            <li key={item.title} onClick={() => setCurrentTab(index)}>
                                <FeatureTabHorizontal
                                    title={item.title}
                                    subtitle={item.subtitle}
                                    isCurrent={index === currentTab}
                                    footer={
                                        <Button color="link-color" size="lg" href="#" iconTrailing={ArrowRight}>
                                            Learn more
                                        </Button>
                                    }
                                />
                            </li>
                        ))}
                    </ul>

                    <div className="relative -ml-4 w-screen md:w-full lg:h-140">
                        <div className="-mx-4 flex items-center justify-center lg:absolute lg:mr-9.5 lg:-ml-0 lg:h-140 lg:w-[50vw] lg:justify-start">
                            {/* Light mode image (hidden in dark mode) */}
                            <img
                                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop&q=80"
                                alt="Laptop displaying a modern application interface"
                                className="h-full object-contain lg:max-w-none dark:hidden"
                            />
                            {/* Dark mode image (hidden in light mode) */}
                            <img
                                src="https://images.unsplash.com/photo-1605379399642-870262d3d051?w=1200&h=800&fit=crop&q=80"
                                alt="Laptop displaying a modern application interface"
                                className="h-full object-contain not-dark:hidden lg:max-w-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const studies = [
    {
        company: "FinEdge",
        quote: "Mirimera rebuilt our entire payments platform in 4 months - our transaction speed improved by 300%.",
        background: "bg-utility-brand-600",
        logo: textLogo("FinEdge", "%23ffffff"),
        href: "#",
    },
    {
        company: "HealthSync",
        quote: "Their engineering team felt like an extension of ours. The HIPAA-compliant app they built exceeded expectations.",
        background: "bg-utility-green-600",
        logo: textLogo("HealthSync", "%23ffffff"),
        href: "#",
    },
    {
        company: "LogiTrack",
        quote: "Mirimera delivered a real-time fleet management system that reduced our operational costs by 40%.",
        background: "bg-utility-blue-600",
        logo: textLogo("LogiTrack", "%23ffffff"),
        href: "#",
    },
    {
        company: "EduPlatform",
        quote: "From prototype to production in record time. Mirimera's team turned our vision into a platform serving 500K+ users.",
        background: "bg-utility-indigo-600",
        logo: textLogo("EduPlatform", "%23ffffff"),
        href: "#",
    },
];

interface RoundButtonProps extends ComponentPropsWithRef<"button"> {
    icon?: FC<{ className?: string }>;
}

const RoundButton = ({ icon: Icon, ...props }: RoundButtonProps) => {
    return (
        <Button
            {...props}
            color="link-gray"
            className={cx(
                "group flex size-12 items-center justify-center rounded-full bg-primary ring-1 ring-secondary backdrop-blur transition duration-100 ease-linear ring-inset hover:bg-secondary md:size-14",
                props.className,
            )}
        >
            {props.children ??
                (isReactComponent(Icon) ? (
                    <Icon className="size-5 text-fg-quaternary transition-inherit-all group-hover:text-fg-quaternary_hover md:size-6" />
                ) : null)}
        </Button>
    );
};

const TestimonialCaseStudyCards = () => {
    return (
        <section className="overflow-hidden bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="flex flex-col justify-between gap-8 lg:flex-row lg:gap-0">
                    <div className="flex max-w-3xl flex-col gap-4 md:gap-5">
                        <h2 className="text-display-sm font-semibold text-primary md:text-display-md">Proven results across industries</h2>
                        <p className="text-lg text-tertiary md:text-xl">See how we've helped companies ship better software, faster.</p>
                    </div>

                    <div className="flex flex-col-reverse gap-3 self-stretch sm:flex-row sm:self-start">
                        <Button color="secondary" size="xl">
                            View case studies
                        </Button>
                        <Button size="xl">Start a project</Button>
                    </div>
                </div>

                <Carousel.Root className="mt-12 md:mt-16" opts={{ align: "start" }}>
                    <Carousel.Content overflowHidden={false} className="gap-6 pr-4 md:gap-8 md:pr-8">
                        {studies.map((study) => (
                            <Carousel.Item
                                key={study.company}
                                className={cx(
                                    "relative flex h-118 max-w-76 shrink-0 cursor-grab items-end p-6 md:h-126 md:w-full md:max-w-sm md:p-5",
                                    study.background,
                                )}
                            >
                                <img src={study.logo} alt={study.company} className="absolute top-6 left-6 h-10 object-contain md:top-8 md:left-8 md:h-12" />

                                <div className="flex cursor-auto flex-col bg-alpha-white/30 px-4 py-5 ring-1 ring-alpha-white/30 backdrop-blur-md ring-inset md:p-5 md:px-6 md:py-8">
                                    <p className="text-display-xs font-semibold text-white md:text-display-sm">{study.company}</p>
                                    <q className="mt-3 text-lg font-medium text-balance text-white md:mt-4">{study.quote}</q>

                                    <Button color="link-gray" size="lg" href={study.href} className="mt-8 text-white" iconTrailing={ArrowUpRight}>
                                        Read case study
                                    </Button>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel.Content>
                    <div className="mt-8 flex gap-4 md:gap-8">
                        <Carousel.PrevTrigger asChild>
                            <RoundButton icon={ArrowLeft} />
                        </Carousel.PrevTrigger>
                        <Carousel.NextTrigger asChild>
                            <RoundButton icon={ArrowRight} />
                        </Carousel.NextTrigger>
                    </div>
                </Carousel.Root>
            </div>
        </section>
    );
};

const CTAScreenMockup03 = () => {
    return (
        <section className="overflow-hidden bg-primary py-16 md:pt-24 md:pb-0">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="flex flex-col justify-center text-center">
                    <h2 className="text-display-sm font-semibold text-primary md:text-display-md">
                        <span className="hidden md:inline">Let&apos;s build something extraordinary</span>
                        <span className="md:hidden">Let&apos;s build together</span>
                    </h2>
                    <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">Partner with Mirimera to turn your ideas into production-ready software.</p>
                    <div className="mt-8 flex flex-col-reverse gap-3 self-stretch md:flex-row md:self-center">
                        <Button color="secondary" size="xl">
                            Our services
                        </Button>
                        <Button size="xl">Talk to an engineer</Button>
                    </div>
                </div>
            </div>
            <div className="mx-auto mt-16 w-full max-w-container px-4 md:max-h-100 md:overflow-hidden md:px-8">
                <div className="size-full rounded-[9.03px] bg-primary p-[0.9px] shadow-lg ring-[0.56px] ring-utility-neutral-300 ring-inset md:rounded-[32px] md:p-1 md:ring-[2px]">
                    <div className="size-full rounded-[7.9px] bg-primary p-0.5 shadow-modern-mockup-inner-md md:rounded-[28px] md:p-[5.4px] md:shadow-modern-mockup-inner-lg">
                        <div className="relative size-full overflow-hidden rounded-[6.77px] bg-utility-neutral-50 ring-[0.56px] ring-utility-neutral-200 md:rounded-[24px] md:ring-[2px]">
                            {/* Light mode image (hidden in dark mode) */}
                            <img
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=900&fit=crop&q=80"
                                className="size-full object-cover dark:hidden"
                                alt="Dashboard mockup showing application interface"
                            />
                            {/* Dark mode image (hidden in light mode) */}
                            <img
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=900&fit=crop&q=80"
                                className="size-full object-cover not-dark:hidden"
                                alt="Dashboard mockup showing application interface"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

type Article = {
    id: string;
    href: string;
    thumbnailUrl: string;
    title: string;
    summary: string;
    category: {
        href: string;
        name: string;
    };
    author: {
        href: string;
        name: string;
        avatarUrl: string;
    };
    publishedAt: string;
    readingTime: string;
    tags: Array<{ name: string; color: BadgeColor<"color">; href: string }>;
    isFeatured?: boolean;
};

const articles: Article[] = [
    {
        id: "article-1",
        title: "Microservices vs monoliths in 2026",
        summary: "When should you break up your monolith? A practical guide to choosing the right architecture for your stage.",
        href: "#",
        category: { name: "Architecture", href: "#" },
        thumbnailUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=533&fit=crop&q=80",
        publishedAt: "20 Jan 2026",
        readingTime: "10 min read",
        author: { name: "Olivia Rhye", href: "#", avatarUrl: "https://i.pravatar.cc/150?img=5" },
        tags: [
            { name: "Architecture", color: "brand", href: "#" },
            { name: "Backend", color: "indigo", href: "#" },
            { name: "DevOps", color: "pink", href: "#" },
        ],
        isFeatured: true,
    },
    {
        id: "article-2",
        title: "CI/CD pipelines that actually work",
        summary: "How we set up zero-downtime deployments for a fintech client processing 1M+ transactions daily.",
        href: "#",
        category: { name: "DevOps", href: "#" },
        thumbnailUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=533&fit=crop&q=80",
        publishedAt: "19 Jan 2026",
        readingTime: "8 min read",
        author: { name: "Phoenix Baker", href: "#", avatarUrl: "https://i.pravatar.cc/150?img=8" },
        tags: [
            { name: "DevOps", color: "sky", href: "#" },
            { name: "Cloud", color: "pink", href: "#" },
            { name: "Infrastructure", color: "pink", href: "#" },
        ],
    },
    {
        id: "article-3",
        title: "Building scalable API gateways",
        summary: "The patterns and tools we use to design APIs that handle millions of requests without breaking a sweat.",
        href: "#",
        category: { name: "Engineering", href: "#" },
        thumbnailUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=533&fit=crop&q=80",
        publishedAt: "18 Jan 2026",
        readingTime: "12 min read",
        author: { name: "Lana Steiner", href: "#", avatarUrl: "https://i.pravatar.cc/150?img=32" },
        tags: [
            { name: "APIs", color: "success", href: "#" },
            { name: "Backend", color: "pink", href: "#" },
        ],
    },
    {
        id: "article-4",
        title: "React Server Components in production",
        summary: "Lessons learned from migrating a large Next.js application to the App Router with RSC.",
        href: "#",
        category: { name: "Frontend", href: "#" },
        thumbnailUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=533&fit=crop&q=80",
        publishedAt: "16 Jan 2026",
        readingTime: "9 min read",
        author: { name: "Demi Wilkinson", href: "#", avatarUrl: "https://i.pravatar.cc/150?img=20" },
        tags: [
            { name: "React", color: "sky", href: "#" },
            { name: "Next.js", color: "indigo", href: "#" },
            { name: "Performance", color: "orange", href: "#" },
        ],
    },
];

const Simple03Vertical = ({
    article,
    imageClassName,
    titleClassName,
    className,
}: {
    article: Article;
    imageClassName?: string;
    titleClassName?: string;
    className?: string;
}) => (
    <article className={cx("flex flex-col gap-4", className)}>
        <a href={article.href} className="overflow-hidden rounded-2xl" tabIndex={-1}>
            <img src={article.thumbnailUrl} alt={article.title} className={cx("aspect-[1.5] w-full object-cover", imageClassName)} />
        </a>

        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start gap-2">
                <p className="text-sm font-semibold text-brand-secondary">
                    {article.author.name} • <time>{article.publishedAt}</time>
                </p>
                <div className="flex w-full flex-col gap-1">
                    <a
                        href={article.category.href}
                        className={cx(
                            "flex justify-between gap-x-4 rounded-md text-lg font-semibold text-primary outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2",
                            titleClassName,
                        )}
                    >
                        {article.title}
                        <ArrowUpRight className="mt-0.5 size-6 shrink-0 text-fg-quaternary" aria-hidden="true" />
                    </a>
                    <p className="line-clamp-2 text-md text-tertiary">{article.summary}</p>
                </div>
            </div>

            <div className="flex gap-2">
                {article.tags.map((tag) => (
                    <a key={tag.name} href={tag.href} className="rounded-xl outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                        <Badge color={tag.color} size="md">
                            {tag.name}
                        </Badge>
                    </a>
                ))}
            </div>
        </div>
    </article>
);

const BlogSectionCarouselLayout02 = () => {
    return (
        <section className="overflow-hidden bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="flex flex-col items-start justify-between lg:flex-row">
                    <div className="max-w-3xl">
                        <h2 className="text-display-sm font-semibold text-primary md:text-display-md">Engineering insights</h2>
                        <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">Technical deep-dives, architecture guides, and lessons from the field.</p>
                    </div>

                    <div className="hidden gap-3 lg:flex">
                        <Button size="xl">View all posts</Button>
                    </div>
                </div>

                <Carousel.Root className="mt-12 md:mt-16" opts={{ align: "start" }}>
                    <Carousel.Content overflowHidden={false} className="gap-6 pr-4 md:gap-8 md:pr-8">
                        {articles.slice(0, 4).map((article) => (
                            <Carousel.Item key={article.id} className="max-w-xs md:max-w-96">
                                <Simple03Vertical article={article} />
                            </Carousel.Item>
                        ))}
                    </Carousel.Content>
                    <div className="mt-8 flex gap-4 md:gap-8">
                        <Carousel.PrevTrigger asChild>
                            <RoundButton icon={ArrowLeft} />
                        </Carousel.PrevTrigger>
                        <Carousel.NextTrigger asChild>
                            <RoundButton icon={ArrowRight} />
                        </Carousel.NextTrigger>
                    </div>
                </Carousel.Root>

                <div className="mt-12 flex flex-col gap-3 lg:hidden">
                    <Button size="xl">View all posts</Button>
                </div>
            </div>
        </section>
    );
};

const CTASimpleLogos02 = () => {
    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-16">
                    <div className="flex flex-col">
                        <div className="max-w-3xl">
                            <h2 className="text-display-sm font-semibold text-primary md:text-display-md">Join 200+ companies shipping faster with Mirimera</h2>
                            <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">Let&apos;s discuss your next project today.</p>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 self-stretch sm:flex-row sm:self-start md:mt-12 lg:flex-row-reverse">
                            <Button size="xl">Start a project</Button>
                            <Button color="secondary" size="xl">
                                View our work
                            </Button>
                        </div>
                    </div>
                    <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-y-6 lg:mt-0">
                        {/* Light mode images (hidden in dark mode) */}
                        <img alt="Ephemeral" src="https://www.untitledui.com/logos/logotype/color/ephemeral.svg" className="h-9 md:h-10 dark:hidden" />
                        <img alt="Wildcrafted" src="https://www.untitledui.com/logos/logotype/color/wildcrafted.svg" className="h-9 md:h-10 dark:hidden" />
                        <img alt="Codecraft" src="https://www.untitledui.com/logos/logotype/color/codecraft.svg" className="h-9 md:h-10 dark:hidden" />
                        <img alt="Convergence" src="https://www.untitledui.com/logos/logotype/color/convergence.svg" className="h-9 md:h-10 dark:hidden" />
                        <img alt="Imgcompress" src="https://www.untitledui.com/logos/logotype/color/img-compress.svg" className="h-9 md:h-10 dark:hidden" />
                        <img alt="Epicurious" src="https://www.untitledui.com/logos/logotype/color/epicurious.svg" className="h-9 md:h-10 dark:hidden" />
                        <img
                            alt="Watchtower"
                            src="https://www.untitledui.com/logos/logotype/color/watchtower.svg"
                            className="h-9 max-md:hidden md:h-10 dark:hidden"
                        />
                        <img
                            alt="Renaissance"
                            src="https://www.untitledui.com/logos/logotype/color/renaissance.svg"
                            className="h-9 max-md:hidden md:h-10 dark:hidden"
                        />
                        <img
                            alt="Contrastai"
                            src="https://www.untitledui.com/logos/logotype/color/contrast-ai.svg"
                            className="h-9 max-md:hidden md:h-10 dark:hidden"
                        />

                        {/* Dark mode images (hidden in light mode) */}
                        <img
                            alt="Ephemeral"
                            src="https://www.untitledui.com/logos/logotype/white/ephemeral.svg"
                            className="h-9 opacity-85 not-dark:hidden md:h-10"
                        />
                        <img
                            alt="Wildcrafted"
                            src="https://www.untitledui.com/logos/logotype/white/wildcrafted.svg"
                            className="h-9 opacity-85 not-dark:hidden md:h-10"
                        />
                        <img
                            alt="Codecraft"
                            src="https://www.untitledui.com/logos/logotype/white/codecraft.svg"
                            className="h-9 opacity-85 not-dark:hidden md:h-10"
                        />
                        <img
                            alt="Convergence"
                            src="https://www.untitledui.com/logos/logotype/white/convergence.svg"
                            className="h-9 opacity-85 not-dark:hidden md:h-10"
                        />
                        <img
                            alt="Imgcompress"
                            src="https://www.untitledui.com/logos/logotype/white/img-compress.svg"
                            className="h-9 opacity-85 not-dark:hidden md:h-10"
                        />
                        <img
                            alt="Epicurious"
                            src="https://www.untitledui.com/logos/logotype/white/epicurious.svg"
                            className="h-9 opacity-85 not-dark:hidden md:h-10"
                        />
                        <img
                            alt="Watchtower"
                            src="https://www.untitledui.com/logos/logotype/white/watchtower.svg"
                            className="h-9 opacity-85 not-dark:hidden max-md:hidden md:h-10"
                        />
                        <img
                            alt="Renaissance"
                            src="https://www.untitledui.com/logos/logotype/white/renaissance.svg"
                            className="h-9 opacity-85 not-dark:hidden max-md:hidden md:h-10"
                        />
                        <img
                            alt="Contrastai"
                            src="https://www.untitledui.com/logos/logotype/white/contrast-ai.svg"
                            className="h-9 opacity-85 not-dark:hidden max-md:hidden md:h-10"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

const FooterLarge09 = Footer;

const LandingPage17 = () => {
    return (
        <div className="bg-primary">
            <HeroAbstractAngles01 />

            <SocialProofFullWidth />

            <SectionDivider />

            <FeaturesTabsMockup07 />

            <SectionDivider />

            <TestimonialCaseStudyCards />

            <SectionDivider />

            <CTAScreenMockup03 />

            <BlogSectionCarouselLayout02 />

            <CTASimpleLogos02 />

            <FooterLarge09 />
        </div>
    );
};

export default LandingPage17;
