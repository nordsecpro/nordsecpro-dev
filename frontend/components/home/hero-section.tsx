'use client';

import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Hero Section Component
function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            SOC 2 & Cloud Security Experts
            <span className="block text-blue-200">
              — Trusted by US SaaS Companies
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Get compliant, secure, and audit-ready — fast. Remote cybersecurity
            consulting by certified experts. Flat fees. No hidden costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => (window.location.href = '/contact')}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100">
              <Calendar className="h-5 w-5 mr-2" />
              Talk to a Security Expert
            </Button>
            <Button
              onClick={() => {
                document.getElementById('price')?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
              size="lg"
              variant="outline"
              className="bg-white text-blue-600 hover:bg-gray-100">
              See Pricing & Packages
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
