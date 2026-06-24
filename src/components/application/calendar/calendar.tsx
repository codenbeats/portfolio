"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
    CalendarDate,
    CalendarDateTime,
    type ZonedDateTime,
    endOfMonth,
    endOfWeek,
    getLocalTimeZone,
    isToday as isDateToday,
    isSameDay,
    isSameMonth,
    now,
    parseAbsoluteToLocal,
    startOfMonth,
    startOfWeek,
    toCalendarDate,
    toZoned,
    today,
} from "@internationalized/date";
import { type DateFormatter, useDateFormatter, useLocale } from "@react-aria/i18n";
import { BellRinging01, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Copy01, Edit01, Trash01 } from "@untitledui/icons";
import {
    Calendar as AriaCalendar,
    CalendarGrid as AriaCalendarGrid,
    CalendarGridBody as AriaCalendarGridBody,
    CalendarGridHeader as AriaCalendarGridHeader,
    CalendarHeaderCell as AriaCalendarHeaderCell,
    Heading as AriaHeading,
} from "react-aria-components";
import { CalendarCell } from "@/components/application/date-picker/cell";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarAddButton } from "@/components/base/avatar/base-components";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { cx } from "@/utils/cx";
import { CalendarColumnHeader } from "./base-components/calendar-column-header";
import { CalendarDwViewCell } from "./base-components/calendar-dw-view-cell";
import { CalendarDwViewEvent } from "./base-components/calendar-dw-view-event";
import { CalendarHeader } from "./base-components/calendar-header";
import { CalendarMonthViewCell } from "./base-components/calendar-month-view-cell";
import { CalendarMonthViewEvent, type EventViewColor } from "./base-components/calendar-month-view-event";
import { CalendarRowLabel } from "./base-components/calendar-row-label";
import { CalendarTimeMarker } from "./base-components/calendar-time-marker";
import type { ViewOption } from "./base-components/calendar-view-dropdown";

export type CalendarEvent = {
    id: string;
    title: string;
    start: Date;
    end: Date;
    color?: EventViewColor;
    dot?: boolean;
};

type ZonedEvent = Omit<CalendarEvent, "start" | "end"> & {
    start: ZonedDateTime;
    end: ZonedDateTime;
};

const SLOT_HEIGHT = 48;

const viewOptions: ViewOption[] = [
    { value: "day", label: "Day view", addon: "⌘D" },
    { value: "week", label: "Week view", addon: "⌘W" },
    { value: "month", label: "Month view", addon: "⌘M" },
];

const getStartOfDay = (date: ZonedDateTime | CalendarDate, timeZone: string): ZonedDateTime => {
    const zoned = date instanceof CalendarDate ? toZoned(date, timeZone) : date;

    return zoned.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
};

const getEndOfDay = (date: ZonedDateTime | CalendarDate, timeZone: string): ZonedDateTime => {
    const zoned = date instanceof CalendarDate ? toZoned(date, timeZone) : date;

    return zoned.set({ hour: 23, minute: 59, second: 59, millisecond: 999 });
};

const getDaysInVisibleMonthGrid = (anchorDate: CalendarDate, locale: string): CalendarDate[] => {
    const monthStart = startOfMonth(anchorDate);
    const monthEnd = endOfMonth(anchorDate);
    const weekStart = startOfWeek(monthStart, locale);
    const weekEnd = endOfWeek(monthEnd, locale);

    const days: CalendarDate[] = [];
    let day = weekStart;
    while (day.compare(weekEnd) <= 0) {
        days.push(day);
        day = day.add({ days: 1 });
    }
    return days;
};

const getEventsForDay = (allEvents: ZonedEvent[], targetDate: CalendarDate, timeZone: string): ZonedEvent[] => {
    const dayStart = getStartOfDay(targetDate, timeZone);
    const dayEnd = getEndOfDay(targetDate, timeZone);

    return allEvents
        .filter((event) => {
            // Check if event interval overlaps with the day interval
            return event.start.compare(dayEnd) < 0 && event.end.compare(dayStart) > 0;
        })
        .sort((a, b) => a.start.compare(b.start));
};

interface PositionedEventProps {
    event: ZonedEvent;
    dayStart: ZonedDateTime; // Start of the day the event is being rendered in
    timeZone: string;
    slotHeight: number;
    overlapIndex: number;
    totalOverlapping: number; // To potentially calculate width more dynamically later
    setSelectedDate: (date: CalendarDate) => void;
    timeFormatter: DateFormatter;
}

const PositionedEvent = ({ event, dayStart, timeZone, slotHeight, overlapIndex, setSelectedDate, timeFormatter }: PositionedEventProps) => {
    const formatTime = (dateTime: ZonedDateTime) => timeFormatter.format(dateTime.toDate());

    const startZoned = event.start;
    const endZoned = event.end;

    // Clamp event start/end times to the visible day boundaries for height calculation
    const dayEnd = getEndOfDay(dayStart, timeZone); // Calculate dayEnd based on dayStart
    const clampedStart = startZoned.compare(dayStart) < 0 ? dayStart : startZoned;
    const clampedEnd = endZoned.compare(dayEnd) > 0 ? dayEnd : endZoned;

    const startMinutes = clampedStart.hour * 60 + clampedStart.minute;
    const endMinutes = clampedEnd.hour * 60 + clampedEnd.minute;
    const durationMinutes = Math.max(15, endMinutes - startMinutes);

    // Position based on 30-min slots (slotHeight = 24px)
    const top = (startMinutes / 30) * slotHeight;
    const height = Math.max(slotHeight / 2, (durationMinutes / 30) * slotHeight); // Min height 15min

    // Basic overlap handling - simple horizontal offset
    // const horizontalOffset = overlapIndex * 10;
    const horizontalOffset = 0;

    const displayTime = durationMinutes > 30;
    const supportingText = displayTime ? formatTime(startZoned) : undefined;

    return (
        <div
            key={event.id}
            className="absolute w-full px-1.5 py-1.5"
            style={{
                top: `${top}px`,
                height: `${height}px`,
                left: `${horizontalOffset}px`,
                zIndex: overlapIndex,
            }}
            onClick={() => setSelectedDate(toCalendarDate(startZoned))}
        >
            <CalendarDwViewEvent label={event.title} supportingText={supportingText} color={event.color} withDot={event.dot} />
        </div>
    );
};

