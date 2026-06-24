"use client";

import type React from "react";
import { useCallback, useRef, useState } from "react";
import { ChevronDown, Minus, Plus, SwitchHorizontal01 } from "@untitledui/icons";
import type { Color } from "react-aria-components";
import { ColorField as AriaColorField, ColorSwatch as AriaColorSwatch, Input as AriaInput, parseColor } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { cx } from "@/utils/cx";
import { InputCell } from "../color-picker/color-picker";
import { selectAllOnFocus } from "../color-picker/color-picker-utils";
import { useGradientColorPicker } from "./gradient-picker-context";
import { GradientProvider } from "./gradient-picker-context";
import type { GradientStop, GradientType, Point } from "./gradient-picker-utils";
import { clamp, clampPt, dist, extendLineToEdges, lerp, pointerPt, projectOntoLine, toGradientCSS, toGradientCSSFromLine } from "./gradient-picker-utils";

const GRADIENT_TYPES: { id: GradientType; label: string }[] = [
    { id: "linear", label: "Linear" },
    { id: "radial", label: "Radial" },
    { id: "angular", label: "Angular" },
    { id: "diamond", label: "Diamond" },
];

/**
 * Interactive 2D gradient area with draggable stop thumbs.
 *
 * The gradient is defined by an explicit 2D line (`state.gradientLine`) extended to
 * the area edges. Stop positions (0–100%) map to points along this line via `lerp`.
 *
 * Endpoint drag — moves the thumb freely in 2D. The line through both endpoints
 * is extended to the area edges via `extendLineToEdges`, and both endpoint positions
 * are re-projected onto it. The other endpoint's 2D position is snapshotted on
 * pointerdown so it never drifts. Inner stop positions stay unchanged.
 *
 * Inner stop drag — slides the stop along the current gradient line by projecting
 * the pointer onto it.
 */
