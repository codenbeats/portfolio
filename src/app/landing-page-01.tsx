"use client";

import { type FC, type ReactNode, useState } from "react";
import {
    ArrowRight,
    ArrowUpRight,
    ChartBreakoutSquare,
    Command,
    CreditCardRefresh,
    File05,
    Heart,
    Mail01,
    MessageChatCircle,
    MessageHeartCircle,
    MessageSmileCircle,
    PlayCircle,
    SlashCircle01,
    SwitchHorizontal01,
    Zap,
} from "@untitledui/icons";
import { motion } from "motion/react";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { VerifiedTick } from "@/components/base/avatar/base-components";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { Badge, type BadgeColor } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { Header } from "@/components/marketing/header-navigation/header";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { cx } from "@/utils/cx";

const HeroScreenMockup05 = () => {
    return (
        <div className="relative overflow-hidden bg-primary">
            {/* Background pattern */}
            <img
                alt="Grid of dots"
                aria-hidden="true"
                loading="lazy"
                src="https://www.untitledui.com/patterns/light/grid-check-md-desktop.svg"
                className="pointer-events-none absolute top-0 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block dark:brightness-[0.2]"
            />
            <img
                alt="Grid of dots"
                aria-hidden="true"
                loading="lazy"
                src="https://www.untitledui.com/patterns/light/grid-check-md-mobile.svg"
                className="pointer-events-none absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden dark:brightness-[0.2]"
            />

            <Header isFloating />

            <section className="relative pt-16 md:pt-24">
                <div className="mx-auto w-full max-w-container px-4 md:px-8">
                    <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
                        <a href="#" className="rounded-[10px] outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                            <BadgeGroup className="hidden md:flex" size="lg" addonText="New feature" iconTrailing={ArrowRight} theme="modern" color="brand">
                                Check out the team dashboard
                            </BadgeGroup>
                            <BadgeGroup className="md:hidden" size="md" addonText="New feature" iconTrailing={ArrowRight} theme="modern" color="brand">
                                Check out the team dashboard
                            </BadgeGroup>
                        </a>

                        <h1 className="mt-4 text-display-md font-semibold text-primary md:text-display-lg lg:text-display-xl">
                            Beautiful analytics to grow smarter{" "}
                        </h1>
                        <p className="mt-4 max-w-3xl text-lg text-balance text-tertiary md:mt-6 md:text-xl">
                            Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000
                            startups.
                        </p>
                        <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start md:mt-12">
                            <Button iconLeading={PlayCircle} color="secondary" size="xl">
                                Demo
                            </Button>
                            <Button size="xl">Sign up</Button>
                        </div>
                    </div>
                </div>

                <div className="mx-auto mt-16 h-90 w-full max-w-container overflow-hidden px-4 md:h-124 md:px-8">
                    <div className="mx-auto flex h-auto w-full max-w-70 items-center justify-center md:w-full md:max-w-none md:items-start">
                        <div className="size-full rounded-[23.89px] bg-primary p-[3px] shadow-lg ring-[1.5px] ring-utility-neutral-300 ring-inset md:rounded-[32px] md:p-1 md:ring-[2px]">
                            <div className="size-full rounded-[20.91px] bg-primary p-1 shadow-modern-mockup-inner-sm md:rounded-[28px] md:p-[5.4px] md:shadow-modern-mockup-inner-lg">
                                <div className="relative size-full overflow-hidden rounded-[17.92px] bg-utility-neutral-50 ring-[1.5px] ring-utility-neutral-200 md:rounded-[24px] md:ring-[2px]">
                                    {/* Light mode image (hidden in dark mode) */}
                                    <img
                                        alt="Dashboard mockup showing application interface"
                                        src="https://www.untitledui.com/marketing/screen-mockups/dashboard-desktop-mockup-light-01.webp"
                                        className="hidden size-full object-cover md:block dark:hidden"
                                    />
                                    {/* Dark mode image (hidden in light mode) */}
                                    <img
                                        alt="Dashboard mockup showing application interface"
                                        src="https://www.untitledui.com/marketing/screen-mockups/dashboard-desktop-mockup-dark-01.webp"
                                        className="hidden size-full object-cover not-dark:hidden md:block"
                                    />

                                    {/* Light mode image (hidden in dark mode) */}
                                    <img
                                        alt="Iphone Screen Mockup"
                                        src="https://www.untitledui.com/marketing/screen-mockups/dashboard-mobile-mockup-light-01.webp"
                                        className="size-full object-cover md:hidden dark:hidden"
                                    />
                                    {/* Dark mode image (hidden in light mode) */}
                                    <img
                                        alt="Iphone Screen Mockup"
                                        src="https://www.untitledui.com/marketing/screen-mockups/dashboard-mobile-mockup-dark-01.webp"
                                        className="size-full object-cover not-dark:hidden md:hidden"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const SocialProofFullWidth = () => {
    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="flex flex-col gap-8">
                    <p className="text-center text-md font-medium text-tertiary">Join 4,000+ companies already growing</p>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 xl:gap-x-6">
                        {/* Light mode images (hidden in dark mode) */}
                        <img alt="Odeaolabs" src="https://www.untitledui.com/logos/logotype/color/odeao-labs.svg" className="h-9 md:h-10 dark:hidden" />
                        <img alt="Kintsugi" src="https://www.untitledui.com/logos/logotype/color/kintsugi.svg" className="h-9 md:h-10 dark:hidden" />
                        <img alt="Stackedlab" src="https://www.untitledui.com/logos/logotype/color/stacked-lab.svg" className="h-9 md:h-10 dark:hidden" />
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
                        <img
                            alt="Stackedlab"
                            src="https://www.untitledui.com/logos/logotype/white/stacked-lab.svg"
                            className="h-9 opacity-85 not-dark:hidden md:h-10"
                        />
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

interface TextCentered {
    title: string;
    subtitle: string;
    footer?: ReactNode;
}

interface FeatureTextIcon extends TextCentered {
    icon: FC<{ className?: string }>;
}

const FeatureTextFeaturedIconTopCentered = ({
    color = "gray",
    theme = "modern",
    icon,
    title,
    subtitle,
    footer,
}: FeatureTextIcon & {
    color?: "brand" | "gray" | "success" | "warning" | "error";
    theme?: "light" | "gradient" | "dark" | "outline" | "modern";
}) => (
    <div className="flex max-w-sm flex-col items-center gap-4 text-center">
        <FeaturedIcon icon={icon} size="lg" color={color} theme={theme} className="hidden md:inline-flex" />
        <FeaturedIcon icon={icon} size="md" color={color} theme={theme} className="inline-flex md:hidden" />

        <div>
            <h3 className="text-lg font-semibold text-primary">{title}</h3>
            <p className="mt-1 text-md text-tertiary">{subtitle}</p>
        </div>

        {footer}
    </div>
);

const FeaturesSimpleIcons02 = () => {
    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto w-full max-w-container px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <span className="text-sm font-semibold text-brand-secondary md:text-md">Features</span>
                    <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">Beautiful analytics to grow smarter</h2>
                    <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                    </p>
                </div>

                <div className="mt-12 md:mt-16">
                    <ul className="grid w-full grid-cols-1 justify-items-center gap-x-8 gap-y-10 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
                        {[
                            {
                                title: "Share team inboxes",
                                subtitle: "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
                                icon: MessageChatCircle,
                            },
                            {
                                title: "Deliver instant answers",
                                subtitle: "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
                                icon: Zap,
                            },
                            {
                                title: "Manage your team with reports",
                                subtitle:
                                    "Measure what matters with Untitled's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
                                icon: ChartBreakoutSquare,
                            },
                            {
                                title: "Connect with customers",
                                subtitle:
                                    "Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email without confusion.",
                                icon: MessageSmileCircle,
                            },
                            {
                                title: "Connect the tools you already use",
                                subtitle:
                                    "Explore 100+ integrations that make your day-to-day workflow more efficient and familiar. Plus, our extensive developer tools.",
                                icon: Command,
                            },
                            {
                                title: "Our people make the difference",
                                subtitle:
                                    "We're an extension of your customer service team, and all of our resources are free. Chat to our friendly team 24/7 when you need help.",
                                icon: MessageHeartCircle,
                            },
                        ].map((item) => (
                            <li key={item.title}>
                                <FeatureTextFeaturedIconTopCentered icon={item.icon} title={item.title} subtitle={item.subtitle} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

const TestimonialSimpleCentered02 = () => {
    return (
        <section className="bg-secondary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <figure className="flex w-full shrink-0 snap-start flex-col gap-8 text-center">
                    {/* Light mode image (hidden in dark mode) */}
                    <img
                        alt="Wildcrafted"
                        src="https://www.untitledui.com/logos/logotype/color/wildcrafted.svg"
                        className="h-10 dark:hidden"
                        aria-hidden="true"
                    />
                    {/* Dark mode image (hidden in light mode) */}
                    <img
                        alt="Wildcrafted"
                        src="https://www.untitledui.com/logos/logotype/white/wildcrafted.svg"
                        className="h-10 opacity-85 not-dark:hidden"
                        aria-hidden="true"
                    />
                    <blockquote className="text-display-sm font-medium text-primary md:text-display-lg">
                        We've been using Untitled to kick start every new project and can't imagine working without it.
                    </blockquote>
                    <figcaption className="flex justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <Avatar border src="https://www.untitledui.com/images/avatars/amelie-laurent?fm=webp&q=80" alt="Amelie Laurent" size="lg" />
                            <div className="flex flex-col gap-1">
                                <p className="text-lg font-semibold text-primary">Amélie Laurent</p>
                                <cite className="text-md text-tertiary not-italic">Product Manager, Wildcrafted</cite>
                            </div>
                        </div>
                    </figcaption>
                </figure>
            </div>
        </section>
    );
};

const faqsExtended = [
    {
        question: "Is there a free trial available?",
        answer: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
        icon: Heart,
    },
    {
        question: "Can I change my plan later?",
        answer: "Of course. Our pricing scales with your company. Chat to our friendly team to find a solution that works for you.",
        icon: SwitchHorizontal01,
    },
    {
        question: "What is your cancellation policy?",
        answer: "We understand that things change. You can cancel your plan at any time and we'll refund you the difference already paid.",
        icon: SlashCircle01,
    },
    {
        question: "Can other info be added to an invoice?",
        answer: "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
        icon: File05,
    },
    {
        question: "How does billing work?",
        answer: "Plans are per workspace, not per account. You can upgrade one workspace, and still have any number of free workspaces.",
        icon: CreditCardRefresh,
    },
    {
        question: "How do I change my account email?",
        answer: "You can change the email address associated with your account by going to untitledui.com/account from a laptop or desktop.",
        icon: Mail01,
    },
];

const FAQAccordion01 = () => {
    const [openQuestions, setOpenQuestions] = useState(new Set([0]));

    const handleToggle = (index: number) => {
        openQuestions.has(index) ? openQuestions.delete(index) : openQuestions.add(index);
        setOpenQuestions(new Set(openQuestions));
    };

    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <h2 className="text-display-sm font-semibold text-primary md:text-display-md">Frequently asked questions</h2>
                    <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">Everything you need to know about the product and billing.</p>
                </div>

                <div className="mx-auto mt-12 max-w-3xl md:mt-16">
                    <div className="flex flex-col gap-8">
                        {faqsExtended.map((faq, index) => (
                            <div key={faq.question} className="not-first:-mt-px not-first:border-t not-first:border-secondary not-first:pt-6">
                                <h3>
                                    <button
                                        onClick={() => handleToggle(index)}
                                        className="flex w-full cursor-pointer items-start justify-between gap-2 rounded-md text-left outline-focus-ring select-none focus-visible:outline-2 focus-visible:outline-offset-2 md:gap-6"
                                    >
                                        <span className="text-md font-semibold text-primary">{faq.question}</span>

                                        <span aria-hidden="true" className="flex size-6 items-center text-fg-quaternary">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line
                                                    className={cx(
                                                        "origin-center rotate-0 transition duration-150 ease-out",
                                                        openQuestions.has(index) && "-rotate-90",
                                                    )}
                                                    x1="12"
                                                    y1="8"
                                                    x2="12"
                                                    y2="16"
                                                ></line>
                                                <line x1="8" y1="12" x2="16" y2="12"></line>
                                            </svg>
                                        </span>
                                    </button>
                                </h3>

                                <motion.div
                                    className="overflow-hidden"
                                    initial={false}
                                    animate={{ height: openQuestions.has(index) ? "auto" : 0, opacity: openQuestions.has(index) ? 1 : 0 }}
                                    transition={{ type: "spring", damping: 24, stiffness: 240, bounce: 0.4 }}
                                >
                                    <div className="pt-1 pr-8 md:pr-12">
                                        <p className="text-md text-tertiary">{faq.answer}</p>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center gap-6 rounded-2xl bg-secondary px-6 py-8 text-center md:mt-16 md:gap-8 md:pt-8 md:pb-10">
                    <div className="flex items-end -space-x-4">
                        <Avatar
                            src="https://www.untitledui.com/images/avatars/marco-kelly?fm=webp&q=80"
                            alt="Marco Kelly"
                            size="lg"
                            className="ring-[1.5px] ring-fg-white"
                        />
                        <Avatar
                            src="https://www.untitledui.com/images/avatars/amelie-laurent?fm=webp&q=80"
                            alt="Amelie Laurent"
                            size="xl"
                            className="z-10 ring-[1.5px] ring-fg-white"
                        />
                        <Avatar
                            src="https://www.untitledui.com/images/avatars/jaya-willis?fm=webp&q=80"
                            alt="Jaya Willis"
                            size="lg"
                            className="ring-[1.5px] ring-fg-white"
                        />
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-primary">Still have questions?</h4>
                        <p className="mt-2 text-md text-tertiary md:text-lg">Can't find the answer you're looking for? Please chat to our friendly team.</p>
                    </div>
                    <Button size="xl">Get in touch</Button>
                </div>
            </div>
        </section>
    );
};

const reviews = [
    [
        {
            id: "review-01",
            quote: "Untitled has been a lifesaver for our team-everything we need is right at our fingertips, and it helps us jump right into new design projects.",
            author: {
                name: "Nikolas Gibbons",
                title: "Product Designer, Powersurge",
                imageUrl: "https://www.untitledui.com/images/avatars/nikolas-gibbons?fm=webp&q=80",
            },
            company: {
                name: "Powersurge",
                imageUrl: "https://www.untitledui.com/logos/logotype/color/powersurge.svg",
                imageUrlDark: "https://www.untitledui.com/logos/logotype/white/powersurge.svg",
            },
        },
        {
            id: "review-02",
            quote: "We love Untitled! It's made the design process super streamlined.",
            author: {
                name: "Marco Kelly",
                title: "UI Designer, Railspeed",
                imageUrl: "https://www.untitledui.com/images/avatars/marco-kelly?fm=webp&q=80",
            },
            company: {
                name: "Railspeed",
                imageUrl: "https://www.untitledui.com/logos/logotype/color/railspeed.svg",
                imageUrlDark: "https://www.untitledui.com/logos/logotype/white/railspeed.svg",
            },
        },
        {
            id: "review-03",
            quote: "Starting projects used to feel daunting, but Untitled simplifies everything. We've used it for both small and large projects, and it never disappoints.",
            author: {
                name: "Zaid Schwartz",
                title: "Founder, Wildcrafted",
                imageUrl: "https://www.untitledui.com/images/avatars/zaid-schwartz?fm=webp&q=80",
            },
            company: {
                name: "Wildcrafted",
                imageUrl: "https://www.untitledui.com/logos/logotype/color/wildcrafted.svg",
                imageUrlDark: "https://www.untitledui.com/logos/logotype/white/wildcrafted.svg",
            },
        },
    ],
    [
        {
            id: "review-01",
            quote: "Untitled is our secret weapon for staying ahead of deadlines. It gives us everything we need to get started quickly.",
            author: {
                name: "Ammar Foley",
                title: "UX Designer, Goodwell",
                imageUrl: "https://www.untitledui.com/images/avatars/ammar-foley?fm=webp&q=80",
            },
            company: {
                name: "Goodwell",
                imageUrl: "https://www.untitledui.com/logos/logotype/color/goodwell.svg",
                imageUrlDark: "https://www.untitledui.com/logos/logotype/white/goodwell.svg",
            },
        },
        {
            id: "review-02",
            quote: "Untitled is hands down the best design library We've used. It has literally everything we need to get started for any possible project.",
            author: {
                name: "Florence Shaw",
                title: "Web Designer, Quixotic",
                imageUrl: "https://www.untitledui.com/images/avatars/florence-shaw?fm=webp&q=80",
            },
            company: {
                name: "Quixotic",
                imageUrl: "https://www.untitledui.com/logos/logotype/color/quixotic.svg",
                imageUrlDark: "https://www.untitledui.com/logos/logotype/white/quixotic.svg",
            },
        },
        {
            id: "review-03",
            quote: "With Untitled, we can focus more on design and less on the tedious setup work. Best money ever spent.",
            author: {
                name: "Owen Garcia",
                title: "CTO, Solaris Energy",
                imageUrl: "https://www.untitledui.com/images/avatars/owen-garcia?fm=webp&q=80",
            },
            company: {
                name: "Solaris Energy",
                imageUrl: "https://www.untitledui.com/logos/logotype/color/solaris-energy.svg",
                imageUrlDark: "https://www.untitledui.com/logos/logotype/white/solaris-energy.svg",
            },
        },
    ],
    [
        {
            id: "review-01",
            quote: "Our workflow has improved dramatically since we started using Untitled and it's become an integral part of our workflow. It's easy to use, and the resources are top-notch. I recommend it to everyone!",
            author: {
                name: "Mathilde Lewis",
                title: "Project Lead, Stack3d Lab",
                imageUrl: "https://www.untitledui.com/images/avatars/mathilde-lewis?fm=webp&q=80",
            },
            company: {
                name: "Stack3d Lab",
                imageUrl: "https://www.untitledui.com/logos/logotype/color/stacked-lab.svg",
                imageUrlDark: "https://www.untitledui.com/logos/logotype/white/stacked-lab.svg",
            },
        },
        {
            id: "review-02",
            quote: "Untitled is an absolute game-changer for our projects. We can't imagine going back to how we used to work without it.",
            author: {
                name: "Stefan Sears",
                title: "UI/UX Designer, Magnolia",
                imageUrl: "https://www.untitledui.com/images/avatars/stefan-sears?fm=webp&q=80",
            },
            company: {
                name: "Magnolia",
                imageUrl: "https://www.untitledui.com/logos/logotype/color/magnolia.svg",
                imageUrlDark: "https://www.untitledui.com/logos/logotype/white/magnolia.svg",
            },
        },
        {
            id: "review-03",
            quote: "Untitled has been a real time-saver for us. It's organized, efficient, and keeps us moving forward with every project.",
            author: {
                name: "Harriet Rojas",
                title: "Product Designer, Ikigai Labs",
                imageUrl: "https://www.untitledui.com/images/avatars/harriet-rojas?fm=webp&q=80",
            },
            company: {
                name: "Ikigai Labs",
                imageUrl: "https://www.untitledui.com/logos/logotype/color/ikigai-labs.svg",
                imageUrlDark: "https://www.untitledui.com/logos/logotype/white/ikigai-labs.svg",
            },
        },
    ],
];
const SocialCards03 = () => {
    let reviewsCount = 0;
    const maxVisibleReviewsOnMobile = 4;

    return (
        <div className="flex flex-col items-center gap-16 bg-primary pb-16 lg:pb-24">
            <div className="flex max-w-container flex-col items-center gap-4 px-4 text-center lg:gap-5 lg:px-8">
                <h1 className="text-display-sm font-semibold text-primary lg:text-display-md">Our reviews</h1>
                <p className="text-lg text-tertiary lg:text-xl">Hear first-hand from our incredible community of customers.</p>
            </div>
            <div className="grid max-w-container grid-cols-1 gap-5 mask-b-from-[calc(100%-340px)] px-4 lg:grid-cols-3 lg:gap-8 lg:px-8">
                {reviews.map((reviewGroup, reviewGroupIndex) => {
                    return (
                        <div
                            key={reviewGroupIndex}
                            className={cx(
                                "flex flex-col gap-5 lg:gap-8",
                                reviewGroupIndex === 0 && "lg:py-8",
                                reviewGroupIndex === 2 && "lg:pt-10",
                                reviewsCount > maxVisibleReviewsOnMobile && "max-lg:hidden",
                            )}
                        >
                            {reviewGroup.map((review) => {
                                reviewsCount += 1;

                                return (
                                    <div
                                        key={review.id}
                                        className={cx(
                                            "flex flex-col gap-8 rounded-xl bg-primary_alt p-6 shadow-xs ring-1 ring-secondary ring-inset lg:justify-between lg:gap-12 lg:p-8",
                                            reviewsCount > maxVisibleReviewsOnMobile && "max-lg:hidden",
                                        )}
                                    >
                                        <div className="flex flex-col items-start gap-3">
                                            <img className="h-8 dark:hidden" src={review.company.imageUrl} alt={review.company.name} />
                                            <img className="h-8 opacity-85 not-dark:hidden" src={review.company.imageUrlDark} alt={review.company.name} />
                                            <blockquote className="text-md text-tertiary">{review.quote}</blockquote>
                                        </div>
                                        <AvatarLabelGroup
                                            border={false}
                                            size="lg"
                                            src={review.author.imageUrl}
                                            alt={review.author.name}
                                            title={
                                                <span className="relative flex items-center gap-1">
                                                    {review.author.name}
                                                    <VerifiedTick size="lg" />
                                                </span>
                                            }
                                            subtitle={review.author.title}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
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
        title: "UX review presentations",
        summary: "How do you create compelling presentations that wow your colleagues and impress your managers?",
        href: "#",
        category: { name: "Design", href: "#" },
        thumbnailUrl: "https://www.untitledui.com/marketing/spirals.webp",
        publishedAt: "20 Jan 2026",
        readingTime: "8 min read",
        author: { name: "Olivia Rhye", href: "#", avatarUrl: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" },
        tags: [
            { name: "Design", color: "brand", href: "#" },
            { name: "Research", color: "indigo", href: "#" },
            { name: "Presentation", color: "pink", href: "#" },
        ],
        isFeatured: true,
    },
    {
        id: "article-2",
        title: "Migrating to Linear 101",
        summary: "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
        href: "#",
        category: { name: "Product", href: "#" },
        thumbnailUrl: "https://www.untitledui.com/marketing/conversation.webp",

        publishedAt: "19 Jan 2026",
        readingTime: "8 min read",
        author: { name: "Phoenix Baker", href: "#", avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80" },
        tags: [
            { name: "Product", color: "sky", href: "#" },
            { name: "Tools", color: "pink", href: "#" },
            { name: "SaaS", color: "pink", href: "#" },
        ],
    },
    {
        id: "article-3",
        title: "Building your API stack",
        summary: "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
        href: "#",
        category: { name: "Software Engineering", href: "#" },
        thumbnailUrl: "https://www.untitledui.com/blog/two-mobile-shapes-pattern.webp",
        publishedAt: "18 Jan 2026",
        readingTime: "8 min read",
        author: { name: "Lana Steiner", href: "#", avatarUrl: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80" },
        tags: [
            { name: "Software Development", color: "success", href: "#" },
            { name: "Tools", color: "pink", href: "#" },
        ],
    },
    {
        id: "article-3.5",
        title: "PM mental models",
        summary: "Mental models are simple expressions of complex processes or relationships.",
        href: "#",
        category: { name: "Product", href: "#" },
        thumbnailUrl: "https://www.untitledui.com/blog/two-people.webp",
        publishedAt: "17 Jan 2026",
        readingTime: "8 min read",
        author: { name: "Demi Wilkinson", href: "#", avatarUrl: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80" },
        tags: [
            { name: "Leadership", color: "brand", href: "#" },
            { name: "Management", color: "slate", href: "#" },
        ],
    },
    {
        id: "article-4",
        title: "PM mental models",
        summary: "Mental models are simple expressions of complex processes or relationships.",
        href: "#",
        category: { name: "Product", href: "#" },
        thumbnailUrl: "https://www.untitledui.com/marketing/brainstorming.webp",
        publishedAt: "16 Jan 2026",
        readingTime: "8 min read",
        author: { name: "Demi Wilkinson", href: "#", avatarUrl: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80" },
        tags: [
            { name: "Product", color: "sky", href: "#" },
            { name: "Research", color: "indigo", href: "#" },
            { name: "Frameworks", color: "orange", href: "#" },
        ],
    },
    {
        id: "article-5",
        title: "What is Wireframing?",
        summary: "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
        href: "#",
        category: { name: "Design", href: "#" },
        thumbnailUrl: "https://www.untitledui.com/marketing/workspace-4.webp",
        publishedAt: "15 Jan 2026",
        readingTime: "8 min read",
        author: { name: "Candice Wu", href: "#", avatarUrl: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80" },
        tags: [
            { name: "Design", color: "brand", href: "#" },
            { name: "Research", color: "indigo", href: "#" },
        ],
    },
    {
        id: "article-6",
        title: "How collaboration makes us better designers",
        summary: "Collaboration can make our teams stronger, and our individual designs better.",
        href: "#",
        category: { name: "Design", href: "#" },
        thumbnailUrl: "https://www.untitledui.com/marketing/collaboration.webp",
        publishedAt: "14 Jan 2026",
        readingTime: "8 min read",
        author: { name: "Natali Craig", href: "#", avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80" },
        tags: [
            { name: "Design", color: "brand", href: "#" },
            { name: "Research", color: "indigo", href: "#" },
        ],
    },
    {
        id: "article-7",
        title: "Our top 10 Javascript frameworks to use",
        summary: "JavaScript frameworks make development easy with extensive features and functionalities.",
        href: "#",
        category: { name: "Product", href: "#" },
        thumbnailUrl: "https://www.untitledui.com/marketing/man-and-laptop-2.webp",
        publishedAt: "13 Jan 2026",
        readingTime: "8 min read",
        author: { name: "Drew Cano", href: "#", avatarUrl: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80" },
        tags: [
            { name: "Software development", color: "success", href: "#" },
            { name: "Tools", color: "pink", href: "#" },
            { name: "SaaS", color: "pink", href: "#" },
        ],
    },
    {
        id: "article-8",
        title: "Podcast: Creating a better CX Community",
        summary: "Starting a community doesn't need to be complicated, but how do you get started?",
        href: "#",
        category: { name: "Customer Success", href: "#" },
        thumbnailUrl: "https://www.untitledui.com/marketing/podcast-girl-2.webp",
        publishedAt: "12 Jan 2026",
        readingTime: "8 min read",
        author: { name: "Orlando Diggs", href: "#", avatarUrl: "https://www.untitledui.com/images/avatars/orlando-diggs?fm=webp&q=80" },
        tags: [
            { name: "Podcasts", color: "brand", href: "#" },
            { name: "Customer success", color: "slate", href: "#" },
        ],
    },
];

const Simple01Vertical = ({ article, imageClassName }: { article: Article; imageClassName?: string }) => (
    <article className="flex flex-col gap-4">
        <a href={article.href} className="overflow-hidden rounded-2xl" tabIndex={-1}>
            <img
                src={article.thumbnailUrl}
                alt={article.title}
                className={cx("aspect-[1.5] w-full object-cover transition duration-100 ease-linear hover:scale-105", imageClassName)}
            />
        </a>

        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-brand-secondary">{article.category.name}</span>
                <div className="flex flex-col gap-1">
                    <a
                        href={article.href}
                        className="group/title flex justify-between gap-x-4 rounded-md text-lg font-semibold text-primary outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        {article.title}
                        <ArrowUpRight
                            className="mt-0.5 size-6 shrink-0 text-fg-quaternary transition duration-100 ease-linear group-hover/title:text-fg-quaternary_hover"
                            aria-hidden="true"
                        />
                    </a>

                    <p className="line-clamp-2 text-md text-tertiary">{article.summary}</p>
                </div>
            </div>

            <div className="flex gap-2">
                <a href={article.author.href} tabIndex={-1} className="flex">
                    <Avatar focusable alt={article.author.name} src={article.author.avatarUrl} size="md" />
                </a>

                <div>
                    <a
                        href={article.author.href}
                        className="block rounded-xs text-sm font-semibold text-primary outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        {article.author.name}
                    </a>
                    <time className="block text-sm text-tertiary">{article.publishedAt}</time>
                </div>
            </div>
        </div>
    </article>
);

const BlogSectionSimpleLeftAligned01 = () => {
    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="flex flex-col items-start justify-between lg:flex-row">
                    <div className="max-w-3xl">
                        <p className="text-sm font-semibold text-brand-secondary md:text-md">Our blog</p>
                        <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">Latest blog posts</h2>
                        <p className="mt-4 text-lg text-tertiary md:mt-5 md:text-xl">Tool and strategies modern teams need to help their companies grow.</p>
                    </div>

                    <div className="hidden gap-3 lg:flex">
                        <Button size="xl">View all posts</Button>
                    </div>
                </div>

                <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:mt-16 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
                    {articles.slice(0, 3).map((article) => (
                        <li key={article.id}>
                            <Simple01Vertical article={article} />
                        </li>
                    ))}
                </ul>
                <div className="mt-12 flex flex-col gap-3 lg:hidden">
                    <Button size="xl">View all posts</Button>
                </div>
            </div>
        </section>
    );
};

const footerNavList = [
    {
        label: "Product",
        items: [
            { label: "Overview", href: "#" },
            { label: "Features", href: "#" },
            {
                label: "Solutions",
                href: "#",
                badge: (
                    <Badge color="gray" type="modern" size="sm" className="ml-1">
                        New
                    </Badge>
                ),
            },
            { label: "Tutorials", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "Releases", href: "#" },
        ],
    },
    {
        label: "Company",
        items: [
            { label: "About us", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Press", href: "#" },
            { label: "News", href: "#" },
            { label: "Media kit", href: "#" },
            { label: "Contact", href: "#" },
        ],
    },
    {
        label: "Resources",
        items: [
            { label: "Blog", href: "#" },
            { label: "Newsletter", href: "#" },
            { label: "Events", href: "#" },
            { label: "Help centre", href: "#" },
            { label: "Tutorials", href: "#" },
            { label: "Support", href: "#" },
        ],
    },
    {
        label: "Use cases",
        items: [
            { label: "Startups", href: "#" },
            { label: "Enterprise", href: "#" },
            { label: "Government", href: "#" },
            { label: "SaaS centre", href: "#" },
            { label: "Marketplaces", href: "#" },
            { label: "Ecommerce", href: "#" },
        ],
    },
    {
        label: "Social",
        items: [
            { label: "X", href: "#" },
            { label: "LinkedIn", href: "#" },
            { label: "Facebook", href: "#" },
            { label: "GitHub", href: "#" },
            { label: "AngelList", href: "#" },
            { label: "Dribbble", href: "#" },
        ],
    },
    {
        label: "Legal",
        items: [
            { label: "Terms", href: "#" },
            { label: "Privacy", href: "#" },
            { label: "Cookies", href: "#" },
            { label: "Licenses", href: "#" },
            { label: "Settings", href: "#" },
            { label: "Contact", href: "#" },
        ],
    },
];

const FooterLarge01 = () => {
    return (
        <footer className="bg-primary py-12 md:pt-16">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <nav>
                    <ul className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
                        {footerNavList.map((category) => (
                            <li key={category.label}>
                                <h4 className="text-sm font-semibold text-quaternary">{category.label}</h4>
                                <ul className="mt-4 flex flex-col gap-3">
                                    {category.items.map((item) => (
                                        <li key={item.label} className="flex">
                                            <Button color="link-gray" size="md" href={item.href} iconTrailing={item.badge} className="max-h-5 gap-1">
                                                {item.label}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="mt-12 flex flex-col justify-between gap-6 border-t border-secondary pt-8 md:mt-16 md:flex-row md:items-center">
                    <UntitledLogo className="h-7 w-min" />
                    <p className="text-sm text-quaternary">© 2077 Untitled UI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

const LandingPage01 = () => {
    return (
        <div className="bg-primary">
            <HeroScreenMockup05 />

            <SectionDivider />

            <SocialProofFullWidth />

            <SectionDivider />

            <FeaturesSimpleIcons02 />

            <TestimonialSimpleCentered02 />

            <FAQAccordion01 />

            <SocialCards03 />

            <SectionDivider />

            <BlogSectionSimpleLeftAligned01 />

            <SectionDivider />

            <FooterLarge01 />
        </div>
    );
};

export default LandingPage01;
