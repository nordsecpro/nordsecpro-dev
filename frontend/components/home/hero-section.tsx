'use client';

import { Calendar, Package, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-slate-200/40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

        {/* Floating gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {/* Main Tagline with gradient text */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span
              className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-1000"
              style={{ animationDelay: '200ms' }}>
              Secure the Center
            </span>
          </h1>

          {/* Subline with better styling */}
          <p
            className="text-xl md:text-2xl lg:text-3xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000"
            style={{ animationDelay: '400ms' }}>
            Your <span className="text-blue-600 font-medium">SOC 2</span>,{' '}
            <span className="text-blue-600 font-medium">vCISO</span> &{' '}
            <span className="text-blue-600 font-medium">Cloud Security</span>{' '}
            Partner
          </p>

          {/* CTAs with enhanced styling */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000"
            style={{ animationDelay: '600ms' }}>
            <Link href="/contact" className="group">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 shadow-xl hover:shadow-2xl transition-all duration-300 text-base px-8 py-7 rounded-xl font-semibold group-hover:scale-105 relative overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center">
                  <Calendar className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  Book a Free Consultation
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>

            <Link href="/packages" className="group">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white/80 backdrop-blur-sm text-slate-700 border-2 border-slate-200 hover:border-blue-300 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 text-base px-8 py-7 rounded-xl font-semibold group-hover:scale-105">
                <Package className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                See Packages
                <ArrowRight className="h-4 w-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div
            className="pt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500 animate-in fade-in duration-1000"
            style={{ animationDelay: '800ms' }}>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              <span>SOC 2 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 bg-green-500 rounded-full animate-pulse"
                style={{ animationDelay: '200ms' }}
              />
              <span>ISO 27001 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 bg-green-500 rounded-full animate-pulse"
                style={{ animationDelay: '400ms' }}
              />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
