"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { parseColor } from "react-aria-components";
import type { GradientStop, GradientType, Point } from "./gradient-picker-utils";
import { angleToPoints, extendLineToEdges, moveStopTo, nextStopId, pointsToAngle, projectOntoLine } from "./gradient-picker-utils";

/** Gradient color picker state. */
export interface GradientColorPickerState {
    /** Ordered list of gradient color stops. */
    gradientStops: GradientStop[];
    /** Gradient type (linear, radial, angular, diamond). */
    gradientType: GradientType;
    /** Gradient angle in degrees (derived from gradientLine). */
    gradientAngle: number;
    /** 2D endpoints defining the gradient line within the area (0–100 coordinate space). */
    gradientLine: { start: Point; end: Point };
    /** ID of the currently selected gradient stop, or null. */
    selectedStopId: string | null;
}

/** Actions for the gradient color picker. */
export interface GradientColorPickerActions {
    /** Replace all gradient stops at once. */
    setGradientStops: (stops: GradientStop[]) => void;
    /** Move a stop to a new position, proportionally pushing adjacent stops. */
    moveStop: (stopId: string, position: number) => void;
    /** Move an endpoint stop and update the gradient angle simultaneously. */
    moveEndpoint: (stopId: string, position: number, angle: number) => void;
    /** Rotate the gradient line: update the angle and reposition multiple stops atomically. */
    rotateGradient: (angle: number, stopUpdates: { id: string; position: number }[]) => void;
    /** Set the gradient angle in degrees. */
    setAngle: (angle: number) => void;
    /** Set the gradient type (linear, radial, angular, diamond). */
    setGradientType: (type: GradientType) => void;
    /** Select a gradient stop by ID, or deselect with null. */
    selectStop: (stopId: string | null) => void;
    /** Add a new stop between the last two stops. */
    addStop: () => void;
    /** Add a new stop at a specific position with an interpolated color. */
    addStopAt: (position: number) => void;
    /** Remove a stop (minimum 2 stops are always kept). */
    removeStop: (stopId: string) => void;
    /** Update a stop's color. */
    setStopColor: (stopId: string, color: string) => void;
    /** Update a stop's alpha. */
    setStopAlpha: (stopId: string, alpha: number) => void;
    /** Update a stop's color and alpha in one action. */
    setStopColorAndAlpha: (stopId: string, color: string, alpha: number) => void;
    /** Reverse the gradient by mirroring all stop positions. */
    reverseGradient: () => void;
    /** Set the gradient line and optionally update stop positions atomically. */
    setLineEndpoint: (line: { start: Point; end: Point }, stopUpdates?: { id: string; position: number }[]) => void;
}

export interface GradientColorPickerContextValue {
    state: GradientColorPickerState;
    actions: GradientColorPickerActions;
}

const GradientColorPickerContext = createContext<GradientColorPickerContextValue | null>(null);
export const GradientColorPickerProvider = GradientColorPickerContext.Provider;

export const useGradientColorPicker = (): GradientColorPickerContextValue => {
    const ctx = useContext(GradientColorPickerContext);
    if (!ctx) throw new Error("useGradientColorPicker must be used within <ColorPicker.GradientProvider>");
    return ctx;
};

