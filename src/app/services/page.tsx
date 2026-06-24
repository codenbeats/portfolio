import type { Metadata } from "next";
import { ServicesPage } from "./services-page";

export const metadata: Metadata = {
    title: "Services",
    description: "Design, development, and strategy services by ALIVE Design Studio.",
};

export default function Page() {
    return <ServicesPage />;
}
