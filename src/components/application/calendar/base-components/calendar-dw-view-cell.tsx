"use client";

import type { HTMLAttributes } from "react";
import { Plus } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

export const CalendarDwViewCell = (props: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            {...props}
            className={cx(
                "group relative flex h-12 flex-col bg-primary p-1.5 hover:bg-primary_hover",
                "before:pointer-events-none before:absolute before:inset-0 before:border-r before:border-b before:border-secondary",
                props.className,
            )}
        >
            <div className="absolute right-1.5 bottom-1.5 hidden group-hover:inline-flex">
                <Button aria-label="Add event" size="sm" iconLeading={Plus} color="secondary" className="size-7 text-fg-quaternary" />
            </div>
        </div>
    );
};