interface MonthViewProps {
    currentMonthDate: CalendarDate;
    selectedDate: CalendarDate | null;
    zonedEvents: ZonedEvent[];
    locale: string;
    timeZone: string;
    setSelectedDate: (date: CalendarDate) => void;
    fullDateFormatter: DateFormatter;
    shortWeekdayFormatter: DateFormatter;
    timeFormatter: DateFormatter;
    className?: string;
}

const MonthView = ({
    currentMonthDate,
    selectedDate,
    zonedEvents,
    locale,
    timeZone,
    setSelectedDate,
    fullDateFormatter,
    shortWeekdayFormatter,
    timeFormatter, // Needed for formatTime inside
    className,
}: MonthViewProps) => {
    const monthStart = startOfMonth(currentMonthDate);
    const monthEnd = endOfMonth(currentMonthDate);
    const weekStart = startOfWeek(monthStart, locale);
    const weekEnd = endOfWeek(monthEnd, locale);

    const formatTimeForMonth = (dateTime: ZonedDateTime) => timeFormatter.format(dateTime.toDate());

    const days = useMemo(() => getDaysInVisibleMonthGrid(currentMonthDate, locale), [currentMonthDate, locale]);

    const weekdays = useMemo(() => {
        const firstDay = startOfWeek(today(timeZone), locale);
        return Array.from({ length: 7 }).map((_, i) => shortWeekdayFormatter.format(firstDay.add({ days: i }).toDate(timeZone)));
    }, [locale, timeZone, shortWeekdayFormatter]); // Dependencies are passed in

    const visibleEvents = zonedEvents.filter((event) => {
        const eventStartDay = toCalendarDate(event.start);
        const eventEndDay = toCalendarDate(event.end);
        return eventStartDay.compare(weekEnd) <= 0 && eventEndDay.compare(weekStart) >= 0;
    });

    // Pre-calculate events for each day in the visible grid
    const eventsByDay = useMemo(() => {
        const map = new Map<string, ZonedEvent[]>();
        days.forEach((day) => {
            const dateKey = day.toString();
            const dayEvents = getEventsForDay(visibleEvents, day, timeZone);
            map.set(dateKey, dayEvents);
        });
        return map;
    }, [days, visibleEvents, timeZone]); // Dependencies: days array, visible events, timezone

    const MAX_EVENTS_PER_CELL = 3;

    const todayCalDate = today(timeZone);
    const targetDateForFooter = selectedDate || (isSameMonth(currentMonthDate, todayCalDate) ? todayCalDate : null);

    let eventsForFooter: ZonedEvent[] = [];
    if (targetDateForFooter) {
        const targetZoned = toZoned(targetDateForFooter, timeZone);
        const targetZonedStart = getStartOfDay(targetZoned, timeZone);
        const targetZonedEnd = getEndOfDay(targetZoned, timeZone);
        eventsForFooter = zonedEvents
            .filter((event) => {
                const eventStartDay = toCalendarDate(event.start);
                const eventEndDay = toCalendarDate(event.end);
                return (
                    isSameDay(eventStartDay, targetDateForFooter) ||
                    isSameDay(eventEndDay, targetDateForFooter) ||
                    (event.start.compare(targetZonedEnd) < 0 && event.end.compare(targetZonedStart) > 0)
                );
            })
            .sort((a, b) => a.start.compare(b.start));
    }

    /**
     * Calculates how many days an event should visually span from a given start date.
     *
     * Multi-day events are rendered as a single element that spans multiple cells.
     * To avoid duplicate rendering:
     * - Events render only on their start day
     * - Multi-week events re-render at the start of each new week they span
     *
     * @returns Number of days to span, or null if event should not render on this day
     */
    const calculateEventSpan = useCallback(
        (event: ZonedEvent, currentDate: CalendarDate) => {
            const eventStartDay = toCalendarDate(event.start);
            const eventEndDay = toCalendarDate(event.end);
            const startsOnThisDay = isSameDay(currentDate, eventStartDay);

            // Determine if we should render this event on the current date
            if (!startsOnThisDay && eventStartDay.compare(currentDate) < 0) {
                // Event started on a previous day
                const currentDayIndex = days.findIndex((d) => isSameDay(d, currentDate));
                const weekStartIndex = Math.floor(currentDayIndex / 7) * 7;
                const weekStartDate = days[weekStartIndex];
                const isFirstDayOfWeek = isSameDay(currentDate, weekStartDate);

                // Only render at week boundaries for multi-week events
                if (!isFirstDayOfWeek) {
                    return null; // Already rendered earlier in this week
                }
            }

            // Calculate span: count days from current date until event ends or week ends
            const currentDayIndex = days.findIndex((d) => isSameDay(d, currentDate));
            const weekEndIndex = Math.floor(currentDayIndex / 7) * 7 + 6;

            let spanDays = 1;
            let checkDay = currentDate.add({ days: 1 });
            let checkDayIndex = currentDayIndex + 1;

            while (checkDayIndex <= weekEndIndex && checkDay.compare(eventEndDay) <= 0) {
                spanDays++;
                checkDay = checkDay.add({ days: 1 });
                checkDayIndex++;
            }

            return spanDays;
        },
        [days],
    );

    /**
     * Creates an optimized layout for multi-day events using a row-packing algorithm.
     *
     * Key concepts:
     * 1. Each event is assigned to a "row" (vertical position within a day cell)
     * 2. Events spanning multiple days create invisible "placeholder" cells to reserve space
     * 3. Row assignment uses a greedy algorithm to minimize wasted vertical space
     * 4. Multi-week events can use different rows in each week for optimal packing
     *
     * Example: If Event A (Mon-Wed) is in row 0, Event B (Thu-Fri) can also use row 0
     * because they don't overlap, preventing wasted space.
     */
    const eventRenderMap = useMemo(() => {
        type EventCell = { event: ZonedEvent; span: number; isPlaceholder: boolean; row: number };
        const renderMap = new Map<string, EventCell[]>();

        // Initialize empty arrays for each day
        days.forEach((day) => renderMap.set(day.toString(), []));

        // Tracking state for the algorithm
        const eventRowAssignments = new Map<string, number>(); // eventId -> row number
        const rowOccupancyByDay = new Map<string, Set<string>[]>(); // dateKey -> [row0: Set<eventId>, row1: Set<eventId>, ...]
        days.forEach((day) => rowOccupancyByDay.set(day.toString(), []));

        // Checks if an event is starting at a week boundary (for multi-week events)
        const isWeekBoundaryStart = (dayIndex: number, eventStartDay: CalendarDate, currentDay: CalendarDate): boolean => {
            const startsOnCurrentDay = isSameDay(currentDay, eventStartDay);
            if (startsOnCurrentDay) return false;

            const weekStartIndex = Math.floor(dayIndex / 7) * 7;
            const weekStartDate = days[weekStartIndex];
            return isSameDay(currentDay, weekStartDate);
        };

        // Finds the first available row for an event across all days it spans
        const findAvailableRow = (startDayIndex: number, span: number): number => {
            let row = 0;

            while (true) {
                let isAvailable = true;

                // Check if this row is free for all days in the span
                for (let offset = 0; offset < span; offset++) {
                    const dayIndex = startDayIndex + offset;
                    if (dayIndex >= days.length) break;

                    const dayKey = days[dayIndex].toString();
                    const occupancy = rowOccupancyByDay.get(dayKey)!;

                    if (occupancy[row]?.size > 0) {
                        isAvailable = false;
                        break;
                    }
                }

                if (isAvailable) return row;
                row++;
            }
        };

        // Marks a row as occupied for all days an event spans
        const markRowAsOccupied = (startDayIndex: number, span: number, row: number, eventId: string) => {
            for (let offset = 0; offset < span; offset++) {
                const dayIndex = startDayIndex + offset;
                if (dayIndex >= days.length) break;

                const dayKey = days[dayIndex].toString();
                const occupancy = rowOccupancyByDay.get(dayKey)!;

                if (!occupancy[row]) {
                    occupancy[row] = new Set();
                }
                occupancy[row].add(eventId);
            }
        };

        // Main logic: Process each day and assign rows to events
        days.forEach((day, dayIndex) => {
            const dateKey = day.toString();
            const eventsOnThisDay = eventsByDay.get(dateKey) || [];

            eventsOnThisDay.forEach((event) => {
                const span = calculateEventSpan(event, day);
                if (span === null) return; // Event doesn't render on this day

                const eventStartDay = toCalendarDate(event.start);
                const isNewWeekSegment = isWeekBoundaryStart(dayIndex, eventStartDay, day);
                const hasExistingRow = eventRowAssignments.has(event.id);

                // Determine row: reuse existing row within same week, or find new row for new week segments
                let row: number;
                if (hasExistingRow && !isNewWeekSegment) {
                    row = eventRowAssignments.get(event.id)!;
                } else {
                    row = findAvailableRow(dayIndex, span);
                    eventRowAssignments.set(event.id, row);
                }

                // Mark occupancy and add event cell
                markRowAsOccupied(dayIndex, span, row, event.id);
                renderMap.get(dateKey)!.push({ event, span, isPlaceholder: false, row });

                // Add invisible placeholder cells for subsequent days
                for (let offset = 1; offset < span; offset++) {
                    const nextDayIndex = dayIndex + offset;
                    if (nextDayIndex >= days.length) break;

                    const nextDayKey = days[nextDayIndex].toString();
                    renderMap.get(nextDayKey)!.push({ event, span: 0, isPlaceholder: true, row });
                }
            });
        });

        // Sort events by row for consistent rendering order
        renderMap.forEach((events) => events.sort((a, b) => a.row - b.row));

        return renderMap;
    }, [calculateEventSpan, days, eventsByDay]);

    return (
        <div className={cx("flex flex-1 flex-col", className)}>
            {/* Header Row */}
            <div className="grid grid-cols-7">
                {weekdays.map((weekday, index) => (
                    <CalendarColumnHeader key={index} weekDay={weekday} className="before:border-b" />
                ))}
            </div>

            {/* Grid Content */}
            <div
                className={cx(
                    "grid flex-1 grid-cols-7",
                    // 6 rows for >35 days (6 weeks), 5 rows for >28 days (5 weeks), 4 rows for <=28 days (4 weeks)
                    days.length > 35 ? "grid-rows-6" : days.length > 28 ? "grid-rows-5" : "grid-rows-4",
                )}
            >
                {days.map((date, index) => {
                    const dateKey = date.toString();
                    const isCurrentMonthFlag = isSameMonth(date, currentMonthDate);
                    const isTodayFlag = isDateToday(date, timeZone);
                    const isSelectedFlag = selectedDate ? isSameDay(date, selectedDate) : false;
                    // Determine if it's the last row based on the number of weeks
                    const isLastRow = days.length > 35 ? index >= 35 : days.length > 28 ? index >= 28 : index >= 21;
                    const isLastColumn = (index + 1) % 7 === 0;

                    // Retrieve events to render for this day
                    const eventsToRender = eventRenderMap.get(dateKey) || [];
                    const dayEvents = eventsByDay.get(dateKey) || [];

                    const eventsToShow = eventsToRender.slice(0, MAX_EVENTS_PER_CELL);
                    const remainingEventsCount = Math.max(0, dayEvents.length - MAX_EVENTS_PER_CELL);

                    return (
                        <CalendarMonthViewCell
                            key={dateKey}
                            day={date.day}
                            isDisabled={!isCurrentMonthFlag}
                            state={isSelectedFlag ? "selected" : isTodayFlag ? "current" : "default"}
                            className={cx(isLastRow && "before:border-b-0", isLastColumn && "before:border-r-0")}
                            onClick={() => isCurrentMonthFlag && setSelectedDate(date)}
                        >
                            <div className="flex gap-1 max-md:pl-1 md:flex-col">
                                {eventsToShow.map(({ event, span, isPlaceholder }) => {
                                    // If this is a placeholder, render an invisible element to take up space
                                    if (isPlaceholder) {
                                        return (
                                            <div key={`${event.id}-placeholder`} className="pointer-events-none opacity-0">
                                                <CalendarMonthViewEvent label={event.title} collapseOnMobile={true} color={event.color} withDot={event.dot} />
                                            </div>
                                        );
                                    }

                                    // Regular event rendering
                                    const eventStartDay = toCalendarDate(event.start);
                                    const eventEndDay = toCalendarDate(event.end);
                                    const startsToday = isSameDay(date, eventStartDay);
                                    const endsToday = isSameDay(date, eventEndDay);
                                    const continuesPrior = eventStartDay.compare(date) < 0;
                                    const continuesAfter = eventEndDay.compare(date) > 0;

                                    const eventStartsAtDayStart = isSameDay(eventStartDay, toCalendarDate(getStartOfDay(event.start, timeZone)));
                                    const eventEndsAtDayEnd = isSameDay(eventEndDay, toCalendarDate(getEndOfDay(event.end, timeZone)));
                                    const isAllDayForCell =
                                        (continuesPrior && continuesAfter) ||
                                        (startsToday && continuesAfter && eventStartsAtDayStart) ||
                                        (continuesPrior && endsToday && eventEndsAtDayEnd);

                                    const supportingText = isAllDayForCell ? undefined : formatTimeForMonth(event.start);

                                    // Apply custom width style for multi-day events
                                    const spanStyle =
                                        span > 1
                                            ? {
                                                  zIndex: 1,
                                                  width: `calc(${span * 100}% + ${(span - 1) * 16}px)`,
                                              }
                                            : undefined;

                                    return (
                                        <div key={event.id} style={spanStyle} className={cx(!isCurrentMonthFlag && "opacity-50")}>
                                            <CalendarMonthViewEvent
                                                label={event.title}
                                                collapseOnMobile={true}
                                                supportingText={supportingText}
                                                color={event.color}
                                                withDot={event.dot}
                                            />
                                        </div>
                                    );
                                })}
                            </div>

                            {remainingEventsCount > 0 && (
                                <div className="truncate text-xs font-semibold text-utility-neutral-500 max-md:pl-1">{`${remainingEventsCount} more...`}</div>
                            )}
                        </CalendarMonthViewCell>
                    );
                })}
            </div>

            {targetDateForFooter && (
                <div className="border-t border-secondary px-4 py-5 md:hidden">
                    <h3 className="text-sm font-semibold text-primary">{fullDateFormatter.format(targetDateForFooter.toDate(timeZone))}</h3>

                    {eventsForFooter.length > 0 && (
                        <div className="mt-4 flex flex-col gap-1.5">
                            {eventsForFooter.slice(0, 3).map((event) => {
                                // Use helpers for start/end of day
                                const eventStartDay = getStartOfDay(event.start, timeZone);
                                const eventEndDay = getEndOfDay(event.end, timeZone);
                                const isAllDay = event.start.compare(eventStartDay) <= 0 && event.end.compare(eventEndDay) >= 0;

                                const supportingText = isAllDay ? "All day" : formatTimeForMonth(event.start);

                                return (
                                    <CalendarMonthViewEvent
                                        key={`footer-${event.id}`}
                                        label={event.title}
                                        supportingText={supportingText}
                                        color={event.color}
                                        withDot={event.dot}
                                    />
                                );
                            })}
                        </div>
                    )}
                    {eventsForFooter.length === 0 && <p className="mt-4 text-xs font-semibold text-quaternary">No events for this day.</p>}
                    {eventsForFooter.length > 3 && <p className="mt-4 text-xs font-semibold text-quaternary">{`${eventsForFooter.length - 3} more...`}</p>}
                </div>
            )}
        </div>
    );
};

