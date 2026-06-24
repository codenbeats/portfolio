"use client";

import { useEffect, useState } from "react";
import { Check, Copy01, UploadCloud02 } from "@untitledui/icons";
import { Heading as AriaHeading } from "react-aria-components";
import { FileUploadDropZone } from "@/components/application/file-upload/file-upload-base";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { TextArea } from "@/components/base/textarea/textarea";
import { useClipboard } from "@/hooks/use-clipboard";

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

export const ProfileSettingsModal = () => {
    const [isOpen, setIsOpen] = useModalState();
    const { copy, copied } = useClipboard();
    const [uploadedAvatar, setUploadedAvatar] = useState<string | undefined>("https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80");

    const handleAvatarUpload = (file: File) => {
        console.log("File uploaded:", file);
        setUploadedAvatar(URL.createObjectURL(file));
    };

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-120">
                        <CloseButton onClick={() => setIsOpen(false)} theme="light" size="sm" className="absolute top-3 right-3 sm:top-4 sm:right-4" />
                        <div className="flex flex-col gap-0.5 px-4 pt-5 sm:px-6 sm:pt-6">
                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                Complete your profile
                            </AriaHeading>
                            <p className="text-sm text-tertiary">Choose a username and write a brief intro.</p>
                        </div>

                        <div className="h-5 w-full" />
                        <Form
                            id="profile-settings-form-modal"
                            className="flex flex-col gap-4 px-4 sm:px-6"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const data = Object.fromEntries(new FormData(e.currentTarget));
                                console.log("Form data:", data);
                                setIsOpen(false);
                            }}
                        >
                            <div className="flex w-full items-center gap-5 md:items-start">
                                <Avatar verified size="2xl" src={uploadedAvatar} />
                                <Button color="secondary" size="md" iconLeading={UploadCloud02} className="md:hidden">
                                    Upload photo
                                </Button>
                                <FileUploadDropZone className="w-full max-md:hidden" onDropFiles={(files) => handleAvatarUpload(files[0])} />
                            </div>
                            <InputGroup
                                isRequired
                                label="Username"
                                name="username"
                                size="md"
                                defaultValue="@oliviarhye"
                                leadingAddon={<InputGroup.Prefix>untitledui.com/</InputGroup.Prefix>}
                            >
                                <InputBase />
                            </InputGroup>
                            <TextArea
                                isRequired
                                label="Introduction"
                                name="intro"
                                placeholder="Write a brief introduction to show on your profile..."
                                textAreaClassName="min-h-31.5 md:min-h-45"
                            />
                            <span className="flex items-center gap-2">
                                <Checkbox
                                    name="consent"
                                    label={
                                        <>
                                            I agree with the&nbsp;
                                            <a
                                                href="#"
                                                className="rounded-xs underline underline-offset-3 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                                            >
                                                terms and conditions
                                            </a>
                                        </>
                                    }
                                />
                            </span>
                        </Form>

                        <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:flex sm:flex-row sm:items-center sm:justify-end sm:px-6 sm:pt-8 sm:pb-6">
                            <Button
                                size="lg"
                                color="link-gray"
                                onClick={() => copy("https://www.untitledui.com/")}
                                iconLeading={copied ? Check : Copy01}
                                className="mr-auto max-md:hidden"
                            >
                                {copied ? "Copied" : "Copy link"}
                            </Button>
                            <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" id="profile-settings-form-modal" color="primary" size="md">
                                Publish profile
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
