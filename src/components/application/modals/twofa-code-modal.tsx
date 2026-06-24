"use client";

import { useEffect, useState } from "react";
import { Lock01 } from "@untitledui/icons";
import { Heading as AriaHeading } from "react-aria-components";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { PinInput } from "@/components/base/input/pin-input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { GradientScan, QRCode } from "@/components/shared-assets/qr-code";

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

export const TWOFACodeModal = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full max-w-128 overflow-hidden rounded-2xl bg-primary shadow-xl">
                        <CloseButton onClick={() => setIsOpen(false)} theme="light" size="sm" className="absolute top-3 right-3 sm:top-4 sm:right-4" />
                        <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                            <div className="relative w-max">
                                <FeaturedIcon color="gray" size="md" theme="modern" icon={Lock01} />
                            </div>
                            <div className="z-10 flex flex-col gap-0.5">
                                <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                    Set up two-factor authentication
                                </AriaHeading>
                                <p className="text-sm text-tertiary">
                                    To authorize transactions, please scan this QR code with your Google Authenticator App and enter the verification code
                                    below.
                                </p>
                            </div>
                        </div>
                        <div className="h-5 w-full" />
                        <div className="flex flex-col gap-4 px-4 sm:gap-5 sm:px-6">
                            <div className="relative flex w-full items-center justify-center rounded-lg bg-secondary p-5">
                                <QRCode value="https://www.untitledui.com/" size="lg" className="hidden sm:flex" />
                                <QRCode value="https://www.untitledui.com/" size="md" className="flex sm:hidden" />
                                <GradientScan className="md:max-w-[calc(100%-40px)]" />
                            </div>
                            <div className="relative z-10 flex flex-col gap-1.5">
                                <PinInput size="md">
                                    <PinInput.Label>Verification code</PinInput.Label>
                                    <PinInput.Group maxLength={6} containerClassName="max-sm:h-max">
                                        <PinInput.Slot
                                            index={0}
                                            className="text-ellipsis max-[400px]:size-max max-sm:px-3.5 max-sm:py-2.5 max-sm:text-display-xs max-sm:font-medium"
                                        />
                                        <PinInput.Slot
                                            index={1}
                                            className="text-ellipsis max-[400px]:size-max max-sm:px-3.5 max-sm:py-2.5 max-sm:text-display-xs max-sm:font-medium"
                                        />
                                        <PinInput.Slot
                                            index={2}
                                            className="text-ellipsis max-[400px]:size-max max-sm:px-3.5 max-sm:py-2.5 max-sm:text-display-xs max-sm:font-medium"
                                        />
                                        <PinInput.Separator className="text-center text-ellipsis max-[400px]:size-max max-sm:py-2.5 max-sm:text-display-xs max-sm:font-medium" />
                                        <PinInput.Slot
                                            index={3}
                                            className="text-ellipsis max-[400px]:size-max max-sm:px-3.5 max-sm:py-2.5 max-sm:text-display-xs max-sm:font-medium"
                                        />
                                        <PinInput.Slot
                                            index={4}
                                            className="text-ellipsis max-[400px]:size-max max-sm:px-3.5 max-sm:py-2.5 max-sm:text-display-xs max-sm:font-medium"
                                        />
                                        <PinInput.Slot
                                            index={5}
                                            className="text-ellipsis max-[400px]:size-max max-sm:px-3.5 max-sm:py-2.5 max-sm:text-display-xs max-sm:font-medium"
                                        />
                                    </PinInput.Group>
                                    <PinInput.Description>
                                        Didn't get a code?&nbsp;
                                        <button className="cursor-pointer rounded-xs underline underline-offset-3 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                            Click to resend
                                        </button>
                                        .
                                    </PinInput.Description>
                                </PinInput>
                            </div>
                        </div>
                        <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                            <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                Confirm
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
