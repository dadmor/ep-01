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
    <div className="bg-base-100 rounded-xl border border-gray-200/60 shadow-sm p-6 mb-8">
      <div className="space-y-4">
        {configs.map(config => {
          if (config.type === 'text') {
            return (
              <div key={config.key} className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={config.placeholder || `Szukaj ${config.label.toLowerCase()}...`}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <div key={config.key} className="flex gap-2">
                {config.options?.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setFilter(config.key, option.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filters[config.key] === option.value
                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                        : "text-gray-600 hover:bg-gray-50"
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
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
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