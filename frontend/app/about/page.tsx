// app/about/page.tsx
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

function AboutSectionSkeleton() {
  return (
    <section className="py-32 bg-gradient-to-br from-white via-blue-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header Skeleton */}
        <div className="text-center mb-24">
          <div className="h-10 w-40 bg-blue-300 rounded-full mx-auto mb-8 animate-pulse" />
          <div className="h-16 w-96 bg-blue-200 rounded-lg mx-auto mb-8 animate-pulse" />
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="h-6 w-full bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-6 w-5/6 bg-slate-200 rounded-lg mx-auto animate-pulse" />
            <div className="h-6 w-4/6 bg-slate-200 rounded-lg mx-auto animate-pulse" />
          </div>
        </div>

        {/* Philosophy & Why We Exist Skeleton */}
        <div className="grid lg:grid-cols-2 gap-10 mb-32">
          {/* Philosophy Card Skeleton */}
          <div className="bg-white rounded-3xl p-10 md:p-12 shadow-2xl border-4 border-blue-300 animate-pulse">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-16 w-16 bg-blue-300 rounded-2xl" />
              <div className="h-10 w-64 bg-blue-200 rounded-lg" />
            </div>
            <div className="space-y-7">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className="h-12 w-12 bg-blue-200 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-full bg-slate-200 rounded" />
                    <div className="h-4 w-4/5 bg-slate-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why We Exist Card Skeleton */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 rounded-3xl p-10 md:p-12 shadow-2xl animate-pulse">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-16 w-16 bg-white/20 rounded-2xl" />
              <div className="h-10 w-48 bg-white/20 rounded-lg" />
            </div>
            <div className="space-y-3">
              <div className="h-5 w-full bg-white/20 rounded" />
              <div className="h-5 w-full bg-white/20 rounded" />
              <div className="h-5 w-4/5 bg-white/20 rounded" />
            </div>
          </div>
        </div>

        {/* Team Section Skeleton */}
        <div className="relative">
          <div className="text-center mb-20">
            <div className="h-10 w-52 bg-blue-300 rounded-full mx-auto mb-8 animate-pulse border-4 border-blue-200" />
            <div className="h-14 w-80 bg-blue-200 rounded-lg mx-auto animate-pulse" />
          </div>

          {/* Team Layout Skeleton */}
          <div className="max-w-6xl mx-auto">
            {/* CEO Skeleton - Top Center */}
            <div className="flex justify-center mb-24">
              <div className="flex flex-col items-center">
                <div className="h-44 w-44 bg-blue-300 rounded-full border-4 border-white shadow-2xl animate-pulse mb-6" />
                <div className="h-8 w-40 bg-blue-200 rounded-lg mb-2 animate-pulse" />
                <div className="h-5 w-32 bg-blue-200 rounded-lg mb-4 animate-pulse" />
                <div className="h-8 w-24 bg-blue-200 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Team Members Skeleton - Bottom Row */}
            <div className="grid md:grid-cols-2 gap-20 md:gap-32 max-w-5xl mx-auto">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="h-40 w-40 bg-blue-300 rounded-full border-4 border-white shadow-2xl animate-pulse mb-6" />
                  <div className="h-7 w-48 bg-blue-200 rounded-lg mb-2 animate-pulse" />
                  <div className="h-5 w-56 bg-blue-200 rounded-lg mb-5 animate-pulse" />
                  <div className="flex flex-wrap gap-3 justify-center">
                    <div className="h-10 w-24 bg-blue-200 rounded-xl animate-pulse" />
                    <div className="h-10 w-28 bg-blue-200 rounded-xl animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certification Info Skeleton */}
          <div className="mt-20 text-center">
            <div className="h-4 w-96 bg-blue-200 rounded mx-auto animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Dynamic import with loading state
const AboutSection = dynamic(() => import('@/components/about/about-section'), {
  loading: () => <AboutSectionSkeleton />,
  ssr: true,
});

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-white min-h-screen">
      <Suspense fallback={<AboutSectionSkeleton />}>
        <AboutSection />
      </Suspense>
    </div>
  );
};

export default AboutPage;
