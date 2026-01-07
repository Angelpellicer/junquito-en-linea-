'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-600 transition-colors duration-300" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-6 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800 hover:scale-105 active:scale-95"
      aria-label={theme === 'light' ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro'}
      title={theme === 'light' ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro'}
    >
      {/* Fondo del botón con gradiente */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-300 shadow-inner ${
          theme === 'light'
            ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600'
        }`}
      />
      
      {/* Círculo deslizante con icono */}
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 ease-in-out ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {theme === 'light' ? (
            <Sun 
              size={14} 
              className="text-yellow-500 transition-opacity duration-200"
              fill="currentColor"
            />
          ) : (
            <Moon 
              size={14} 
              className="text-indigo-600 transition-opacity duration-200"
              fill="currentColor"
            />
          )}
        </div>
      </div>
    </button>
  );
}

