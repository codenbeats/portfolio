"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Flag05, Save01 } from "@untitledui/icons";
import { Heading as AriaHeading } from "react-aria-components";
import { Carousel, CarouselContext } from "@/components/application/carousel/carousel-base";
import { CarouselIndicator } from "@/components/application/carousel/carousel.demo";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Input, InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { Label } from "@/components/base/input/label";
import { Select } from "@/components/base/select/select";
import { TextAreaBase } from "@/components/base/textarea/textarea";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

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

const people = [
    { id: "@phoenix", label: "Phoenix Baker" },
    { id: "@olivia", label: "Olivia Ryhe" },
    { id: "@lana", label: "Lana Steiner", disabled: true },
    { id: "@demi", label: "Demi Wilkinson" },
    { id: "@candice", label: "Candice Wu" },
    { id: "@natali", label: "Natali Craig" },
    { id: "@carolineschultz", label: "Caroline Schultz" },
    { id: "@drew", label: "Drew Cano" },
    { id: "@evelyn", label: "Evelyn Harrison" },
    { id: "@kari", label: "Kari Rasmussen" },
];

const employmentTypes = [
    { label: "Full time", id: "fulltime" },
    { label: "Part time", id: "parttime" },
];

export const Form01Modal = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog className="overflow-hidden">
                    <Carousel.Root className="relative w-full overflow-hidden! rounded-xl bg-primary shadow-xl sm:max-w-160">
                        <CloseButton onClick={() => setIsOpen(false)} theme="light" size="sm" className="absolute top-3 right-3 sm:top-4 sm:right-4" />
                        <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                            <div className="relative w-max max-sm:hidden">
                                <FeaturedIcon color="gray" size="md" theme="modern" icon={Flag05} />
                            </div>
                            <div className="z-10 flex flex-col gap-0.5">
                                <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                    Add experience
                                </AriaHeading>
                                <p className="text-sm text-tertiary">Share where you've worked on your profile.</p>
                            </div>
                        </div>
                        <div className="h-5 w-full" />
                        <Carousel.Content className="gap-5">
                            <Carousel.Item className="grid w-full grid-cols-1 items-start justify-start gap-4 px-4 sm:grid-cols-[280px_1fr] sm:px-6">
                                <Input size="md" label="Title" placeholder="What is your title?" className="sm:col-span-2" />
                                <Select.ComboBox
                                    label="Company"
                                    className="sm:col-span-1"
                                    size="md"
                                    items={people}
                                    shortcut={false}
                                    placeholder="Search for company"
                                >
                                    {(item) => (
                                        <Select.Item key={item.id} id={item.id}>
                                            {item.label}
                                        </Select.Item>
                                    )}
                                </Select.ComboBox>
                                <InputGroup size="md" label="Website" className="sm:col-span-1" leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}>
                                    <InputBase placeholder="www.example.com" />
                                </InputGroup>
                                <Select.ComboBox
                                    size="md"
                                    label="Location"
                                    className="sm:col-span-1"
                                    placeholder="Search for city"
                                    items={people}
                                    shortcutClassName="sm:hidden"
                                >
                                    {(item) => (
                                        <Select.Item key={item.id} id={item.id}>
                                            {item.label}
                                        </Select.Item>
                                    )}
                                </Select.ComboBox>
                                <div className="w-32 max-sm:hidden">
                                    <Select label="Employment" size="md" items={employmentTypes} defaultValue={employmentTypes[0].id} popoverClassName="w-max">
                                        {(item) => (
                                            <Select.Item key={item.id} id={item.id}>
                                                {item.label}
                                            </Select.Item>
                                        )}
                                    </Select>
                                </div>
                                <Input size="md" label="Title" placeholder="What is your title?" className="col-span-2 max-sm:hidden" />
                                <div className="col-span-2 flex h-36 flex-col gap-1.5 self-stretch max-sm:hidden">
                                    <Label className="flex items-center gap-0.5" tooltip="This will be public">
                                        Description
                                    </Label>
                                    <TextAreaBase
                                        className="flex-1 rounded-lg px-3.5 py-3"
                                        placeholder="e.g. I joined Stripe's Customer Success team to help them scale their checkout product. I focused mainly on onboarding new customers and resolving complaints."
                                    />
                                </div>
                            </Carousel.Item>
                            <Carousel.Item className="flex w-full flex-col gap-4 px-4 sm:hidden sm:px-6">
                                <Select defaultValue={employmentTypes[0].id} label="Employment" size="md" items={employmentTypes}>
                                    {(item) => (
                                        <Select.Item key={item.id} id={item.id}>
                                            {item.label}
                                        </Select.Item>
                                    )}
                                </Select>
                                <Input size="md" label="Title" placeholder="What is your title?" className="max-sm:hidden" />
                                <div className="resize-both flex min-h-40 flex-col gap-1.5 self-stretch">
                                    <Label className="flex items-center gap-0.5" tooltip="This will be public">
                                        Description
                                    </Label>
                                    <TextAreaBase
                                        className="h-full flex-1 rounded-lg px-3.5 py-3"
                                        placeholder="e.g. I joined Stripe's Customer Success team to help them scale their checkout product. I focused mainly on onboarding new customers and resolving complaints."
                                    />
                                </div>
                            </Carousel.Item>
                        </Carousel.Content>

                        <div className="mt-5 sm:hidden">
                            <CarouselIndicator size="lg" className="mx-auto" />
                        </div>

                        <CarouselContext.Consumer>
                            {(context) => (
                                <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                                    <Button
                                        size="lg"
                                        color="secondary"
                                        iconLeading={context?.canScrollPrev ? ArrowLeft : Save01}
                                        onClick={() => (context?.canScrollPrev ? context?.scrollPrev() : setIsOpen(false))}
                                    >
                                        {context?.canScrollPrev ? "Back" : "Save as draft"}
                                    </Button>
                                    <Button size="md" color="primary" onClick={() => (context?.canScrollNext ? context?.scrollNext() : setIsOpen(false))}>
                                        {context?.canScrollNext ? "Next" : "Add experience"}
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
