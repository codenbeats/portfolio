"use client";

import type { HTMLAttributes } from "react";
import logoMini from "@/assets/logo/logo-mini.png";
import { cx } from "@/utils/cx";

export const UntitledLogoMinimal = (props: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div {...props} className={cx("size-8 shrink-0 overflow-hidden rounded-[22%]", props.className)}>
            <img
                src={logoMini.src}
                alt="Mirimera"
                className="size-full object-cover"
            />
        </div>
    );
};
