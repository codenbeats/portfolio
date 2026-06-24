import type { Metadata } from "next";
import { caseStudyJsonLd } from "@/lib/site";
import { BigRentalsPage } from "./big-rentals-page";

const OG_IMAGE = "/bigrentals/hero.png";

export const metadata: Metadata = {
    title: "BigRentals - Case Study",
    description:
        "A trailer and equipment rental marketplace with location-aware search, availability, and programmatically generated SEO landing pages across hundreds of city-and-equipment combinations.",
    keywords: [
        "Kittipong Sorasuchart",
        "BigRentals",
        "trailer rental marketplace",
        "equipment rental",
        "programmatic SEO",
        "Next.js marketplace",
        "rental software",
    ],
    alternates: { canonical: "/work/big-rentals" },
    openGraph: {
        type: "article",
        url: "/work/big-rentals",
        title: "BigRentals - Case Study · Kittipong Sorasuchart",
        description:
            "A trailer and equipment rental marketplace with location-aware search, availability, and programmatically generated SEO landing pages across hundreds of city-and-equipment combinations.",
        images: [{ url: OG_IMAGE, width: 1200, height: 675, alt: "BigRentals" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "BigRentals - Case Study",
        description:
            "A trailer and equipment rental marketplace with location-aware search, availability, and programmatically generated SEO landing pages across hundreds of city-and-equipment combinations.",
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
                            title: "BigRentals - Case Study",
                            description:
                                "A trailer and equipment rental marketplace with location-aware search, availability, and programmatically generated SEO landing pages across hundreds of city-and-equipment combinations.",
                            slug: "big-rentals",
                            image: OG_IMAGE,
                        }),
                    ),
                }}
            />
            <BigRentalsPage />
        </>
    );
}
