"use client";

import { Fragment, useCallback, useEffect, useState } from "react";
import { FilterLines, Plus } from "@untitledui/icons";
import type { Selection } from "react-aria-components";
import type { FilterRow } from "@/components/application/filter-bar/filter-dropdown-menu";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { Input } from "@/components/base/input/input";
import { MultiSelect } from "@/components/base/select/multi-select";
import { Select, type SelectItemType } from "@/components/base/select/select";
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

const filterFieldItems = [
    { id: "status", label: "Status" },
    { id: "email", label: "Email" },
    { id: "team", label: "Team" },
    { id: "name", label: "Name" },
];

const operatorItems = [
    { id: "equals", label: "Equals" },
    { id: "contains", label: "Contains" },
    { id: "does-not-contain", label: "Does not contain" },
    { id: "starts-with", label: "Starts with" },
];

const teamItems: SelectItemType[] = [
    { id: "engineering", label: "Engineering", supportingText: "12 users" },
    { id: "design", label: "Design", supportingText: "10 users" },
    { id: "product", label: "Product", supportingText: "6 users" },
    { id: "marketing", label: "Marketing", supportingText: "8 users" },
    { id: "sales", label: "Sales", supportingText: "12 users" },
    { id: "customer-success", label: "Customer Success", supportingText: "4 users" },
    { id: "operations", label: "Operations", supportingText: "2 users" },
    { id: "finance", label: "Finance", supportingText: "2 users" },
];

const DottedDivider = () => (
    <svg height="2" className="w-full shrink-0">
        <line
            x1="0"
            y1="1"
            x2="100%"
            y2="1"
            className="stroke-border-primary"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="0,6"
        />
    </svg>
);

const FilterValueInput = ({ filter, onChange }: { filter: FilterRow; onChange: (patch: Partial<Omit<FilterRow, "id">>) => void }) => {
    if (filter.field === "team") {
        const selectedKeys: Selection = filter.value ? new Set(filter.value.split(",")) : new Set();
        const count = selectedKeys instanceof Set ? selectedKeys.size : 0;

        return (
            <MultiSelect
                className="min-w-0 flex-1"
                size="sm"
                aria-label="Value"
                placeholder="Select teams"
                items={teamItems}
                selectedKeys={selectedKeys}
                onSelectionChange={(keys) => {
                    if (keys === "all") {
                        onChange({ value: teamItems.map((t) => t.id).join(",") });
                    } else {
                        onChange({ value: Array.from(keys).join(",") });
                    }
                }}
                supportingText={count > 0 ? `${teamItems.length} users` : undefined}
                onReset={() => onChange({ value: "" })}
                onSelectAll={() => onChange({ value: teamItems.map((t) => t.id).join(",") })}
            >
                {(item) => (
                    <MultiSelect.Item id={item.id} supportingText={item.supportingText} selectionIndicator="checkbox" selectionIndicatorAlign="left">
                        {item.label}
                    </MultiSelect.Item>
                )}
            </MultiSelect>
        );
    }

    return (
        <Input
            className="min-w-0 flex-1"
            size="sm"
            aria-label="Value"
            placeholder="Enter a value"
            value={filter.value}
            onChange={(value) => onChange({ value })}
        />
    );
};

let nextId = 1;
const createEmptyFilter = (): FilterRow => ({
    id: String(nextId++),
    field: "",
    operator: "equals",
    value: "",
});

export const FiltersAdvancedMenu = ({ defaultFilters }: { defaultFilters?: FilterRow[] }) => {
    const [isOpen, setIsOpen] = useModalState();
    const [filters, setFilters] = useState<FilterRow[]>(defaultFilters ?? []);

    const handleAddFilter = useCallback(() => {
        setFilters((prev) => [...prev, createEmptyFilter()]);
    }, []);

    const handleRemoveFilter = useCallback((id: string) => {
        setFilters((prev) => prev.filter((f) => f.id !== id));
    }, []);

    const handleFilterChange = useCallback((id: string, patch: Partial<Omit<FilterRow, "id">>) => {
        setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
    }, []);

    const handleClearAll = useCallback(() => {
        setFilters([]);
    }, []);

    return (
        <SlideoutMenu isOpen={isOpen} onOpenChange={setIsOpen} isDismissable>
            <SlideoutMenu.Header onClose={() => setIsOpen(false)} className="relative flex w-full items-start gap-3 px-4 pt-6 md:px-6">
                <FeaturedIcon size="md" color="gray" theme="modern" icon={FilterLines} />
                <section className="flex flex-col gap-0.5">
                    <h1 className="text-md font-semibold text-primary md:text-lg">Filters</h1>
                    <p className="text-sm text-tertiary">Add filters to narrow down results.</p>
                </section>
            </SlideoutMenu.Header>
            <SlideoutMenu.Content>
                <DottedDivider />

                {filters.length === 0 ? (
                    <div className="flex flex-col gap-4">
                        <div className="flex max-w-[352px] flex-col gap-1 md:gap-0.5">
                            <p className="text-sm font-semibold text-primary md:text-md">No filters applied</p>
                            <p className="text-sm text-tertiary">Add filters to narrow down results.</p>
                        </div>
                        <div>
                            <Button size="sm" color="secondary" iconLeading={Plus} onClick={handleAddFilter}>
                                Add filter
                            </Button>
                        </div>
                    </div>
                ) : (
                    <>
                        {filters.map((filter, index) => (
                            <Fragment key={filter.id}>
                                {index > 0 && <DottedDivider />}
                                <div className="flex flex-col gap-3">
                                    <div className="flex gap-3">
                                        <Select
                                            className="max-w-40 flex-1"
                                            size="sm"
                                            aria-label="Filter field"
                                            placeholder="Select filter"
                                            items={filterFieldItems}
                                            value={filter.field || null}
                                            onChange={(key) => handleFilterChange(filter.id, { field: String(key), value: "" })}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                        <Select
                                            className="max-w-40 flex-1"
                                            size="sm"
                                            aria-label="Operator"
                                            placeholder="Operator"
                                            items={operatorItems}
                                            value={filter.operator || null}
                                            onChange={(key) => handleFilterChange(filter.id, { operator: String(key) })}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                    </div>
                                    <div className="flex items-start gap-1">
                                        <FilterValueInput filter={filter} onChange={(patch) => handleFilterChange(filter.id, patch)} />
                                        <CloseButton label="Remove filter" size="sm" onPress={() => handleRemoveFilter(filter.id)} />
                                    </div>
                                </div>
                            </Fragment>
                        ))}
                        <DottedDivider />
                        <div>
                            <Button size="sm" color="secondary" iconLeading={Plus} onClick={handleAddFilter}>
                                Add filter
                            </Button>
                        </div>
                    </>
                )}
            </SlideoutMenu.Content>
            <SlideoutMenu.Footer className="flex w-full items-center justify-end gap-3">
                <Button size="sm" color="secondary" onClick={handleClearAll}>
                    Clear all
                </Button>
                <Button size="sm" onClick={() => setIsOpen(false)}>
                    Apply filter
                </Button>
            </SlideoutMenu.Footer>
        </SlideoutMenu>
    );
};
