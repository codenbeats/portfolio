import type { Metadata } from "next";
import { personJsonLd } from "@/lib/site";
import { ServicesPage } from "./services-page";

export const metadata: Metadata = {
    title: "Services",
    description:
        "AI engineering, DevOps, cloud architecture, and full-stack development services by Kittipong Sorasuchart. From model training to production infrastructure at scale.",
    keywords: [
        "Kittipong Sorasuchart",
        "AI engineering services",
        "DevOps consulting",
        "cloud architecture",
        "full-stack development",
        "MLOps",
        "Kubernetes",
        "infrastructure consulting",
    ],
    alternates: { canonical: "/services" },
    openGraph: {
        type: "website",
        url: "/services",
        title: "Services · Kittipong Sorasuchart",
        description:
            "AI engineering, DevOps, cloud architecture, and full-stack development services. From model training to production infrastructure at scale.",
        images: [{ url: "/photo.png", width: 1200, height: 630, alt: "Kittipong Sorasuchart - Services" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Services · Kittipong Sorasuchart",
        description:
            "AI engineering, DevOps, cloud architecture, and full-stack development services. From model training to production infrastructure at scale.",
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
            <ServicesPage />
        </>
    );
}
