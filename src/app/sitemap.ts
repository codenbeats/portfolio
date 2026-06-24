import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://kittipong.dev";

    const caseStudies = [
        "server-monitor",
        "site-auditor",
        "unique-leverage",
        "arrow-market",
        "ogedge",
        "big-rentals",
    ];

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        ...caseStudies.map((slug) => ({
            url: `${baseUrl}/work/${slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        })),
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];
}
