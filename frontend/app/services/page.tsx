import React from 'react';
import ServiceSection from '@/components/services/services-section';
import RoadmapSection from '@/components/home/roadmap-section';

const page = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <ServiceSection />
      <RoadmapSection />
    </div>
  );
};

export default page;