interface MobileSingleDayGridProps {
    dayToDisplay: CalendarDate;
    dayEvents: ZonedEvent[];
    timeZone: string;
    locale: string;
    currentTime: ZonedDateTime; // For time marker
    setSelectedDate: (date: CalendarDate | null) => void;
    timeFormatter: DateFormatter;
    className?: string;
}

const MobileSingleDayGrid = ({ dayToDisplay, dayEvents, timeZone, setSelectedDate, timeFormatter, className }: MobileSingleDayGridProps) => {
    const dayStart = useMemo(() => getStartOfDay(dayToDisplay, timeZone), [dayToDisplay, timeZone]); // Calculate once

    return (
        <div className={cx("relative flex-1", className)}>
            {Array.from({ length: 48 }).map((_, slotIndex) => (
                <CalendarDwViewCell
                    key={`mobile-slot-${dayToDisplay.toString()}-${slotIndex}`}
                    className={cx("before:border-r-0", slotIndex === 47 && "before:border-b-0")}
                />
            ))}

            {dayEvents.map((event, index) => {
                const overlapIndex = dayEvents.filter((e, i) => i < index && event.start.compare(e.end) < 0 && event.end.compare(e.start) > 0).length;
                const totalOverlapping = dayEvents.filter((e) => event.start.compare(e.end) < 0 && event.end.compare(e.start) > 0).length;

                return (
                    <PositionedEvent
                        key={event.id}
                        event={event}
                        dayStart={dayStart}
                        timeZone={timeZone}
                        slotHeight={SLOT_HEIGHT}
                        overlapIndex={overlapIndex}
                        totalOverlapping={totalOverlapping}
                        setSelectedDate={setSelectedDate}
                        timeFormatter={timeFormatter}
                    />
                );
            })}
        </div>
    );
};

