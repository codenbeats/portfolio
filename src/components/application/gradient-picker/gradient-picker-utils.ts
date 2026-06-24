import { parseColor } from "react-aria-components";

export type GradientType = "linear" | "radial" | "angular" | "diamond";

/** A single color stop in a gradient. */
export interface GradientStop {
    /** Unique identifier for this stop. */
    id: string;
    /** CSS color value (e.g. "#7F56D9"). */
    color: string;
    /** Position along the gradient as a percentage (0–100). */
    position: number;
    /** Opacity as a percentage (0–100). */
    alpha: number;
}

export interface Point {
    x: number;
    y: number;
}

export const nextStopId = () => crypto.randomUUID();

/** Linearly interpolate between two points. */
export const lerp = (a: Point, b: Point, t: number): Point => ({
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
});

/** Get pointer position as a percentage (0–100) relative to an element's bounding rect. */
export const pointerPt = (e: PointerEvent | React.PointerEvent, el: HTMLElement): Point => {
    const r = el.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 };
};

/** Clamp a value between a minimum and maximum. */
export const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
/** Clamp a point between 0 and 100. */
export const clampPt = (p: Point): Point => ({ x: clamp(p.x, 0, 100), y: clamp(p.y, 0, 100) });
/** Calculate the distance between two points. */
export const dist = (a: Point, b: Point) => Math.hypot(b.x - a.x, b.y - a.y);

/** Convert an angle (in degrees) to start/end points on a 100x100 area. */
export const angleToPoints = (angleDeg: number): { start: Point; end: Point } => {
    const rad = (angleDeg * Math.PI) / 180;
    const dirX = Math.sin(rad);
    const dirY = -Math.cos(rad);
    const scaleX = dirX !== 0 ? 50 / Math.abs(dirX) : Infinity;
    const scaleY = dirY !== 0 ? 50 / Math.abs(dirY) : Infinity;
    const scale = Math.min(scaleX, scaleY);
    return {
        start: { x: 50 - dirX * scale, y: 50 - dirY * scale },
        end: { x: 50 + dirX * scale, y: 50 + dirY * scale },
    };
};

/** Convert start/end points back to an angle in degrees (0–359). */
export const pointsToAngle = (start: Point, end: Point): number => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const deg = Math.atan2(dx, -dy) * (180 / Math.PI);
    return Math.round(((deg % 360) + 360) % 360);
};

/**
 * Project point `p` onto the line segment from `a` to `b`.
 * Returns a scalar `t` where 0 = at `a`, 1 = at `b`, and values
 * outside [0,1] indicate the projection falls beyond the segment.
 */
export const projectOntoLine = (p: Point, a: Point, b: Point): number => {
    const abx = b.x - a.x;
    const aby = b.y - a.y;
    const lenSq = abx * abx + aby * aby;
    if (lenSq === 0) return 0;
    return ((p.x - a.x) * abx + (p.y - a.y) * aby) / lenSq;
};

/**
 * Extend the line through `p` and `q` to the edges of a 100×100 area.
 * Returns {start, end} where start is in the backward (p→q opposite) direction
 * and end is in the forward direction. Both p and q lie on the returned line.
 */
export const extendLineToEdges = (p: Point, q: Point): { start: Point; end: Point } => {
    const dx = q.x - p.x;
    const dy = q.y - p.y;
    if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) {
        return { start: { x: p.x, y: 100 }, end: { x: p.x, y: 0 } };
    }
    // Line: L(t) = P + t*(Q-P), t=0 at P, t=1 at Q
    let tMin = -Infinity;
    let tMax = Infinity;
    if (Math.abs(dx) > 0.001) {
        const t0 = -p.x / dx;
        const t100 = (100 - p.x) / dx;
        tMin = Math.max(tMin, Math.min(t0, t100));
        tMax = Math.min(tMax, Math.max(t0, t100));
    }
    if (Math.abs(dy) > 0.001) {
        const t0 = -p.y / dy;
        const t100 = (100 - p.y) / dy;
        tMin = Math.max(tMin, Math.min(t0, t100));
        tMax = Math.min(tMax, Math.max(t0, t100));
    }
    return {
        start: { x: p.x + tMin * dx, y: p.y + tMin * dy },
        end: { x: p.x + tMax * dx, y: p.y + tMax * dy },
    };
};

/** Move a gradient stop to a new position, proportionally pushing adjacent stops. */
export const moveStopTo = (stops: GradientStop[], stopId: string, newPos: number): GradientStop[] => {
    const sorted = [...stops].sort((a, b) => a.position - b.position);
    const idx = sorted.findIndex((s) => s.id === stopId);
    if (idx === -1) return stops;

    const prevPos = sorted[idx - 1]?.position ?? 0;
    const nextPos = sorted[idx + 1]?.position ?? 100;
    const clamped = Math.max(prevPos, Math.min(nextPos, newPos));
    return stops.map((s) => (s.id === stopId ? { ...s, position: clamped } : s));
};

