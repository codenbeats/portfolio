"use client";

import { ChevronDown } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";

interface ItemProps {
    label: string;
    value: string;
    addon?: string;
}

export type ViewOption = ItemProps;

interface CalendarViewDropdownProps {
    options: ViewOption[];
    value: string;
    onSelectionChange: (key: string) => void;
}

export const CalendarViewDropdown = ({ options, value, onSelectionChange }: CalendarViewDropdownProps) => {
    return (
        <Dropdown.Root>
            <Button color="secondary" size="sm" iconTrailing={ChevronDown} className="*:data-icon:size-4 *:data-icon:stroke-[2.25px]">
                {options.find((option) => option.value === value)?.label}
            </Button>

            <Dropdown.Popover placement="bottom end" className="w-54">
                <Dropdown.Menu
                    items={options}
                    selectedKeys={[value]}
                    disallowEmptySelection
                    selectionMode="single"
                    onSelectionChange={(keys) => {
                        if (keys instanceof Set) {
                            onSelectionChange(keys.values().next().value?.toString() ?? "");
                        }
                    }}
                >
                    {(item) => (
                        <Dropdown.Item key={item.value} id={item.value} value={item} addon={item.addon} selectionIndicator="radio">
                            {item.label}
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown.Root>
    );
};
