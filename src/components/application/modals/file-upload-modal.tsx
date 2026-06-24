"use client";

import { useEffect, useState } from "react";
import { Heading as AriaHeading } from "react-aria-components";
import { FileUpload as FileUploadComponent } from "@/components/application/file-upload/file-upload-base";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";

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

export const FileUploadModal = () => {
    const [isOpen, setIsOpen] = useModalState();
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
        { name: "Tech design requirements.pdf", type: "pdf", progress: 100, failed: false, size: 210000 },
    ]);

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

        setUploadedFiles(
            newFiles
                .map(
                    (file) =>
                        ({
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            progress: 0,
                        }) as UploadedFile,
                )
                .concat(uploadedFiles),
        );

        newFiles.forEach((file) => {
            uploadFile(file, (progress) => {
                setUploadedFiles((prev) => prev.map((uploadedFile) => (uploadedFile.name === file.name ? { ...uploadedFile, progress } : uploadedFile)));
            });
        });
    };

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog>
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-120">
                        <CloseButton onClick={() => setIsOpen(false)} theme="light" size="sm" className="absolute top-3 right-3 sm:top-4 sm:right-4" />
                        <div className="flex flex-col gap-0.5 px-4 pt-5 sm:px-6 sm:pt-6">
                            <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                Upload and attach files
                            </AriaHeading>
                            <p className="text-sm text-tertiary">Upload and attach files to this project.</p>
                        </div>

                        <div className="h-5 w-full" />
                        <FileUploadComponent.Root className="flex flex-col gap-4 px-4 sm:px-6">
                            <FileUploadComponent.DropZone onDropFiles={handleDropFiles} />
                            <FileUploadComponent.List className="flex flex-col gap-3">
                                {uploadedFiles.map((file) => (
                                    <FileUploadComponent.ListItemProgressBar
                                        key={file.name}
                                        name={file.name}
                                        size={file.size}
                                        progress={file.progress}
                                        type={file.type}
                                        failed={file.failed}
                                    />
                                ))}
                            </FileUploadComponent.List>
                        </FileUploadComponent.Root>

                        <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 sm:grid sm:grid-cols-2 sm:justify-end sm:px-6 sm:pt-8 sm:pb-6">
                            <Button color="secondary" size="md" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button color="primary" size="md" onClick={() => setIsOpen(false)}>
                                Attach files
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