/** Split a string by commas, but skip commas inside parentheses. */
const splitOutsideParens = (str: string): string[] => {
    const parts: string[] = [];
    let current = "";
    let depth = 0;
    for (const char of str) {
        if (char === "(") depth++;
        else if (char === ")") depth--;
        if (char === "," && depth === 0) {
            parts.push(current.trim());
            current = "";
        } else {
            current += char;
        }
    }
    if (current.trim()) parts.push(current.trim());
    return parts;
};

/**
 * Parse a CSS gradient string (e.g. `linear-gradient(180deg, #fff 0%, #000 100%)`)
 * into an array of gradient stops and an angle.
 * Returns `null` if the string cannot be parsed or has fewer than 2 stops.
 */
export const parseGradientCSS = (css: string): { stops: GradientStop[]; angle: number } | null => {
    const typeMatch = css.match(/^(linear|radial|conic)-gradient\(/);
    if (!typeMatch) return null;
    const inner = css.slice(typeMatch[0].length, css.lastIndexOf(")"));
    const parts = splitOutsideParens(inner);
    const stops: GradientStop[] = [];
    let angle = 180;
    let startIndex = 0;
    if (parts[0].includes("deg")) {
        angle = parseFloat(parts[0]);
        startIndex = 1;
    } else if (parts[0].startsWith("to ") || parts[0].startsWith("from ")) {
        startIndex = 1;
    }
    for (let i = startIndex; i < parts.length; i++) {
        const stopMatch = parts[i].match(/^(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\))\s+(\d+(?:\.\d+)?)%?$/);
        if (stopMatch) {
            stops.push({ id: nextStopId(), color: stopMatch[1], position: parseFloat(stopMatch[2]), alpha: 100 });
        }
    }
    return stops.length >= 2 ? { stops, angle } : null;
};

const toStopColor = (s: GradientStop) => {
    const rgb = parseColor(s.color).toFormat("rgb");
    const r = Math.round(rgb.getChannelValue("red"));
    const g = Math.round(rgb.getChannelValue("green"));
    const b = Math.round(rgb.getChannelValue("blue"));
    return `rgba(${r}, ${g}, ${b}, ${s.alpha / 100})`;
};

const toStopCSS = (s: GradientStop) => `${toStopColor(s)} ${s.position}%`;

export const toGradientCSS = (stops: GradientStop[], type: GradientType, angle: number): string => {
    const sorted = [...stops].sort((a, b) => a.position - b.position);
    const css = sorted.map(toStopCSS).join(", ");
    switch (type) {
        case "radial":
            return `radial-gradient(circle, ${css})`;
        case "angular":
            return `conic-gradient(from ${angle}deg, ${css})`;
        case "diamond": {
            const segments: string[] = [];
            for (let seg = 0; seg < 4; seg++) {
                const isReverse = seg % 2 === 1;
                const order = isReverse ? [...sorted].reverse() : sorted;
                for (let i = 0; i < order.length; i++) {
                    const s = order[i];
                    const t = isReverse ? (100 - s.position) / 100 : s.position / 100;
                    const deg = seg * 90 + t * 90;
                    // Skip duplicate points at segment boundaries (except first segment start)
                    if (seg > 0 && i === 0) continue;
                    segments.push(`${toStopColor(s)} ${deg}deg`);
                }
            }
            return `conic-gradient(from ${angle}deg, ${segments.join(", ")})`;
        }
        default:
            return `linear-gradient(${angle}deg, ${css})`;
    }
};

/**
 * Generate CSS gradient from 2D line endpoints.
 * Maps stop positions from the actual line to the canonical (centered) gradient line
 * so that colors align correctly with the 2D thumb positions.
 */
export const toGradientCSSFromLine = (stops: GradientStop[], type: GradientType, lineStart: Point, lineEnd: Point): string => {
    const angle = pointsToAngle(lineStart, lineEnd);
    const canonical = angleToPoints(angle);
    const tStart = projectOntoLine(lineStart, canonical.start, canonical.end);
    const tEnd = projectOntoLine(lineEnd, canonical.start, canonical.end);
    const range = tEnd - tStart;
    if (Math.abs(range) < 0.001) return toGradientCSS(stops, type, angle);
    const mappedStops = stops.map((s) => ({ ...s, position: (tStart + range * (s.position / 100)) * 100 }));
    return toGradientCSS(mappedStops, type, angle);
};
