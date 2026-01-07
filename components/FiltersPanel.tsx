'use client';

import { Category } from '@/types/category';
import { X, Filter } from 'lucide-react';
import { useState } from 'react';

export interface FilterState {
  category?: string;
  zone?: string;
  availability?: 'today' | 'this-week' | 'all';
  minRating?: number;
  verifiedOnly?: boolean;
}

interface FiltersPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categories: Category[];
  zones: string[];
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

export default function FiltersPanel({
  filters,
  onFilterChange,
  categories,
  zones,
  isOpen = true,
  onClose,
  isMobile = false,
}: FiltersPanelProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {};
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== undefined && v !== '' && v !== false);

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Filter size={20} />
          Filtros
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:text-primary-light font-medium"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categoría
        </label>
        <select
          value={localFilters.category || ''}
          onChange={(e) => updateFilter('category', e.target.value || undefined)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:border-primary dark:focus:border-primary-light focus:ring-2 focus:ring-primary/20 outline-none"
        >
          <option value="">Todas</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Zona */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Zona
        </label>
        <select
          value={localFilters.zone || ''}
          onChange={(e) => updateFilter('zone', e.target.value || undefined)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:border-primary dark:focus:border-primary-light focus:ring-2 focus:ring-primary/20 outline-none"
        >
          <option value="">Todas</option>
          {zones.map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
      </div>

      {/* Disponibilidad */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Disponibilidad
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="availability"
              checked={localFilters.availability === 'today'}
              onChange={() => updateFilter('availability', 'today')}
              className="text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Disponible hoy</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="availability"
              checked={localFilters.availability === 'this-week'}
              onChange={() => updateFilter('availability', 'this-week')}
              className="text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Esta semana</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="availability"
              checked={localFilters.availability === 'all' || !localFilters.availability}
              onChange={() => updateFilter('availability', 'all')}
              className="text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Todas</span>
          </label>
        </div>
      </div>

      {/* Calificación mínima */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Calificación mínima: {localFilters.minRating || 'Todas'}
        </label>
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={localFilters.minRating || 0}
          onChange={(e) =>
            updateFilter('minRating', e.target.value ? parseFloat(e.target.value) : undefined)
          }
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0</span>
          <span>5</span>
        </div>
      </div>

      {/* Solo verificados */}
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={localFilters.verifiedOnly || false}
            onChange={(e) => updateFilter('verifiedOnly', e.target.checked || undefined)}
            className="text-primary focus:ring-primary rounded"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Solo verificados</span>
        </label>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
        )}
        <div
          className={`fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-6 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Filtros</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-900 dark:text-gray-100"
                aria-label="Cerrar filtros"
              >
                <X size={20} />
              </button>
            </div>
            {content}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 h-fit sticky top-4">
      {content}
    </div>
  );
}

