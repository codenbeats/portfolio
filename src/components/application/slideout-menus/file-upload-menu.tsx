"use client";

import { useEffect, useState } from "react";
import { FileUpload as FileUploadComponent } from "@/components/application/file-upload/file-upload-base";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
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

export const FileUploadMenu = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <SlideoutMenu isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <SlideoutMenu.Header onClose={() => setIsOpen(false)} className="relative flex w-full flex-col gap-0.5 px-4 pt-6 md:px-6">
                <h1 className="text-md font-semibold text-primary md:text-lg">Upload and attach files</h1>
                <p className="text-sm text-tertiary">Upload and attach files to this project.</p>
            </SlideoutMenu.Header>
            <SlideoutMenu.Content className="px-4 pb-6 md:px-6">
                <FileUploadComponent.Root className="flex flex-col gap-4">
                    <FileUploadComponent.DropZone />
                    <FileUploadComponent.List className="flex flex-col gap-3">
                        <FileUploadComponent.ListItemProgressFill
                            key="tech-design"
                            name="Tech design requirements.pdf"
                            size={204800}
                            progress={100}
                            type="pdf"
                        />
                        <FileUploadComponent.ListItemProgressFill
                            key="dashboard-recording"
                            name="Dashboard recording.mp4"
                            size={16777216}
                            progress={40}
                            type="mp4"
                        />
                        <FileUploadComponent.ListItemProgressFill
                            key="dashboard-prototype"
                            name="Dashboard prototype FINAL.fig"
                            size={4404019}
                            progress={80}
                            type="fig"
                        />
                    </FileUploadComponent.List>
                </FileUploadComponent.Root>
            </SlideoutMenu.Content>
            <SlideoutMenu.Footer className="flex w-full items-center justify-end gap-3">
                <Button size="sm" color="secondary" onClick={() => setIsOpen(false)}>
                    Cancel
                </Button>
                <Button size="sm" onClick={() => setIsOpen(false)}>
                    Attach to project
                </Button>
            </SlideoutMenu.Footer>
        </SlideoutMenu>
    );
};
