"use client";

import { useEffect, useRef } from "react";

export function useFadeUp() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 },
        );

        const targets = el.querySelectorAll(".fade-up");
        targets.forEach((t) => observer.observe(t));

        return () => observer.disconnect();
    }, []);

    return ref;
}
