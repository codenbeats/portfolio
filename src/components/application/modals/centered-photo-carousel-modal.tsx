"use client";

import { useEffect, useState } from "react";
import { Heading as AriaHeading } from "react-aria-components";
import { Carousel, CarouselContext } from "@/components/application/carousel/carousel-base";
import { CarouselIndicator } from "@/components/application/carousel/carousel.demo";
import { MetricItems } from "@/components/application/modals/base-components/metric-item";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";

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

export const CenteredPhotoCarouselModal = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <Carousel.Root className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                        <div className="px-4 pt-4 sm:px-6 sm:pt-6">
                            <Carousel.Content className="gap-2 rounded-lg">
                                <Carousel.Item className="rounded-lg bg-tertiary">
                                    <MetricItems />
                                </Carousel.Item>
                                <Carousel.Item className="rounded-lg bg-tertiary">
                                    <MetricItems />
                                </Carousel.Item>
                                <Carousel.Item className="rounded-lg bg-tertiary">
                                    <MetricItems />
                                </Carousel.Item>
                                <Carousel.Item className="rounded-lg bg-tertiary">
                                    <MetricItems />
                                </Carousel.Item>
                            </Carousel.Content>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                            <div className="z-10 flex flex-col items-center justify-center gap-0.5">
                                <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                    Welcome to your dashboard
                                </AriaHeading>
                                <p className="text-center text-sm text-tertiary">
                                    We're glad to have you onboard. Here are some quick tips to get you up and running.
                                </p>
                            </div>
                        </div>
                        <div className="h-5 w-full" />

                        <CarouselIndicator size="lg" className="mx-auto" />

                        <CarouselContext.Consumer>
                            {(context) => (
                                <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                                    <Button size="md" color="secondary" onClick={() => (context?.canScrollPrev ? context?.scrollPrev() : setIsOpen(false))}>
                                        {context?.canScrollPrev ? "Back" : "Skip"}
                                    </Button>
                                    <Button size="md" color="primary" onClick={() => (context?.canScrollNext ? context?.scrollNext() : setIsOpen(false))}>
                                        {context?.canScrollNext ? "Next" : "Finish"}
                                    </Button>
                                </div>
                            )}
                        </CarouselContext.Consumer>
                    </Carousel.Root>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
