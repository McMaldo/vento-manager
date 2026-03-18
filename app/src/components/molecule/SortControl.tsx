import React from "react";
import FaIcon from "../atom/FaIcon";
import type { SortConfig, SortField } from "../../types/sort";

const SORT_OPTIONS: { field: SortField; label: string }[] = [
  { field: "title", label: "Nombre" },
  { field: "description", label: "Descripción" },
  { field: "progress", label: "Progreso" },
  { field: "store", label: "Almacén" },
];

const SortControl: React.FC<{
  sortConfig: SortConfig | null;
  onSort: (field: SortField) => void;
  onClear: () => void;
}> = ({ sortConfig, onSort, onClear }) => {
  return (
    <div className="h-11 flex items-center gap-1 bg-base border border-btn-border rounded-lg px-2 py-1">
      <span className="text-xs text-font-light px-1">Ordenar:</span>

      {SORT_OPTIONS.map(({ field, label }) => {
        const isActive = sortConfig?.field === field;
        const isAsc = sortConfig?.order === "asc";

        return (
          <button
            key={field}
            onClick={() => onSort(field)}
            className={`h-full flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-colors ${
              isActive
                ? "bg-main text-mantle font-semibold"
                : "text-font-light hover:bg-mantle"
            }`}
          >
            {label}
            {isActive && (
              <div
                className="transition-transform"
                style={{ rotate: isAsc ? "90deg" : "-90deg" }}
              >
                <FaIcon name="arrow-right" size="size-3" invert />
              </div>
            )}
          </button>
        );
      })}

      {sortConfig && (
        <button
          onClick={onClear}
          className="ml-1 px-2 py-1 rounded-md text-xs text-font-light hover:bg-mantle hover:text-red-400 transition-colors"
        >
          <FaIcon name="xmark" size="size-3" />
        </button>
      )}
    </div>
  );
};

export default SortControl;
