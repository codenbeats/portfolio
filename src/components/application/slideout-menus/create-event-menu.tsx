"use client";

import { useEffect, useState } from "react";
import { CalendarDateTime } from "@internationalized/date";
import { useControlledState } from "@react-stately/utils";
import { Calendar, MarkerPin01 } from "@untitledui/icons";
import type { DateValue, RangeValue } from "react-aria";
import { DateRangePicker as AriaDateRangePicker } from "react-aria-components";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import { InputDate } from "@/components/base/input/input-date";
import { TextArea } from "@/components/base/textarea/textarea";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

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
    start: new CalendarDateTime(2027, 1, 8, 9, 0, 0),
    end: new CalendarDateTime(2027, 1, 14, 12, 0, 0),
};

export const CreateEventMenu = () => {
    const [isOpen, setIsOpen] = useModalState();
    const [value, setValue] = useControlledState<RangeValue<DateValue> | null>(undefined, defaultRange, undefined);

    return (
        <SlideoutMenu isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <SlideoutMenu.Header onClose={() => setIsOpen(false)} className="relative flex w-full items-start gap-3 px-4 pt-6 md:px-6">
                <FeaturedIcon size="md" color="gray" theme="modern" icon={Calendar} className="max-md:hidden" />
                <section className="flex flex-col gap-0.5">
                    <h1 className="text-md font-semibold text-primary md:text-lg">Create event</h1>
                    <p className="text-sm text-tertiary">Add details to schedule your event.</p>
                </section>
            </SlideoutMenu.Header>
            <SlideoutMenu.Content>
                <div className="flex flex-col gap-4">
                    <Input label="Title" size="sm" placeholder="Event name" defaultValue="Company retreat" isRequired />
                    <AriaDateRangePicker aria-label="Event date range" value={value} onChange={setValue} granularity="minute" className="contents">
                        <InputDate isRequired slot="start" label="Start date" size="sm" />
                        <InputDate isRequired slot="end" label="End date" size="sm" />
                    </AriaDateRangePicker>
                    <Input label="Location" size="sm" placeholder="Add location" icon={MarkerPin01} />
                    <TextArea
                        size="sm"
                        label="Description"
                        tooltip="Add event details and agenda"
                        placeholder="Enter a description"
                        textAreaClassName="h-29.5"
                    />
                </div>

                {/* Dotted divider */}
                <svg height="2" className="w-full">
                    <line
                        x1="0"
                        y1="1"
                        x2="100%"
                        y2="1"
                        className="stroke-border-primary"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="0,6"
                    />
                </svg>

                {/* Guest permissions */}
                <div className="flex flex-col gap-3">
                    <p className="text-sm font-medium text-secondary">Guest permissions</p>
                    <div className="flex flex-col gap-3 pl-3">
                        <Checkbox label="Modify event" />
                        <Checkbox label="Invite others" defaultSelected />
                        <Checkbox label="See guest list" defaultSelected />
                    </div>
                </div>
            </SlideoutMenu.Content>
            <SlideoutMenu.Footer className="flex w-full items-center justify-end gap-3">
                <Button size="sm" color="secondary" onClick={() => setIsOpen(false)}>
                    Cancel
                </Button>
                <Button size="sm" onClick={() => setIsOpen(false)}>
                    Create event
                </Button>
            </SlideoutMenu.Footer>
        </SlideoutMenu>
    );
};
