"use client";

import type { ComponentPropsWithRef } from "react";
import ReactCrop, { type ReactCropProps } from "react-image-crop";
import "@/components/shared-assets/image-cropper/cropper.css";
import { cx } from "@/utils/cx";

export const ImageCropper = (props: ReactCropProps) => {
    return <ReactCrop {...props} className={cx("rounded-lg", props.className)} />;
};

interface ImgProps extends ComponentPropsWithRef<"img"> {}

export const Img = (props: ImgProps) => {
    return (
        <img
            {...props}
            alt={props.alt || "Image to be cropped"}
            className={cx("size-full object-contain object-center transition-all duration-200 ease-linear", props.className)}
        />
    );
};

const Cropper = ImageCropper as typeof ImageCropper & {
    Img: typeof Img;
};

Cropper.Img = Img;

export { Cropper };
