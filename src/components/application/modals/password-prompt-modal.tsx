"use client";

import { useEffect, useState } from "react";
import { Lock03, Mail01, Shield01 } from "@untitledui/icons";
import { Heading as AriaHeading } from "react-aria-components";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
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

export const PasswordPromptModal = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                        <CloseButton onClick={() => setIsOpen(false)} theme="light" size="sm" className="absolute top-3 right-3 sm:top-4 sm:right-4" />
                        <div className="flex flex-col items-center justify-center gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                            <div className="relative size-max">
                                <FeaturedIcon size="md" color="gray" theme="modern" icon={Shield01} />
                            </div>
                            <div className="z-10 flex flex-col items-center justify-center gap-0.5">
                                <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                    Please enter your password
                                </AriaHeading>
                                <p className="text-sm text-tertiary">Enter your password to make this change.</p>
                            </div>
                        </div>
                        <div className="h-5 w-full" />
                        <Form
                            id="password-prompt-form-modal"
                            className="z-10 flex flex-col gap-4 px-4 sm:px-6"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const data = Object.fromEntries(new FormData(e.currentTarget));
                                console.log("Form data:", data);
                                setIsOpen(false);
                            }}
                        >
                            <Input
                                isRequired
                                hideRequiredIndicator
                                icon={Mail01}
                                label="Email or username"
                                type="email"
                                name="email"
                                placeholder="Email or username"
                                autoComplete="email"
                                size="lg"
                                defaultValue="olivia@untitledui.com"
                            />
                            <Input
                                isRequired
                                hideRequiredIndicator
                                icon={Lock03}
                                label="Password"
                                type="password"
                                name="password"
                                autoComplete="current-password"
                                placeholder="••••••••"
                                size="lg"
                                defaultValue="12345678"
                            />
                        </Form>
                        <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                            <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" form="password-prompt-form-modal" color="primary" size="md">
                                Verify
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
