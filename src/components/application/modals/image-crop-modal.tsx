"use client";

import { type SyntheticEvent, useEffect, useState } from "react";
import { Crop01, Plus } from "@untitledui/icons";
import { Heading as AriaHeading } from "react-aria-components";
import { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { FileTrigger } from "@/components/base/file-upload-trigger/file-upload-trigger";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { Cropper } from "@/components/shared-assets/image-cropper/cropper";
import { cx } from "@/utils/cx";

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

const images = [
    {
        src: "https://www.untitledui.com/application/image-cropper/option1.webp",
        alt: "Option 1",
    },
    {
        src: "https://www.untitledui.com/application/image-cropper/option2.webp",
        alt: "Option 2",
    },
    {
        src: "https://www.untitledui.com/application/image-cropper/option3.webp",
        alt: "Option 3",
    },
    {
        src: "https://www.untitledui.com/application/image-cropper/option4.webp",
        alt: "Option 4",
    },
    {
        src: "https://www.untitledui.com/application/image-cropper/option5.webp",
        alt: "Option 5",
    },
    {
        src: "https://www.untitledui.com/application/image-cropper/option6.webp",
        alt: "Option 6",
    },
    {
        src: "https://www.untitledui.com/application/image-cropper/option7.webp",
        alt: "Option 7",
    },
    {
        src: "https://www.untitledui.com/application/image-cropper/option8.webp",
        alt: "Option 8",
    },
    {
        src: "https://www.untitledui.com/application/image-cropper/option9.webp",
        alt: "Option 9",
    },
    {
        src: "https://www.untitledui.com/application/image-cropper/option10.webp",
        alt: "Option 10",
    },
];

export const ImageCropModal = () => {
    const [crop, setCrop] = useState<Crop>();
    const [isOpen, setIsOpen] = useModalState();
    const [imageSrc, setImageSrc] = useState(images[0]);
    const [imageSet, setImageSet] = useState(images);

    const aspect = 10 / 3;

    const handleClick = (image: { src: string; alt: string }) => {
        setImageSrc(image);
    };

    const handleChange = async (files: FileList | null) => {
        const file = files?.[0];

        if (!file) {
            return;
        }

        const link = URL.createObjectURL(file);

        setImageSrc?.({
            src: link,
            alt: file.name,
        });
        setImageSet((prev) => [...prev, { src: link, alt: file.name }]);
    };

    const handleImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
        const { naturalWidth: width, naturalHeight: height } = e.currentTarget;

        const crop = centerCrop(
            makeAspectCrop(
                {
                    unit: "%",
                    width: 100,
                },
                aspect,
                width,
                height,
            ),
            width,
            height,
        );

        setCrop(crop);
    };

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-140">
                        <CloseButton onClick={() => setIsOpen(false)} theme="light" size="sm" className="absolute top-3 right-3 sm:top-4 sm:right-4" />
                        <div className="flex gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                            <FeaturedIcon color="gray" size="md" theme="modern" icon={Crop01} className="max-sm:hidden" />

                            <div className="z-10 flex flex-col gap-0.5">
                                <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                    Crop header image
                                </AriaHeading>
                                <p className="text-sm text-tertiary">Upload a 1600 x 480px image for best results.</p>
                            </div>
                        </div>
                        <div className="h-5 w-full" />
                        <div className="flex flex-col gap-4 px-4 sm:px-6 md:gap-5">
                            <Cropper
                                aspect={aspect}
                                crop={crop}
                                onChange={(crop, percentCrop) => setCrop(percentCrop)}
                                className="h-50 w-full self-stretch sm:h-78"
                            >
                                <Cropper.Img {...imageSrc} onLoad={handleImageLoad} />
                            </Cropper>

                            <div className="flex flex-wrap items-center justify-start gap-y-2">
                                {imageSet.map((image) => (
                                    <button
                                        aria-label={`Select image ${image.alt}`}
                                        key={image.alt}
                                        onClick={() => handleClick(image)}
                                        className={cx(
                                            "flex size-10 cursor-pointer items-center justify-center rounded-full p-1.5 outline-hidden transition-all duration-150 ease-linear ring-inset last:mr-2 focus:ring-3 focus:ring-brand",
                                            image.src === imageSrc.src && "ring-3 ring-brand",
                                        )}
                                    >
                                        <img {...image} className="size-full rounded-full object-cover object-center" alt={image.alt} />
                                    </button>
                                ))}

                                {/* Spacing placeholder */}
                                <div className="h-px w-2" />

                                <FileTrigger acceptedFileTypes={["image/*"]} onSelect={handleChange}>
                                    <Button color="secondary" iconLeading={Plus} />
                                </FileTrigger>
                            </div>
                        </div>

                        <div className="z-10 flex flex-col pt-6 pb-4 sm:pt-8 sm:pb-6">
                            <div className="w-full border-t border-secondary max-md:hidden" />
                            <div className="h-4 w-full max-md:hidden sm:h-6" />
                            <div className="flex flex-1 flex-col-reverse gap-3 px-4 sm:flex-row sm:justify-end sm:px-6">
                                <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                                <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                    Save changes
                                </Button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
