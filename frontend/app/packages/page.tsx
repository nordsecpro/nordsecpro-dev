// app/packages/page.tsx - Optimized Version
'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports with loading states
const LitePackagesSection = dynamic(
  () => import('@/components/packages/litePackages-section'),
  {
    loading: () => <LitePackagesSkeleton />,
    ssr: true,
  }
);

const AdvancedPackageSection = dynamic(
  () => import('@/components/packages/advancePackages-section'),
  {
    loading: () => <AdvancedPackagesSkeleton />,
    ssr: true,
  }
);

// Lightweight skeleton for Lite Packages
function LitePackagesSkeleton() {
  return (
    <div className="mb-24 py-24">
      <div className="text-center mb-16 animate-in fade-in duration-300">
        <div className="h-10 w-72 bg-blue-200 rounded-full mx-auto mb-6 animate-pulse" />
        <div className="h-12 w-96 bg-slate-200 rounded-lg mx-auto mb-4 animate-pulse" />
        <div className="h-6 w-[600px] bg-slate-100 rounded-lg mx-auto animate-pulse" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white border-2 border-blue-200 rounded-3xl p-8 h-[600px] animate-pulse">
            <div className="h-12 w-12 bg-blue-200 rounded-2xl mb-6" />
            <div className="h-8 w-3/4 bg-slate-200 rounded-lg mb-4" />
            <div className="h-10 w-32 bg-blue-200 rounded-lg mb-2" />
            <div className="h-4 w-48 bg-slate-100 rounded mb-6" />
            <div className="space-y-3 mb-8">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="flex gap-3">
                  <div className="h-5 w-5 bg-blue-100 rounded-full flex-shrink-0" />
                  <div className="h-4 flex-1 bg-slate-100 rounded" />
                </div>
              ))}
            </div>
            <div className="h-14 w-full bg-blue-200 rounded-2xl mt-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Lightweight skeleton for Advanced Packages
function AdvancedPackagesSkeleton() {
  return (
    <div className="mb-16">
      <div className="text-center mb-16 animate-in fade-in duration-300">
        <div className="h-10 w-64 bg-blue-200 rounded-full mx-auto mb-6 animate-pulse" />
        <div className="h-12 w-[500px] bg-slate-200 rounded-lg mx-auto mb-4 animate-pulse" />
        <div className="h-6 w-[700px] bg-slate-100 rounded-lg mx-auto animate-pulse" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-300 rounded-3xl p-8 h-[650px] animate-pulse">
            <div className="h-12 w-12 bg-blue-300 rounded-2xl mb-6" />
            <div className="h-8 w-4/5 bg-slate-200 rounded-lg mb-4" />
            <div className="h-8 w-40 bg-blue-300 rounded-lg mb-2" />
            <div className="h-4 w-44 bg-slate-100 rounded mb-6" />
            <div className="space-y-3 mb-8">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="flex gap-3">
                  <div className="h-5 w-5 bg-blue-300 rounded-full flex-shrink-0" />
                  <div className="h-4 flex-1 bg-slate-100 rounded" />
                </div>
              ))}
            </div>
            <div className="space-y-3 mt-auto">
              <div className="h-14 w-full bg-blue-300 rounded-2xl" />
              <div className="h-12 w-full bg-slate-100 rounded-2xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Packages Page Component
export default function PackagesPage() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Lite Packages Section - Lazy loaded */}
        <Suspense fallback={<LitePackagesSkeleton />}>
          <LitePackagesSection seeAll={false} />
        </Suspense>

        {/* Advanced Packages Section - Lazy loaded */}
        <Suspense fallback={<AdvancedPackagesSkeleton />}>
          <AdvancedPackageSection />
        </Suspense>
      </div>
    </div>
  );
}