export const GradientArea = () => {
    const { state, actions } = useGradientColorPicker();
    const { gradientStops: stops, gradientType: type, gradientLine: line } = state;
    const areaRef = useRef<HTMLDivElement>(null);

    const sorted = [...stops].sort((a, b) => a.position - b.position);
    const firstStop = sorted[0];
    const lastStop = sorted[sorted.length - 1];

    /** Map a stop's position (0–100%) to a 2D point on the gradient line. */
    const stopPt = (position: number): Point => lerp(line.start, line.end, position / 100);

    const startPt = stopPt(firstStop?.position ?? 0);
    const endPt = stopPt(lastStop?.position ?? 100);

    /** Drag state stored in a ref to avoid re-renders during pointer moves. */
    const dragRef = useRef<
        | {
              kind: "endpoint";
              which: "start" | "end";
              /** Pointer-to-thumb offset captured on pointerdown to prevent jump. */
              offset: Point;
              draggedStopId: string;
              fixedStopId: string;
              /** Snapshotted 2D position of the non-dragged endpoint. */
              fixedPt: Point;
              /** Position of the nearest inner stop — the endpoint can't cross past this. */
              boundaryPos: number;
          }
        | {
              kind: "inner";
              stopId: string;
              /** Offset between the raw projected position and the stop's actual position. */
              offset: number;
          }
        | null
    >(null);

    /** Start dragging an endpoint (first or last sorted stop). */
    const handleEndpointDown = useCallback(
        (e: React.PointerEvent, which: "start" | "end") => {
            if (!areaRef.current) return;
            e.preventDefault();
            e.stopPropagation();
            const el = e.target as HTMLElement;
            el.setPointerCapture(e.pointerId);
            el.focus();
            const draggedStop = which === "start" ? firstStop : lastStop;
            const fixedStop = which === "start" ? lastStop : firstStop;
            if (draggedStop) actions.selectStop(draggedStop.id);

            const raw = pointerPt(e, areaRef.current);
            const thumbPt = stopPt(draggedStop?.position ?? (which === "start" ? 0 : 100));
            const fixedPt = stopPt(fixedStop?.position ?? (which === "start" ? 100 : 0));
            const boundaryPos = which === "start" ? (sorted[1]?.position ?? 100) : (sorted[sorted.length - 2]?.position ?? 0);
            dragRef.current = {
                kind: "endpoint",
                which,
                offset: { x: raw.x - thumbPt.x, y: raw.y - thumbPt.y },
                draggedStopId: draggedStop?.id ?? "",
                fixedStopId: fixedStop?.id ?? "",
                fixedPt,
                boundaryPos,
            };
        },
        [actions, firstStop, lastStop, sorted, stopPt],
    );

    /** Start dragging an inner (non-endpoint) stop along the gradient line. */
    const handleInnerDown = useCallback(
        (e: React.PointerEvent, stopId: string) => {
            if (!areaRef.current) return;
            e.preventDefault();
            e.stopPropagation();
            const el = e.target as HTMLElement;
            el.setPointerCapture(e.pointerId);
            el.focus();
            actions.selectStop(stopId);

            const raw = pointerPt(e, areaRef.current);
            const t = projectOntoLine(raw, line.start, line.end);
            const rawPos = clamp(t * 100, 0, 100);
            const stop = stops.find((s) => s.id === stopId);
            dragRef.current = { kind: "inner", stopId, offset: rawPos - (stop?.position ?? 50) };
        },
        [actions, stops, line],
    );

    /** Handle pointer move for both endpoint and inner stop drags. */
    const handlePointerMove = useCallback(
        (e: React.PointerEvent) => {
            if (!areaRef.current || !dragRef.current) return;
            const raw = pointerPt(e, areaRef.current);
            const drag = dragRef.current;

            if (drag.kind === "endpoint") {
                let pt = clampPt({ x: raw.x - drag.offset.x, y: raw.y - drag.offset.y });

                // Keep a minimum distance between endpoints to prevent a zero-length line
                if (dist(pt, drag.fixedPt) < 5) {
                    const dx = pt.x - drag.fixedPt.x;
                    const dy = pt.y - drag.fixedPt.y;
                    const d = dist(pt, drag.fixedPt) || 1;
                    pt = { x: drag.fixedPt.x + (dx / d) * 5, y: drag.fixedPt.y + (dy / d) * 5 };
                }

                // Build an edge-extended line through the dragged point and the fixed point.
                // Both points lie exactly on this line, so their projections are lossless.
                const dirStart = drag.which === "start" ? pt : drag.fixedPt;
                const dirEnd = drag.which === "start" ? drag.fixedPt : pt;
                const edgeLine = extendLineToEdges(dirStart, dirEnd);

                let draggedPos = clamp(projectOntoLine(pt, edgeLine.start, edgeLine.end) * 100, 0, 100);
                const fixedPos = clamp(projectOntoLine(drag.fixedPt, edgeLine.start, edgeLine.end) * 100, 0, 100);

                // Prevent the endpoint from crossing past the nearest inner stop
                if (drag.which === "start" && draggedPos > drag.boundaryPos) {
                    draggedPos = drag.boundaryPos;
                    pt = lerp(edgeLine.start, edgeLine.end, draggedPos / 100);
                } else if (drag.which === "end" && draggedPos < drag.boundaryPos) {
                    draggedPos = drag.boundaryPos;
                    pt = lerp(edgeLine.start, edgeLine.end, draggedPos / 100);
                }

                actions.setLineEndpoint(edgeLine, [
                    { id: drag.draggedStopId, position: draggedPos },
                    { id: drag.fixedStopId, position: fixedPos },
                ]);
            } else {
                // Project the pointer onto the gradient line and update the stop's position
                const t = projectOntoLine(raw, line.start, line.end);
                const pos = Math.round(clamp(t * 100 - drag.offset, 0, 100));
                actions.moveStop(drag.stopId, pos);
            }
        },
        [actions, line],
    );

    const handlePointerUp = useCallback(() => {
        dragRef.current = null;
    }, []);

    /** CSS gradient background remapped to align with the (possibly off-center) gradient line. */
    const bgCSS = toGradientCSSFromLine(stops, type, line.start, line.end);

    return (
        <div
            ref={areaRef}
            role="group"
            aria-label="Gradient direction and stops"
            className="relative aspect-square w-full rounded-lg"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
        >
            <div className="absolute inset-0 overflow-hidden rounded-lg ring-[0.5px] ring-alpha-black/10 ring-inset" style={{ background: bgCSS }} />

            {/* Dotted connector line between the two endpoint stops */}
            <svg className="pointer-events-none absolute inset-0 size-full overflow-visible" aria-hidden>
                <line
                    x1={`${startPt.x}%`}
                    y1={`${startPt.y}%`}
                    x2={`${endPt.x}%`}
                    y2={`${endPt.y}%`}
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="2"
                    strokeDasharray="3 5"
                    strokeLinecap="round"
                />
            </svg>

            {sorted.map((stop) => {
                const isFirst = stop.id === firstStop?.id;
                const isLast = stop.id === lastStop?.id && !isFirst;
                const isEndpoint = isFirst || isLast;
                const pt = stopPt(stop.position);
                const which = isFirst ? "start" : "end";

                return (
                    <button
                        key={stop.id}
                        type="button"
                        tabIndex={0}
                        onPointerDown={isEndpoint ? (e) => handleEndpointDown(e, which) : (e) => handleInnerDown(e, stop.id)}
                        onFocus={() => actions.selectStop(stop.id)}
                        onKeyDown={(e) => {
                            if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                                e.preventDefault();
                                actions.moveStop(stop.id, Math.min(100, stop.position + 1));
                            } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                                e.preventDefault();
                                actions.moveStop(stop.id, Math.max(0, stop.position - 1));
                            } else if ((e.key === "Delete" || e.key === "Backspace") && stops.length > 2) {
                                e.preventDefault();
                                actions.removeStop(stop.id);
                            }
                        }}
                        className={cx(
                            "absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-[3px] border-white shadow-md outline-0 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2 active:cursor-grabbing",
                            isEndpoint ? "size-5" : "size-4",
                        )}
                        style={{ left: `${pt.x}%`, top: `${pt.y}%`, background: stop.color }}
                        aria-label={`Gradient stop at ${Math.round(stop.position)}%`}
                        role="slider"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.round(stop.position)}
                    />
                );
            })}
        </div>
    );
};