/** Create gradient actions from a setState function. */
export const createGradientActions = (setState: React.Dispatch<React.SetStateAction<GradientColorPickerState>>): GradientColorPickerActions => ({
    setGradientStops: (stops) => setState((s) => ({ ...s, gradientStops: stops })),
    moveStop: (stopId, position) => setState((s) => ({ ...s, gradientStops: moveStopTo(s.gradientStops, stopId, position) })),
    moveEndpoint: (stopId, position, angle) =>
        setState((s) => {
            const sorted = [...s.gradientStops].sort((a, b) => a.position - b.position);
            const idx = sorted.findIndex((st) => st.id === stopId);
            const prevPos = sorted[idx - 1]?.position ?? 0;
            const nextPos = sorted[idx + 1]?.position ?? 100;
            const clamped = Math.max(prevPos, Math.min(nextPos, position));
            return {
                ...s,
                gradientStops: s.gradientStops.map((st) => (st.id === stopId ? { ...st, position: clamped } : st)),
                gradientAngle: angle,
                gradientLine: angleToPoints(angle),
            };
        }),
    rotateGradient: (angle, stopUpdates) =>
        setState((s) => {
            const updateMap = new Map(stopUpdates.map((u) => [u.id, u.position]));
            return {
                ...s,
                gradientStops: s.gradientStops.map((st) => {
                    const newPos = updateMap.get(st.id);
                    return newPos !== undefined ? { ...st, position: newPos } : st;
                }),
                gradientAngle: angle,
                gradientLine: angleToPoints(angle),
            };
        }),
    setAngle: (angle) => setState((s) => ({ ...s, gradientAngle: angle, gradientLine: angleToPoints(angle) })),
    setGradientType: (type) => setState((s) => ({ ...s, gradientType: type })),
    selectStop: (stopId) => setState((s) => ({ ...s, selectedStopId: stopId })),
    addStop: () =>
        setState((s) => {
            const sorted = [...s.gradientStops].sort((a, b) => a.position - b.position);
            const last = sorted[sorted.length - 1];
            const secondLast = sorted.length >= 2 ? sorted[sorted.length - 2] : sorted[0];
            const midPos = Math.round((secondLast.position + last.position) / 2);
            const newStop = { id: nextStopId(), color: secondLast?.color ?? "#7F56D9", position: midPos, alpha: 100 };
            const newStops = [...s.gradientStops];
            const lastIndex = newStops.findIndex((st) => st.id === last.id);
            newStops.splice(lastIndex, 0, newStop);
            return { ...s, gradientStops: newStops, selectedStopId: newStop.id };
        }),
    addStopAt: (position) =>
        setState((s) => {
            const sorted = [...s.gradientStops].sort((a, b) => a.position - b.position);
            const first = sorted[0];
            const last = sorted[sorted.length - 1];
            const roundedPos = Math.round(position);

            // Before the first stop — use the first stop's color, insert at the beginning
            if (position <= first.position) {
                const newStop = { id: nextStopId(), color: first.color, position: roundedPos, alpha: first.alpha };
                return { ...s, gradientStops: [newStop, ...s.gradientStops], selectedStopId: newStop.id };
            }

            // After the last stop — use the last stop's color, insert at the end
            if (position >= last.position) {
                const newStop = { id: nextStopId(), color: last.color, position: roundedPos, alpha: last.alpha };
                return { ...s, gradientStops: [...s.gradientStops, newStop], selectedStopId: newStop.id };
            }

            // Between two stops — interpolate color
            let left = first;
            let right = last;
            for (let i = 0; i < sorted.length - 1; i++) {
                if (sorted[i].position <= position && sorted[i + 1].position >= position) {
                    left = sorted[i];
                    right = sorted[i + 1];
                    break;
                }
            }
            const range = right.position - left.position;
            const t = range > 0 ? (position - left.position) / range : 0.5;
            const lc = parseColor(left.color).toFormat("rgb");
            const rc = parseColor(right.color).toFormat("rgb");
            const r = Math.round(lc.getChannelValue("red") + t * (rc.getChannelValue("red") - lc.getChannelValue("red")));
            const g = Math.round(lc.getChannelValue("green") + t * (rc.getChannelValue("green") - lc.getChannelValue("green")));
            const b = Math.round(lc.getChannelValue("blue") + t * (rc.getChannelValue("blue") - lc.getChannelValue("blue")));
            const alpha = Math.round(left.alpha + t * (right.alpha - left.alpha));
            const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
            const newStop = { id: nextStopId(), color: hex, position: roundedPos, alpha };
            const leftIdx = s.gradientStops.findIndex((st) => st.id === left.id);
            const newStops = [...s.gradientStops];
            newStops.splice(leftIdx + 1, 0, newStop);
            return { ...s, gradientStops: newStops, selectedStopId: newStop.id };
        }),
    removeStop: (stopId) =>
        setState((s) => {
            if (s.gradientStops.length <= 2) return s;

            const oldSorted = [...s.gradientStops].sort((a, b) => a.position - b.position);
            const isFirst = oldSorted[0]?.id === stopId;
            const isLast = oldSorted[oldSorted.length - 1]?.id === stopId;
            const removedIdx = s.gradientStops.findIndex((st) => st.id === stopId);

            const newStops = s.gradientStops.filter((st) => st.id !== stopId);

            // Select the adjacent stop when the deleted one was selected
            let newSelected = s.selectedStopId;
            if (s.selectedStopId === stopId) {
                const adjacentIdx = Math.min(removedIdx, newStops.length - 1);
                newSelected = newStops[adjacentIdx]?.id ?? null;
            }

            // When an endpoint is deleted, recalculate the gradient line so the
            // new first/last stop becomes the proper endpoint
            if (isFirst || isLast) {
                const newSorted = [...newStops].sort((a, b) => a.position - b.position);
                const newFirst = newSorted[0];
                const newLast = newSorted[newSorted.length - 1];
                if (newFirst && newLast) {
                    // Compute the 2D positions of the new endpoints on the old line
                    const lerp = (a: Point, b: Point, t: number): Point => ({
                        x: a.x + (b.x - a.x) * t,
                        y: a.y + (b.y - a.y) * t,
                    });
                    const firstPt = lerp(s.gradientLine.start, s.gradientLine.end, newFirst.position / 100);
                    const lastPt = lerp(s.gradientLine.start, s.gradientLine.end, newLast.position / 100);

                    // Extend the line through the new endpoints to the area edges
                    const newLine = extendLineToEdges(firstPt, lastPt);

                    // Re-project all stop positions onto the new line
                    const updatedStops = newStops.map((st) => {
                        const pt = lerp(s.gradientLine.start, s.gradientLine.end, st.position / 100);
                        const t = projectOntoLine(pt, newLine.start, newLine.end);
                        return { ...st, position: Math.max(0, Math.min(100, t * 100)) };
                    });

                    return {
                        ...s,
                        gradientStops: updatedStops,
                        gradientLine: newLine,
                        gradientAngle: pointsToAngle(newLine.start, newLine.end),
                        selectedStopId: newSelected,
                    };
                }
            }

            return { ...s, gradientStops: newStops, selectedStopId: newSelected };
        }),
    setStopColor: (stopId, color) => setState((s) => ({ ...s, gradientStops: s.gradientStops.map((st) => (st.id === stopId ? { ...st, color } : st)) })),
    setStopAlpha: (stopId, alpha) => setState((s) => ({ ...s, gradientStops: s.gradientStops.map((st) => (st.id === stopId ? { ...st, alpha } : st)) })),
    setStopColorAndAlpha: (stopId, color, alpha) =>
        setState((s) => ({ ...s, gradientStops: s.gradientStops.map((st) => (st.id === stopId ? { ...st, color, alpha } : st)) })),
    reverseGradient: () =>
        setState((s) => {
            const sorted = [...s.gradientStops].sort((a, b) => a.position - b.position);
            const n = sorted.length;
            return {
                ...s,
                gradientStops: s.gradientStops.map((stop) => {
                    const idx = sorted.findIndex((st) => st.id === stop.id);
                    const mirror = sorted[n - 1 - idx];
                    return { ...stop, color: mirror.color, alpha: mirror.alpha };
                }),
            };
        }),
    setLineEndpoint: (line, stopUpdates) =>
        setState((s) => {
            const newStops = stopUpdates
                ? s.gradientStops.map((st) => {
                      const upd = stopUpdates.find((u) => u.id === st.id);
                      return upd ? { ...st, position: upd.position } : st;
                  })
                : s.gradientStops;
            return { ...s, gradientLine: line, gradientAngle: pointsToAngle(line.start, line.end), gradientStops: newStops };
        }),
});

