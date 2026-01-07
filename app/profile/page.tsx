'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { User, Building2, Settings } from 'lucide-react';

type UserRole = 'client' | 'provider';

export default function ProfilePage() {
  const [role, setRole] = useState<UserRole>('client');
  const [name, setName] = useState('Usuario');
  const [phone, setPhone] = useState('');
  const [zone, setZone] = useState('');

  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Mi Perfil</h1>

        {/* Role Switch */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Settings size={20} />
            Tipo de cuenta
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => setRole('client')}
              className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                role === 'client'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <User size={24} />
              <span className="font-medium">Cliente/Vecino</span>
            </button>
            <button
              onClick={() => setRole('provider')}
              className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                role === 'provider'
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <Building2 size={24} />
              <span className="font-medium">Proveedor/Negocio</span>
            </button>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Información personal
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:border-primary dark:focus:border-primary-light focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:border-primary dark:focus:border-primary-light focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="0412-1234567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Zona
              </label>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:border-primary dark:focus:border-primary-light focus:ring-2 focus:ring-primary/20 outline-none"
              >
                <option value="">Selecciona tu zona</option>
                <option value="El Junquito Centro">El Junquito Centro</option>
                <option value="El Junquito Alto">El Junquito Alto</option>
                <option value="El Junquito Bajo">El Junquito Bajo</option>
                <option value="La Vega">La Vega</option>
              </select>
            </div>
          </div>
        </div>

        {/* Provider Services (if provider) */}
        {role === 'provider' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Mis servicios publicados
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Aquí aparecerán los servicios que publiques. Aún no tienes servicios
              publicados.
            </p>
            <Link
              href="/publish"
              className="mt-4 inline-block px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-light transition-colors"
            >
              Publicar mi primer servicio
            </Link>
          </div>
        )}

        {/* Save Button */}
        <button className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-light transition-colors">
          Guardar cambios
        </button>
      </div>
    </div>
  );
}