/**
 * Horizontal gradient slider. Stops are draggable thumbs along the track.
 * Clicking an empty area of the track adds a new stop with an interpolated color.
 */
export const GradientSlider = () => {
    const { state, actions } = useGradientColorPicker();
    const trackRef = useRef<HTMLDivElement>(null);
    const dragStopRef = useRef<string | null>(null);
    const sliderOffsetRef = useRef(0);

    /** Convert a pointer event's X to a percentage (0–100) along the track. */
    const getRawPos = useCallback((e: PointerEvent | React.PointerEvent) => {
        if (!trackRef.current) return 0;
        const rect = trackRef.current.getBoundingClientRect();
        return ((e.clientX - rect.left) / rect.width) * 100;
    }, []);

    const handlePointerMove = useCallback(
        (e: React.PointerEvent) => {
            if (!dragStopRef.current) return;
            const pos = Math.round(Math.max(0, Math.min(100, getRawPos(e) - sliderOffsetRef.current)));
            actions.moveStop(dragStopRef.current, pos);
        },
        [actions, getRawPos],
    );

    const handlePointerUp = useCallback(() => {
        dragStopRef.current = null;
        sliderOffsetRef.current = 0;
    }, []);

    const handlePointerDown = useCallback(
        (e: React.PointerEvent) => {
            if (e.target === trackRef.current) {
                const pos = Math.round(Math.max(0, Math.min(100, getRawPos(e))));
                actions.addStopAt(pos);
            }
        },
        [actions, getRawPos],
    );

    const handleInnerDown = useCallback(
        (e: React.PointerEvent, stop: GradientStop) => {
            e.preventDefault();
            const el = e.target as HTMLElement;
            el.setPointerCapture(e.pointerId);
            el.focus();
            actions.selectStop(stop.id);
            dragStopRef.current = stop.id;
            sliderOffsetRef.current = getRawPos(e) - stop.position;
        },
        [actions],
    );

    const handleInnerKeyDown = useCallback(
        (e: React.KeyboardEvent, stop: GradientStop) => {
            if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                e.preventDefault();
                actions.moveStop(stop.id, Math.min(100, stop.position + 1));
            } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                e.preventDefault();
                actions.moveStop(stop.id, Math.max(0, stop.position - 1));
            } else if ((e.key === "Delete" || e.key === "Backspace") && state.gradientStops.length > 2) {
                e.preventDefault();
                actions.removeStop(stop.id);
            }
        },
        [actions],
    );

    return (
        <div
            ref={trackRef}
            className="relative h-3 w-full cursor-pointer rounded-full ring-[0.5px] ring-alpha-black/10 ring-inset"
            style={{ background: toGradientCSS(state.gradientStops, "linear", 90) }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
        >
            {state.gradientStops.map((stop) => (
                <button
                    key={stop.id}
                    type="button"
                    tabIndex={0}
                    onPointerDown={(e) => handleInnerDown(e, stop)}
                    onFocus={() => actions.selectStop(stop.id)}
                    onKeyDown={(e) => handleInnerKeyDown(e, stop)}
                    className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-[3px] border-white shadow-md outline-0 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2 active:cursor-grabbing"
                    style={{ left: `${stop.position}%`, background: stop.color }}
                    role="slider"
                    aria-label={`Gradient stop at ${Math.round(stop.position)}%`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(stop.position)}
                />
            ))}
        </div>
    );
};

