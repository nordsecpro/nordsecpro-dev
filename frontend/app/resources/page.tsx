// app/resources/page.tsx
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

function ResourcesSectionSkeleton() {
  return (
    <section className="py-32 bg-gradient-to-br from-white via-blue-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header Skeleton */}
        <div className="text-center mb-28">
          <div className="h-12 w-64 bg-blue-300 rounded-full mx-auto mb-10 animate-pulse" />
          <div className="h-20 w-[400px] max-w-full bg-blue-200 rounded-lg mx-auto mb-10 animate-pulse" />
          <div className="max-w-3xl mx-auto">
            <div className="h-6 w-full max-w-2xl bg-slate-200 rounded-lg mx-auto animate-pulse" />
          </div>
        </div>

        {/* Resources Grid Skeleton */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border-2 border-blue-300 animate-pulse"
              style={{
                animationDelay: `${index * 100}ms`,
              }}>
              {/* Decorative Corner Skeleton */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/20 rounded-bl-[100px] rounded-tr-3xl" />

              {/* Icon Skeleton */}
              <div className="mb-6">
                <div className="h-20 w-20 bg-blue-200 rounded-2xl mb-6" />
              </div>

              {/* Content Skeleton */}
              <div className="mb-6 space-y-4">
                {/* Title */}
                <div className="space-y-3">
                  <div className="h-8 w-full bg-blue-200 rounded-lg" />
                  <div className="h-8 w-3/4 bg-blue-200 rounded-lg" />
                </div>

                {/* Description */}
                <div className="space-y-2 pt-2">
                  <div className="h-4 w-full bg-slate-200 rounded" />
                  <div className="h-4 w-full bg-slate-200 rounded" />
                  <div className="h-4 w-2/3 bg-slate-200 rounded" />
                </div>
              </div>

              {/* Button Skeleton */}
              <div className="h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl" />
            </div>
          ))}
        </div>

        {/* Free Badge Skeleton */}
        <div className="mt-24 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white border-4 border-blue-300 rounded-full shadow-2xl animate-pulse">
            <div className="h-6 w-6 bg-blue-200 rounded-full" />
            <div className="h-5 w-48 bg-blue-200 rounded" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Dynamic import with loading state
const ResourcesSection = dynamic(
  () => import('@/components/resources/resources-section'),
  {
    loading: () => <ResourcesSectionSkeleton />,
    ssr: true, // Enable server-side rendering
  }
);

const ResourcesPage = () => {
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-white min-h-screen">
      <Suspense fallback={<ResourcesSectionSkeleton />}>
        <ResourcesSection />
      </Suspense>
    </div>
  );
};

export default ResourcesPage;
