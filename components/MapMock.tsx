'use client';

import { Provider } from '@/types/provider';
import { MapPin } from 'lucide-react';

interface MapMockProps {
  providers: Provider[];
  selectedId?: string;
  onMarkerClick?: (id: string) => void;
}

export default function MapMock({
  providers,
  selectedId,
  onMarkerClick,
}: MapMockProps) {
  // Coordenadas base de El Junquito (normalizadas para el mapa)
  const baseLat = 10.47;
  const baseLng = -67.03;

  // Normalizar coordenadas para el contenedor del mapa
  const normalizeCoord = (coord: number, base: number, range: number = 0.01) => {
    return ((coord - base) / range) * 100 + 50;
  };

  return (
    <div className="relative w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Mapa de fondo simulado */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200">
        {/* Líneas de calle simuladas */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#9CA3AF" strokeWidth="2" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#9CA3AF" strokeWidth="2" />
          <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#9CA3AF" strokeWidth="2" />
          <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#9CA3AF" strokeWidth="2" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#9CA3AF" strokeWidth="2" />
          <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#9CA3AF" strokeWidth="2" />
        </svg>
      </div>

      {/* Marcadores */}
      {providers.map((provider) => {
        if (!provider.location) return null;

        const left = normalizeCoord(provider.location.lng, baseLng, 0.02);
        const top = normalizeCoord(provider.location.lat, baseLat, 0.02);
        const isSelected = selectedId === provider.id;

        return (
          <button
            key={provider.id}
            onClick={() => onMarkerClick?.(provider.id)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
              isSelected ? 'z-20 scale-125' : 'z-10 hover:scale-110'
            }`}
            style={{
              left: `${Math.max(5, Math.min(95, left))}%`,
              top: `${Math.max(5, Math.min(95, top))}%`,
            }}
            aria-label={`${provider.name} - ${provider.zone}`}
          >
            <div
              className={`relative ${
                isSelected
                  ? 'text-primary'
                  : provider.availability === 'today'
                  ? 'text-emerald-500'
                  : provider.availability === 'this-week'
                  ? 'text-amber-500'
                  : 'text-gray-400'
              }`}
            >
              <MapPin
                size={isSelected ? 32 : 24}
                fill="currentColor"
                className="drop-shadow-lg"
              />
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-white animate-pulse" />
              )}
            </div>
          </button>
        );
      })}

      {/* Leyenda */}
      <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Disponibilidad</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-emerald-500 fill-emerald-500" />
            <span className="text-gray-600 dark:text-gray-400">Hoy</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-amber-500 fill-amber-500" />
            <span className="text-gray-600 dark:text-gray-400">Esta semana</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-400 fill-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">No disponible</span>
          </div>
        </div>
      </div>
    </div>
  );
}