/** Props for the gradient color state provider. */
export interface GradientProviderProps {
    /** Initial gradient stops. */
    defaultStops?: GradientStop[];
    /** Initial gradient type. */
    defaultType?: GradientType;
    /** Initial gradient angle in degrees. */
    defaultAngle?: number;
    /** Called when gradient stops change. */
    onStopsChange?: (stops: GradientStop[]) => void;
    /** Called when the gradient type changes. */
    onTypeChange?: (type: GradientType) => void;
    /** Called when the gradient angle changes. */
    onAngleChange?: (angle: number) => void;
    children: ReactNode;
}

/** Gradient color state provider. */
export const GradientProvider = ({
    defaultStops,
    defaultType = "linear",
    defaultAngle = 135,
    onStopsChange,
    onTypeChange,
    onAngleChange,
    children,
}: GradientProviderProps) => {
    const [state, setState] = useState<GradientColorPickerState>(() => {
        const stop1Id = nextStopId();
        const stop2Id = nextStopId();
        return {
            gradientStops: defaultStops ?? [
                { id: stop1Id, color: "#7F56D9", position: 0, alpha: 100 },
                { id: stop2Id, color: "#432E73", position: 100, alpha: 100 },
            ],
            gradientType: defaultType,
            gradientAngle: defaultAngle,
            gradientLine: angleToPoints(defaultAngle),
            selectedStopId: defaultStops?.[0]?.id ?? stop1Id,
        };
    });
    const actions = useMemo(() => createGradientActions(setState), []);

    const prev = useRef(state);
    useEffect(() => {
        if (state.gradientStops !== prev.current.gradientStops) onStopsChange?.(state.gradientStops);
        if (state.gradientType !== prev.current.gradientType) onTypeChange?.(state.gradientType);
        if (state.gradientAngle !== prev.current.gradientAngle) onAngleChange?.(state.gradientAngle);
        prev.current = state;
    });

    return <GradientColorPickerProvider value={{ state, actions }}>{children}</GradientColorPickerProvider>;
};
