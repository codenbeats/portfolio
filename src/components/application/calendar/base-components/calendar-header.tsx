"use client";

import { CalendarDate, endOfWeek, getLocalTimeZone, startOfWeek } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { ArrowLeft, ArrowRight, Plus, SearchLg } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { CalendarDateIcon } from "./calendar-date-icon";
import { CalendarViewDropdown, type ViewOption } from "./calendar-view-dropdown";

interface CalendarHeaderProps {
    date: Date;
    selectedView: string;
    viewOptions: ViewOption[];
    onSelectionChange: (key: string) => void;
    onClickPrev?: () => void;
    onClickNext?: () => void;
    onClickToday?: () => void;
}

export const CalendarHeader = ({ date, selectedView, onSelectionChange, viewOptions, onClickPrev, onClickNext, onClickToday }: CalendarHeaderProps) => {
    const { locale } = useLocale();
    const timeZone = getLocalTimeZone();

    const renderPeriod = () => {
        const dateFormatOptions: Intl.DateTimeFormatOptions = {
            month: "short",
            day: "numeric",
            year: "numeric",
        };

        if (selectedView === "month") {
            return (
                <span className="text-sm text-tertiary">
                    {new Date(date.getFullYear(), date.getMonth(), 1).toLocaleDateString(locale, dateFormatOptions)}
                    {" – "}
                    {new Date(date.getFullYear(), date.getMonth() + 1, 0).toLocaleDateString(locale, dateFormatOptions)}
                </span>
            );
        }

        if (selectedView === "week") {
            const calendarDate = new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
            const weekStartDate = startOfWeek(calendarDate, locale);
            const weekEndDate = endOfWeek(calendarDate, locale);

            return (
                <span className="text-sm text-tertiary">
                    {weekStartDate.toDate(timeZone).toLocaleDateString(locale, dateFormatOptions)}
                    {" – "}
                    {weekEndDate.toDate(timeZone).toLocaleDateString(locale, dateFormatOptions)}
                </span>
            );
        }

        return <span className="text-sm text-tertiary">{date.toLocaleString(locale, { weekday: "long" })}</span>;
    };

    return (
        <div className="relative flex flex-col items-start justify-between gap-4 bg-primary px-4 py-5 md:px-6 lg:flex-row">
            <div className="flex items-start gap-3">
                <CalendarDateIcon day={date.getDate()} month={date.toLocaleString(locale, { month: "short" }).toUpperCase()} className="max-md:hidden" />
                <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2 text-lg font-semibold whitespace-nowrap text-primary">
                        {date.toLocaleString(locale, { month: "long" })} {date.getFullYear()}
                        <Badge size="sm" color="gray" type="modern">
                            Week {Math.ceil(date.getDate() / 7)}
                        </Badge>
                    </div>

                    {renderPeriod()}
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 gap-y-4 max-lg:w-full">
                <Button iconLeading={SearchLg} size="sm" color="tertiary" className="max-lg:order-1" />

                <ButtonGroup selectedKeys={[]} size="sm" className="flex max-lg:order-last max-lg:min-w-full max-lg:flex-1">
                    <ButtonGroupItem id="prev" iconLeading={ArrowLeft} onClick={onClickPrev} />
                    <ButtonGroupItem id="today" className="flex-1 justify-center text-center" onClick={onClickToday}>
                        Today
                    </ButtonGroupItem>
                    <ButtonGroupItem id="next" iconLeading={ArrowRight} onClick={onClickNext} />
                </ButtonGroup>

                <CalendarViewDropdown value={selectedView} onSelectionChange={onSelectionChange} options={viewOptions} />

                <Button iconLeading={Plus} size="sm">
                    Add event
                </Button>
            </div>

            <div className="pointer-events-none absolute bottom-0 left-0 w-full border-t border-secondary"></div>
        </div>
    );
};
