'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  const applyTheme = (newTheme: Theme) => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (newTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  };

  useEffect(() => {
    setMounted(true);
    // Leer tema guardado o preferencia del sistema
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('theme');
        const isValidTheme = savedTheme === 'light' || savedTheme === 'dark';
        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
        const initialTheme = (isValidTheme ? savedTheme : systemPreference) as Theme;
        setTheme(initialTheme);
        applyTheme(initialTheme);
      } catch (error) {
        // Si hay error, usar tema claro por defecto
        setTheme('light');
        applyTheme('light');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('theme', newTheme);
      } catch (error) {
        console.error('Error saving theme:', error);
      }
    }
    applyTheme(newTheme);
  };

  // Renderizar children siempre, pero el tema se aplicará cuando se monte
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

