"use client";

import type { HTMLAttributes, SubmitEvent } from "react";
import { Attachment01, ChevronDown, FaceSmile, ItalicSquare, Microphone02, Recording02, Send01 } from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { InputBase } from "@/components/base/input/input";
import { TextAreaBase } from "@/components/base/textarea/textarea";
import { cx } from "@/utils/cx";

interface MessageActionMinimalProps extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> {
    size?: "sm" | "md" | "lg";
    onSubmit?: (message: string) => void;
}

export const MessageActionMinimal = ({ onSubmit, className, size = "lg", ...props }: MessageActionMinimalProps) => {
    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const message = formData.get("message");

        if (typeof message !== "string") return;

        onSubmit?.(message);
    };

    return (
        <form className={cx("flex h-max w-90 items-center gap-3", className)} onSubmit={handleSubmit} {...props}>
            <InputBase aria-label="Message" size={size} placeholder="Message" name="message" />

            <Button type="submit" size={size} color="secondary" iconLeading={Send01} />
        </form>
    );
};

interface MessageActionTextareaProps extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> {
    textAreaClassName?: string;
    onSubmit?: (message: string) => void;
}
export const MessageActionTextarea = ({ onSubmit, className, textAreaClassName, ...props }: MessageActionTextareaProps) => {
    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const message = formData.get("message");

        if (typeof message !== "string") return;

        onSubmit?.(message);
    };

    return (
        <form className={cx("relative flex h-max items-center gap-3", className)} onSubmit={handleSubmit} {...props}>
            <TextAreaBase aria-label="Message" placeholder="Message" name="message" className={cx("h-32 w-full resize-none", textAreaClassName)} />

            <ButtonUtility icon={Recording02} size="xs" color="tertiary" className="absolute top-2 right-2" />

            <div className="absolute right-3.5 bottom-2 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                    <ButtonUtility icon={Attachment01} size="xs" color="tertiary" />
                    <ButtonUtility icon={FaceSmile} size="xs" color="tertiary" />
                </div>

                <Button size="sm" color="link-color">
                    Send
                </Button>
            </div>
        </form>
    );
};

interface MessageActionAdvancedProps extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> {
    textAreaClassName?: string;
    onSubmit?: (message: string) => void;
}
export const MessageActionAdvanced = ({ className, onSubmit, textAreaClassName, ...props }: MessageActionAdvancedProps) => {
    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const message = formData.get("message");

        if (typeof message !== "string") return;

        onSubmit?.(message);
    };

    return (
        <form
            className={cx("relative flex h-max flex-col rounded-xl bg-secondary ring-1 ring-secondary ring-inset", className)}
            onSubmit={handleSubmit}
            {...props}
        >
            <div className="relative flex">
                <TextAreaBase
                    aria-label="Message"
                    placeholder="Ask me anything..."
                    name="message"
                    className={cx("h-32 w-full resize-y rounded-xl", textAreaClassName)}
                />
                <ButtonUtility icon={Microphone02} size="xs" color="tertiary" className="absolute top-2 right-2" />
            </div>

            <div className="flex w-full items-center justify-between gap-3 px-3 py-2">
                <div className="flex cursor-pointer items-center gap-1">
                    <Avatar size="xs" alt="Olivia Rhye" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" className="size-4" />
                    <div className="flex items-center gap-0.5">
                        <p className="truncate text-xs font-semibold text-tertiary">Olivia </p>
                        <ChevronDown className="size-3 stroke-3 text-fg-quaternary" />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button size="sm" color="link-gray" iconLeading={<ItalicSquare data-icon className="size-4!" />} className="text-xs font-semibold">
                        Shortcuts
                    </Button>
                    <Button size="sm" color="link-gray" iconLeading={<Attachment01 data-icon className="size-4!" />} className="text-xs font-semibold">
                        Attach
                    </Button>
                </div>
            </div>
        </form>
    );
};
