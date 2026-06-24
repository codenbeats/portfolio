"use client";

import { useCallback, useEffect, useRef } from "react";

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });

    const animate = useCallback(() => {
        const ring = ringRef.current;
        if (!ring) return;
        ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.12);
        ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.12);
        ring.style.left = `${ringPos.current.x}px`;
        ring.style.top = `${ringPos.current.y}px`;
        requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        const handleMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            dot.style.left = `${e.clientX}px`;
            dot.style.top = `${e.clientY}px`;
        };

        const handleEnter = () => ring.classList.add("hovered");
        const handleLeave = () => ring.classList.remove("hovered");

        document.addEventListener("mousemove", handleMove);
        const interactiveEls = document.querySelectorAll("a, button");
        interactiveEls.forEach((el) => {
            el.addEventListener("mouseenter", handleEnter);
            el.addEventListener("mouseleave", handleLeave);
        });

        const id = requestAnimationFrame(animate);

        return () => {
            document.removeEventListener("mousemove", handleMove);
            interactiveEls.forEach((el) => {
                el.removeEventListener("mouseenter", handleEnter);
                el.removeEventListener("mouseleave", handleLeave);
            });
            cancelAnimationFrame(id);
        };
    }, [animate]);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
            <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
        </>
    );
}
