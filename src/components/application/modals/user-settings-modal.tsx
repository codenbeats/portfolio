"use client";

import { useEffect, useState } from "react";
import { Archive, CheckCircle, Edit01, Mail01, Save01 } from "@untitledui/icons";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { VerifiedTick } from "@/components/base/avatar/base-components";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Input, InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { Select } from "@/components/base/select/select";
import { countriesOptions } from "@/utils/countries";

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

const Divider = () => (
    <svg className="h-[2.5px] w-full max-md:hidden">
        <line
            x1="1.2"
            y1="1.2"
            x2="100%"
            y2="1.2"
            className="stroke-border-primary"
            stroke="black"
            strokeWidth="2.4"
            strokeDasharray="0,6"
            strokeLinecap="round"
        />
    </svg>
);

export const UserSettingsModal = () => {
    const [isOpen, setIsOpen] = useModalState();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsOpen(false);
    };

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <Modal>
                <Dialog aria-label="User settings">
                    <div className="relative w-full overflow-hidden rounded-[20px] bg-primary shadow-xl sm:max-w-160">
                        <CloseButton onClick={() => setIsOpen(false)} theme="dark" size="sm" className="absolute top-3 right-3 sm:top-4 sm:right-4 md:hidden" />
                        <CloseButton
                            onClick={() => setIsOpen(false)}
                            theme="dark"
                            size="sm"
                            className="absolute top-3 right-3 max-md:hidden sm:top-4 sm:right-4"
                        />

                        <div className="px-2 pt-2">
                            <img
                                aria-hidden="true"
                                src="https://www.untitledui.com/application/clouds.webp"
                                className="h-26 w-full rounded-xl object-cover md:h-32"
                                alt="Clouds"
                            />
                        </div>

                        <div className="relative -mt-12 flex flex-col gap-3 px-4 pb-6 md:gap-4 md:px-6">
                            <AvatarProfilePhoto
                                size="sm"
                                alt="Sienna Hewitt"
                                src="https://www.untitledui.com/images/avatars/transparent/sienna-hewitt?bg=%23E9DCBB"
                                className="md:hidden"
                            />
                            <AvatarProfilePhoto
                                size="md"
                                alt="Sienna Hewitt"
                                src="https://www.untitledui.com/images/avatars/transparent/sienna-hewitt?bg=%23E9DCBB"
                                className="max-md:hidden"
                            />

                            <div className="absolute top-14 right-4 flex gap-0.5 md:top-15 md:right-6">
                                <ButtonUtility tooltip="Archive" icon={Archive} size="xs" color="tertiary" />
                                <ButtonUtility tooltip="Edit" icon={Edit01} size="xs" color="tertiary" />
                            </div>

                            <div className="flex flex-col items-start gap-4 md:flex-row md:gap-8">
                                <div className="max-w-50 min-w-0 flex-1">
                                    <div className="flex items-center gap-1.5">
                                        <p className="truncate text-lg font-semibold text-primary">Sienna Hewitt</p>
                                        <VerifiedTick size="lg" />
                                    </div>
                                    <p className="truncate text-sm text-tertiary">@siennahewitt</p>
                                </div>
                                <dl className="flex items-center gap-4">
                                    <div className="flex flex-col gap-0.5">
                                        <dt className="text-xs font-medium text-quaternary">Followers</dt>
                                        <dd className="text-md font-semibold text-primary">32,086</dd>
                                    </div>

                                    <hr className="h-11 w-px rounded-full border-none bg-border-primary" />

                                    <div className="flex flex-col gap-0.5">
                                        <dt className="text-xs font-medium text-quaternary">Following</dt>
                                        <dd className="text-md font-semibold text-primary">4,698</dd>
                                    </div>

                                    <hr className="h-11 w-px rounded-full border-none bg-border-primary" />

                                    <div className="flex flex-col gap-0.5">
                                        <dt className="text-xs font-medium text-quaternary">Posts</dt>
                                        <dd className="text-md font-semibold text-primary">128</dd>
                                    </div>

                                    <hr className="h-11 w-px rounded-full border-none bg-border-primary" />

                                    <div className="flex flex-col gap-0.5">
                                        <dt className="text-xs font-medium text-quaternary">Collections</dt>
                                        <dd className="text-md font-semibold text-primary">24</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        <form id="user-settings-form" onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 md:px-6">
                            <Divider />

                            <div className="flex flex-col gap-4 md:flex-row md:gap-8">
                                <label htmlFor="firstname" className="w-full max-w-50 text-sm font-medium text-secondary max-md:hidden">
                                    Name
                                </label>
                                <div className="flex items-end gap-4">
                                    <Input
                                        isRequired
                                        id="firstname"
                                        size="md"
                                        name="firstname"
                                        label="Name"
                                        className="md:label:hidden"
                                        defaultValue="Sienna"
                                    />
                                    <Input
                                        isRequired
                                        id="lastname"
                                        size="md"
                                        name="lastname"
                                        label="Last name"
                                        className="label:hidden"
                                        defaultValue="Hewitt"
                                    />
                                </div>
                            </div>

                            <Divider />

                            <div className="flex flex-col gap-8 md:flex-row">
                                <label htmlFor="email" className="w-full max-w-50 text-sm font-medium text-secondary max-md:hidden">
                                    Email
                                </label>
                                <div className="flex flex-1 flex-col gap-2">
                                    <Input
                                        isRequired
                                        id="email"
                                        type="email"
                                        size="md"
                                        name="email"
                                        label="Email"
                                        className="md:label:hidden"
                                        icon={Mail01}
                                        defaultValue="hi@siennahewitt.com"
                                    />

                                    <div className="flex items-center gap-1.5">
                                        <VerifiedTick size="lg" />
                                        <p className="text-xs font-semibold text-utility-blue-600">Verified 2 Jan, 2027</p>
                                    </div>
                                </div>
                            </div>

                            <Divider />

                            <div className="flex flex-col gap-4 md:flex-row md:gap-8">
                                <label htmlFor="bio" className="w-full max-w-50 text-sm font-medium text-secondary max-md:hidden">
                                    Username
                                </label>
                                <div className="relative flex flex-1 items-center">
                                    <InputGroup
                                        isRequired
                                        id="username"
                                        size="md"
                                        name="username"
                                        label="Username"
                                        defaultValue="siennahewitt"
                                        className="md:label:hidden"
                                        leadingAddon={<InputGroup.Prefix>untitledui.com/@</InputGroup.Prefix>}
                                    >
                                        <InputBase />
                                    </InputGroup>
                                    <CheckCircle className="absolute right-3 bottom-3 z-10 size-4 text-fg-success-primary" />
                                </div>
                            </div>

                            <Divider />

                            <div className="flex flex-col gap-4 max-md:hidden md:flex-row md:gap-8">
                                <label htmlFor="bio" className="w-full max-w-50 text-sm font-medium text-secondary max-md:hidden">
                                    Country
                                </label>

                                <Select
                                    isRequired
                                    name="country"
                                    label="Country"
                                    hint="Estimates based on recent IP address."
                                    size="md"
                                    defaultValue="AU"
                                    className="flex-1 md:label:hidden"
                                    items={countriesOptions.map((item) => ({ ...item, supportingText: "UTC/GMT +10" }))}
                                >
                                    {(item) => (
                                        <Select.Item id={item.id} icon={item.icon} supportingText={item.supportingText}>
                                            {item.label}
                                        </Select.Item>
                                    )}
                                </Select>
                            </div>

                            <Divider />
                        </form>

                        <div className="z-10 flex flex-col pt-6 pb-4 sm:pt-8 sm:pb-6">
                            <div className="flex flex-1 flex-col-reverse gap-3 px-4 sm:grid sm:grid-cols-2 sm:px-6">
                                <Button color="secondary" size="md" iconLeading={Save01} onClick={() => setIsOpen(false)}>
                                    Save as draft
                                </Button>
                                <Button type="submit" form="user-settings-form" color="primary" size="md">
                                    Publish changes
                                </Button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
