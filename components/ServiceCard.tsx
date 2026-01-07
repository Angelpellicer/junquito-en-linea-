'use client';

import { Provider } from '@/types/provider';
import TrustBadge from './TrustBadge';
import AvailabilityIndicator from './AvailabilityIndicator';
import { MessageCircle, Heart, MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface ServiceCardProps {
  provider: Provider;
  onFavorite?: (id: string) => void;
  isFavorite?: boolean;
}

export default function ServiceCard({
  provider,
  onFavorite,
  isFavorite: initialIsFavorite,
}: ServiceCardProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite || false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.includes(provider.id));
    }
  }, [provider.id]);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    if (typeof window !== 'undefined') {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (newFavoriteState) {
        favorites.push(provider.id);
      } else {
        const index = favorites.indexOf(provider.id);
        if (index > -1) favorites.splice(index, 1);
      }
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    if (onFavorite) {
      onFavorite(provider.id);
    }
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const message = encodeURIComponent(
      `Hola ${provider.name}, vi tu perfil en Junquito en Línea y me interesa tu servicio de ${provider.category}.`
    );
    window.open(`https://wa.me/${provider.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <Link
      href={`/provider/${provider.id}`}
      className="group block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-smooth hover:border-primary dark:hover:border-primary-light"
    >
      <div className="flex gap-4">
        {/* Imagen/Placeholder */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-2xl font-bold">
            {provider.name.charAt(0)}
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                {provider.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{provider.category}</p>
            </div>
            <button
              onClick={handleFavorite}
              className={`flex-shrink-0 p-1.5 rounded-full transition-colors ${
                isFavorite
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-gray-400 hover:text-red-500'
              }`}
              aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <div className="flex items-center gap-1 text-sm">
              <MapPin size={14} className="text-gray-400 dark:text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">{provider.zone}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star size={14} className="text-amber-500 fill-amber-500" />
              <span className="font-medium text-gray-900 dark:text-gray-100">{provider.rating}</span>
              <span className="text-gray-500 dark:text-gray-400">({provider.reviewCount})</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {provider.badge && <TrustBadge type={provider.badge} size="sm" />}
            <AvailabilityIndicator status={provider.availability} />
          </div>

          <button
            onClick={handleWhatsApp}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
          >
            <MessageCircle size={16} />
            WhatsApp
          </button>
        </div>
      </div>
    </Link>
  );
}

