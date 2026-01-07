'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import ServiceCard from '@/components/ServiceCard';
import EmptyState from '@/components/EmptyState';
import { providers } from '@/data/providers';
import { Provider } from '@/types/provider';
import { Heart, Search } from 'lucide-react';

export default function FavoritesPage() {
  const router = useRouter();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favoriteProviders, setFavoriteProviders] = useState<Provider[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavoriteIds(favorites);
      const favoriteProvidersList = providers.filter((p) =>
        favorites.includes(p.id)
      );
      setFavoriteProviders(favoriteProvidersList);
    }
  }, []);

  const handleFavoriteChange = () => {
    // Refresh favorites when a card's favorite status changes
    if (typeof window !== 'undefined') {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavoriteIds(favorites);
      const favoriteProvidersList = providers.filter((p) =>
        favorites.includes(p.id)
      );
      setFavoriteProviders(favoriteProvidersList);
    }
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Mis Favoritos</h1>

        {favoriteProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteProviders.map((provider) => (
              <ServiceCard
                key={provider.id}
                provider={provider}
                isFavorite={true}
                onFavorite={handleFavoriteChange}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Heart size={48} className="text-gray-400" />}
            title="No tienes favoritos aún"
            description="Explora los servicios disponibles y guarda tus favoritos para acceder rápidamente"
            action={{
              label: 'Explorar servicios',
              onClick: () => router.push('/explore'),
            }}
          />
        )}
      </div>
    </div>
  );
}

