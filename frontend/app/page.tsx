import Header from '@/components/home/header';
import Footer from '@/components/home/footer';
import HeroSection from '@/components/home/hero-section';
import ServicesSection from '@/components/home/services-section';
import PackagesSection from '@/components/home/packages-section';
import SecureAccessSection from '@/components/home/secureAccess-section';
import AboutSection from '@/components/home/about-section';
import CaseStudiesSection from '@/components/home/caseStudies-section';
import BookCallSection from '@/components/home/bookCall-section';
import ResourcesSection from '@/components/home/resources-section';
import InsightsSection from '@/components/home/insights-section';
import FAQSection from '@/components/home/faq-section';
import TrustSection from '@/components/home/trust-section';
import TestimonialsSection from '@/components/home/testimonials-section';
import ContactSection from '@/components/home/contact-section';
import PriceCalculatorSection from '@/components/home/priceCalculator-section';

// Main App Component - Optimized sequence for user journey and conversions
export default function CompleteCypenstraApp() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Navigation - Always first for easy access */}
      <Header />

      {/* 2. Hero - Immediate value proposition and CTA */}
      <HeroSection />

      {/* 5. Packages - Core offerings with pricing */}
      <PackagesSection />

      {/* 6. Price Calculator - Interactive engagement */}
      <PriceCalculatorSection />

      {/* 7. Secure Access - Build trust with security practices */}
      <SecureAccessSection />

      {/* 3. Trust Signals - Build credibility early */}
      <TrustSection />

      {/* 4. Services Overview - What you offer */}
      <ServicesSection />

      {/* 7. About - Build trust and expertise */}
      <AboutSection />

      {/* 8. Case Studies - Social proof and results */}
      <CaseStudiesSection />

      {/* 9. Testimonials - More social proof */}
      <TestimonialsSection />

      {/* 10. Book Call CTA - Primary conversion point */}
      <BookCallSection />

      {/* 11. Insights - Thought leadership content */}
      <InsightsSection />

      {/* 12. Resources - Additional value */}
      <ResourcesSection />

      {/* 13. FAQ - Address objections */}
      <FAQSection />

      {/*14. Contact - Final conversion opportunity*/}
      <ContactSection />

      {/* 15. Footer - Navigation and legal */}
      <Footer />
    </div>
  );
}
