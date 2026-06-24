import type { Metadata } from "next";
import { caseStudyJsonLd } from "@/lib/site";
import { ArrowMarketPage } from "./arrow-market-page";

const OG_IMAGE = "/arrowmarket/position-builder.png";

export const metadata: Metadata = {
    title: "Arrow Markets - Case Study",
    description:
        "A hybrid on-chain options trading interface on Avalanche - real-time options chains, payoff visualizations, and a strategy-based position builder with centralized-exchange UX.",
    keywords: [
        "Kittipong Sorasuchart",
        "Arrow Markets",
        "DeFi options trading",
        "Avalanche",
        "web3",
        "on-chain options",
        "crypto derivatives",
        "blockchain frontend",
    ],
    alternates: { canonical: "/work/arrow-market" },
    openGraph: {
        type: "article",
        url: "/work/arrow-market",
        title: "Arrow Markets - Case Study · Kittipong Sorasuchart",
        description:
            "A hybrid on-chain options trading interface on Avalanche - real-time options chains, payoff visualizations, and a strategy-based position builder with centralized-exchange UX.",
        images: [{ url: OG_IMAGE, width: 1200, height: 675, alt: "Arrow Markets" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Arrow Markets - Case Study",
        description:
            "A hybrid on-chain options trading interface on Avalanche - real-time options chains, payoff visualizations, and a strategy-based position builder with centralized-exchange UX.",
        images: [OG_IMAGE],
    },
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        caseStudyJsonLd({
                            title: "Arrow Markets - Case Study",
                            description:
                                "A hybrid on-chain options trading interface on Avalanche - real-time options chains, payoff visualizations, and a strategy-based position builder with centralized-exchange UX.",
                            slug: "arrow-market",
                            image: OG_IMAGE,
                        }),
                    ),
                }}
            />
            <ArrowMarketPage />
        </>
    );
}
