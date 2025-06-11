import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// hooks/useFilters.tsx
import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
export function useFilters({ data, configs, filterFunctions, }) {
    const initialFilters = configs.reduce((acc, config) => {
        acc[config.key] = config.defaultValue || (config.type === 'select' ? 'all' : '');
        return acc;
    }, {});
    const [filters, setFilters] = useState(initialFilters);
    const setFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };
    const clearFilters = () => {
        setFilters(initialFilters);
    };
    const { filteredData, counts } = useMemo(() => {
        const filtered = data.filter(item => {
            return Object.entries(filters).every(([key, value]) => {
                if (!value || value === 'all' || value === '')
                    return true;
                const filterFn = filterFunctions[key];
                return filterFn ? filterFn(item, value) : true;
            });
        });
        // Calculate counts for tab filters
        const tabCounts = configs
            .filter(config => config.type === 'tabs' && config.options)
            .reduce((acc, config) => {
            config.options.forEach(option => {
                if (option.value === 'all') {
                    acc[option.value] = data.length;
                }
                else {
                    const filterFn = filterFunctions[config.key];
                    acc[option.value] = filterFn
                        ? data.filter(item => filterFn(item, option.value)).length
                        : 0;
                }
            });
            return acc;
        }, {});
        return { filteredData: filtered, counts: tabCounts };
    }, [data, filters, filterFunctions, configs]);
    const FilterComponent = () => (_jsx("div", { className: "card bg-base-100 shadow-sm border border-base-300 p-6 mb-8", children: _jsxs("div", { className: "flex flex-wrap gap-4 ", children: [configs.map(config => {
                    if (config.type === 'text') {
                        return (_jsx("div", { className: "flex-1 min-w-64", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/60" }), _jsx("input", { type: "text", placeholder: config.placeholder || `Szukaj ${config.label.toLowerCase()}...`, className: "input input-bordered w-full pl-10 focus:input-primary", value: filters[config.key], onChange: (e) => setFilter(config.key, e.target.value) })] }) }, config.key));
                    }
                    if (config.type === 'select') {
                        return (_jsx("select", { className: "select select-bordered focus:select-primary", value: filters[config.key], onChange: (e) => setFilter(config.key, e.target.value), children: config.options?.map(option => (_jsx("option", { value: option.value, children: option.label }, option.value))) }, config.key));
                    }
                    if (config.type === 'tabs') {
                        return (_jsx("div", { className: "tabs tabs-boxed bg-base-200", children: config.options?.map(option => (_jsxs("button", { onClick: () => setFilter(config.key, option.value), className: `tab ${filters[config.key] === option.value
                                    ? "tab-active"
                                    : ""}`, children: [option.label, " (", counts[option.value] || 0, ")"] }, option.value))) }, config.key));
                    }
                    return null;
                }), Object.values(filters).some(value => value && value !== 'all') && (_jsx("button", { onClick: clearFilters, className: "btn btn-outline btn-sm", children: "Wyczy\u015B\u0107 filtry" }))] }) }));
    return {
        filteredData,
        filters,
        setFilter,
        clearFilters,
        FilterComponent,
        counts,
    };
}
