"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDateTime, endOfMonth, endOfWeek, getLocalTimeZone, startOfMonth, startOfWeek, today } from "@internationalized/date";
import { useControlledState } from "@react-stately/utils";
import { Calendar, MarkerPin01 } from "@untitledui/icons";
import type { DateValue, RangeValue } from "react-aria";
import { DateRangePicker as AriaDateRangePicker, Heading as AriaHeading, useLocale } from "react-aria-components";
import { RangeCalendar } from "@/components/application/date-picker/range-calendar";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import { InputDate } from "@/components/base/input/input-date";
import { TextArea } from "@/components/base/textarea/textarea";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { useBreakpoint } from "@/hooks/use-breakpoint";

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

const defaultRange = {
    start: new CalendarDateTime(2027, 1, 8, 10, 0, 0),
    end: new CalendarDateTime(2027, 1, 14, 12, 0, 0),
};

export const CreateEventModal = () => {
    const { locale } = useLocale();
    const isDesktop = useBreakpoint("md");
    const [isOpen, setIsOpen] = useModalState();
    const [value, setValue] = useControlledState<RangeValue<DateValue> | null>(undefined, defaultRange, undefined);
    const [focusedValue, setFocusedValue] = useState<DateValue | null>(null);

    const now = today(getLocalTimeZone());

    const presets = useMemo(
        () => ({
            lastWeek: {
                label: "Last week",
                value: {
                    start: startOfWeek(now, locale).subtract({ weeks: 1 }),
                    end: endOfWeek(now, locale).subtract({ weeks: 1 }),
                },
            },
            lastMonth: {
                label: "Last month",
                value: {
                    start: startOfMonth(now).subtract({ months: 1 }),
                    end: endOfMonth(now).subtract({ months: 1 }),
                },
            },
            lastYear: {
                label: "Last year",
                value: {
                    start: startOfMonth(now.set({ month: 1 }).subtract({ years: 1 })),
                    end: endOfMonth(now.set({ month: 12 }).subtract({ years: 1 })),
                },
            },
        }),
        [locale, now],
    );

    return (
        <AriaDateRangePicker
            aria-label="Create event date range"
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            shouldCloseOnSelect={false}
            value={value}
            onChange={setValue}
            granularity="minute"
        >
            <ModalOverlay isDismissable>
                <Modal>
                    <Dialog>
                        <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-200">
                            <CloseButton onClick={() => setIsOpen(false)} theme="light" size="lg" className="absolute top-3 right-3 z-10" />

                            {/* Header */}
                            <div className="flex gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                <div className="relative w-max max-sm:hidden">
                                    <FeaturedIcon color="gray" size="md" theme="modern" icon={Calendar} />
                                </div>
                                <div className="z-10 flex flex-col gap-0.5">
                                    <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                        Create event
                                    </AriaHeading>
                                    <p className="text-sm text-tertiary sm:hidden">Choose dates, time, and add details.</p>
                                    <p className="hidden text-sm text-tertiary sm:block">Choose dates, time, and add details to schedule your event.</p>
                                </div>
                            </div>

                            <div className="h-5 w-full" />

                            {/* Two-column layout on desktop */}
                            <div className="flex flex-col gap-5 border-t border-secondary px-4 md:flex-row md:gap-0 md:px-0">
                                {/* Calendar (desktop only) */}
                                {isDesktop && (
                                    <div className="flex w-82 flex-col border-r border-secondary">
                                        <RangeCalendar
                                            showOutOfRangeDates
                                            showPresetsOnDesktop
                                            focusedValue={focusedValue}
                                            onFocusChange={setFocusedValue}
                                            presets={presets}
                                            visibleDuration={{ months: 1 }}
                                        />
                                    </div>
                                )}

                                {/* Form fields */}
                                <div className="flex flex-1 flex-col gap-4 md:p-6">
                                    <Input label="Title" size="sm" placeholder="Event name" defaultValue="Company retreat" isRequired />
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <InputDate isRequired slot="start" label="Start date" size="sm" />
                                        <InputDate isRequired slot="end" label="End date" size="sm" />
                                    </div>
                                    <Input label="Location" size="sm" placeholder="Add location" icon={MarkerPin01} />
                                    <TextArea
                                        size="sm"
                                        label="Description"
                                        tooltip="Add event details and agenda"
                                        placeholder="Enter a description"
                                        textAreaClassName="h-29.5"
                                    />
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="z-10 flex flex-1 flex-col-reverse gap-3 border-t border-secondary p-4 pt-6 sm:flex-row sm:items-center sm:p-6">
                                <Checkbox label="Attendees can invite others" className="mr-auto max-sm:hidden" />
                                <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                                <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                    Create event
                                </Button>
                            </div>
                        </div>
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </AriaDateRangePicker>
    );
};
