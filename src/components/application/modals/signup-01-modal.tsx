"use client";

import { useEffect, useState } from "react";
import { Heading as AriaHeading } from "react-aria-components";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { SocialButton } from "@/components/base/buttons/social-button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { UntitledLogoMinimal } from "@/components/foundations/logo/untitledui-logo-minimal";

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

export const Signup01Modal = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                        <CloseButton onClick={() => setIsOpen(false)} theme="light" size="sm" className="absolute top-3 right-3 sm:top-4 sm:right-4" />
                        <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                            <UntitledLogoMinimal className="size-8" />
                            <div className="flex flex-col gap-0.5">
                                <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                    Sign up
                                </AriaHeading>
                                <p className="text-sm text-tertiary">Start your 30-day free trial.</p>
                            </div>
                        </div>
                        <div className="h-5 w-full" />
                        <Form
                            id="signup-form-modal"
                            className="flex flex-col gap-4 px-4 sm:px-6"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const data = Object.fromEntries(new FormData(e.currentTarget));
                                console.log("Form data:", data);
                                setIsOpen(false);
                            }}
                        >
                            <Input isRequired hideRequiredIndicator label="Name" name="name" placeholder="Enter your name" size="md" autoComplete="name" />
                            <Input isRequired hideRequiredIndicator label="Email" name="email" placeholder="Enter your email" size="lg" autoComplete="email" />
                            <Input
                                isRequired
                                hideRequiredIndicator
                                label="Password"
                                type="password"
                                name="password"
                                autoComplete="new-password"
                                placeholder="Create a password"
                                hint="Must be at least 8 characters."
                                size="lg"
                                minLength={8}
                            />
                        </Form>
                        <div className="flex flex-1 flex-col gap-3 p-4 pt-6 *:grow sm:px-6 sm:pt-8 sm:pb-6">
                            <Button type="submit" form="signup-form-modal" color="primary" size="md">
                                Sign in
                            </Button>

                            <SocialButton social="google" theme="brand">
                                Sign in with Google
                            </SocialButton>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
