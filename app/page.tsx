'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import SearchBar from '@/components/SearchBar';
import CategoryGrid from '@/components/CategoryGrid';
import ServiceCard from '@/components/ServiceCard';
import { providers } from '@/data/providers';
import { categories } from '@/data/categories';
import { Provider } from '@/types/provider';

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    router.push(`/explore?q=${encodeURIComponent(query)}`);
  };

  const handleCategorySelect = (categoryId: string) => {
    router.push(`/explore?category=${categoryId}`);
  };

  // Obtener sugerencias de búsqueda (categorías y nombres de proveedores)
  const searchSuggestions = [
    ...categories.map((cat) => cat.name),
    ...providers.map((p) => p.name),
    ...providers.map((p) => p.category),
  ];

  // Filtrar proveedores para las secciones
  const availableToday = providers.filter((p) => p.availability === 'today');
  const topRated = [...providers]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
  const recentlyVerified = providers
    .filter((p) => p.badge === 'verified' || p.badge === 'new')
    .slice(0, 6);

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-light dark:from-primary dark:to-primary-light text-white py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Qué necesitas hoy en El Junquito?
          </h1>
          <p className="text-blue-100 mb-6 text-lg">
            Encuentra servicios, oficios y negocios de confianza en tu comunidad
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar
              placeholder="Buscar plomería, electricidad, comida..."
              onSearch={handleSearch}
              suggestions={searchSuggestions}
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-12 md:space-y-16">
        {/* Categorías */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 md:mb-8">
            Categorías
          </h2>
          <CategoryGrid
            categories={categories}
            onCategorySelect={handleCategorySelect}
          />
        </section>

        {/* Disponibles hoy */}
        {availableToday.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                Disponibles hoy
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {availableToday.length} disponible{availableToday.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {availableToday.slice(0, 6).map((provider) => (
                <ServiceCard key={provider.id} provider={provider} />
              ))}
            </div>
          </section>
        )}

        {/* Más recomendados */}
        {topRated.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                Más recomendados por vecinos
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {topRated.length} proveedor{topRated.length !== 1 ? 'es' : ''}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {topRated.map((provider) => (
                <ServiceCard key={provider.id} provider={provider} />
              ))}
            </div>
          </section>
        )}

        {/* Recién verificados */}
        {recentlyVerified.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                Recién verificados
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {recentlyVerified.length} proveedor{recentlyVerified.length !== 1 ? 'es' : ''}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {recentlyVerified.map((provider) => (
                <ServiceCard key={provider.id} provider={provider} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

