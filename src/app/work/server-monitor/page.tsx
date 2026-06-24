import type { Metadata } from "next";
import { caseStudyJsonLd } from "@/lib/site";
import { ServerMonitorPage } from "./server-monitor-page";

const OG_IMAGE = "/severmonitor/hero.webp";

export const metadata: Metadata = {
    title: "Cloud Monitoring Dashboard - Case Study",
    description:
        "A centralized Prometheus + Grafana + Node Exporter observability stack monitoring CPU, memory, disk, and uptime across multi-cloud servers.",
    keywords: [
        "Kittipong Sorasuchart",
        "Cloud Monitoring Dashboard",
        "Prometheus",
        "Grafana",
        "Node Exporter",
        "server monitoring",
        "observability",
        "DevOps",
        "multi-cloud monitoring",
    ],
    alternates: { canonical: "/work/server-monitor" },
    openGraph: {
        type: "article",
        url: "/work/server-monitor",
        title: "Cloud Monitoring Dashboard - Case Study · Kittipong Sorasuchart",
        description:
            "A centralized Prometheus + Grafana + Node Exporter observability stack monitoring CPU, memory, disk, and uptime across multi-cloud servers.",
        images: [{ url: OG_IMAGE, width: 1200, height: 675, alt: "Cloud Monitoring Dashboard" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Cloud Monitoring Dashboard - Case Study",
        description:
            "A centralized Prometheus + Grafana + Node Exporter observability stack monitoring CPU, memory, disk, and uptime across multi-cloud servers.",
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
                            title: "Cloud Monitoring Dashboard - Case Study",
                            description:
                                "A centralized Prometheus + Grafana + Node Exporter observability stack monitoring CPU, memory, disk, and uptime across multi-cloud servers.",
                            slug: "server-monitor",
                            image: OG_IMAGE,
                        }),
                    ),
                }}
            />
            <ServerMonitorPage />
        </>
    );
}
