'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ShoppingCart,
  Check,
  Cloud,
  Shield,
  Users,
  ArrowRight,
  Sparkles,
  Zap,
  Star,
  Lock,
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import HeaderSection from '@/components/common/header';

const litePackages = [
  {
    id: 'cloud-starter',
    title: 'Cloud Security Starter Pack',
    icon: Cloud,
    price: 999,
    currency: '$',
    scope: 'Secure AWS/Azure/GCP setup (IAM, logging, MFA, baseline hardening)',
    format: 'One-time project',
    duration: '2 weeks',
    color: 'blue',
    features: [
      'IAM configuration & MFA setup',
      'Logging & monitoring baseline',
      'Security hardening checklist',
      'Cloud architecture review',
    ],
    exclusiveWith: ['gdpr-quick', 'vciso-lite'], // Cannot be selected with GDPR package
  },
  {
    id: 'gdpr-quick',
    title: 'GDPR & Privacy Quick-Setup',
    badge: 'EU/US',
    icon: Shield,
    price: 599,
    currency: '€',
    scope: 'Cookie banner, privacy policy, data mapping, risk assessment',
    format: 'Pre-defined deliverables',
    duration: '1h consultation',
    color: 'blue',
    features: [
      'Cookie consent banner setup',
      'Privacy policy template',
      'Data mapping documentation',
      'Compliance risk assessment',
    ],
    exclusiveWith: ['cloud-starter'], // Cannot be selected with Cloud Starter
  },
  {
    id: 'vciso-lite',
    title: 'vCISO Lite (On Demand)',
    badge: 'Most Flexible',
    icon: Users,
    price: 499,
    currency: '$',
    priceNote: '/month',
    scope: '4h/month advisory via Zoom/Meet + IR Plan + Policies',
    format: 'Monthly subscription',
    duration: 'Cancel anytime',
    color: 'blue',
    features: [
      '4 hours monthly advisory',
      'Incident response plan',
      'Policy templates & guidance',
      'Priority email support',
    ],
    exclusiveWith: ['cloud-starter'], // Can be selected with any package
  },
];

const getColorClasses = (color: string) => {
  const colors: Record<string, any> = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      border: 'border-blue-300',
      text: 'text-blue-600',
      badge: 'bg-gradient-to-r from-blue-500 to-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800',
      icon: 'bg-blue-100 text-blue-600',
    },
  };
  return colors[color];
};

