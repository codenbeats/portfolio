"use client";

import { useEffect, useState } from "react";
import { Building05, ImagePlus, UploadCloud02 } from "@untitledui/icons";
import { Heading as AriaHeading } from "react-aria-components";
import { FileUploadDropZone } from "@/components/application/file-upload/file-upload-base";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { InputBase, TextField } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { Label } from "@/components/base/input/label";
import { TextArea } from "@/components/base/textarea/textarea";
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

export const Form02Modal = () => {
    const [isOpen, setIsOpen] = useModalState();
    const [uploadedAvatar, setUploadedAvatar] = useState<string | undefined>();

    const handleAvatarUpload = (file: File) => {
        console.log("File uploaded:", file);
        setUploadedAvatar(URL.createObjectURL(file));
    };

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-172">
                        <CloseButton onClick={() => setIsOpen(false)} theme="light" size="sm" className="absolute top-3 right-3 sm:top-4 sm:right-4" />
                        <div className="flex gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                            <FeaturedIcon color="gray" size="md" theme="modern" icon={Building05} className="max-sm:hidden" />

                            <div className="z-10 flex flex-col gap-0.5">
                                <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                    Add your company
                                </AriaHeading>
                                <p className="text-sm text-tertiary">
                                    Create your company profile for free <span className="max-md:hidden">in less than 5 minutes.</span>
                                </p>
                            </div>
                        </div>
                        <div className="h-5 w-full" />
                        <div className="w-full border-t border-secondary" />
                        <div className="flex flex-col justify-start gap-4 px-4 pt-5 sm:px-6">
                            <section className="flex items-start gap-8">
                                <Label className="w-40 max-sm:hidden">Company name</Label>

                                <TextField name="company" className="flex-1">
                                    <Label className="sm:hidden">Company name</Label>
                                    <InputBase size="md" placeholder="e.g. Linear" />
                                </TextField>
                            </section>
                            <section className="flex items-start gap-8">
                                <Label className="w-40 max-sm:hidden">Website URL</Label>
                                <TextField name="website" className="flex-1">
                                    <Label className="sm:hidden">Website URL</Label>
                                    <InputBase size="md" placeholder="www.example.com" />
                                </TextField>
                            </section>
                            <div className="w-full border-t border-secondary max-sm:hidden" />
                            <section className="flex items-start gap-8">
                                <Label className="w-40 max-sm:hidden">Profile image</Label>
                                <section className="flex w-full flex-1 items-center gap-5 sm:items-start">
                                    <AvatarProfilePhoto border size="sm" placeholderIcon={ImagePlus} src={uploadedAvatar} />
                                    <span className="w-full max-sm:hidden">
                                        <FileUploadDropZone className="**:data-featured-icon:hidden" onDropFiles={(files) => handleAvatarUpload(files[0])} />
                                    </span>
                                    <Button size="md" color="secondary" iconLeading={UploadCloud02} className="sm:hidden">
                                        Upload photo
                                    </Button>
                                </section>
                            </section>
                            <div className="w-full border-t border-secondary max-sm:hidden" />
                            <section className="flex items-start gap-8">
                                <Label className="w-40 max-sm:hidden">Username</Label>

                                <section className="flex flex-1">
                                    <InputGroup
                                        isRequired
                                        className="sm:[&_[data-label]]:hidden"
                                        label="Username"
                                        name="username"
                                        size="md"
                                        defaultValue="untitled"
                                        leadingAddon={<InputGroup.Prefix>untitledui.com/</InputGroup.Prefix>}
                                    >
                                        <InputBase placeholder="example" />
                                    </InputGroup>
                                </section>
                            </section>
                            <section className="flex flex-1 items-start gap-8 max-sm:hidden">
                                <Label className="w-40 max-sm:hidden">Keywords</Label>
                                <section className="flex flex-1">
                                    <TextArea
                                        aria-label="Keywords"
                                        textAreaClassName="h-20"
                                        placeholder="Add 1-10 keywords that help users find your company. For example, B2B, SaaS, marketplace, design..."
                                    />
                                </section>
                            </section>
                            <section className="flex items-start gap-8 max-sm:hidden">
                                <Label className="w-40 max-sm:hidden">Description</Label>
                                <section className="flex flex-1">
                                    <TextArea aria-label="Description" textAreaClassName="h-20" placeholder="Write a few sentences about the company..." />
                                </section>
                            </section>
                        </div>
                        <div className="z-10 flex flex-col pt-6 pb-4 sm:pt-8 sm:pb-6">
                            <div className="w-full border-t border-secondary" />

                            <div className="h-4 w-full sm:h-6" />
                            <div className="flex flex-1 flex-col-reverse gap-3 px-4 sm:grid sm:grid-cols-2 sm:px-6">
                                <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                                <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                    Add company
                                </Button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
