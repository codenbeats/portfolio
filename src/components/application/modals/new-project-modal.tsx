"use client";

import { useEffect, useState } from "react";
import { CalendarCheck02, Plus, User01 } from "@untitledui/icons";
import { Heading as AriaHeading } from "react-aria-components";
import { FileUpload as FileUploadComponent } from "@/components/application/file-upload/file-upload-base";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { BadgeWithIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { TextArea } from "@/components/base/textarea/textarea";

type UploadedFile = { name: string; size: number; progress: number; type?: string; failed?: boolean };

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

export const NewProjectModal = () => {
    const [isOpen, setIsOpen] = useModalState();

    const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
    const [uploadedFilePreview, setUploadedFilePreview] = useState<string | null>(null);

    useEffect(() => {
        // Clean up the preview URL when the component unmounts.
        return () => {
            uploadedFilePreview && URL.revokeObjectURL(uploadedFilePreview);
        };
    }, [uploadedFilePreview]);

    const uploadFile = (file: File, onProgress: (progress: number) => void) => {
        // Replace this with your own upload logic
        let progress = 0;

        const interval = setInterval(() => {
            onProgress(++progress);
            if (progress === 100) {
                clearInterval(interval);
            }
        }, 100);
    };

    const handleDropFiles = (files: FileList) => {
        const newFiles = Array.from(files);
        const fileToUpload = newFiles[0];
        const filePreview = URL.createObjectURL(fileToUpload);
        const uploadedFileObject = { name: fileToUpload.name, type: fileToUpload.type, progress: 0, failed: false, size: fileToUpload.size };

        setUploadedFilePreview(filePreview);
        setUploadedFile(uploadedFileObject);

        uploadFile(fileToUpload, (progress) => {
            setUploadedFile((prev) => (prev ? { ...prev, progress } : uploadedFileObject));
        });
    };

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-120">
                        <CloseButton onClick={() => setIsOpen(false)} theme="light" size="sm" className="absolute top-3 right-3 sm:top-4 sm:right-4" />
                        <div className="flex flex-col gap-0.5 px-4 pt-5 pb-5 sm:px-6 sm:pt-6">
                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                Create a new project
                            </AriaHeading>
                            <p className="text-sm text-tertiary">Upload an image to create a new project.</p>
                        </div>

                        {uploadedFile && (
                            <div className="px-4 sm:px-6">
                                <div className="relative aspect-[1.33] w-full overflow-hidden rounded-xl">
                                    {uploadedFilePreview && (
                                        <>
                                            <img alt={uploadedFile.name} src={uploadedFilePreview} className="size-full object-cover" />
                                            <img
                                                alt="Uploaded file preview"
                                                aria-hidden="true"
                                                style={{
                                                    clipPath: `inset(0 0 0 ${uploadedFile.progress}%)`,
                                                    opacity: uploadedFile.progress < 100 ? 1 : 0,
                                                }}
                                                src={uploadedFilePreview}
                                                className="absolute inset-0 size-full object-cover blur-xs transition-all duration-200 ease-linear"
                                            />
                                            <div
                                                aria-hidden="true"
                                                style={{
                                                    clipPath: `inset(0 0 0 ${uploadedFile.progress}%)`,
                                                    opacity: uploadedFile.progress < 100 ? 1 : 0,
                                                }}
                                                className="absolute inset-0 bg-white/70 transition-all duration-200 ease-linear"
                                            />
                                        </>
                                    )}
                                    <p
                                        style={{
                                            opacity: uploadedFile.progress < 100 ? 1 : 0,
                                        }}
                                        className="absolute right-4 bottom-3 text-display-2xl font-semibold text-fg-quaternary text-shadow-[0px_0px_48px_rgba(0,0,0,.1)]"
                                    >
                                        {uploadedFile.progress}%
                                    </p>
                                    <div className="absolute inset-0 rounded-xl border border-secondary_alt"></div>
                                </div>
                            </div>
                        )}

                        {!uploadedFile && (
                            <FileUploadComponent.Root className="mt-4 flex flex-col gap-4 px-4 sm:px-6">
                                <FileUploadComponent.DropZone allowsMultiple={false} accept="image/*" onDropFiles={handleDropFiles} />
                            </FileUploadComponent.Root>
                        )}

                        <div className="mt-4 flex flex-col gap-4 px-4 sm:px-6 md:mt-5">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Input label="Project name" size="md" defaultValue="About us" />
                                <Select
                                    label="Team"
                                    size="md"
                                    icon={User01}
                                    defaultValue="watchtower"
                                    items={[
                                        {
                                            id: "ephemeral",
                                            label: "Ephemeral",
                                            avatarUrl: "https://www.untitledui.com/logos/images/Ephemeral.jpg",
                                        },
                                        {
                                            id: "watchtower",
                                            label: "Watchtower",
                                            avatarUrl: "https://www.untitledui.com/logos/images/Watchtower.jpg",
                                        },
                                        {
                                            id: "leapyear",
                                            label: "Leapyear",
                                            avatarUrl: "https://www.untitledui.com/logos/images/Leapyear.jpg",
                                        },
                                    ]}
                                >
                                    {(item) => (
                                        <Select.Item id={item.id} avatarUrl={item.avatarUrl} supportingText={item.supportingText}>
                                            {item.label}
                                        </Select.Item>
                                    )}
                                </Select>
                            </div>

                            <div className="flex flex-col gap-3">
                                <TextArea label="Add tags (optional)" placeholder="Type to search..." textAreaClassName="h-25.5" />
                                <div className="flex flex-wrap gap-2">
                                    <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                        <BadgeWithIcon color="gray" type="modern" size="md" iconLeading={Plus}>
                                            User interface
                                        </BadgeWithIcon>
                                    </button>
                                    <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                        <BadgeWithIcon color="gray" type="modern" size="md" iconLeading={Plus}>
                                            Figma
                                        </BadgeWithIcon>
                                    </button>
                                    <button className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                        <BadgeWithIcon color="gray" type="modern" size="md" iconLeading={Plus}>
                                            UI Design
                                        </BadgeWithIcon>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:flex-row sm:items-center sm:px-6 sm:pt-8 sm:pb-6">
                            <Button color="link-gray" size="md" className="mr-auto max-md:hidden">
                                Save as draft
                            </Button>
                            <Button color="secondary" size="md" iconLeading={CalendarCheck02} onClick={() => setIsOpen(false)}>
                                Schedule
                            </Button>
                            <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                Create project
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
