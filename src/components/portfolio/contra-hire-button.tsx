"use client";

import Script from "next/script";

/**
 * Contra "Hire Me" embed button. The Contra SDK scans the DOM for
 * `.contra-hire-me-button` nodes and hydrates them into the live button.
 */
export function ContraHireButton() {
    return (
        <>
            <div
                className="contra-hire-me-button"
                data-analyticsuserid="4de1f805-6e13-494b-b53a-13fbe0214293"
                data-theme="light"
                data-username="kittipong"
            />
            <Script
                src="https://contra.com/static/embed/sdk.js"
                strategy="afterInteractive"
                charSet="utf-8"
            />
        </>
    );
}
