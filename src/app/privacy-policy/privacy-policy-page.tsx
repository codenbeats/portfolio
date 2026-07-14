"use client";

import Link from "next/link";
import { useFadeUp } from "@/hooks/use-fade-up";

const listItemClass =
    "flex items-start gap-2.5 text-[0.93rem] leading-[1.65] text-[#B3B7C0] before:mt-[3px] before:shrink-0 before:text-[0.8rem] before:text-[#8A8D98] before:content-['→']";

const linkClass = "text-[#8A8D98] transition-opacity duration-350 hover:opacity-75";

export function PrivacyPolicyPage() {
    const ref = useFadeUp();

    return (
        <div ref={ref} className="portfolio-page">
            <main className="pb-[100px] pt-[160px] max-md:pb-[80px] max-md:pt-[120px]">
                <div className="portfolio-container">
                    <div className="mx-auto max-w-[800px]">
                        {/* Hero */}
                        <div className="fade-up mb-16">
                            <p className="mb-4 text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-[#8A8D98]">
                                Legal
                            </p>
                            <h1 className="mb-4 font-[family-name:var(--font-serif)] text-[clamp(2.4rem,5vw,3.5rem)] leading-[1.1] font-bold text-[#D2D4DB]">
                                Privacy Policy
                            </h1>
                            <p className="text-[0.82rem] text-[#B3B7C0]">Last updated: 05 January 2026</p>
                        </div>

                        <hr className="my-12 border-0 border-t border-[#8A8D98]/15" />

                        {/* 1. Who I Am */}
                        <div className="fade-up mb-12">
                            <p className="mb-2 text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-[#8A8D98]">
                                01
                            </p>
                            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-[1.3rem] font-bold text-[#D2D4DB]">
                                Who I Am
                            </h2>
                            <p className="text-[0.95rem] leading-[1.85] text-[#B3B7C0]">
                                I&apos;m Lívia Kiss, operating as ALIVE Design Studio - a sole proprietorship based in the
                                Netherlands. I operate in accordance with the General Data Protection Regulation (GDPR).
                            </p>
                            <ul className="mt-4 flex flex-col gap-2.5">
                                <li className={listItemClass}>
                                    Website:{" "}
                                    <Link href="/" className={linkClass}>
                                        ALIVE Design Studio
                                    </Link>
                                </li>
                                <li className={listItemClass}>
                                    Email:{" "}
                                    <a href="mailto:alivedesignstudio00@gmail.com" className={linkClass}>
                                        alivedesignstudio00@gmail.com
                                    </a>
                                </li>
                                <li className={listItemClass}>KVK number: 99302810</li>
                            </ul>
                        </div>

                        <hr className="my-12 border-0 border-t border-[#8A8D98]/15" />

                        {/* 2. What I Collect */}
                        <div className="fade-up mb-12">
                            <p className="mb-2 text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-[#8A8D98]">
                                02
                            </p>
                            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-[1.3rem] font-bold text-[#D2D4DB]">
                                What Personal Data I Collect
                            </h2>
                            <p className="my-5 mb-2 text-[0.75rem] font-semibold tracking-[0.1em] uppercase text-[#B3B7C0]">
                                Provided directly by you
                            </p>
                            <ul className="flex flex-col gap-2.5">
                                <li className={listItemClass}>Name and email address</li>
                                <li className={listItemClass}>
                                    Project details or any information included in contact messages
                                </li>
                                <li className={listItemClass}>Business information, where applicable</li>
                            </ul>
                            <p className="my-5 mb-2 text-[0.75rem] font-semibold tracking-[0.1em] uppercase text-[#B3B7C0]">
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

                        <hr className="my-12 border-0 border-t border-[#8A8D98]/15" />

                        {/* 3. How I Use It */}
                        <div className="fade-up mb-12">
                            <p className="mb-2 text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-[#8A8D98]">
                                03
                            </p>
                            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-[1.3rem] font-bold text-[#D2D4DB]">
                                How I Use Your Data
                            </h2>
                            <p className="text-[0.95rem] leading-[1.85] text-[#B3B7C0]">I use your information to:</p>
                            <ul className="mt-3 flex flex-col gap-2.5">
                                <li className={listItemClass}>Respond to inquiries and project requests</li>
                                <li className={listItemClass}>
                                    Provide design services and communicate throughout a project
                                </li>
                                <li className={listItemClass}>Send proposals, invoices, and agreements</li>
                                <li className={listItemClass}>Improve website performance and user experience</li>
                            </ul>
                            <p className="mt-4 text-[0.95rem] leading-[1.85] text-[#B3B7C0]">
                                I never sell or share your personal data with unauthorized third parties.
                            </p>
                        </div>

                        <hr className="my-12 border-0 border-t border-[#8A8D98]/15" />

                        {/* 4. Legal Basis */}
                        <div className="fade-up mb-12">
                            <p className="mb-2 text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-[#8A8D98]">
                                04
                            </p>
                            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-[1.3rem] font-bold text-[#D2D4DB]">
                                Legal Basis for Processing
                            </h2>
                            <p className="text-[0.95rem] leading-[1.85] text-[#B3B7C0]">
                                Under GDPR Article 6, I process your information based on:
                            </p>
                            <ul className="mt-3 flex flex-col gap-2.5">
                                <li className={listItemClass}>
                                    <strong className="font-medium text-[#D2D4DB]">Legitimate interest</strong> - when
                                    responding to contact requests
                                </li>
                                <li className={listItemClass}>
                                    <strong className="font-medium text-[#D2D4DB]">Contract basis</strong> - when
                                    preparing or fulfilling a design service agreement
                                </li>
                                <li className={listItemClass}>
                                    <strong className="font-medium text-[#D2D4DB]">Consent</strong> - when you agree to
                                    optional communications
                                </li>
                            </ul>
                        </div>

                        <hr className="my-12 border-0 border-t border-[#8A8D98]/15" />

                        {/* 5. Retention */}
                        <div className="fade-up mb-12">
                            <p className="mb-2 text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-[#8A8D98]">
                                05
                            </p>
                            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-[1.3rem] font-bold text-[#D2D4DB]">
                                How Long I Keep Your Data
                            </h2>
                            <p className="text-[0.95rem] leading-[1.85] text-[#B3B7C0]">
                                I keep collected data only as long as necessary:
                            </p>
                            <table className="mt-4 w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border-b border-[#8A8D98]/25 px-4 py-2.5 text-left text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-[#8A8D98]">
                                            Data Type
                                        </th>
                                        <th className="border-b border-[#8A8D98]/25 px-4 py-2.5 text-left text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-[#8A8D98]">
                                            Retention Period
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border-b border-[#8A8D98]/10 px-4 py-3 text-[0.9rem] leading-[1.6] text-[#B3B7C0]">
                                            Contact inquiries without a project
                                        </td>
                                        <td className="border-b border-[#8A8D98]/10 px-4 py-3 text-[0.9rem] leading-[1.6] text-[#B3B7C0]">
                                            Up to 12 months
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-[0.9rem] leading-[1.6] text-[#B3B7C0]">
                                            Client project records &amp; invoices
                                        </td>
                                        <td className="px-4 py-3 text-[0.9rem] leading-[1.6] text-[#B3B7C0]">
                                            Up to 7 years (required by Dutch law)
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="mt-4 text-[0.95rem] leading-[1.85] text-[#B3B7C0]">
                                You may request deletion at any time - see Section 7.
                            </p>
                        </div>

                        <hr className="my-12 border-0 border-t border-[#8A8D98]/15" />

                        {/* 6. Third Parties */}
                        <div className="fade-up mb-12">
                            <p className="mb-2 text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-[#8A8D98]">
                                06
                            </p>
                            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-[1.3rem] font-bold text-[#D2D4DB]">
                                Third-Party Services
                            </h2>
                            <p className="text-[0.95rem] leading-[1.85] text-[#B3B7C0]">
                                To operate my business I may use trusted providers for website hosting, email, and payment
                                processing (such as Revolut or PayPal). These parties process data strictly on my behalf
                                under GDPR-compliant agreements.
                            </p>
                        </div>

                        <hr className="my-12 border-0 border-t border-[#8A8D98]/15" />

                        {/* 7. Your Rights */}
                        <div className="fade-up mb-12">
                            <p className="mb-2 text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-[#8A8D98]">
                                07
                            </p>
                            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-[1.3rem] font-bold text-[#D2D4DB]">
                                Your Rights Under GDPR
                            </h2>
                            <p className="text-[0.95rem] leading-[1.85] text-[#B3B7C0]">You have the right to:</p>
                            <ul className="mt-3 flex flex-col gap-2.5">
                                <li className={listItemClass}>Request access to your personal data</li>
                                <li className={listItemClass}>Request correction or deletion</li>
                                <li className={listItemClass}>Withdraw consent at any time</li>
                                <li className={listItemClass}>Request limitation or objection to processing</li>
                                <li className={listItemClass}>Request data portability</li>
                            </ul>
                            <p className="mt-4 text-[0.95rem] leading-[1.85] text-[#B3B7C0]">
                                To exercise any of these rights, contact me at{" "}
                                <a href="mailto:alivedesignstudio00@gmail.com" className={linkClass}>
                                    alivedesignstudio00@gmail.com
                                </a>
                                .
                            </p>
                        </div>

                        <hr className="my-12 border-0 border-t border-[#8A8D98]/15" />

                        {/* 8. Cookies */}
                        <div className="fade-up mb-12">
                            <p className="mb-2 text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-[#8A8D98]">
                                08
                            </p>
                            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-[1.3rem] font-bold text-[#D2D4DB]">
                                Cookies &amp; Tracking
                            </h2>
                            <p className="text-[0.95rem] leading-[1.85] text-[#B3B7C0]">
                                My website may use cookies or analytics tools to understand page performance and improve
                                user experience. You can disable cookies in your browser settings at any time.
                            </p>
                        </div>

                        <hr className="my-12 border-0 border-t border-[#8A8D98]/15" />

                        {/* 9. Security */}
                        <div className="fade-up mb-12">
                            <p className="mb-2 text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-[#8A8D98]">
                                09
                            </p>
                            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-[1.3rem] font-bold text-[#D2D4DB]">
                                Security
                            </h2>
                            <p className="text-[0.95rem] leading-[1.85] text-[#B3B7C0]">
                                I take appropriate technical and organizational measures to protect your data from
                                unauthorized access, loss, or misuse.
                            </p>
                        </div>

                        <hr className="my-12 border-0 border-t border-[#8A8D98]/15" />

                        {/* 10. Updates */}
                        <div className="fade-up mb-12">
                            <p className="mb-2 text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-[#8A8D98]">
                                10
                            </p>
                            <h2 className="mb-4 font-[family-name:var(--font-serif)] text-[1.3rem] font-bold text-[#D2D4DB]">
                                Updates to This Policy
                            </h2>
                            <p className="text-[0.95rem] leading-[1.85] text-[#B3B7C0]">
                                I may update this policy to stay compliant with legal requirements. The &quot;Last
                                updated&quot; date at the top will always reflect the most recent revision.
                            </p>
                        </div>

                        {/* Contact box */}
                        <div className="fade-up mt-12 rounded-xl border border-[#8A8D98]/25 bg-[#8A8D98]/8 px-8 py-8 text-center">
                            <p className="mb-3 text-[0.95rem] text-[#B3B7C0]">Questions or requests about your data?</p>
                            <a
                                href="mailto:alivedesignstudio00@gmail.com"
                                className="text-[1rem] font-medium text-[#8A8D98] transition-opacity duration-350 hover:opacity-75"
                            >
                                alivedesignstudio00@gmail.com
                            </a>
                            <p className="mt-2 text-[0.82rem] text-[#B3B7C0]">Based in the Netherlands</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
