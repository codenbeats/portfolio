import type { Metadata } from "next";
import { caseStudyJsonLd } from "@/lib/site";
import { OgedgePage } from "./ogedge-page";

const OG_IMAGE = "/ogedge/hero.png";

export const metadata: Metadata = {
    title: "OGEdge - Case Study",
    description:
        "A gaming services marketplace for boosting, coaching, and leveling across 19+ titles - dynamic catalogs, multi-currency checkout, and live order tracking.",
    keywords: [
        "Kittipong Sorasuchart",
        "OGEdge",
        "game boosting",
        "gaming marketplace",
        "Valorant boosting",
        "ecommerce",
        "coaching platform",
        "Next.js",
    ],
    alternates: { canonical: "/work/ogedge" },
    openGraph: {
        type: "article",
        url: "/work/ogedge",
        title: "OGEdge - Case Study · Kittipong Sorasuchart",
        description:
            "A gaming services marketplace for boosting, coaching, and leveling across 19+ titles - dynamic catalogs, multi-currency checkout, and live order tracking.",
        images: [{ url: OG_IMAGE, width: 1200, height: 675, alt: "OGEdge" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "OGEdge - Case Study",
        description:
            "A gaming services marketplace for boosting, coaching, and leveling across 19+ titles - dynamic catalogs, multi-currency checkout, and live order tracking.",
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
                            title: "OGEdge - Case Study",
                            description:
                                "A gaming services marketplace for boosting, coaching, and leveling across 19+ titles - dynamic catalogs, multi-currency checkout, and live order tracking.",
                            slug: "ogedge",
                            image: OG_IMAGE,
                        }),
                    ),
                }}
            />
            <OgedgePage />
        </>
    );
}
