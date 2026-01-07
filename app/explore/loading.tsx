import SkeletonLoader from '@/components/SkeletonLoader';

export default function Loading() {
  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <SkeletonLoader type="card" count={6} />
      </div>
    </div>
  );
}

