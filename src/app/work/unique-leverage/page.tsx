import type { Metadata } from "next";
import { caseStudyJsonLd } from "@/lib/site";
import { UniqueLeveragePage } from "./unique-leverage-page";

const OG_IMAGE = "/uniqueleverage/hero.jpg";

export const metadata: Metadata = {
    title: "Unique Leverage - Case Study",
    description:
        "An AI-powered marketing automation platform for car dealers - automated Facebook Marketplace posting, per-vehicle AI ad creative, and VIN-level lead attribution.",
    keywords: [
        "Kittipong Sorasuchart",
        "Unique Leverage",
        "automotive marketing automation",
        "Facebook Marketplace automation",
        "AI ad generation",
        "car dealer software",
        "lead attribution",
        "Meta ads",
    ],
    alternates: { canonical: "/work/unique-leverage" },
    openGraph: {
        type: "article",
        url: "/work/unique-leverage",
        title: "Unique Leverage - Case Study · Kittipong Sorasuchart",
        description:
            "An AI-powered marketing automation platform for car dealers - automated Facebook Marketplace posting, per-vehicle AI ad creative, and VIN-level lead attribution.",
        images: [{ url: OG_IMAGE, width: 1200, height: 675, alt: "Unique Leverage" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Unique Leverage - Case Study",
        description:
            "An AI-powered marketing automation platform for car dealers - automated Facebook Marketplace posting, per-vehicle AI ad creative, and VIN-level lead attribution.",
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
                            title: "Unique Leverage - Case Study",
                            description:
                                "An AI-powered marketing automation platform for car dealers - automated Facebook Marketplace posting, per-vehicle AI ad creative, and VIN-level lead attribution.",
                            slug: "unique-leverage",
                            image: OG_IMAGE,
                        }),
                    ),
                }}
            />
            <UniqueLeveragePage />
        </>
    );
}
