import type { Metadata } from "next";
import { PrivacyPolicyPage } from "./privacy-policy-page";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "Privacy Policy for Kittipong Sorasuchart's portfolio website. Learn how your data is collected, used, and protected.",
    alternates: { canonical: "/privacy-policy" },
    openGraph: {
        type: "website",
        url: "/privacy-policy",
        title: "Privacy Policy · Kittipong Sorasuchart",
        description:
            "Privacy Policy for Kittipong Sorasuchart's portfolio website. Learn how your data is collected, used, and protected.",
    },
    twitter: {
        card: "summary",
        title: "Privacy Policy · Kittipong Sorasuchart",
        description:
            "Privacy Policy for Kittipong Sorasuchart's portfolio website.",
    },
};

export default function Page() {
    return <PrivacyPolicyPage />;
}
