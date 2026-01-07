'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import TrustBadge from '@/components/TrustBadge';
import AvailabilityIndicator from '@/components/AvailabilityIndicator';
import ReviewCard from '@/components/ReviewCard';
import SkeletonLoader from '@/components/SkeletonLoader';
import EmptyState from '@/components/EmptyState';
import { providers } from '@/data/providers';
import { Provider } from '@/types/provider';
import {
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Star,
  ArrowLeft,
  Heart,
} from 'lucide-react';
import Link from 'next/link';

// Mock reviews
const mockReviews = [
  {
    author: 'María González',
    rating: 5,
    comment: 'Excelente servicio, muy profesional y puntual. Lo recomiendo totalmente.',
    date: 'Hace 2 semanas',
  },
  {
    author: 'Carlos Pérez',
    rating: 4,
    comment: 'Buen trabajo, cumplió con lo prometido. Precio justo.',
    date: 'Hace 1 mes',
  },
  {
    author: 'Ana Martínez',
    rating: 5,
    comment: 'Muy satisfecha con el servicio. Definitivamente volveré a contratar.',
    date: 'Hace 3 semanas',
  },
];

export default function ProviderProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const foundProvider = providers.find((p) => p.id === params.id);
    setProvider(foundProvider || null);
    setIsLoading(false);

    // Check if favorite
    if (typeof window !== 'undefined') {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.includes(params.id));
    }
  }, [params.id]);

  const handleFavorite = () => {
    if (!provider) return;
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
  };

  const handleWhatsApp = () => {
    if (!provider) return;
    const message = encodeURIComponent(
      `Hola ${provider.name}, vi tu perfil en Junquito en Línea y me interesa tu servicio de ${provider.category}.`
    );
    window.open(`https://wa.me/${provider.whatsapp}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    if (!provider) return;
    window.location.href = `tel:${provider.phone}`;
  };

  const handleViewLocation = () => {
    if (!provider || !provider.location) return;
    const { lat, lng } = provider.location;
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };

  const formatSchedule = (schedule: Provider['schedule']) => {
    const days = [
      { key: 'monday', label: 'Lunes' },
      { key: 'tuesday', label: 'Martes' },
      { key: 'wednesday', label: 'Miércoles' },
      { key: 'thursday', label: 'Jueves' },
      { key: 'friday', label: 'Viernes' },
      { key: 'saturday', label: 'Sábado' },
      { key: 'sunday', label: 'Domingo' },
    ];

    return days.map((day) => {
      const scheduleDay = schedule[day.key as keyof typeof schedule];
      return {
        day: day.label,
        ...scheduleDay,
      };
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pb-20 lg:pb-0">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <SkeletonLoader type="profile" />
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen pb-20 lg:pb-0">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <EmptyState
            icon={<MapPin size={48} className="text-gray-400" />}
            title="Proveedor no encontrado"
            description="El proveedor que buscas no existe o ha sido eliminado"
            action={{
              label: 'Volver al inicio',
              onClick: () => router.push('/'),
            }}
          />
        </div>
      </div>
    );
  }

  const schedule = formatSchedule(provider.schedule);

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Back Button */}
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          Volver
        </Link>

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-4xl font-bold">
                {provider.name.charAt(0)}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {provider.name}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">{provider.category}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {provider.badge && <TrustBadge type={provider.badge} />}
                    <AvailabilityIndicator status={provider.availability} />
                  </div>
                </div>
                <button
                  onClick={handleFavorite}
                  className={`p-2 rounded-full transition-colors ${
                    isFavorite
                      ? 'text-red-500 hover:text-red-600'
                      : 'text-gray-400 hover:text-red-500'
                  }`}
                  aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                >
                  <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star size={20} className="text-amber-500 fill-amber-500" />
                  <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {provider.rating}
                  </span>
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  ({provider.reviewCount} reseñas)
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                <MapPin size={18} />
                <span>{provider.zone}</span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </button>
                <button
                  onClick={handleCall}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Phone size={20} />
                  Llamar
                </button>
                {provider.location && (
                  <button
                    onClick={handleViewLocation}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <MapPin size={20} />
                    Ver ubicación
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Sobre</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{provider.description}</p>
        </div>

        {/* Services */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {provider.services.map((service, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-gray-700 dark:text-gray-300">{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Clock size={20} />
            Horarios
          </h2>
          <div className="space-y-2">
            {schedule.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <span className="font-medium text-gray-700 dark:text-gray-300">{day.day}</span>
                {day.available ? (
                  <span className="text-gray-600 dark:text-gray-400">
                    {day.open} - {day.close}
                  </span>
                ) : (
                  <span className="text-gray-400 dark:text-gray-500">Cerrado</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Coverage Zones */}
        {provider.coverageZones.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Zonas de cobertura
            </h2>
            <div className="flex flex-wrap gap-2">
              {provider.coverageZones.map((zone, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {zone}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Reseñas</h2>
          <div className="space-y-4">
            {mockReviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

