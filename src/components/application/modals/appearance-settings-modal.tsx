"use client";

import { useEffect, useState } from "react";
import { Contrast01 } from "@untitledui/icons";
import { Heading as AriaHeading, Radio as AriaRadio, RadioGroup as AriaRadioGroup, ColorField, ColorSwatch } from "react-aria-components";
import { Dark, Light, System } from "@/components/application/modals/base-components/appearances";
import { generateRgbShades } from "@/components/application/modals/base-components/generate-shades";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { InputBase } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { RadioButtonBase } from "@/components/base/radio-buttons/radio-buttons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { cx } from "@/utils/cx";

/**
 * This is a utility hook that automatically reopens the modal after
 * it's closed. It's used only for demo purposes and can be safely
 * removed and replaced with a regular `useState` hook.
 */
const useModalState = (defaultValue: boolean = true) => {
    const [isOpen, setIsOpen] = useState(defaultValue);

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setIsOpen(true);
            }, 700);
        }
    }, [isOpen]);

    return [isOpen, setIsOpen] as const;
};

const colorSwatches = [
    { name: "gray", value: "#535862" },
    { name: "green", value: "#099250" },
    { name: "blue", value: "#1570EF" },
    { name: "indigo", value: "#444CE7" },
    { name: "purple", value: "#6938EF" },
    { name: "fuchsia", value: "#BA24D5" },
    { name: "pink", value: "#DD2590" },
    { name: "orange", value: "#E04F16" },
];

