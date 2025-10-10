import HeroSection from '@/components/home/hero-section';
import RoadmapSection from '@/components/home/roadmap-section';
import PriceCalculatorSection from '@/components/home/priceCalculator-section';
import TrustSection from '@/components/home/trust-section';
import TestimonialsSection from '@/components/home/testimonials-section';
import BookCallSection from '@/components/home/bookCall-section';

// Main App Component - Optimized sequence for user journey and conversions
export default function CompleteCypenstraApp() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <HeroSection />
      <RoadmapSection />
      <PriceCalculatorSection />
      <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
        <TrustSection />
        <TestimonialsSection />
      </div>
      <BookCallSection />
    </div>
  );
}
