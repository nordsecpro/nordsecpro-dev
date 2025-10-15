'use client';

import {
  Calendar,
  Package,
  ArrowRight,
  Shield,
  Lock,
  Zap,
  ChevronRight,
  Star,
  Users,
  Award,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';

function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, #2563eb 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Subtle Gradient Accents */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-blue-50 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-50 to-transparent opacity-50" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col">
        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                {/* Main Headline */}
                <div
                  className={`space-y-4 transition-all duration-700 delay-100 ${
                    isLoaded
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900">
                    Secure The Center
                    <span className="block text-blue-600 mt-2">
                      Of Your Business
                    </span>
                  </h1>
                </div>

                {/* Subheading */}
                <p
                  className={`text-lg text-gray-600 leading-relaxed max-w-xl transition-all duration-700 delay-200 ${
                    isLoaded
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}>
                  Enterprise-grade security solutions with SOC 2, vCISO, and
                  Cloud Security expertise tailored for modern businesses.
                </p>

                {/* Feature List */}
                <div
                  className={`space-y-3 transition-all duration-700 delay-300 ${
                    isLoaded
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}>
                  {[
                    'SOC 2 Type II Certified',
                    'ISO 27001 Compliant',
                    '24/7 Security Monitoring',
                    'Cloud-Native Architecture',
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                        <Check className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-gray-700 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div
                  className={`flex flex-col sm:flex-row gap-4 pt-4 transition-all duration-700 delay-400 ${
                    isLoaded
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}>
                  <Link
                    href="https://calendly.com/cypentra-consultation"
                    target="_blank"
                    rel="noopener noreferrer">
                    <Button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-lg font-semibold text-base shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 hover:scale-105">
                      <span className="flex items-center justify-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Book Consultation
                        <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </span>
                    </Button>
                  </Link>

                  <Link href="/packages">
                    <Button
                      variant="outline"
                      className="group bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-blue-600 px-8 py-6 rounded-lg font-semibold text-base transition-all duration-300 hover:scale-105">
                      <span className="flex items-center justify-center gap-2">
                        <Package className="w-5 h-5" />
                        View Packages
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Visual Element */}
              <div
                className={`hidden lg:block transition-all duration-1000 delay-600 ${
                  isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}>
                <div className="relative">
                  {/* Main Card */}
                  <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 space-y-6">
                    {/* Security Score */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">
                          Security Score
                        </span>
                        <span className="text-2xl font-bold text-blue-600">
                          98/100
                        </span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                          style={{
                            width: '98%',
                            animation: 'growWidth 2s ease-out forwards',
                          }}
                        />
                      </div>
                    </div>

                    {/* Security Metrics */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="space-y-2 p-4 rounded-xl bg-blue-50 border border-blue-100">
                        <Shield className="w-8 h-8 text-blue-600" />
                        <div className="text-2xl font-bold text-gray-900">
                          100%
                        </div>
                        <div className="text-xs text-gray-600">
                          Protected Assets
                        </div>
                      </div>
                      <div className="space-y-2 p-4 rounded-xl bg-blue-50 border border-blue-100">
                        <Lock className="w-8 h-8 text-blue-600" />
                        <div className="text-2xl font-bold text-gray-900">
                          0
                        </div>
                        <div className="text-xs text-gray-600">Breaches</div>
                      </div>
                      <div className="space-y-2 p-4 rounded-xl bg-blue-50 border border-blue-100">
                        <Zap className="w-8 h-8 text-blue-600" />
                        <div className="text-2xl font-bold text-gray-900">
                          24/7
                        </div>
                        <div className="text-xs text-gray-600">Monitoring</div>
                      </div>
                      <div className="space-y-2 p-4 rounded-xl bg-blue-50 border border-blue-100">
                        <Award className="w-8 h-8 text-blue-600" />
                        <div className="text-2xl font-bold text-gray-900">
                          SOC 2
                        </div>
                        <div className="text-xs text-gray-600">Certified</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg transform rotate-12">
                    <div className="text-sm font-bold">Trusted Security</div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-100 rounded-full opacity-50 blur-2xl" />
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-100 rounded-full opacity-50 blur-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes growWidth {
          from {
            width: 0%;
          }
          to {
            width: 98%;
          }
        }
      `}</style>
    </section>
  );
}

export default HeroSection;
