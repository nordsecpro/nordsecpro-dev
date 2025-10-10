'use client';
import LitePackagesSection from '@/components/price-calculator';

// Price Calculator Section Component
function PriceCalculatorSection() {
  return (
    <section id="price" className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LitePackagesSection />
      </div>
    </section>
  );
}

export default PriceCalculatorSection;
