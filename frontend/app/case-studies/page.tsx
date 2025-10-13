// app/case-studies/page.tsx
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

function CaseStudiesSectionSkeleton() {
  return (
    <section className="py-32 bg-gradient-to-br from-white via-blue-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header Skeleton */}
        <div className="text-center mb-28">
          <div className="h-12 w-56 bg-blue-300 rounded-full mx-auto mb-10 animate-pulse" />
          <div className="h-20 w-[500px] max-w-full bg-blue-200 rounded-lg mx-auto mb-10 animate-pulse" />
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="h-6 w-full bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-6 w-4/5 bg-slate-200 rounded-lg mx-auto animate-pulse" />
          </div>
        </div>

        {/* Case Studies Grid Skeleton */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border-2 border-blue-300 animate-pulse"
              style={{
                animationDelay: `${index * 200}ms`,
              }}>
              {/* Header Skeleton */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="h-[72px] w-[72px] bg-blue-300 rounded-2xl" />
                  <div className="h-8 w-32 bg-blue-200 rounded-full" />
                </div>
                <div className="h-10 w-4/5 bg-blue-200 rounded-lg mb-4" />
                <div className="h-1 w-20 bg-blue-300 rounded-full" />
              </div>

              {/* Content Skeleton */}
              <div className="space-y-6">
                {/* Client Info */}
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-blue-200 rounded mt-1" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-16 bg-blue-200 rounded" />
                    <div className="h-4 w-full bg-slate-200 rounded" />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <div className="h-4 w-full bg-slate-200 rounded" />
                  <div className="h-4 w-full bg-slate-200 rounded" />
                  <div className="h-4 w-3/4 bg-slate-200 rounded" />
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 py-4">
                  {[...Array(3)].map((_, idx) => (
                    <div
                      key={idx}
                      className="h-16 bg-blue-100 rounded-xl border border-blue-200"
                    />
                  ))}
                </div>
              </div>

              {/* Outcome Section Skeleton */}
              <div className="mt-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 h-32">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-white/20 rounded-full" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-24 bg-white/20 rounded" />
                    <div className="h-4 w-full bg-white/20 rounded" />
                    <div className="h-4 w-4/5 bg-white/20 rounded" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Dynamic import with loading state
const CaseStudiesSection = dynamic(
  () => import('@/components/case-studies/caseStudies-section'),
  {
    loading: () => <CaseStudiesSectionSkeleton />,
    ssr: true,
  }
);

const CaseStudiesPage = () => {
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-white min-h-screen">
      <Suspense fallback={<CaseStudiesSectionSkeleton />}>
        <CaseStudiesSection />
      </Suspense>
    </div>
  );
};

export default CaseStudiesPage;