interface WeekViewDayProps {
    day: CalendarDate;
    isLastDay: boolean;
    visibleEvents: ZonedEvent[];
    timeZone: string;
    slotHeight: number;
    setSelectedDate: (date: CalendarDate | null) => void;
    timeFormatter: DateFormatter;
}

const WeekViewDay = ({ day, isLastDay, visibleEvents, timeZone, slotHeight, setSelectedDate, timeFormatter }: WeekViewDayProps) => {
    const dateKey = day.toString();
    const dayEvents = useMemo(() => getEventsForDay(visibleEvents, day, timeZone), [visibleEvents, day, timeZone]);
    const dayStart = useMemo(() => getStartOfDay(day, timeZone), [day, timeZone]);

    return (
        <div className="flex flex-col border-secondary">
            <div className="relative flex-1 bg-primary" style={{ minHeight: `${48 * slotHeight}px` }}>
                {Array.from({ length: 48 }).map((_, slotIndex) => (
                    <CalendarDwViewCell key={`slot-${dateKey}-${slotIndex}`} className={cx("last:before:border-b-0", isLastDay && "before:border-r-0")} />
                ))}

                {dayEvents.map((event, index) => {
                    const overlapIndex = dayEvents.filter((e, i) => i < index && event.start.compare(e.end) < 0 && event.end.compare(e.start) > 0).length;
                    const totalOverlapping = dayEvents.filter((e) => event.start.compare(e.end) < 0 && event.end.compare(e.start) > 0).length;

                    return (
                        <PositionedEvent
                            key={event.id}
                            event={event}
                            dayStart={dayStart}
                            timeZone={timeZone}
                            slotHeight={slotHeight}
                            overlapIndex={overlapIndex}
                            totalOverlapping={totalOverlapping}
                            setSelectedDate={setSelectedDate}
                            timeFormatter={timeFormatter}
                        />
                    );
                })}
            </div>
        </div>
    );
};

