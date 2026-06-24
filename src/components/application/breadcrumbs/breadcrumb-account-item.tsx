"use client";

import { useContext } from "react";
import { ChevronRight, ChevronSelectorVertical, SlashDivider } from "@untitledui/icons";
import { Breadcrumb as AriaBreadcrumb, Button as AriaButton, MenuItem as AriaMenuItem } from "react-aria-components";
import { BreadcrumbsContext } from "@/components/application/breadcrumbs/breadcrumbs";
import { Avatar } from "@/components/base/avatar/avatar";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { RadioButtonBase } from "@/components/base/radio-buttons/radio-buttons";
import { cx } from "@/utils/cx";

export interface BreadcrumbAccountItemData {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

interface BreadcrumbAccountItemProps {
    items: BreadcrumbAccountItemData[];
    selectedKey: string;
    onSelectionChange: (key: string) => void;
}

export const BreadcrumbAccountItem = ({ items, selectedKey, onSelectionChange }: BreadcrumbAccountItemProps) => {
    const context = useContext(BreadcrumbsContext);
    const divider = context.divider || "chevron";
    const selectedAccount = items.find((item) => item.id === selectedKey);

    return (
        <AriaBreadcrumb className="flex items-center gap-1.5 md:gap-2">
            {({ isCurrent }) => (
                <>
                    <Dropdown.Root>
                        <AriaButton
                            className={({ isPressed, isFocusVisible }) =>
                                cx(
                                    "flex cursor-pointer items-center gap-1.5 rounded-lg outline-0 outline-offset-2 outline-focus-ring",
                                    (isPressed || isFocusVisible) && "outline-2",
                                )
                            }
                        >
                            <div className="flex rounded-lg bg-primary p-0.5 ring-[0.5px] ring-secondary ring-inset">
                                <Avatar size="xs" src={selectedAccount?.avatar} className="shadow-md" contentClassName="rounded-md before:hidden" />
                            </div>
                            <span className="text-sm font-semibold text-primary">{selectedAccount?.name}</span>

                            <ChevronSelectorVertical className="size-3 shrink-0 stroke-3 text-fg-quaternary" />
                        </AriaButton>

                        <Dropdown.Popover className="w-62" placement="bottom left">
                            <Dropdown.Menu
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={[selectedKey]}
                                onSelectionChange={(keys) => onSelectionChange(Array.from(keys).join())}
                                className="flex flex-col gap-1 px-1.5 py-1.5"
                            >
                                {items.map((account) => (
                                    <AriaMenuItem
                                        id={account.id}
                                        key={account.id}
                                        textValue={account.name}
                                        className={(state) =>
                                            cx(
                                                "relative w-full cursor-pointer rounded-md px-2 py-2 text-left outline-0 outline-offset-2 outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover focus:z-10 focus-visible:outline-2",
                                                state.isSelected && "bg-primary_hover",
                                            )
                                        }
                                    >
                                        {({ isSelected }) => (
                                            <>
                                                <figure className="group flex min-w-0 flex-1 items-center gap-1.5">
                                                    <div className="flex rounded-[10px] bg-primary p-0.5 ring-[0.5px] ring-secondary ring-inset">
                                                        <Avatar
                                                            size="sm"
                                                            src={account.avatar}
                                                            className="shadow-md"
                                                            contentClassName="rounded-lg before:hidden"
                                                        />
                                                    </div>
                                                    <figcaption className="min-w-0 flex-1">
                                                        <p className="text-sm font-semibold text-primary">{account.name}</p>
                                                        <p className="truncate text-sm text-tertiary">{account.email}</p>
                                                    </figcaption>
                                                </figure>
                                                <RadioButtonBase isSelected={isSelected} className="absolute top-2 right-2" />
                                            </>
                                        )}
                                    </AriaMenuItem>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown.Root>

                    {!isCurrent &&
                        (divider === "slash" ? (
                            <SlashDivider className="size-4 shrink-0 stroke-[2.25px] text-utility-neutral-300" />
                        ) : (
                            <ChevronRight className="size-4 shrink-0 stroke-[2.25px] text-utility-neutral-300" />
                        ))}
                </>
            )}
        </AriaBreadcrumb>
    );
};
