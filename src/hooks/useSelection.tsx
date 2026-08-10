import { useState } from 'react';

export function useSelection() {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const toggle = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        );
    };

    const clear = () => setSelectedIds([]);

    const toggleAll = (ids: number[], allSelected: boolean) => {
        setSelectedIds((prev) =>
            allSelected
                ? prev.filter((id) => !ids.includes(id))
                : Array.from(new Set([...prev, ...ids]))
        );
    };

    return {
        selectedIds,
        setSelectedIds,
        toggle,
        clear,
        toggleAll,
    };
}