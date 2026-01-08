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
      className="group block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-primary dark:hover:border-primary-light transition-all duration-300 h-full flex flex-col overflow-hidden"
    >
      {/* Card Header with Image and Favorite */}
      <div className="relative p-4 pb-3">
        <div className="flex items-start gap-4">
          {/* Avatar/Image */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-xl font-bold shadow-sm">
              {provider.name.charAt(0)}
            </div>
          </div>

          {/* Name and Category */}
          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100 truncate group-hover:text-primary dark:group-hover:text-primary-light transition-colors mb-1">
                  {provider.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {provider.category}
                </p>
              </div>
              <button
                onClick={handleFavorite}
                className={`flex-shrink-0 p-1.5 rounded-lg transition-all ${
                  isFavorite
                    ? 'text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30'
                    : 'text-gray-400 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Card Body - Rating and Location */}
      <div className="px-4 pb-3 flex-1">
        <div className="flex items-center gap-3 mb-3">
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <Star size={16} className="text-amber-500 fill-amber-500 flex-shrink-0" />
            <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
              {provider.rating}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({provider.reviewCount})
            </span>
          </div>
          
          {/* Location */}
          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
            <MapPin size={14} className="text-gray-400 dark:text-gray-500 flex-shrink-0" />
            <span className="truncate">{provider.zone}</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {provider.badge && <TrustBadge type={provider.badge} size="sm" />}
          <AvailabilityIndicator status={provider.availability} />
        </div>
      </div>

      {/* Card Footer - Action Button */}
      <div className="px-4 pb-4 pt-2 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={handleWhatsApp}
          className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm hover:shadow-md"
        >
          <MessageCircle size={18} />
          <span>Contactar por WhatsApp</span>
        </button>
      </div>
    </Link>
  );
}

