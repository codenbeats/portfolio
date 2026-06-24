"use client";

import { useEffect, useState } from "react";
import { Link01, MarkerPin02, Plus } from "@untitledui/icons";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { AvatarOnlineIndicator } from "@/components/base/avatar/base-components/avatar-online-indicator";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";

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

export const UserProfileMenu = () => {
    const [isOpen, setIsOpen] = useModalState();

    return (
        <SlideoutMenu isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <SlideoutMenu.Header onClose={() => setIsOpen(false)} className="flex w-full flex-col gap-6 p-0!">
                <span className="relative flex flex-col items-start gap-4 px-4 pt-6 md:px-6">
                    <h1 className="text-md font-semibold text-primary md:text-lg">Freelancer</h1>
                </span>
                <div className="flex size-full flex-col">
                    <div className="px-2">
                        <div className="h-30 w-full rounded-xl bg-linear-to-tr from-[#A6C0FE] to-[#FFEAF6]" />
                    </div>
                    <div className="-mt-12 flex flex-col gap-4 px-4 md:px-6">
                        <section className="flex flex-col gap-4">
                            <AvatarProfilePhoto size="md" verified src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" />
                            <section className="flex flex-col">
                                <p className="flex items-center gap-2 text-lg font-semibold text-primary">
                                    Olivia Rhye
                                    <AvatarOnlineIndicator size="sm" status="online" className="relative" />
                                </p>
                                <p className="text-md text-tertiary">olivia@untitledui.com</p>
                            </section>
                        </section>
                        <section className="flex flex-wrap gap-1 md:gap-1.5">
                            <Badge size="sm" type="modern" color="gray">
                                Design
                            </Badge>
                            <Badge size="sm" type="modern" color="gray">
                                Product
                            </Badge>
                            <Badge size="sm" type="modern" color="gray">
                                UI Design
                            </Badge>
                            <Tooltip title="Add more">
                                <TooltipTrigger className="cursor-pointer rounded-md outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2">
                                    <Badge size="sm" type="modern" color="gray" className="p-[5px]">
                                        <Plus className="size-3 stroke-3 text-utility-neutral-500" />
                                    </Badge>
                                </TooltipTrigger>
                            </Tooltip>
                        </section>
                        <section className="flex gap-3">
                            <Button size="sm" color="secondary">
                                Add to project
                            </Button>
                            <Button size="sm">New project</Button>
                        </section>
                    </div>
                </div>
            </SlideoutMenu.Header>
            <SlideoutMenu.Content className="pb-6">
                <section className="flex flex-col">
                    <p className="text-sm font-semibold text-primary">About</p>
                    <p className="mt-1 text-sm text-tertiary">
                        I'm a Designer based in Melbourne. I co-founded{" "}
                        <a
                            href="#"
                            className="rounded-xs underline underline-offset-3 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            Layers Studio™
                        </a>{" "}
                        where we help early stage founders and startups take their product from 0→1.
                    </p>
                    <ul className="mt-4 flex flex-col gap-2">
                        <li className="flex gap-2 text-sm text-tertiary">
                            <MarkerPin02 className="size-5 text-fg-quaternary" />
                            Melbourne, Australia
                        </li>
                        <li className="flex gap-2 text-sm text-tertiary">
                            <Link01 className="size-5 text-fg-quaternary" />
                            layers.studio
                        </li>
                    </ul>
                </section>
                <section className="flex flex-col gap-4">
                    <p className="text-sm font-semibold text-primary">Work experience</p>
                    <span className="flex w-full flex-row items-start gap-3">
                        <Avatar border src="https://www.untitledui.com/logos/images/Layers.jpg" size="lg" />
                        <span className="flex flex-col gap-2">
                            <span className="flex flex-col">
                                <p className="text-sm font-semibold text-secondary">Founder</p>
                                <p className="text-sm text-tertiary">Layers Studio™</p>
                            </span>
                            <p className="text-sm text-tertiary">May 2020 – Present</p>
                        </span>
                    </span>
                    <span className="flex w-full flex-row items-start gap-3">
                        <Avatar border src="https://www.untitledui.com/logos/images/Sisyphus.jpg" size="lg" />
                        <span className="flex flex-col gap-2">
                            <span className="flex flex-col">
                                <p className="text-sm font-semibold text-secondary">UX Designer</p>
                                <p className="text-sm text-tertiary">Sisyphus</p>
                            </span>
                            <p className="text-sm text-tertiary">Jan 2018 – May 2020</p>
                        </span>
                    </span>
                    <span className="flex w-full flex-row items-start gap-3">
                        <Avatar border src="https://www.untitledui.com/logos/images/Catalog.jpg" size="lg" />
                        <span className="flex flex-col gap-2">
                            <span className="flex flex-col">
                                <p className="text-sm font-semibold text-secondary">Visual Designer</p>
                                <p className="text-sm text-tertiary">Catalog</p>
                            </span>
                            <p className="text-sm text-tertiary">Mar 2017 – Jan 2018</p>
                        </span>
                    </span>
                </section>
            </SlideoutMenu.Content>
        </SlideoutMenu>
    );
};
