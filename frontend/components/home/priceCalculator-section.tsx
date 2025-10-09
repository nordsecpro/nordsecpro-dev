'use client';
import PriceCalculator from '@/components/price-calculator';

// Price Calculator Section Component
function PriceCalculatorSection() {
  return (
    <section id="price" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PriceCalculator />
      </div>
    </section>
  );
}

export default PriceCalculatorSection;
