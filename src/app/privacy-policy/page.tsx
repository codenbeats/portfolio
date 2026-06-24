import type { Metadata } from "next";
import { PrivacyPolicyPage } from "./privacy-policy-page";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Privacy Policy for ALIVE Design Studio.",
};

export default function Page() {
    return <PrivacyPolicyPage />;
}
