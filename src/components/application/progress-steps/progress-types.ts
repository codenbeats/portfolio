import type { FC, RefAttributes, SVGProps } from "react";

export type Step = {
    title: string;
    description: string;
    connector?: boolean;
    status: "incomplete" | "current" | "complete";
};

export type ComponentType = "icon" | "number" | "featured-icon";

export type IconType = FC<SVGProps<SVGSVGElement> & RefAttributes<SVGSVGElement>> & {
    color?: string;
    size?: number;
};

export type ItemsType<T extends ComponentType> = T extends "featured-icon" ? Step & { icon: IconType } : Step & { icon?: IconType };

export type ProgressIconType = ItemsType<"icon">;
export type ProgressFeaturedIconType = ItemsType<"featured-icon">;

export interface CommonProps {
    items: ProgressIconType[];
    size?: "sm" | "md";
    orientation?: "vertical" | "horizontal";
    className?: string;
}

export type StepBaseProps<T extends ComponentType> = {
    size?: "sm" | "md";
    type?: T;
} & ItemsType<T>;

export interface ProgressIconsCenteredProps<T extends ComponentType> extends Omit<CommonProps, "items"> {
    type?: T;
    connector?: boolean;
    items: ItemsType<T>[];
}

export interface ProgressMinimalIconsProps extends CommonProps {
    text?: boolean;
}
