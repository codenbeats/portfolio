"use client";

import Link from "next/link";
import { useFadeUp } from "@/hooks/use-fade-up";

const listItemClass =
    "relative pl-5 text-md leading-[1.7] text-tertiary before:absolute before:left-0 before:text-brand-secondary before:content-['→']";

const linkClass = "text-brand-secondary transition-opacity duration-200 hover:opacity-75";

export function PrivacyPolicyPage() {
    const ref = useFadeUp();

    return (
        <div ref={ref} className="bg-primary text-primary">
            <main className="pt-36 pb-24 md:pt-44">
                <div className="mx-auto w-full max-w-container px-4 md:px-8">
                    <div className="mx-auto max-w-3xl">
                        {/* Hero */}
                        <div className="fade-up mb-16">
                            <p className="text-sm font-semibold tracking-[0.15em] uppercase text-brand-secondary md:text-md">
                                Legal
                            </p>
                            <h1 className="mt-4 mb-4 font-[family-name:var(--font-serif)] text-display-md font-semibold leading-[1.1] text-primary md:text-display-lg">
                                Privacy Policy
                            </h1>
                            <p className="text-sm text-tertiary">Last updated: 15 July 2026</p>
                        </div>

                        <hr className="my-12 border-0 border-t border-secondary" />

                        {/* 1. Who I Am */}
                        <div className="fade-up mb-12">
                            <p className="mb-2 text-xs font-semibold tracking-[0.15em] uppercase text-brand-secondary">
                                01
                            </p>
                            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-xl font-bold text-primary">
                                Who I Am
                            </h2>
                            <p className="text-md leading-[1.85] text-tertiary">
                                I&apos;m Kittipong Sorasuchart - an AI Specialist and DevOps Engineer. This website is
                                my personal portfolio. I respect your privacy and handle any personal data in line with
                                applicable data protection regulations, including the GDPR.
                            </p>
                            <ul className="mt-4 flex flex-col gap-2.5">
                                <li className={listItemClass}>
                                    Website:{" "}
                                    <Link href="/" className={linkClass}>
                                        kittipong.org
                                    </Link>
                                </li>
                                <li className={listItemClass}>
                                    Email:{" "}
                                    <a href="mailto:kittisoras@gmail.com" className={linkClass}>
                                        kittisoras@gmail.com
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <hr className="my-12 border-0 border-t border-secondary" />

                        {/* 2. What I Collect */}
                        <div className="fade-up mb-12">
                            <p className="mb-2 text-xs font-semibold tracking-[0.15em] uppercase text-brand-secondary">
                                02
                            </p>
                            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-xl font-bold text-primary">
                                What Personal Data I Collect
                            </h2>
                            <p className="my-5 mb-2 text-xs font-semibold tracking-[0.1em] uppercase text-secondary">
                                Provided directly by you
                            </p>
                            <ul className="flex flex-col gap-2.5">
                                <li className={listItemClass}>Name and email address</li>
                                <li className={listItemClass}>
                                    Project details or any information included in your messages
                                </li>
                                <li className={listItemClass}>Business information, where applicable</li>
                            </ul>
                            <p className="my-5 mb-2 text-xs font-semibold tracking-[0.1em] uppercase text-secondary">
                                Collected automatically
                            </p>
                            <ul className="flex flex-col gap-2.5">
                                <li className={listItemClass}>IP address</li>
                                <li className={listItemClass}>Browser type and device information</li>
                                <li className={listItemClass}>
                                    Pages visited and interactions - anonymous and aggregated where possible
                                </li>
                            </ul>
                        </div>

                        <hr className="my-12 border-0 border-t border-secondary" />

                        {/* 3. How I Use It */}
                        <div className="fade-up mb-12">
                            <p className="mb-2 text-xs font-semibold tracking-[0.15em] uppercase text-brand-secondary">
                                03
                            </p>
                            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-xl font-bold text-primary">
                                How I Use Your Data
                            </h2>
                            <p className="text-md leading-[1.85] text-tertiary">I use your information to:</p>
                            <ul className="mt-3 flex flex-col gap-2.5">
                                <li className={listItemClass}>Respond to inquiries and project requests</li>
                                <li className={listItemClass}>
                                    Provide engineering services and communicate throughout a project
                                </li>
                                <li className={listItemClass}>Send proposals, invoices, and agreements</li>
                                <li className={listItemClass}>Improve website performance and user experience</li>
                            </ul>
                            <p className="mt-4 text-md leading-[1.85] text-tertiary">
                                I never sell or share your personal data with unauthorized third parties.
                            </p>
                        </div>

                        <hr className="my-12 border-0 border-t border-secondary" />

                        {/* 4. Legal Basis */}
                        <div className="fade-up mb-12">
                            <p className="mb-2 text-xs font-semibold tracking-[0.15em] uppercase text-brand-secondary">
                                04
                            </p>
                            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-xl font-bold text-primary">
                                Legal Basis for Processing
                            </h2>
                            <p className="text-md leading-[1.85] text-tertiary">
                                Under GDPR Article 6, I process your information based on:
                            </p>
                            <ul className="mt-3 flex flex-col gap-2.5">
                                <li className={listItemClass}>
                                    <strong className="font-medium text-primary">Legitimate interest</strong> - when
                                    responding to contact requests
                                </li>
                                <li className={listItemClass}>
                                    <strong className="font-medium text-primary">Contract basis</strong> - when
                                    preparing or fulfilling a service agreement
                                </li>
                                <li className={listItemClass}>
                                    <strong className="font-medium text-primary">Consent</strong> - when you agree to
                                    optional communications
                                </li>
                            </ul>
                        </div>

                        <hr className="my-12 border-0 border-t border-secondary" />

                        {/* 5. Retention */}
                        <div className="fade-up mb-12">
                            <p className="mb-2 text-xs font-semibold tracking-[0.15em] uppercase text-brand-secondary">
                                05
                            </p>
                            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-xl font-bold text-primary">
                                How Long I Keep Your Data
                            </h2>
                            <p className="text-md leading-[1.85] text-tertiary">
                                I keep collected data only as long as necessary:
                            </p>
                            <table className="mt-4 w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border-b border-secondary px-4 py-2.5 text-left text-xs font-semibold tracking-[0.1em] uppercase text-brand-secondary">
                                            Data Type
                                        </th>
                                        <th className="border-b border-secondary px-4 py-2.5 text-left text-xs font-semibold tracking-[0.1em] uppercase text-brand-secondary">
                                            Retention Period
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border-b border-secondary px-4 py-3 text-sm leading-[1.6] text-tertiary">
                                            Contact inquiries without a project
                                        </td>
                                        <td className="border-b border-secondary px-4 py-3 text-sm leading-[1.6] text-tertiary">
                                            Up to 12 months
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-sm leading-[1.6] text-tertiary">
                                            Client project records &amp; invoices
                                        </td>
                                        <td className="px-4 py-3 text-sm leading-[1.6] text-tertiary">
                                            As required by applicable law
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="mt-4 text-md leading-[1.85] text-tertiary">
                                You may request deletion at any time - see Section 7.
                            </p>
                        </div>

                        <hr className="my-12 border-0 border-t border-secondary" />

                        {/* 6. Third Parties */}
                        <div className="fade-up mb-12">
                            <p className="mb-2 text-xs font-semibold tracking-[0.15em] uppercase text-brand-secondary">
                                06
                            </p>
                            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-xl font-bold text-primary">
                                Third-Party Services
                            </h2>
                            <p className="text-md leading-[1.85] text-tertiary">
                                To operate this site and my work, I may use trusted providers for website hosting,
                                email, analytics, and payment processing. These parties process data strictly on my
                                behalf under data-protection-compliant agreements.
                            </p>
                        </div>

                        <hr className="my-12 border-0 border-t border-secondary" />

                        {/* 7. Your Rights */}
                        <div className="fade-up mb-12">
                            <p className="mb-2 text-xs font-semibold tracking-[0.15em] uppercase text-brand-secondary">
                                07
                            </p>
                            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-xl font-bold text-primary">
                                Your Rights Under GDPR
                            </h2>
                            <p className="text-md leading-[1.85] text-tertiary">You have the right to:</p>
                            <ul className="mt-3 flex flex-col gap-2.5">
                                <li className={listItemClass}>Request access to your personal data</li>
                                <li className={listItemClass}>Request correction or deletion</li>
                                <li className={listItemClass}>Withdraw consent at any time</li>
                                <li className={listItemClass}>Request limitation or objection to processing</li>
                                <li className={listItemClass}>Request data portability</li>
                            </ul>
                            <p className="mt-4 text-md leading-[1.85] text-tertiary">
                                To exercise any of these rights, contact me at{" "}
                                <a href="mailto:kittisoras@gmail.com" className={linkClass}>
                                    kittisoras@gmail.com
                                </a>
                                .
                            </p>
                        </div>

                        <hr className="my-12 border-0 border-t border-secondary" />

                        {/* 8. Cookies */}
                        <div className="fade-up mb-12">
                            <p className="mb-2 text-xs font-semibold tracking-[0.15em] uppercase text-brand-secondary">
                                08
                            </p>
                            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-xl font-bold text-primary">
                                Cookies &amp; Tracking
                            </h2>
                            <p className="text-md leading-[1.85] text-tertiary">
                                This website may use cookies or analytics tools to understand page performance and
                                improve user experience. You can disable cookies in your browser settings at any time.
                            </p>
                        </div>

                        <hr className="my-12 border-0 border-t border-secondary" />

                        {/* 9. Security */}
                        <div className="fade-up mb-12">
                            <p className="mb-2 text-xs font-semibold tracking-[0.15em] uppercase text-brand-secondary">
                                09
                            </p>
                            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-xl font-bold text-primary">
                                Security
                            </h2>
                            <p className="text-md leading-[1.85] text-tertiary">
                                I take appropriate technical and organizational measures to protect your data from
                                unauthorized access, loss, or misuse.
                            </p>
                        </div>

                        <hr className="my-12 border-0 border-t border-secondary" />

                        {/* 10. Updates */}
                        <div className="fade-up mb-12">
                            <p className="mb-2 text-xs font-semibold tracking-[0.15em] uppercase text-brand-secondary">
                                10
                            </p>
                            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-xl font-bold text-primary">
                                Updates to This Policy
                            </h2>
                            <p className="text-md leading-[1.85] text-tertiary">
                                I may update this policy to stay compliant with legal requirements. The &quot;Last
                                updated&quot; date at the top will always reflect the most recent revision.
                            </p>
                        </div>

                        {/* Contact box */}
                        <div className="fade-up mt-12 rounded-xl border border-secondary bg-secondary px-8 py-8 text-center">
                            <p className="mb-3 text-md text-tertiary">Questions or requests about your data?</p>
                            <a
                                href="mailto:kittisoras@gmail.com"
                                className="text-lg font-medium text-brand-secondary transition-opacity duration-200 hover:opacity-75"
                            >
                                kittisoras@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
