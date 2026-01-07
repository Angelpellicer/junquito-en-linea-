import { Star } from 'lucide-react';

interface ReviewCardProps {
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ReviewCard({
  author,
  rating,
  comment,
  date,
}: ReviewCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="font-medium text-gray-900 dark:text-gray-100">{author}</div>
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(rating)
                    ? 'text-amber-500 fill-amber-500'
                    : 'text-gray-300'
                }
              />
            ))}
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">{rating}</span>
          </div>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">{date}</span>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300">{comment}</p>
    </div>
  );
}

