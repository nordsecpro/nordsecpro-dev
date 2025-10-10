// app/services/page.tsx
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

function ServiceSectionSkeleton() {
  return (
    <div className="py-24 bg-gradient-to-br from-white via-blue-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="h-10 w-64 bg-blue-200 rounded-full mx-auto mb-6 animate-pulse" />
          <div className="h-12 w-96 bg-slate-200 rounded-lg mx-auto mb-6 animate-pulse" />
          <div className="h-6 w-[600px] bg-slate-100 rounded-lg mx-auto animate-pulse" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white border-2 border-blue-100 rounded-3xl p-8 h-[400px] animate-pulse">
              <div className="h-16 w-16 bg-blue-200 rounded-2xl mb-6" />
              <div className="h-8 w-3/4 bg-slate-200 rounded-lg mb-4" />
              <div className="h-4 w-full bg-slate-100 rounded mb-2" />
              <div className="h-4 w-5/6 bg-slate-100 rounded mb-6" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-slate-100 rounded" />
                <div className="h-4 w-full bg-slate-100 rounded" />
                <div className="h-4 w-full bg-slate-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RoadmapSectionSkeleton() {
  return (
    <div className="py-24 bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="h-10 w-48 bg-white/20 rounded-full mx-auto mb-6 animate-pulse" />
          <div className="h-12 w-80 bg-white/20 rounded-lg mx-auto mb-6 animate-pulse" />
          <div className="h-6 w-[500px] bg-white/10 rounded-lg mx-auto animate-pulse" />
        </div>
        <div className="hidden lg:grid lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="h-24 w-24 bg-white/20 rounded-full mb-6 animate-pulse" />
              <div className="bg-white/10 rounded-2xl p-6 w-full h-[200px] animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Dynamic imports with loading states
const ServiceSection = dynamic(
  () => import('@/components/services/services-section'),
  {
    loading: () => <ServiceSectionSkeleton />,
    ssr: true, // Enable server-side rendering
  }
);

const RoadmapSection = dynamic(() => import('@/components/roadmap-section'), {
  loading: () => <RoadmapSectionSkeleton />,
  ssr: true,
});

// Main page component with metadata
export const metadata = {
  title: 'Our Services - Cypentra',
  description:
    'Comprehensive cybersecurity services and our proven 5-step security roadmap',
};

export default function ServicesPage() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <Suspense fallback={<ServiceSectionSkeleton />}>
        <ServiceSection />
      </Suspense>
      <Suspense fallback={<RoadmapSectionSkeleton />}>
        <RoadmapSection />
      </Suspense>
    </div>
  );
}