function LitePackagesSection({ seeAll = true }) {
  const { addToCart, isPlanSelected } = useCart();

  // Check if a package is disabled due to exclusivity rules
  const isPackageDisabled = (pkg: any) => {
    if (!pkg.exclusiveWith || pkg.exclusiveWith.length === 0) {
      return false;
    }

    // Check if any exclusive package is already in the cart
    return pkg.exclusiveWith.some((exclusiveId: string) => {
      const exclusivePackage = litePackages.find((p) => p.id === exclusiveId);
      return exclusivePackage && isPlanSelected(exclusivePackage.title);
    });
  };

  // Get the name of the conflicting package
  const getConflictingPackageName = (pkg: any) => {
    if (!pkg.exclusiveWith || pkg.exclusiveWith.length === 0) {
      return null;
    }

    const conflictingId = pkg.exclusiveWith.find((exclusiveId: string) => {
      const exclusivePackage = litePackages.find((p) => p.id === exclusiveId);
      return exclusivePackage && isPlanSelected(exclusivePackage.title);
    });

    if (conflictingId) {
      const conflictingPackage = litePackages.find(
        (p) => p.id === conflictingId
      );
      return conflictingPackage?.title;
    }

    return null;
  };

  const handleAddToCart = (pkg: any) => {
    const planData = {
      planTitle: pkg.title,
      numberOfEmployees: 1,
      price: pkg.price,
      timestamp: Date.now(),
    };
    addToCart(planData);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-200/40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <Zap className="h-4 w-4" />
            <span>Quick Start Solutions</span>
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <HeaderSection
            title="Lite Packages"
            description="Entry-level security solutions to get you started quickly"
          />
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {litePackages.map((pkg, index) => {
            const colors = getColorClasses(pkg.color);
            const Icon = pkg.icon;
            const isSelected = isPlanSelected(pkg.title);
            const isDisabled = isPackageDisabled(pkg);
            const conflictingPackage = getConflictingPackageName(pkg);

            return (
              <div
                key={pkg.id}
                className="animate-in fade-in slide-in-from-bottom-8 duration-700"
                style={{ animationDelay: `${index * 150}ms` }}>
                <Card
                  className={`${colors.bg} border-2 ${
                    colors.border
                  } rounded-3xl overflow-hidden transition-all duration-500 h-full flex flex-col group ${
                    isDisabled
                      ? 'opacity-60 cursor-not-allowed'
                      : 'hover:shadow-2xl hover:-translate-y-2'
                  }`}>
                  {/* Card Header */}
                  <CardHeader className="pb-6 pt-8 px-8">
                    {pkg.badge && (
                      <div
                        className={`flex mx-auto items-center justify-center gap-1 ${colors.badge} text-white px-3 py-1.5 rounded-full text-xs font-bold mb-4 shadow-lg w-1/2`}>
                        <Star className="h-3 w-3" />
                        {pkg.badge}
                      </div>
                    )}

                    <div
                      className={`${colors.icon} rounded-2xl p-4 w-fit mb-4 ${
                        !isDisabled && 'group-hover:scale-110'
                      } transition-transform duration-300`}>
                      <Icon className="h-8 w-8" />
                    </div>

                    <CardTitle className="text-2xl font-bold text-slate-900 mb-3 min-h-[4rem] flex items-start">
                      {pkg.title}
                    </CardTitle>

                    {/* Price */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className={`text-4xl font-bold ${colors.text}`}>
                          {pkg.currency}
                          {pkg.price.toLocaleString()}
                        </span>
                        {pkg.priceNote && (
                          <span className="text-lg text-slate-600">
                            {pkg.priceNote}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mt-2">
                        {pkg.format} • {pkg.duration}
                      </p>
                    </div>
                  </CardHeader>

                  {/* Card Content */}
                  <CardContent className="px-8 pb-8 flex-1 flex flex-col">
                    <p className="text-sm text-slate-700 mb-6 leading-relaxed">
                      {pkg.scope}
                    </p>

                    {/* Features List */}
                    <div className="space-y-3 mb-8 flex-1">
                      {pkg.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Check
                            className={`h-5 w-5 ${colors.text} flex-shrink-0 mt-0.5`}
                          />
                          <span className="text-sm text-slate-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Disabled Message */}
                    {isDisabled && conflictingPackage && (
                      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                        <div className="flex items-start gap-2">
                          <Lock className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-amber-700 leading-relaxed">
                            Cannot be selected with{' '}
                            <strong>{conflictingPackage}</strong>
                          </p>
                        </div>
                      </div>
                    )}

                    {/* CTA Button */}
                    {isSelected ? (
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-white h-14 rounded-2xl font-bold shadow-lg"
                        disabled>
                        <Check className="h-5 w-5 mr-2" />
                        Added to Cart
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleAddToCart(pkg)}
                        disabled={isDisabled}
                        className={`w-full ${
                          isDisabled
                            ? 'bg-gray-400 cursor-not-allowed'
                            : `${colors.button} hover:shadow-2xl`
                        } text-white h-14 rounded-2xl font-bold shadow-xl transition-all duration-300 group/btn`}>
                        {isDisabled ? (
                          <>
                            <Lock className="h-5 w-5 mr-2" />
                            Not Available
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="h-5 w-5 mr-2 transition-transform group-hover/btn:scale-110" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* See All Packages CTA */}
        {seeAll && (
          <div
            className="text-center animate-in fade-in zoom-in-95 duration-700"
            style={{ animationDelay: '600ms' }}>
            <div className="inline-block bg-white rounded-3xl shadow-2xl p-10 border-2 border-slate-200 hover:border-blue-300 hover:shadow-blue-100/50 transition-all duration-500">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full mb-6">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">
                  Need More Power?
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Explore Our Full Range
              </h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Check out our Pro & Advanced packages for comprehensive security
                solutions
              </p>

              <Link href="/packages" className="group inline-block">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-10 py-7 rounded-2xl font-bold text-base group-hover:scale-105">
                  See All Packages
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Prices shown are starting rates. Final pricing may vary based on
            specific requirements.
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Note: Some packages cannot be selected together due to service
            overlap
          </p>
        </div>
      </div>
    </section>
  );
}

export default LitePackagesSection;
