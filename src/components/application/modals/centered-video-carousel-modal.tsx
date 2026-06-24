"use client";

import { useEffect, useRef, useState } from "react";
import { Heading as AriaHeading } from "react-aria-components";
import { Carousel, CarouselContext, useCarousel } from "@/components/application/carousel/carousel-base";
import { CarouselIndicator } from "@/components/application/carousel/carousel.demo";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { VideoPlayer, type VideoPlayerRef } from "@/components/base/video-player/video-player";

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

const PauseVideosOnSlideChange = ({ videoRefs }: { videoRefs: React.RefObject<(VideoPlayerRef | null)[]> }) => {
    const { selectedIndex } = useCarousel();
    const prevIndex = useRef(selectedIndex);

    useEffect(() => {
        if (prevIndex.current !== selectedIndex) {
            videoRefs.current?.forEach((ref) => ref?.pause());
            prevIndex.current = selectedIndex;
        }
    }, [selectedIndex, videoRefs]);

    return null;
};

export const CenteredVideoCarouselModal = () => {
    const [isOpen, setIsOpen] = useModalState();
    const videoRefs = useRef<(VideoPlayerRef | null)[]>([]);

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <Carousel.Root className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-152">
                        <PauseVideosOnSlideChange videoRefs={videoRefs} />
                        <div className="px-4 pt-4 sm:px-6 sm:pt-6">
                            <Carousel.Content className="gap-2 rounded-lg">
                                <Carousel.Item>
                                    <VideoPlayer
                                        ref={(el) => {
                                            videoRefs.current[0] = el;
                                        }}
                                        size="md"
                                        src="https://www.untitledui.com/videos/untitled-ui-demo.mp4"
                                        thumbnailUrl="https://www.untitledui.com/application/video-thumbnail.webp"
                                        className="w-full max-w-148 overflow-hidden rounded-lg"
                                        thumbnailButtonClassName="max-md:bg-transparent max-md:backdrop-blur-none"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <VideoPlayer
                                        ref={(el) => {
                                            videoRefs.current[1] = el;
                                        }}
                                        size="md"
                                        src="https://www.untitledui.com/videos/untitled-ui-demo.mp4"
                                        thumbnailUrl="https://www.untitledui.com/application/video-thumbnail.webp"
                                        className="w-full max-w-148 overflow-hidden rounded-lg"
                                        thumbnailButtonClassName="max-md:bg-transparent max-md:backdrop-blur-none"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <VideoPlayer
                                        ref={(el) => {
                                            videoRefs.current[2] = el;
                                        }}
                                        size="md"
                                        src="https://www.untitledui.com/videos/untitled-ui-demo.mp4"
                                        thumbnailUrl="https://www.untitledui.com/application/video-thumbnail.webp"
                                        className="w-full max-w-148 overflow-hidden rounded-lg"
                                        thumbnailButtonClassName="max-md:bg-transparent max-md:backdrop-blur-none"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <VideoPlayer
                                        ref={(el) => {
                                            videoRefs.current[3] = el;
                                        }}
                                        size="md"
                                        src="https://www.untitledui.com/videos/untitled-ui-demo.mp4"
                                        thumbnailUrl="https://www.untitledui.com/application/video-thumbnail.webp"
                                        className="w-full max-w-148 overflow-hidden rounded-lg"
                                        thumbnailButtonClassName="max-md:bg-transparent max-md:backdrop-blur-none"
                                    />
                                </Carousel.Item>
                            </Carousel.Content>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                            <div className="z-10 flex w-full flex-col items-center justify-center gap-0.5">
                                <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                    Welcome to your dashboard
                                </AriaHeading>
                                <p className="self-stretch text-center text-sm text-tertiary">Here are some tips to get you up and running.</p>
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
                                        {context?.canScrollNext ? "Continue" : "Finish"}
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
