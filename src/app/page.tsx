import type { Metadata } from "next";
import { personJsonLd, websiteJsonLd } from "@/lib/site";
import { HomePage } from "./home-page";

export const metadata: Metadata = {
    title: "Kittipong Sorasuchart - AI Specialist & DevOps Engineer",
    description:
        "AI Specialist and DevOps Engineer building intelligent systems with reliable infrastructure. From model development to production deployment at scale.",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        url: "/",
        title: "Kittipong Sorasuchart - AI Specialist & DevOps Engineer",
        description:
            "AI Specialist and DevOps Engineer building intelligent systems with reliable, scalable infrastructure.",
        images: [{ url: "/photo.png", width: 1200, height: 630, alt: "Kittipong Sorasuchart" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Kittipong Sorasuchart - AI Specialist & DevOps Engineer",
        description:
            "AI Specialist and DevOps Engineer building intelligent systems with reliable, scalable infrastructure.",
        images: ["/photo.png"],
    },
};

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
            />
            <HomePage />
        </>
    );
}
