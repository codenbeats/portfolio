"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, RefreshCw01, UploadCloud02 } from "@untitledui/icons";
import type { SliderProps as AriaSliderProps } from "react-aria-components";
import { DropZone as AriaDropZone, Slider as AriaSlider, SliderThumb as AriaSliderThumb, SliderTrack as AriaSliderTrack } from "react-aria-components";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { FileTrigger } from "@/components/base/file-upload-trigger/file-upload-trigger";
import { cx } from "@/utils/cx";
import { useImageColorPicker } from "./image-picker-context";
import { ImageProvider } from "./image-picker-context";
import type { ImageAdjustments, ImageFillMode } from "./image-picker-utils";
import { applyImageFilters } from "./image-picker-utils";

const FILL_MODES: { id: ImageFillMode; label: string }[] = [
    { id: "fill", label: "Fill" },
    { id: "fit", label: "Fit" },
    { id: "crop", label: "Crop" },
    { id: "tile", label: "Tile" },
];

const ADJUSTMENT_LABELS: { key: keyof ImageAdjustments; label: string }[] = [
    { key: "exposure", label: "Exposure" },
    { key: "contrast", label: "Contrast" },
    { key: "saturation", label: "Saturation" },
    { key: "temperature", label: "Temperature" },
    { key: "tint", label: "Tint" },
    { key: "highlights", label: "Highlights" },
    { key: "shadows", label: "Shadows" },
];

interface AdjustmentSliderProps extends AriaSliderProps {
    label: string;
}

const AdjustmentSlider = ({ label, minValue = -100, maxValue = 100, ...props }: AdjustmentSliderProps) => (
    <AriaSlider
        {...props}
        aria-label={label}
        minValue={minValue}
        maxValue={maxValue}
        className={(state) => cx("flex items-center gap-3", typeof props.className === "function" ? props.className(state) : props.className)}
    >
        <span className="w-[88px] shrink-0 text-sm font-semibold text-secondary">{label}</span>
        <AriaSliderTrack className="relative h-3 flex-1 cursor-pointer rounded-full border border-primary bg-tertiary">
            <AriaSliderThumb
                className={({ isFocusVisible, isDragging }) =>
                    cx(
                        "top-1/2 size-4 cursor-grab rounded-full bg-fg-white shadow-md ring ring-secondary_alt outline-0 outline-focus-ring",
                        isFocusVisible && "outline-2 outline-offset-2",
                        isDragging && "cursor-grabbing",
                    )
                }
            />
        </AriaSliderTrack>
    </AriaSlider>
);

const ImageCanvas = () => {
    const { state, actions } = useImageColorPicker();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [image, setImage] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        if (!state.imageFile) {
            setImage(null);
            return;
        }
        const url = URL.createObjectURL(state.imageFile);
        const img = new Image();
        img.onload = () => setImage(img);
        img.src = url;
        return () => URL.revokeObjectURL(url);
    }, [state.imageFile]);

    useEffect(() => {
        if (image && canvasRef.current) {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvasRef.current.getBoundingClientRect();
            const logicalW = rect.width || 280;
            const logicalH = rect.height || 280;
            canvasRef.current.width = logicalW * dpr;
            canvasRef.current.height = logicalH * dpr;
            applyImageFilters(canvasRef.current, image, state.imageAdjustments, state.imageFillMode, state.imageRotation);
        }
    }, [image, state.imageAdjustments, state.imageFillMode, state.imageRotation]);

    const handleFile = useCallback((file: File) => actions.setImageFile(file), [actions]);

    return (
        <AriaDropZone
            aria-label="Drop image to upload"
            className={({ isDropTarget }) =>
                cx(
                    "relative flex aspect-square w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-[0.5px] border-black/10 outline-hidden",
                    isDropTarget && "ring-2 ring-brand",
                )
            }
            onDrop={(e) => {
                const file = e.items.find((item) => item.kind === "file");
                if (file && file.kind === "file") {
                    file.getFile().then((f) => {
                        if (f.type.startsWith("image/")) handleFile(f);
                    });
                }
            }}
        >
            {image ? (
                <canvas ref={canvasRef} className="absolute inset-0 size-full" />
            ) : (
                <>
                    <div
                        aria-hidden
                        className="absolute inset-0 rounded-lg"
                        style={{ backgroundImage: "repeating-conic-gradient(#ccc 0% 25%, white 0% 50%)", backgroundSize: "32px 32px", opacity: 0.15 }}
                    />
                    <div aria-hidden className="absolute inset-0 rounded-lg bg-black/40" />
                    <canvas ref={canvasRef} className="hidden" />
                    <div className="relative flex flex-col items-center gap-2">
                        <FileTrigger
                            acceptedFileTypes={["image/*"]}
                            onSelect={(files) => {
                                const f = files?.[0];
                                if (f) handleFile(f);
                            }}
                        >
                            <Button size="sm" color="secondary" iconLeading={UploadCloud02} className="outline-1 outline-offset-0 outline-secondary_alt">
                                Click to upload
                            </Button>
                        </FileTrigger>
                        <p className="text-sm font-semibold text-white">or drag and drop</p>
                    </div>
                </>
            )}
        </AriaDropZone>
    );
};

/** Fill mode select */
export const FillModeSelect = () => {
    const { state, actions } = useImageColorPicker();

    return (
        <Dropdown.Root>
            <Button size="xs" color="link-gray" iconTrailing={(props) => <ChevronDown data-icon="trailing" {...props} className="size-3! stroke-[2.5px]!" />}>
                {FILL_MODES.find((m) => m.id === state.imageFillMode)?.label}
            </Button>

            <Dropdown.Popover className="w-32">
                <Dropdown.Menu
                    selectionMode="single"
                    selectedKeys={[state.imageFillMode]}
                    onSelectionChange={(keys) => {
                        const k = [...keys][0] as ImageFillMode;
                        if (k) actions.setFillMode(k);
                    }}
                >
                    {FILL_MODES.map((m) => (
                        <Dropdown.Item key={m.id} id={m.id} label={m.label} />
                    ))}
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown.Root>
    );
};

/** Adjustment sliders */
export const AdjustmentSliders = () => {
    const { state, actions } = useImageColorPicker();

    return (
        <div className="flex flex-col gap-4">
            {ADJUSTMENT_LABELS.map(({ key, label }) => (
                <AdjustmentSlider
                    key={key}
                    label={label}
                    value={state.imageAdjustments[key]}
                    onChange={(v) => actions.setAdjustments({ ...state.imageAdjustments, [key]: v })}
                />
            ))}
        </div>
    );
};

/** Image preset — all-in-one layout */
export const ColorPickerImage = () => {
    const { actions } = useImageColorPicker();

    return (
        <div className="flex flex-col gap-4">
            <ImageCanvas />
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <FillModeSelect />
                    <ButtonUtility icon={RefreshCw01} size="sm" color="tertiary" tooltip="Rotate image" onClick={() => actions.rotateImage()} />
                </div>
                <AdjustmentSliders />
            </div>
        </div>
    );
};

const ImagePicker = Object.assign(ColorPickerImage, {
    Provider: ImageProvider,
    FillModeSelect,
    AdjustmentSliders,
});

export { ImagePicker };
