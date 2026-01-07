'use client';

import { Category } from '@/types/category';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';

interface CategoryGridProps {
  categories: Category[];
  onCategorySelect?: (categoryId: string) => void;
}

export default function CategoryGrid({
  categories,
  onCategorySelect,
}: CategoryGridProps) {
  const handleClick = (categoryId: string) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categories.map((category) => {
        // @ts-ignore - Dynamic icon import
        const Icon = LucideIcons[category.icon as keyof typeof LucideIcons] || LucideIcons.Circle;

        return (
          <Link
            key={category.id}
            href={`/explore?category=${category.id}`}
            onClick={() => handleClick(category.id)}
            className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary-light hover:shadow-md transition-smooth group"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Icon size={24} className="text-primary" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
              {category.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

