// src/components/student/FilterTabs.tsx
import { Dispatch, SetStateAction } from 'react';

interface FilterTabsProps {
  filter: 'all' | 'earned' | 'available';
  counts: { all: number; earned: number; available: number; };
  setFilter: Dispatch<SetStateAction<'all' | 'earned' | 'available'>>;
}

export function FilterTabs({ filter, counts, setFilter }: FilterTabsProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200/60 shadow-sm p-6 mb-8">
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-blue-100 text-blue-700 border border-blue-200'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Wszystkie ({counts.all})
        </button>
        <button
          onClick={() => setFilter('earned')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'earned'
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Zdobyte ({counts.earned})
        </button>
        <button
          onClick={() => setFilter('available')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'available'
              ? 'bg-amber-100 text-amber-700 border border-amber-200'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Dostępne ({counts.available})
        </button>
      </div>
    </div>
  );
}
