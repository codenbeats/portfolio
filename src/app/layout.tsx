import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/portfolio/footer";
import { PortfolioHeader } from "@/components/portfolio/portfolio-header";
import { RouteProvider } from "@/providers/router-provider";
import { Theme } from "@/providers/theme";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "@/styles/globals.css";
import { cx } from "@/utils/cx";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-playfair",
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Kittipong Sorasuchart - AI Specialist & DevOps Engineer",
        template: "%s · Kittipong Sorasuchart",
    },
    description:
        "AI Specialist and DevOps Engineer building intelligent systems with reliable infrastructure. From model development to production deployment at scale.",
    keywords: [
        "Kittipong",
        "Kittipong Sorasuchart",
        "Kittipong Mirimera",
        "Kittipong Sorasuchart Mirimera",
        "Mirimera",
        "AI specialist",
        "DevOps engineer",
        "cloud architect",
        "machine learning",
        "MLOps",
        "Kubernetes",
        "infrastructure",
        "AI engineering",
        "platform engineering",
    ],
    authors: [{ name: "Kittipong Sorasuchart", url: SITE_URL }],
    creator: "Kittipong Sorasuchart",
    publisher: "Kittipong Sorasuchart",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    alternates: {
        canonical: SITE_URL,
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: SITE_URL,
        siteName: SITE_NAME,
        title: "Kittipong Sorasuchart - AI Specialist & DevOps Engineer",
        description:
            "AI Specialist and DevOps Engineer building intelligent systems with reliable, scalable infrastructure.",
        images: [
            {
                url: "/photo.png",
                width: 1200,
                height: 630,
                alt: "Kittipong Sorasuchart",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Kittipong Sorasuchart - AI Specialist & DevOps Engineer",
        description:
            "AI Specialist and DevOps Engineer building intelligent systems with reliable, scalable infrastructure.",
        images: ["/photo.png"],
    },
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/icon.png", type: "image/png" },
        ],
    },
};

export const viewport: Viewport = {
    themeColor: "#090F15",
    colorScheme: "dark",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cx(
                    inter.variable,
                    playfair.variable,
                    "bg-primary text-primary antialiased",
                )}
            >
                <RouteProvider>
                    <Theme>
                        <PortfolioHeader />
                        {children}
                        <Footer />
                    </Theme>
                </RouteProvider>
            </body>
        </html>
    );
}
