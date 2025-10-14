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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';

function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-cyan-500/20 via-transparent to-indigo-500/20" />
        </div>

        {/* Animated Geometric Shapes */}
        <div className="absolute inset-0">
          <div
            className="absolute top-10 left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 opacity-10"
            style={{
              background:
                'conic-gradient(from 45deg, transparent, rgba(59, 130, 246, 0.5), transparent)',
              animation: 'rotate 20s linear infinite',
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            }}
          />
          <div
            className="absolute bottom-20 right-10 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 opacity-10"
            style={{
              background:
                'conic-gradient(from -45deg, transparent, rgba(168, 85, 247, 0.5), transparent)',
              animation: 'rotate 25s linear infinite reverse',
              transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            }}
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${
                  10 + Math.random() * 20
                }s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left space-y-4 sm:space-y-6 md:space-y-8">
                {/* Main Headline */}
                <div
                  className={`space-y-2 sm:space-y-3 md:space-y-4 transition-all duration-1000 delay-200 ${
                    isLoaded
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-10'
                  }`}>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                    <span className="block text-white/90">Secure</span>
                    <span className="block">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
                        The Center
                      </span>
                    </span>
                    <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white/70 mt-2">
                      Of Your Business
                    </span>
                  </h1>
                </div>

                {/* Subheading */}
                <p
                  className={`text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-xl mx-auto lg:mx-0 leading-relaxed transition-all duration-1000 delay-400 ${
                    isLoaded
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-10'
                  }`}>
                  Enterprise-grade security solutions with SOC 2, vCISO, and
                  Cloud Security expertise tailored for modern businesses.
                </p>

                {/* Feature Pills */}
                <div
                  className={`flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start transition-all duration-1000 delay-500 ${
                    isLoaded
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}>
                  {[
                    'SOC 2 Certified',
                    'ISO 27001',
                    '24/7 Support',
                    'Cloud Native',
                  ].map((feature, idx) => (
                    <div
                      key={feature}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105"
                      style={{ animationDelay: `${idx * 100}ms` }}>
                      <span className="text-[10px] sm:text-xs md:text-sm text-white/80 font-medium whitespace-nowrap">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div
                  className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-4 transition-all duration-1000 delay-600 ${
                    isLoaded
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}>
                  <Link href="/contact" className="group">
                    <Button className="w-full sm:w-auto relative overflow-hidden bg-blue-500 hover:bg-blue-600 text-white border-0 shadow-2xl shadow-blue-500/30 hover:shadow-purple-500/30 transition-all duration-500 text-xs sm:text-sm md:text-base px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 rounded-xl font-semibold group-hover:scale-105">
                      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative flex items-center justify-center gap-2">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                        Book Consultation
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </span>
                    </Button>
                  </Link>

                  <Link href="/packages" className="group">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto bg-white/5 backdrop-blur-md text-white border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-300 text-xs sm:text-sm md:text-base px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 rounded-xl font-semibold group-hover:scale-105">
                      <span className="flex items-center justify-center gap-2 text-white hover:text-white">
                        <Package className=" w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:-rotate-12 transition-transform" />
                        View Packages
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Visual Element */}
              <div
                className={`hidden lg:block relative transition-all duration-1000 delay-800 ${
                  isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}>
                <div className="relative w-full h-[500px] xl:h-[600px]">
                  {/* Central Shield */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <Shield
                        className="w-32 h-32 xl:w-40 xl:h-40 text-blue-400/30"
                        style={{ animation: 'pulse 3s ease-in-out infinite' }}
                      />
                      <div className="absolute inset-0 bg-blue-400/20 blur-3xl animate-pulse" />
                    </div>
                  </div>

                  {/* Orbiting Elements */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 xl:w-96 xl:h-96"
                    style={{ animation: 'rotate 20s linear infinite' }}>
                    <Lock className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 text-cyan-400" />
                    <Zap className="absolute top-1/2 right-0 -translate-y-1/2 w-8 h-8 text-purple-400" />
                    <Star className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 text-yellow-400" />
                    <Award className="absolute top-1/2 left-0 -translate-y-1/2 w-8 h-8 text-green-400" />
                  </div>

                  {/* Connecting Lines */}
                  <svg className="absolute inset-0 w-full h-full">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="120"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="1"
                      strokeDasharray="5 10"
                      opacity="0.3"
                      style={{
                        animation: 'rotate 30s linear infinite reverse',
                      }}
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="160"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="1"
                      strokeDasharray="10 5"
                      opacity="0.2"
                      style={{ animation: 'rotate 40s linear infinite' }}
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Mobile Only Security Icons */}
        <div className="lg:hidden pb-8 px-4">
          <div className="flex justify-center gap-8">
            <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400/30 animate-pulse" />
            <Lock className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400/30 animate-pulse animation-delay-200" />
            <Zap className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400/30 animate-pulse animation-delay-400" />
          </div>
        </div>
      </div>

      {/* Animated Styles */}
      <style jsx>{`
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(5px) translateX(-5px);
          }
          75% {
            transform: translateY(-5px) translateX(10px);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </section>
  );
}

export default HeroSection;
