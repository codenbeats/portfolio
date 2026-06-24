"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Color } from "react-aria-components";
import { ColorPicker as AriaColorPicker, parseColor } from "react-aria-components";
import type { ColorDisplayFormat } from "./color-picker-utils";

/** Color picker state. */
export interface ColorPickerState {
    /** Currently selected color. */
    color: Color;
    /** Active color format for the value input. */
    colorFormat: ColorDisplayFormat;
}

/** Actions for the color picker. */
export interface ColorPickerActions {
    /** Set the active color. */
    setColor: (color: Color) => void;
    /** Switch the color format (hex, rgb, css, hsl, hsb). */
    setColorFormat: (format: ColorDisplayFormat) => void;
}

export interface ColorPickerContextValue {
    state: ColorPickerState;
    actions: ColorPickerActions;
}

const ColorPickerContext = createContext<ColorPickerContextValue | null>(null);
const ColorPickerProvider = ColorPickerContext.Provider;

export const useColorPicker = (): ColorPickerContextValue => {
    const ctx = useContext(ColorPickerContext);
    if (!ctx) throw new Error("useColorPicker must be used within <ColorPicker.Provider>");
    return ctx;
};

/** Non-throwing version — returns null when outside a Provider. */
export const useColorPickerSafe = (): ColorPickerContextValue | null => useContext(ColorPickerContext);

/** Create actions from a setState function. */
const createActions = (setState: React.Dispatch<React.SetStateAction<ColorPickerState>>): ColorPickerActions => ({
    setColor: (color) => setState((s) => ({ ...s, color: color.toFormat("hsb") })),
    setColorFormat: (format) => setState((s) => ({ ...s, colorFormat: format })),
});

/** Props for the color state provider. */
export interface ProviderProps {
    /** Initial color value as a CSS string or React Aria Color object. */
    defaultValue?: string | Color;
    /** Controlled color value as a CSS string or React Aria Color object. */
    value?: string | Color;
    /** Initial color format for the value input. */
    defaultColorFormat?: ColorDisplayFormat;
    /** Called when the selected color changes. */
    onChange?: (color: Color) => void;
    children: ReactNode;
}

/** Color state provider. Wraps children in both context and AriaColorPicker. */
export const Provider = ({ defaultValue = "#7F56D9", value, defaultColorFormat = "hex", onChange, children }: ProviderProps) => {
    const [state, setState] = useState<ColorPickerState>(() => {
        const initial = value ?? defaultValue;
        const parsed = typeof initial === "string" ? parseColor(initial) : initial;
        return { color: parsed.toFormat("hsb"), colorFormat: defaultColorFormat };
    });
    const actions = useMemo(() => createActions(setState), []);

    // Sync controlled value into internal state
    const isExternalSync = useRef(false);
    useEffect(() => {
        if (value !== undefined) {
            isExternalSync.current = true;
            const parsed = typeof value === "string" ? parseColor(value) : value;
            setState((s) => ({ ...s, color: parsed.toFormat("hsb") }));
        }
    }, [value]);

    const prevColor = useRef(state.color);
    useEffect(() => {
        if (state.color !== prevColor.current) {
            prevColor.current = state.color;
            if (isExternalSync.current) {
                isExternalSync.current = false;
            } else {
                onChange?.(state.color);
            }
        }
    });

    return (
        <ColorPickerProvider value={{ state, actions }}>
            <AriaColorPicker value={state.color} onChange={(c) => actions.setColor(c)}>
                {children}
            </AriaColorPicker>
        </ColorPickerProvider>
    );
};
