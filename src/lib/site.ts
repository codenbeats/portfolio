export const SITE_URL = "https://kittipong.dev";
export const SITE_NAME = "Kittipong Sorasuchart";
export const AUTHOR_NAME = "Kittipong Sorasuchart";
export const AUTHOR_IMAGE = `${SITE_URL}/photo.png`;

export const AUTHOR_SAME_AS = [
    "https://github.com/codenbeats",
    "https://www.linkedin.com/in/kittisorasu/",
    "https://contra.com/kittipong",
];

/** Builds an absolute URL from a site-relative path. */
export function absoluteUrl(path: string): string {
    return path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
    
}

/** schema.org Person used for the homepage rich result (photo in search). */
export const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR_NAME,
    alternateName: ["Kittipong", "Kittipong Mirimera", "Kittipong Sorasuchart Mirimera"],
    url: SITE_URL,
    image: AUTHOR_IMAGE,
    jobTitle: "AI Specialist & DevOps Engineer, Founder/CEO at Mirimera",
    worksFor: {
        "@type": "Organization",
        name: "Mirimera",
        url: "https://mirimera.com",
    },
    sameAs: AUTHOR_SAME_AS,
};

export const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
};

/** Builds a schema.org Article for a case study (thumbnail image in search). */
export function caseStudyJsonLd(opts: {
    title: string;
    description: string;
    slug: string;
    image: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: opts.title,
        description: opts.description,
        image: [absoluteUrl(opts.image)],
        url: `${SITE_URL}/work/${opts.slug}`,
        mainEntityOfPage: `${SITE_URL}/work/${opts.slug}`,
        author: {
            "@type": "Person",
            name: AUTHOR_NAME,
            url: SITE_URL,
        },
        publisher: {
            "@type": "Person",
            name: AUTHOR_NAME,
            url: SITE_URL,
        },
    };
}
