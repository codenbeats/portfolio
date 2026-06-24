import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Kittipong Sorasuchart - AI Specialist & DevOps Engineer",
        short_name: "Kittipong",
        description:
            "AI Specialist and DevOps Engineer building intelligent systems with reliable infrastructure.",
        start_url: "/",
        display: "standalone",
        background_color: "#090F15",
        theme_color: "#090F15",
        icons: [
            {
                src: "/favicon.svg",
                sizes: "any",
                type: "image/svg+xml",
            },
        ],
    };
}
