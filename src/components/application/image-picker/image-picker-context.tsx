"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ImageAdjustments, ImageFillMode } from "./image-picker-utils";
import { DEFAULT_ADJUSTMENTS } from "./image-picker-utils";

/** Image color picker state. */
export interface ImageColorPickerState {
    /** User-selected image file, or null. */
    imageFile: File | null;
    /** How the image is displayed (fill, fit, crop, tile). */
    imageFillMode: ImageFillMode;
    /** Image adjustment values (exposure, contrast, etc.). */
    imageAdjustments: ImageAdjustments;
    /** Image rotation in degrees (0, 90, 180, 270). */
    imageRotation: number;
}

/** Actions for the image color picker. */
export interface ImageColorPickerActions {
    /** Set or clear the image file. */
    setImageFile: (file: File | null) => void;
    /** Set how the image is displayed (fill, fit, crop, tile). */
    setFillMode: (mode: ImageFillMode) => void;
    /** Set image adjustment values (exposure, contrast, etc.). */
    setAdjustments: (adjustments: ImageAdjustments) => void;
    /** Reset all image adjustments to their defaults. */
    resetAdjustments: () => void;
    /** Rotate the image 90° clockwise. */
    rotateImage: () => void;
}

export interface ImageColorPickerContextValue {
    state: ImageColorPickerState;
    actions: ImageColorPickerActions;
}

const ImageColorPickerContext = createContext<ImageColorPickerContextValue | null>(null);
export const ImageColorPickerProvider = ImageColorPickerContext.Provider;

export const useImageColorPicker = (): ImageColorPickerContextValue => {
    const ctx = useContext(ImageColorPickerContext);
    if (!ctx) throw new Error("useImageColorPicker must be used within <ColorPicker.ImageProvider>");
    return ctx;
};

/** Create image actions from a setState function. */
export const createImageActions = (setState: React.Dispatch<React.SetStateAction<ImageColorPickerState>>): ImageColorPickerActions => ({
    setImageFile: (file) => setState((s) => ({ ...s, imageFile: file })),
    setFillMode: (mode) => setState((s) => ({ ...s, imageFillMode: mode })),
    setAdjustments: (adjustments) => setState((s) => ({ ...s, imageAdjustments: adjustments })),
    resetAdjustments: () => setState((s) => ({ ...s, imageAdjustments: DEFAULT_ADJUSTMENTS })),
    rotateImage: () => setState((s) => ({ ...s, imageRotation: (s.imageRotation + 90) % 360 })),
});

/** Props for the image color state provider. */
export interface ImageProviderProps {
    /** Called when an image file is selected or cleared. */
    onImageChange?: (file: File | null) => void;
    /** Called when image adjustments change. */
    onAdjustmentsChange?: (adjustments: ImageAdjustments) => void;
    children: ReactNode;
}

/** Image color state provider. */
export const ImageProvider = ({ onImageChange, onAdjustmentsChange, children }: ImageProviderProps) => {
    const [state, setState] = useState<ImageColorPickerState>(() => ({
        imageFile: null,
        imageFillMode: "fill",
        imageAdjustments: DEFAULT_ADJUSTMENTS,
        imageRotation: 0,
    }));
    const actions = useMemo(() => createImageActions(setState), []);

    const prev = useRef(state);
    useEffect(() => {
        if (state.imageFile !== prev.current.imageFile) onImageChange?.(state.imageFile);
        if (state.imageAdjustments !== prev.current.imageAdjustments) onAdjustmentsChange?.(state.imageAdjustments);
        prev.current = state;
    });

    return <ImageColorPickerProvider value={{ state, actions }}>{children}</ImageColorPickerProvider>;
};
