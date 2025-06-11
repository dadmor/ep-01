// hooks/useFilters.tsx
import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';

type FilterType = 'text' | 'select' | 'tabs';

interface FilterConfig {
  key: string;
  type: FilterType;
  label: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string; count?: number }>;
  defaultValue?: string;
}

interface UseFiltersProps<T> {
  data: T[];
  configs: FilterConfig[];
  filterFunctions: Record<string, (item: T, value: string) => boolean>;
}

interface UseFiltersReturn<T> {
  filteredData: T[];
  filters: Record<string, string>;
  setFilter: (key: string, value: string) => void;
  clearFilters: () => void;
  FilterComponent: React.FC;
  counts: Record<string, number>;
}

export function useFilters<T>({
  data,
  configs,
  filterFunctions,
}: UseFiltersProps<T>): UseFiltersReturn<T> {
  
  const initialFilters = configs.reduce((acc, config) => {
    acc[config.key] = config.defaultValue || (config.type === 'select' ? 'all' : '');
    return acc;
  }, {} as Record<string, string>);

  const [filters, setFilters] = useState<Record<string, string>>(initialFilters);

  const setFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  const { filteredData, counts } = useMemo(() => {
    const filtered = data.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value || value === 'all' || value === '') return true;
        const filterFn = filterFunctions[key];
        return filterFn ? filterFn(item, value) : true;
      });
    });

    // Calculate counts for tab filters
    const tabCounts = configs
      .filter(config => config.type === 'tabs' && config.options)
      .reduce((acc, config) => {
        config.options!.forEach(option => {
          if (option.value === 'all') {
            acc[option.value] = data.length;
          } else {
            const filterFn = filterFunctions[config.key];
            acc[option.value] = filterFn 
              ? data.filter(item => filterFn(item, option.value)).length 
              : 0;
          }
        });
        return acc;
      }, {} as Record<string, number>);

    return { filteredData: filtered, counts: tabCounts };
  }, [data, filters, filterFunctions, configs]);

  const FilterComponent: React.FC = () => (
    <div className="card bg-base-100 shadow-sm border border-base-300 p-6 mb-8">
      <div className="flex flex-wrap gap-4 ">
        {configs.map(config => {
          if (config.type === 'text') {
            return (
              <div key={config.key} className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/60" />
                  <input
                    type="text"
                    placeholder={config.placeholder || `Szukaj ${config.label.toLowerCase()}...`}
                    className="input input-bordered w-full pl-10 focus:input-primary"
                    value={filters[config.key]}
                    onChange={(e) => setFilter(config.key, e.target.value)}
                  />
                </div>
              </div>
            );
          }

          if (config.type === 'select') {
            return (
              <select
                key={config.key}
                className="select select-bordered focus:select-primary"
                value={filters[config.key]}
                onChange={(e) => setFilter(config.key, e.target.value)}
              >
                {config.options?.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            );
          }

          if (config.type === 'tabs') {
            return (
              <div key={config.key} className="tabs tabs-boxed bg-base-200">
                {config.options?.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setFilter(config.key, option.value)}
                    className={`tab ${
                      filters[config.key] === option.value
                        ? "tab-active"
                        : ""
                    }`}
                  >
                    {option.label} ({counts[option.value] || 0})
                  </button>
                ))}
              </div>
            );
          }

          return null;
        })}

        {Object.values(filters).some(value => value && value !== 'all') && (
          <button
            onClick={clearFilters}
            className="btn btn-outline btn-sm"
          >
            Wyczyść filtry
          </button>
        )}
      </div>
    </div>
  );

  return {
    filteredData,
    filters,
    setFilter,
    clearFilters,
    FilterComponent,
    counts,
  };
}