export const AppearanceSettingsModal = () => {
    const [mode, setMode] = useState("system");
    const [isOpen, setIsOpen] = useModalState();

    const [color, setColor] = useState<string>("#7F56D9");
    const [customColor, setCustomColor] = useState<string>(color);

    useEffect(() => {
        const existingColor = colorSwatches.find(({ value }) => value === color);
        if (existingColor) {
            const shades = ["25", "50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];

            // Re-map the brand color variables to the existing primitive color variables.
            shades.forEach((shade) => document.documentElement.style.setProperty(`--color-brand-${shade}`, `var(--color-${existingColor.name}-${shade})`));

            return;
        }

        const shades = generateRgbShades(color);
        if (!shades) return;

        // Set the brand color variables to the new custom color shades.
        Object.entries(shades).forEach(([key, { r, g, b }]) => document.documentElement.style.setProperty(`--color-brand-${key}`, `rgb(${r} ${g} ${b})`));
    }, [color]);

    const handleCustomColorChange = (value: string | null) => {
        if (!value) return;

        // If the custom color is already selected, update the color.
        if (color === customColor) {
            setColor(value);
        }

        setCustomColor(value);
    };

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable className={mode === "light" ? "light-mode" : mode === "dark" ? "dark-mode" : ""}>
            <Modal>
                <Dialog>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-172">
                        <CloseButton onClick={() => setIsOpen(false)} theme="light" size="sm" className="absolute top-3 right-3 sm:top-4 sm:right-4" />

                        <div className="flex flex-col gap-4 border-b border-secondary px-4 pt-5 pb-5 sm:px-6 sm:pt-6">
                            <FeaturedIcon color="gray" size="md" theme="modern" icon={Contrast01} className="max-sm:hidden" />

                            <div className="z-10 flex flex-col gap-0.5">
                                <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                    Appearance
                                </AriaHeading>
                                <p className="text-sm text-tertiary">
                                    <span className="max-sm:hidden">Change how your dashboard looks and feels in your browser.</span>
                                    <span className="sm:hidden">How your dashboard looks in your browser.</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5 px-4 pt-5 sm:px-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col">
                                    <p className="text-sm font-semibold text-primary">Brand color</p>
                                    <p className="text-sm text-tertiary">Update your dashboard to your brand color.</p>
                                </div>
                                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                                    <AriaRadioGroup
                                        aria-label="Brand color"
                                        aria-describedby="Update your dashboard to your brand color."
                                        value={color}
                                        onChange={(value) => setColor(value)}
                                        className="flex flex-col items-start gap-4 md:flex-row md:items-center"
                                    >
                                        <div className="flex gap-2">
                                            {colorSwatches.map((color) => (
                                                <AriaRadio key={color.name} value={color.value}>
                                                    {({ isSelected, isFocusVisible }) => (
                                                        <ColorSwatch
                                                            color={color.value}
                                                            className={cx(
                                                                "size-7 cursor-pointer rounded-full outline-1 -outline-offset-1 outline-black/10",
                                                                (isSelected || isFocusVisible) && "ring-2 ring-focus-ring ring-offset-2 ring-offset-bg-primary",
                                                            )}
                                                        />
                                                    )}
                                                </AriaRadio>
                                            ))}
                                        </div>
                                        <AriaRadio value={customColor} className="flex shrink-0 items-center gap-3">
                                            {({ isSelected, isFocusVisible }) => (
                                                <>
                                                    <Label className="text-sm font-semibold text-secondary">Custom</Label>
                                                    <ColorSwatch
                                                        color={customColor}
                                                        className={cx(
                                                            "size-7 shrink-0 cursor-pointer rounded-full outline-1 -outline-offset-1 outline-black/10",
                                                            (isSelected || isFocusVisible) && "ring-2 ring-focus-ring ring-offset-2 ring-offset-bg-primary",
                                                        )}
                                                    />
                                                    <ColorField
                                                        aria-label="Custom brand color"
                                                        className="md:hidden"
                                                        value={customColor}
                                                        onChange={(color) => color && handleCustomColorChange(color.toString("hex"))}
                                                    >
                                                        <InputBase size="md" wrapperClassName="w-24" />
                                                    </ColorField>
                                                </>
                                            )}
                                        </AriaRadio>
                                    </AriaRadioGroup>
                                    <ColorField
                                        aria-label="Custom brand color"
                                        className="max-md:hidden"
                                        value={customColor}
                                        onChange={(color) => color && handleCustomColorChange(color.toString("hex"))}
                                    >
                                        <InputBase size="md" wrapperClassName="w-24" />
                                    </ColorField>
                                </div>
                            </div>
                            <div className="w-full border-t border-secondary" />
                            <div className="flex flex-col">
                                <div className="flex flex-col">
                                    <p className="text-sm font-semibold text-primary">Display preference</p>
                                    <p className="text-sm text-tertiary">Switch between light and dark modes.</p>
                                </div>
                                <AriaRadioGroup
                                    aria-label="Display preference"
                                    aria-describedby="Switch between light and dark modes."
                                    className="-mx-4 scrollbar-hide flex flex-row gap-5 overflow-x-auto px-4 pt-5 sm:pt-6"
                                    value={mode}
                                    onChange={setMode}
                                >
                                    <AriaRadio value="system" className="flex cursor-pointer flex-col gap-3">
                                        {(props) => (
                                            <>
                                                <span className="relative">
                                                    <System
                                                        className={cx(
                                                            "z-20",
                                                            props.isSelected && "rounded-[10px] outline-2 outline-offset-2 outline-focus-ring",
                                                        )}
                                                    />
                                                    {props.isSelected && <RadioButtonBase {...props} size="md" className="absolute bottom-2 left-2" />}
                                                </span>
                                                <p className="text-sm font-semibold text-primary">System preference</p>
                                            </>
                                        )}
                                    </AriaRadio>
                                    <AriaRadio value="light" className="flex cursor-pointer flex-col gap-3">
                                        {(props) => (
                                            <>
                                                <span className="relative">
                                                    <Light
                                                        className={cx(
                                                            "z-20",
                                                            props.isSelected && "rounded-[10px] outline-2 outline-offset-2 outline-focus-ring",
                                                        )}
                                                    />
                                                    {props.isSelected && <RadioButtonBase {...props} size="md" className="absolute bottom-2 left-2" />}
                                                </span>
                                                <p className="text-sm font-semibold text-primary">Light mode</p>
                                            </>
                                        )}
                                    </AriaRadio>
                                    <AriaRadio value="dark" className="flex cursor-pointer flex-col gap-3">
                                        {(props) => (
                                            <>
                                                <span className="relative">
                                                    <Dark
                                                        className={cx(
                                                            "z-20",
                                                            props.isSelected && "rounded-[10px] outline-2 outline-offset-2 outline-focus-ring",
                                                        )}
                                                    />
                                                    {props.isSelected && <RadioButtonBase {...props} size="md" className="absolute bottom-2 left-2" />}
                                                </span>
                                                <p className="text-sm font-semibold text-primary">Dark mode</p>
                                            </>
                                        )}
                                    </AriaRadio>
                                </AriaRadioGroup>
                            </div>
                        </div>
                        <div className="z-10 flex flex-col pt-6 pb-4 sm:pt-8 sm:pb-6">
                            <div className="w-full border-t border-secondary" />

                            <div className="h-4 w-full sm:h-6" />
                            <div className="flex flex-1 flex-col-reverse gap-3 px-4 sm:flex-row sm:items-center sm:px-6">
                                <Checkbox id="apply-to-terms" label="Apply to all teams" className="mr-auto max-sm:hidden" />
                                <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                                <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                    Save changes
                                </Button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
