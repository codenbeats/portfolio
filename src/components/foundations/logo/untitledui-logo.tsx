"use client";

import type { HTMLAttributes } from "react";
import logo from "@/assets/logo/logo.png";
import logoMini from "@/assets/logo/logo-mini.png";
import { cx } from "@/utils/cx";

export const UntitledLogo = (props: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div {...props} className={cx("flex h-8 w-max items-center gap-1.5", props.className)}>
            <div className="h-full shrink-0 overflow-hidden rounded-[22%]" style={{ aspectRatio: "1" }}>
                <img
                    src={logoMini.src}
                    alt=""
                    className="size-full object-cover"
                />
            </div>
            <img
                src={logo.src}
                alt="Mirimera"
                className="h-[60%] w-auto object-contain"
            />
        </div>
    );
};
