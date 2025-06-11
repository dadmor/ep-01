// src/pages/student/filters.FilterTabs.tsx
import { Dispatch, SetStateAction } from "react";

interface FilterTabsProps {
  filter: "all" | "earned" | "available";
  counts: { all: number; earned: number; available: number };
  setFilter: Dispatch<SetStateAction<"all" | "earned" | "available">>;
}

export function FilterTabs({ filter, counts, setFilter }: FilterTabsProps) {
  return (
    <div className="bg-base-100 rounded-xl border border-base-300 shadow-sm p-6 mb-8">
      <div className="flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "all"
              ? "bg-primary text-primary-content border border-primary-focus"
              : "text-base-content/70 hover:bg-base-200"
          }`}
        >
          Wszystkie ({counts.all})
        </button>
        <button
          onClick={() => setFilter("earned")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "earned"
              ? "bg-success text-success-content border border-success-focus"
              : "text-base-content/70 hover:bg-base-200"
          }`}
        >
          Zdobyte ({counts.earned})
        </button>
        <button
          onClick={() => setFilter("available")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "available"
              ? "bg-warning text-warning-content border border-warning-focus"
              : "text-base-content/70 hover:bg-base-200"
          }`}
        >
          Dostępne ({counts.available})
        </button>
      </div>
    </div>
  );
}