/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/dnnfhyeuv/**",
            },
        ],
    },
    experimental: {
        optimizePackageImports: [
            "@untitledui/icons",
            "react-aria-components",
            "react-aria",
            "@react-aria/utils",
            "@react-stately/utils",
            "recharts",
            "shiki",
            "@tiptap/core",
            "@tiptap/react",
            "@tiptap/starter-kit",
            "@tiptap/pm",
            "motion",
        ],
    },
};

export default nextConfig;