interface WeekViewProps {
    currentMonthDate: CalendarDate; // Anchor date for the week
    selectedDate: CalendarDate | null;
    zonedEvents: ZonedEvent[];
    locale: string;
    timeZone: string;
    currentTime: ZonedDateTime;
    setSelectedDate: (date: CalendarDate | null) => void;
    shortWeekdayFormatter: DateFormatter;
    timeFormatter: DateFormatter;
    hourOnlyFormatter: DateFormatter;
    className?: string;
    view?: string;
}

const WeekView = ({
    currentMonthDate,
    selectedDate,
    zonedEvents,
    locale,
    timeZone,
    currentTime,
    setSelectedDate,
    shortWeekdayFormatter,
    timeFormatter,
    hourOnlyFormatter,
    className,
    view,
}: WeekViewProps) => {
    const currentWeekStart = startOfWeek(currentMonthDate, locale);
    const currentWeekEnd = endOfWeek(currentMonthDate, locale);
    const localCurrentTime = currentTime;
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const formatTime = (dateTime: ZonedDateTime) => timeFormatter.format(dateTime.toDate());

    const showTimeMarker =
        localCurrentTime.compare(toZoned(currentWeekStart, timeZone)) >= 0 && localCurrentTime.compare(toZoned(currentWeekEnd, timeZone).add({ days: 1 })) < 0;

    const days: CalendarDate[] = [];
    let dayIterator = currentWeekStart;
    while (dayIterator.compare(currentWeekEnd) <= 0) {
        days.push(dayIterator);
        dayIterator = dayIterator.add({ days: 1 });
    }

    const hours = Array.from({ length: 24 }, (_, i) => i);

    let timeMarkerTop = 0;
    if (showTimeMarker) {
        const startOfVisibleDay = getStartOfDay(localCurrentTime, timeZone);
        const minutesFromTop = localCurrentTime.hour * 60 + localCurrentTime.minute - (startOfVisibleDay.hour * 60 + startOfVisibleDay.minute);
        timeMarkerTop = (minutesFromTop / 30) * SLOT_HEIGHT;
    }

    const visibleEvents = zonedEvents.filter((event) => {
        const eventStartDay = toCalendarDate(event.start);
        const eventEndDay = toCalendarDate(event.end);
        return eventStartDay.compare(currentWeekEnd) <= 0 && eventEndDay.compare(currentWeekStart) >= 0;
    });

    // Calculate earliest event time for the entire week or default to 8 AM
    const earliestEventTimeInWeek = useMemo(() => {
        if (visibleEvents.length === 0) {
            // Default scroll target: 8 AM of the week start day
            return toZoned(currentWeekStart, timeZone).set({ hour: 8 });
        }
        // Find the earliest start time across all visible events in the week
        return visibleEvents.reduce((earliest, current) => {
            return current.start.compare(earliest.start) < 0 ? current : earliest;
        }).start;
    }, [visibleEvents, currentWeekStart, timeZone]);

    // Effect to scroll to the earliest event - Use useLayoutEffect
    useLayoutEffect(() => {
        // Only scroll if the view is 'week' and the ref is attached
        if (view === "week" && scrollContainerRef.current && earliestEventTimeInWeek) {
            const startMinutes = earliestEventTimeInWeek.hour * 60 + earliestEventTimeInWeek.minute;
            // Calculate target scroll, ensuring it's not negative
            let targetScrollTop = Math.max(0, (startMinutes / 30) * SLOT_HEIGHT);

            // Optional: Add an offset
            targetScrollTop = Math.max(0, targetScrollTop - SLOT_HEIGHT);

            // No need for setTimeout with useLayoutEffect for initial scroll
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = targetScrollTop;
            }
        }
        // Dependency array includes view and earliestEventTimeInWeek
        // currentMonthDate determines the week, which affects earliestEventTimeInWeek calculation
    }, [view, earliestEventTimeInWeek, currentMonthDate]);

    return (
        <div className={cx("flex flex-1 flex-col overflow-auto", className)}>
            <div className="sticky top-0 z-10 grid grid-cols-7 bg-primary pl-18 shadow-sm dark:border-b dark:border-secondary">
                {days.map((day) => {
                    const isTodayFlag = isDateToday(day, timeZone);
                    const dayToHighlight =
                        selectedDate && day.compare(currentWeekStart) >= 0 && day.compare(currentWeekEnd) <= 0 ? selectedDate : currentWeekStart;
                    const isSelectedFlag = isSameDay(day, dayToHighlight);
                    const weekDayShort = shortWeekdayFormatter.format(day.toDate(timeZone));

                    return (
                        <CalendarColumnHeader
                            key={`mobile-header-${day.toString()}`}
                            onClick={() => setSelectedDate(day)}
                            weekDay={weekDayShort}
                            day={day.day}
                            state={isSelectedFlag ? "selected" : isTodayFlag ? "current" : "default"}
                            className="cursor-pointer first:before:-left-px first:before:border-l"
                        />
                    );
                })}
            </div>

            <div ref={scrollContainerRef} className="relative flex flex-1 overflow-y-auto">
                {/* Time Gutter */}
                <div className="flex h-max w-18 flex-col border-r border-secondary">
                    {hours.map((hour) => {
                        const time = new CalendarDateTime(currentWeekStart.year, currentWeekStart.month, currentWeekStart.day, hour);
                        const timeString = hourOnlyFormatter.format(toZoned(time, timeZone).toDate());
                        return <CalendarRowLabel key={`time-${hour}`}>{timeString}</CalendarRowLabel>;
                    })}
                </div>

                {/* Desktop View: 7-Day Grid */}
                <div className="grid flex-1 grid-cols-7">
                    {days.map((day, index) => {
                        const isLastDay = index === days.length - 1;
                        return (
                            <WeekViewDay
                                key={day.toString()}
                                day={day}
                                isLastDay={isLastDay}
                                visibleEvents={visibleEvents}
                                timeZone={timeZone}
                                slotHeight={SLOT_HEIGHT}
                                setSelectedDate={setSelectedDate}
                                timeFormatter={timeFormatter}
                            />
                        );
                    })}
                </div>

                {/* Current Time Marker - Moved inside scroll container */}
                {showTimeMarker && <CalendarTimeMarker style={{ top: `${timeMarkerTop}px` }}>{formatTime(localCurrentTime)}</CalendarTimeMarker>}
            </div>
        </div>
    );
};

