'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import SearchBar from '@/components/SearchBar';
import FiltersPanel, { FilterState } from '@/components/FiltersPanel';
import ServiceCard from '@/components/ServiceCard';
import MapMock from '@/components/MapMock';
import EmptyState from '@/components/EmptyState';
import SkeletonLoader from '@/components/SkeletonLoader';
import { providers } from '@/data/providers';
import { categories } from '@/data/categories';
import { Provider } from '@/types/provider';
import { Search, Map, List, Filter, X } from 'lucide-react';

function ExploreContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: searchParams.get('category') || undefined,
    availability: undefined,
    minRating: undefined,
    verifiedOnly: false,
    zone: undefined,
  });
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  // Obtener zonas únicas
  const zones = useMemo(() => {
    const uniqueZones = new Set(providers.map((p) => p.zone));
    return Array.from(uniqueZones).sort();
  }, []);

  // Filtrar proveedores
  const filteredProviders = useMemo(() => {
    let filtered = [...providers];

    // Búsqueda por texto
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.services.some((s) => s.toLowerCase().includes(query))
      );
    }

    // Filtro por categoría
    if (filters.category) {
      filtered = filtered.filter((p) => p.categoryId === filters.category);
    }

    // Filtro por zona
    if (filters.zone) {
      filtered = filtered.filter((p) => p.zone === filters.zone);
    }

    // Filtro por disponibilidad
    if (filters.availability && filters.availability !== 'all') {
      filtered = filtered.filter((p) => p.availability === filters.availability);
    }

    // Filtro por calificación mínima
    if (filters.minRating) {
      filtered = filtered.filter((p) => p.rating >= filters.minRating!);
    }

    // Solo verificados
    if (filters.verifiedOnly) {
      filtered = filtered.filter((p) => p.verified);
    }

    return filtered;
  }, [searchQuery, filters]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <Navigation />

      {/* Header con búsqueda */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20 lg:top-[73px]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <SearchBar
                placeholder="Buscar servicios..."
                onSearch={handleSearch}
                initialValue={searchQuery}
                suggestions={categories.map((c) => c.name)}
              />
            </div>
            {/* Toggle List/Map - Mobile */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setFiltersOpen(true)}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                aria-label="Abrir filtros"
              >
                <Filter size={20} />
              </button>
              <button
                onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                aria-label={viewMode === 'list' ? 'Ver mapa' : 'Ver lista'}
              >
                {viewMode === 'list' ? <Map size={20} /> : <List size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout: Filtros | Lista | Mapa */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="lg:flex lg:gap-6">
          {/* Sidebar Filtros - Desktop (280px) */}
          <aside className="hidden lg:block lg:w-[280px] lg:flex-shrink-0">
            <FiltersPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              categories={categories}
              zones={zones}
              isMobile={false}
            />
          </aside>

          {/* Filtros Mobile */}
          <FiltersPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            categories={categories}
            zones={zones}
            isMobile={true}
            isOpen={filtersOpen}
            onClose={() => setFiltersOpen(false)}
          />

          {/* Contenido Principal: Lista + Mapa */}
          <div className="flex-1 min-w-0">
            <div className="lg:flex lg:gap-6">
              {/* Lista de Resultados - flex-1 */}
              <main className="flex-1 min-w-0">
                {/* Toggle Map - Desktop */}
                <div className="hidden lg:flex items-center justify-between mb-6">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {filteredProviders.length} resultado{filteredProviders.length !== 1 ? 's' : ''}
                  </div>
                  <button
                    onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                      viewMode === 'map'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {viewMode === 'list' ? (
                      <>
                        <Map size={18} />
                        Mostrar mapa
                      </>
                    ) : (
                      <>
                        <List size={18} />
                        Ocultar mapa
                      </>
                    )}
                  </button>
                </div>

                {/* Loading State */}
                {isLoading ? (
                  <SkeletonLoader type="card" count={6} />
                ) : (
                  <>
                    {/* Lista - oculta en mobile cuando mapa está activo */}
                    {viewMode === 'list' && (
                      <>
                        {filteredProviders.length > 0 ? (
                          <div className="space-y-4">
                            {filteredProviders.map((provider) => (
                              <ServiceCard key={provider.id} provider={provider} />
                            ))}
                          </div>
                        ) : (
                          <EmptyState
                            icon={<Search size={48} className="text-gray-400" />}
                            title="No se encontraron resultados"
                            description="Intenta ajustar tus filtros o buscar con otros términos"
                            action={{
                              label: 'Limpiar filtros',
                              onClick: () => {
                                setFilters({});
                                setSearchQuery('');
                              },
                            }}
                          />
                        )}
                      </>
                    )}
                  </>
                )}
              </main>

              {/* Mapa Sidebar - Desktop (400px) - Solo se muestra cuando viewMode === 'map' */}
              {viewMode === 'map' && (
                <aside className="hidden lg:block lg:w-[400px] lg:flex-shrink-0">
                  <div className="sticky top-24 h-[calc(100vh-120px)]">
                    {filteredProviders.length > 0 ? (
                      <MapMock providers={filteredProviders} />
                    ) : (
                      <EmptyState
                        icon={<Map size={48} className="text-gray-400" />}
                        title="No hay proveedores para mostrar"
                        description="Ajusta tus filtros para ver resultados en el mapa"
                      />
                    )}
                  </div>
                </aside>
              )}
            </div>
          </div>

          {/* Mapa Mobile - Fullscreen Modal */}
          {viewMode === 'map' && (
            <div className="lg:hidden fixed inset-0 bg-white dark:bg-gray-900 z-50">
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between z-10">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Mapa</h2>
                <button
                  onClick={() => setViewMode('list')}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  aria-label="Cerrar mapa"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="h-[calc(100vh-73px)] p-4">
                {filteredProviders.length > 0 ? (
                  <MapMock providers={filteredProviders} />
                ) : (
                  <EmptyState
                    icon={<Map size={48} className="text-gray-400" />}
                    title="No hay proveedores para mostrar"
                    description="Ajusta tus filtros para ver resultados en el mapa"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pb-20 lg:pb-0">
          <Navigation />
          <div className="max-w-7xl mx-auto px-4 py-6">
            <SkeletonLoader type="card" count={6} />
          </div>
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}