/** Dropdown to switch between gradient types (linear, radial, angular, diamond). */
export const GradientTypeSelect = () => {
    const { state, actions } = useGradientColorPicker();

    return (
        <Dropdown.Root>
            <Button size="xs" color="link-gray" iconTrailing={(props) => <ChevronDown data-icon="trailing" {...props} className="size-3! stroke-[2.5px]!" />}>
                {GRADIENT_TYPES.find((t) => t.id === state.gradientType)?.label}
            </Button>

            <Dropdown.Popover className="w-36">
                <Dropdown.Menu
                    selectionMode="single"
                    selectedKeys={[state.gradientType]}
                    onSelectionChange={(keys) => {
                        const key = [...keys][0] as GradientType;
                        if (key) actions.setGradientType(key);
                    }}
                >
                    {GRADIENT_TYPES.map((t) => (
                        <Dropdown.Item key={t.id} id={t.id} label={t.label} />
                    ))}
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown.Root>
    );
};

/** Position input that displays "50%" when blurred and "50" when focused, with arrow key support. */
const PositionInput = ({ value: rawValue, onChange }: { value: number; onChange: (pos: number) => void }) => {
    const value = Math.round(rawValue);
    const [isFocused, setIsFocused] = useState(false);
    const [draft, setDraft] = useState("");

    const commit = (raw: string) => {
        const num = parseInt(raw, 10);
        if (!isNaN(num)) onChange(Math.max(0, Math.min(100, num)));
    };

    return (
        <InputCell className="w-14 shrink-0 shadow-xs">
            <input
                value={isFocused ? draft : `${value}%`}
                onChange={(e) => setDraft(e.target.value)}
                onFocus={(e) => {
                    setIsFocused(true);
                    setDraft(`${value}`);
                    requestAnimationFrame(() => e.target.select());
                }}
                onBlur={() => {
                    commit(draft);
                    setIsFocused(false);
                }}
                onKeyDown={(e) => {
                    if (e.key === "ArrowUp") {
                        e.preventDefault();
                        onChange(Math.min(100, value + 1));
                        setDraft(`${Math.min(100, value + 1)}`);
                    } else if (e.key === "ArrowDown") {
                        e.preventDefault();
                        onChange(Math.max(0, value - 1));
                        setDraft(`${Math.max(0, value - 1)}`);
                    } else if (e.key === "Enter") {
                        commit(draft);
                        (e.target as HTMLInputElement).blur();
                    }
                }}
                className="w-full bg-transparent px-2.5 py-2 text-sm text-primary outline-hidden"
            />
        </InputCell>
    );
};

