"use client";

import { useEffect, useMemo, useState } from "react";
import { endOfMonth, endOfWeek, getLocalTimeZone, startOfMonth, startOfWeek, today } from "@internationalized/date";
import { useControlledState } from "@react-stately/utils";
import type { AriaDateRangePickerProps, DateValue } from "react-aria";
import { DateRangePicker as AriaDateRangePicker, useLocale } from "react-aria-components";
import { RangeCalendar, RangePresetButton } from "@/components/application/date-picker/range-calendar";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { InputDateBase } from "@/components/base/input/input-date";
import { useBreakpoint } from "@/hooks/use-breakpoint";

interface DatePickerModalProps extends AriaDateRangePickerProps<DateValue> {
    onApply?: () => void;
    onCancel?: () => void;
}

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

const now = today(getLocalTimeZone());
const defaultRange = {
    start: now.subtract({ days: 7 }),
    end: now,
};

export const DatePickerModal = ({ value: valueProp, defaultValue, onChange, ...props }: DatePickerModalProps) => {
    let { locale } = useLocale();
    const isDesktop = useBreakpoint("md");
    const [isOpen, setIsOpen] = useModalState();
    const [value, setValue] = useControlledState(valueProp, defaultValue || defaultRange, onChange);
    const [focusedValue, setFocusedValue] = useState<DateValue | null>(null);

    const now = today(getLocalTimeZone());
    const highlightedDates = [today(getLocalTimeZone())];

    const presets = useMemo(
        () => ({
            today: { label: "Today", value: { start: now, end: now } },
            yesterday: { label: "Yesterday", value: { start: now.subtract({ days: 1 }), end: now.subtract({ days: 1 }) } },
            thisWeek: { label: "This week", value: { start: startOfWeek(now, locale), end: endOfWeek(now, locale) } },
            lastWeek: {
                label: "Last week",
                value: {
                    start: startOfWeek(now, locale).subtract({ weeks: 1 }),
                    end: endOfWeek(now, locale).subtract({ weeks: 1 }),
                },
            },
            thisMonth: { label: "This month", value: { start: startOfMonth(now), end: endOfMonth(now) } },
            lastMonth: {
                label: "Last month",
                value: {
                    start: startOfMonth(now).subtract({ months: 1 }),
                    end: endOfMonth(now).subtract({ months: 1 }),
                },
            },
            thisYear: { label: "This year", value: { start: startOfMonth(now.set({ month: 1 })), end: endOfMonth(now.set({ month: 12 })) } },
            lastYear: {
                label: "Last year",
                value: {
                    start: startOfMonth(now.set({ month: 1 }).subtract({ years: 1 })),
                    end: endOfMonth(now.set({ month: 12 }).subtract({ years: 1 })),
                },
            },
            allTime: {
                label: "All time",
                value: {
                    start: now.set({ year: 2000, month: 1, day: 1 }),
                    end: now,
                },
            },
        }),
        [locale, now],
    );

    return (
        <AriaDateRangePicker
            aria-label="Date range picker"
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            shouldCloseOnSelect={false}
            {...props}
            value={value}
            onChange={setValue}
        >
            <ModalOverlay isDismissable>
                <Modal>
                    <Dialog aria-label="Date picker">
                        <div className="flex rounded-2xl bg-primary shadow-xl ring-1 ring-secondary_alt">
                            {isDesktop && (
                                <div className="flex w-38 flex-col gap-0.5 border-r border-solid border-secondary p-3 max-md:hidden">
                                    {Object.values(presets).map((preset) => (
                                        <RangePresetButton
                                            key={preset.label}
                                            value={preset.value}
                                            onClick={() => {
                                                setValue(preset.value);
                                                setFocusedValue(preset.value.start);
                                            }}
                                        >
                                            {preset.label}
                                        </RangePresetButton>
                                    ))}
                                </div>
                            )}
                            <div className="flex flex-col">
                                <RangeCalendar
                                    focusedValue={focusedValue}
                                    onFocusChange={setFocusedValue}
                                    highlightedDates={highlightedDates}
                                    presets={{
                                        lastWeek: presets.lastWeek,
                                        lastMonth: presets.lastMonth,
                                        lastYear: presets.lastYear,
                                    }}
                                />
                                <div className="flex justify-between gap-3 border-t border-secondary p-4">
                                    {isDesktop && (
                                        <div className="hidden items-center gap-3 md:flex">
                                            <InputDateBase slot="start" size="sm" />
                                            <div className="text-md text-quaternary">–</div>
                                            <InputDateBase slot="end" size="sm" />
                                        </div>
                                    )}

                                    <div className="grid w-full grid-cols-2 gap-3 md:flex md:w-auto">
                                        <Button size="sm" color="secondary" onClick={() => setIsOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button size="sm" color="primary" onClick={() => setIsOpen(false)}>
                                            Apply
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </AriaDateRangePicker>
    );
};