interface DayViewProps {
    dayToDisplay: CalendarDate;
    selectedDate: CalendarDate | null;
    zonedEvents: ZonedEvent[];
    locale: string;
    timeZone: string;
    currentTime: ZonedDateTime;
    setSelectedDate: (date: CalendarDate | null) => void;
    shortWeekdayFormatter: DateFormatter;
    timeFormatter: DateFormatter;
    hourOnlyFormatter: DateFormatter;
    className?: string;
    view?: string;
}

const DayView = ({
    dayToDisplay,
    zonedEvents,
    locale,
    timeZone,
    currentTime,
    setSelectedDate,
    shortWeekdayFormatter,
    timeFormatter,
    hourOnlyFormatter,
    selectedDate,
    className,
    view,
}: DayViewProps) => {
    const currentWeekStart = startOfWeek(dayToDisplay, locale);
    const currentWeekEnd = endOfWeek(dayToDisplay, locale);
    const localCurrentTime = currentTime;

    const formatTime = (dateTime: ZonedDateTime) => timeFormatter.format(dateTime.toDate());

    const showTimeMarker = isSameDay(toCalendarDate(localCurrentTime), dayToDisplay);

    const hours = Array.from({ length: 24 }, (_, i) => i);

    let timeMarkerTop = 0;
    if (showTimeMarker) {
        const minutesFromDayStart = localCurrentTime.hour * 60 + localCurrentTime.minute;
        timeMarkerTop = (minutesFromDayStart / 30) * SLOT_HEIGHT;
    }

    const visibleEvents = useMemo(() => getEventsForDay(zonedEvents, dayToDisplay, timeZone), [zonedEvents, dayToDisplay, timeZone]);

    const highlightedDates = useMemo(() => {
        const datesWithEvents = new Set<string>();
        zonedEvents.forEach((event) => {
            let currentDate = toCalendarDate(event.start);
            const endDate = toCalendarDate(event.end);
            // Iterate through each day the event spans
            while (currentDate.compare(endDate) <= 0) {
                datesWithEvents.add(currentDate.toString());
                currentDate = currentDate.add({ days: 1 });
            }
        });
        return datesWithEvents;
    }, [zonedEvents]);

    const days: CalendarDate[] = [];
    let dayIterator = currentWeekStart;
    while (dayIterator.compare(currentWeekEnd) <= 0) {
        days.push(dayIterator);
        dayIterator = dayIterator.add({ days: 1 });
    }

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Calculate earliest event time or default to 8 AM
    const earliestEventTime = useMemo(() => {
        if (visibleEvents.length === 0) {
            // Default scroll target: 8 AM of the displayed day
            return toZoned(dayToDisplay, timeZone).set({ hour: 8 });
        }
        // Find the earliest start time among visible events
        return visibleEvents.reduce((earliest, current) => {
            return current.start.compare(earliest.start) < 0 ? current : earliest;
        }).start;
    }, [visibleEvents, dayToDisplay, timeZone]);

    // Effect to scroll to the earliest event - Use useLayoutEffect
    useLayoutEffect(() => {
        // Only scroll if the view is 'day' and the ref is attached
        if (view === "day" && scrollContainerRef.current && earliestEventTime) {
            const startMinutes = earliestEventTime.hour * 60 + earliestEventTime.minute;
            // Calculate target scroll, ensuring it's not negative
            let targetScrollTop = Math.max(0, (startMinutes / 30) * SLOT_HEIGHT);

            // Optional: Add an offset to show some context before the first event (e.g., scroll up by one slot height)
            targetScrollTop = Math.max(0, targetScrollTop - SLOT_HEIGHT);

            // No need for setTimeout with useLayoutEffect for initial scroll
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = targetScrollTop;
            }
        }
        // Dependency array includes view, earliestEventTime, and dayToDisplay to re-trigger on changes
    }, [view, earliestEventTime, dayToDisplay]);

    return (
        <div className={cx("flex flex-1 flex-col overflow-auto", className)}>
            <div className="sticky top-0 z-20 grid grid-cols-7 bg-primary shadow-sm lg:hidden dark:border-b dark:border-secondary">
                {days.map((day) => {
                    const isTodayFlag = isDateToday(day, timeZone);
                    const dayToHighlight =
                        selectedDate && day.compare(currentWeekStart) >= 0 && day.compare(currentWeekEnd) <= 0 ? selectedDate : currentWeekStart;
                    const isSelectedFlag = isSameDay(day, dayToHighlight);
                    const weekDayShort = shortWeekdayFormatter.format(day.toDate(timeZone));

                    return (
                        <CalendarColumnHeader
                            key={`mobile-header-${day.toString()}`}
                            onClick={() => setSelectedDate(day)}
                            weekDay={weekDayShort}
                            day={day.day}
                            state={isSelectedFlag ? "selected" : isTodayFlag ? "current" : "default"}
                            className="cursor-pointer"
                        />
                    );
                })}
            </div>

            <div className="flex h-full flex-1">
                <div ref={scrollContainerRef} className="relative flex h-full flex-1 overflow-auto">
                    <div className="flex h-max w-14 flex-col border-r border-secondary md:w-18">
                        {hours.map((hour) => {
                            const time = new CalendarDateTime(dayToDisplay.year, dayToDisplay.month, dayToDisplay.day, hour);
                            const timeString = hourOnlyFormatter.format(toZoned(time, timeZone).toDate());
                            return <CalendarRowLabel key={`time-${hour}`}>{timeString}</CalendarRowLabel>;
                        })}
                    </div>
                    <MobileSingleDayGrid
                        dayToDisplay={dayToDisplay}
                        dayEvents={visibleEvents}
                        timeZone={timeZone}
                        locale={locale}
                        currentTime={currentTime}
                        setSelectedDate={setSelectedDate}
                        timeFormatter={timeFormatter}
                    />
                    {showTimeMarker && <CalendarTimeMarker style={{ top: `${timeMarkerTop}px` }}>{formatTime(localCurrentTime)}</CalendarTimeMarker>}
                </div>

                <div className="sticky top-0 hidden h-full w-82 flex-col overflow-auto border-l border-secondary mask-b-from-94% lg:flex">
                    <AriaCalendar aria-label="Calendar" className="px-6 py-5" value={selectedDate} onChange={(value) => setSelectedDate(value)}>
                        <header className="mb-3 flex items-center justify-between">
                            <Button slot="previous" iconLeading={ChevronLeft} size="sm" color="tertiary" className="size-8" />
                            <AriaHeading className="text-sm font-semibold text-fg-secondary" />
                            <Button slot="next" iconLeading={ChevronRight} size="sm" color="tertiary" className="size-8" />
                        </header>

                        <AriaCalendarGrid weekdayStyle="short" className="w-max">
                            <AriaCalendarGridHeader className="border-b-4 border-transparent">
                                {(day) => (
                                    <AriaCalendarHeaderCell className="p-0">
                                        <div className="flex size-10 items-center justify-center text-sm font-medium text-secondary">{day.slice(0, 2)}</div>
                                    </AriaCalendarHeaderCell>
                                )}
                            </AriaCalendarGridHeader>
                            <AriaCalendarGridBody className="[&_tr]:last-of-type]:border-none [&_td]:p-0 [&_tr]:border-b-4 [&_tr]:border-transparent">
                                {(date) => <CalendarCell date={date} isHighlighted={highlightedDates.has(date.toString())} />}
                            </AriaCalendarGridBody>
                        </AriaCalendarGrid>
                    </AriaCalendar>

                    <div className="flex flex-col gap-5 border-t border-secondary px-6 py-5">
                        <div className="flex flex-col gap-2">
                            <section className="flex w-full justify-between">
                                <p className="text-md font-semibold text-primary">Product demo</p>
                                <div className="-mt-2 -mr-2 flex gap-0.5">
                                    <ButtonUtility size="xs" color="tertiary" tooltip="Copy link" icon={Copy01} />
                                    <ButtonUtility size="xs" color="tertiary" tooltip="Delete" icon={Trash01} />
                                    <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                                </div>
                            </section>
                            <section className="flex flex-col gap-1.5">
                                <div className="flex items-center gap-1.5">
                                    <CalendarIcon className="size-4 stroke-[2.25px] text-fg-quaternary" />
                                    <p className="text-sm text-tertiary">Friday, Jan 10, 2027</p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="size-4 stroke-[2.25px] text-fg-quaternary" />
                                    <p className="text-sm text-tertiary">1:30 PM - 3:30 PM</p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <BellRinging01 className="size-4 stroke-[2.25px] text-fg-quaternary" />
                                    <p className="text-sm text-tertiary">10 min before</p>
                                </div>
                            </section>
                        </div>
                        <div className="flex flex-col gap-3">
                            <section className="flex gap-2">
                                <section className="flex flex-row -space-x-2">
                                    <Avatar
                                        className="ring-[1.5px] ring-bg-primary"
                                        src="https://www.untitledui.com/images/avatars/sienna-hewitt?fm=webp&q=80"
                                        alt="Sienna Hewitt"
                                        size="sm"
                                    />
                                    <Avatar
                                        className="ring-[1.5px] ring-bg-primary"
                                        src="https://www.untitledui.com/images/avatars/ammar-foley?fm=webp&q=80"
                                        alt="Ammar Foley"
                                        size="sm"
                                    />
                                    <Avatar
                                        className="ring-[1.5px] ring-bg-primary"
                                        src="https://www.untitledui.com/images/avatars/pippa-wilkinson?fm=webp&q=80"
                                        alt="Pippa Wilkinson"
                                        size="sm"
                                    />
                                    <Avatar
                                        className="ring-[1.5px] ring-bg-primary"
                                        src="https://www.untitledui.com/images/avatars/olly-schroeder?fm=webp&q=80"
                                        alt="Olly Schroeder"
                                        size="sm"
                                    />
                                    <Avatar
                                        className="ring-[1.5px] ring-bg-primary"
                                        src="https://www.untitledui.com/images/avatars/mathilde-lewis?fm=webp&q=80"
                                        alt="Mathilde Lewis"
                                        size="sm"
                                    />
                                    <Avatar className="ring-[1.5px] ring-bg-primary" initials="OR" size="sm" />
                                </section>
                                <AvatarAddButton size="sm" />
                            </section>

                            <section className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-primary">6 guests</p>
                                <span className="h-[13px] border-l border-primary" />
                                <p className="text-sm text-tertiary">5 yes</p>
                                <span className="h-[13px] border-l border-primary" />
                                <p className="text-sm text-tertiary">1 awaiting</p>
                            </section>
                        </div>

                        <section className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-primary">About this event</p>
                            <div className="text-sm text-tertiary">
                                <p>Sienna is inviting you to a scheduled Zoom meeting.</p>
                                <br />
                                <p>Topic: Product demo for the new dashboard and Q&A session.</p>
                                <br />
                                <p className="wrap-break-word whitespace-normal">
                                    Join Zoom Meeting:&nbsp;
                                    <span className="break-all underline">https://us02web.zoom.us/j/86341969512</span>&nbsp;
                                </p>
                                <br />
                                <p>Meeting ID: 863 4196 9512</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface CalendarProps {
    events: CalendarEvent[];
    view?: "month" | "week" | "day";
    className?: string;
}

export const Calendar = ({ events, view: defaultView = "month", className }: CalendarProps) => {
    const { locale } = useLocale();
    const timeZone = useMemo(() => getLocalTimeZone(), []);

    const timeFormatter = useDateFormatter({ hour: "numeric", minute: "2-digit", hour12: true });
    const shortWeekdayFormatter = useDateFormatter({ weekday: "short" });
    const fullDateFormatter = useDateFormatter({ weekday: "long", month: "long", day: "numeric", year: "numeric" });
    const hourOnlyFormatter = useDateFormatter({ hour: "numeric", hour12: true });

    const [currentMonthDate, setCurrentMonthDate] = useState(() => today(timeZone));
    const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(currentMonthDate);
    const [view, setView] = useState<string>(defaultView);
    const [currentTime, setCurrentTime] = useState(() => now(timeZone));
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(now(timeZone));
        }, 60000);
        return () => clearInterval(intervalId);
    }, [timeZone]);

    const zonedEvents = useMemo(() => {
        return events.map((event) => ({
            ...event,
            start: parseAbsoluteToLocal(event.start.toISOString()),
            end: parseAbsoluteToLocal(event.end.toISOString()),
        }));
    }, [events]);

    const headerDate = useMemo(
        () => (view === "day" && selectedDate ? selectedDate.toDate(timeZone) : currentMonthDate.toDate(timeZone)),
        [view, selectedDate, currentMonthDate, timeZone],
    );

    const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
        let newDate: CalendarDate;
        const anchorDate = selectedDate || currentMonthDate; // Use selected or current month anchor

        if (action === "TODAY") {
            newDate = today(timeZone);
        } else {
            const P = action === "PREV" ? -1 : 1;
            switch (view) {
                case "month":
                    newDate = currentMonthDate.add({ months: P });
                    break;
                case "week":
                    const currentWeekStart = startOfWeek(anchorDate, locale);
                    newDate = currentWeekStart.add({ weeks: P });
                    break;
                case "day":
                    newDate = anchorDate.add({ days: P });
                    break;
                default:
                    newDate = currentMonthDate;
            }
        }
        setCurrentMonthDate(newDate); // Always update month anchor for header consistency
        if (action === "TODAY" || view === "day") {
            setSelectedDate(newDate); // Select today or the navigated day
        } else {
            setSelectedDate(null); // Clear selection when navigating months/weeks
        }
    };

    const dayToDisplay = selectedDate || currentMonthDate;

    if (!isMounted) return null;

    return (
        <div
            role="application"
            aria-label="Calendar"
            className={cx(
                "flex flex-col overflow-hidden rounded-xl bg-primary shadow-xs ring ring-secondary",
                view === "month" ? "h-full md:min-h-[912px]" : "h-[912px]",
                className,
            )}
        >
            <CalendarHeader
                date={headerDate}
                selectedView={view}
                onSelectionChange={setView}
                viewOptions={viewOptions}
                onClickPrev={() => handleNavigate("PREV")}
                onClickNext={() => handleNavigate("NEXT")}
                onClickToday={() => handleNavigate("TODAY")}
            />
            <main className="flex flex-1 overflow-hidden">
                {view === "month" && (
                    <MonthView
                        currentMonthDate={currentMonthDate}
                        selectedDate={selectedDate}
                        zonedEvents={zonedEvents}
                        locale={locale}
                        timeZone={timeZone}
                        setSelectedDate={setSelectedDate}
                        fullDateFormatter={fullDateFormatter}
                        shortWeekdayFormatter={shortWeekdayFormatter}
                        timeFormatter={timeFormatter}
                    />
                )}
                {view === "week" && (
                    <>
                        <DayView
                            dayToDisplay={dayToDisplay}
                            selectedDate={selectedDate}
                            zonedEvents={zonedEvents}
                            locale={locale}
                            timeZone={timeZone}
                            currentTime={currentTime}
                            setSelectedDate={setSelectedDate}
                            shortWeekdayFormatter={shortWeekdayFormatter}
                            timeFormatter={timeFormatter}
                            hourOnlyFormatter={hourOnlyFormatter}
                            view={view}
                            className="md:hidden"
                        />

                        <WeekView
                            currentMonthDate={currentMonthDate}
                            selectedDate={selectedDate}
                            zonedEvents={zonedEvents}
                            locale={locale}
                            timeZone={timeZone}
                            currentTime={currentTime}
                            setSelectedDate={setSelectedDate}
                            shortWeekdayFormatter={shortWeekdayFormatter}
                            timeFormatter={timeFormatter}
                            hourOnlyFormatter={hourOnlyFormatter}
                            view={view}
                            className="max-md:hidden"
                        />
                    </>
                )}
                {view === "day" && (
                    <DayView
                        dayToDisplay={dayToDisplay}
                        selectedDate={selectedDate}
                        zonedEvents={zonedEvents}
                        locale={locale}
                        timeZone={timeZone}
                        currentTime={currentTime}
                        setSelectedDate={setSelectedDate}
                        shortWeekdayFormatter={shortWeekdayFormatter}
                        timeFormatter={timeFormatter}
                        hourOnlyFormatter={hourOnlyFormatter}
                        view={view}
                    />
                )}
            </main>
        </div>
    );
};