/** Row for a single gradient stop: position input, color field, alpha field, and remove button. */
const GradientStopRow = ({ stopId }: { stopId: string }) => {
    const { state, actions } = useGradientColorPicker();
    const stop = state.gradientStops.find((s) => s.id === stopId);
    if (!stop) return null;

    const canRemove = state.gradientStops.length > 2;

    let colorValue: Color | null = null;
    try {
        colorValue = parseColor(stop.color).withChannelValue("alpha", stop.alpha / 100);
    } catch {
        /* invalid color string — leave as null */
    }

    return (
        <div className="flex items-center gap-3" onClick={() => actions.selectStop(stopId)}>
            <PositionInput value={stop.position} onChange={(pos) => actions.moveStop(stopId, pos)} />

            <div className="flex flex-1 items-center gap-1">
                <div className="flex flex-1 shadow-xs">
                    <InputCell position="first" className="flex-1">
                        <AriaColorField
                            aria-label="Stop color"
                            value={colorValue}
                            onChange={(c) => {
                                if (c) actions.setStopColorAndAlpha(stopId, c.toString("hex"), Math.round(c.getChannelValue("alpha") * 100));
                            }}
                            className="flex flex-1 items-center gap-2 px-2.5 py-2"
                        >
                            <AriaColorSwatch
                                color={colorValue || undefined}
                                className="size-4 shrink-0 rounded-full ring-1 ring-alpha-black/10 ring-inset"
                                style={({ defaultStyle }) => defaultStyle}
                            />
                            <AriaInput onFocus={selectAllOnFocus} className="w-full min-w-0 bg-transparent text-sm text-primary outline-hidden" />
                        </AriaColorField>
                    </InputCell>
                    <InputCell position="last" className="w-14 shrink-0">
                        <AriaColorField
                            aria-label="Stop alpha"
                            channel="alpha"
                            value={colorValue}
                            onChange={(c) => {
                                if (c) actions.setStopAlpha(stopId, Math.round(c.getChannelValue("alpha") * 100));
                            }}
                            className="flex w-full items-center"
                        >
                            <AriaInput onFocus={selectAllOnFocus} className="w-full min-w-0 bg-transparent px-2.5 py-2 text-sm text-primary outline-hidden" />
                        </AriaColorField>
                    </InputCell>
                </div>

                <ButtonUtility
                    icon={Minus}
                    size="xs"
                    color="tertiary"
                    isDisabled={!canRemove}
                    tooltip="Remove stop"
                    onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        actions.removeStop(stopId);
                    }}
                />
            </div>
        </div>
    );
};

/** Editable list of gradient stops with add/remove controls. */
export const GradientStopList = () => {
    const { state, actions } = useGradientColorPicker();

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
                <p className="flex-1 text-sm font-semibold text-secondary">Stops</p>
                <Button size="xs" color="link-gray" iconLeading={Plus} onClick={() => actions.addStop()}>
                    Add
                </Button>
            </div>
            <div className="flex flex-col gap-3">
                {state.gradientStops.map((stop) => (
                    <GradientStopRow key={stop.id} stopId={stop.id} />
                ))}
            </div>
        </div>
    );
};

/** Button to reverse the gradient by mirroring all stop colors. */
export const GradientReverseButton = () => {
    const { actions } = useGradientColorPicker();
    return <ButtonUtility icon={SwitchHorizontal01} size="sm" color="tertiary" tooltip="Reverse gradient" onClick={() => actions.reverseGradient()} />;
};

/** All-in-one gradient picker layout: area, type select, slider, and stop list. */
export const ColorPickerGradient = () => (
    <div className="flex flex-col gap-4">
        <GradientArea />
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <GradientTypeSelect />
                <GradientReverseButton />
            </div>
            <GradientSlider />
        </div>
        <GradientStopList />
    </div>
);

const GradientPicker = Object.assign(ColorPickerGradient, {
    Provider: GradientProvider,
    Area: GradientArea,
    Slider: GradientSlider,
    StopList: GradientStopList,
    TypeSelect: GradientTypeSelect,
    Reverse: GradientReverseButton,
});

export { GradientPicker };
