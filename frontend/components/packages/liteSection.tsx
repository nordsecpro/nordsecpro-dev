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
    exclusiveWith: ['vciso-lite'], // Cannot be selected with GDPR package
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
    exclusiveWith: ['vciso-lite'], // Cannot be selected with Cloud Starter
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
    exclusiveWith: ['cloud-starter', 'gdpr-quick'], // Can be selected with any package
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
    <section className="py-16 sm:py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-200/40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Lite Packages
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Entry-level security solutions to get you started quickly
          </p>
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
                  className={`bg-gradient-to-br from-blue-50 to-white border-2 rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col ${
                    isDisabled
                      ? 'opacity-60 cursor-not-allowed border-gray-200'
                      : isSelected
                      ? 'border-blue-600 shadow-xl'
                      : 'border-blue-200 hover:border-blue-600 hover:shadow-xl hover:-translate-y-1'
                  }`}>
                  {/* Card Header */}
                  <CardHeader className="p-6 pb-4">
                    {pkg.badge && (
                      <div
                        className={`flex mx-auto items-center justify-center gap-1 ${colors.badge} text-white px-3 py-1.5 rounded-full text-xs font-bold mb-4 shadow-lg w-1/2`}>
                        <Star className="h-3 w-3" />
                        {pkg.badge}
                      </div>
                    )}

                    <div
                      className={`bg-blue-100 rounded-xl p-3 w-fit mb-4 transition-transform duration-300 ${
                        !isDisabled && 'hover:scale-110'
                      }`}>
                      <Icon className="h-7 w-7 text-blue-600" />
                    </div>

                    <CardTitle className="text-xl font-bold text-gray-900 mb-3 min-h-[3rem]">
                      {pkg.title}
                    </CardTitle>

                    {/* Price */}
                    <div className="mb-3">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-blue-600">
                          {pkg.currency}
                          {pkg.price.toLocaleString()}
                        </span>
                        {pkg.priceNote && (
                          <span className="text-base text-gray-600">
                            {pkg.priceNote}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {pkg.format} • {pkg.duration}
                      </p>
                    </div>
                  </CardHeader>

                  {/* Card Content */}
                  <CardContent className="px-6 pb-6 flex-1 flex flex-col">
                    <p className="text-sm text-gray-700 mb-5 leading-relaxed">
                      {pkg.scope}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2.5 mb-6 flex-1">
                      {pkg.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Disabled Message */}
                    {isDisabled && conflictingPackage && (
                      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
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
                        className="w-full bg-green-600 hover:bg-green-700 text-white h-12 rounded-lg font-semibold shadow-lg cursor-default flex items-center justify-center gap-2"
                        disabled>
                        <Check className="h-5 w-5" />
                        Added to Cart
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleAddToCart(pkg)}
                        disabled={isDisabled}
                        className={`w-full h-12 rounded-lg font-semibold shadow-md transition-all duration-300 flex items-center justify-center gap-2 ${
                          isDisabled
                            ? 'bg-gray-400 cursor-not-allowed text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg hover:scale-105'
                        }`}>
                        {isDisabled ? (
                          <>
                            <Lock className="h-5 w-5" />
                            Not Available
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="h-5 w-5" />
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
          <div className="text-center">
            <div className="inline-block bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:border-blue-600 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Explore Our Full Range
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Check out our Pro & Advanced packages for comprehensive security
                solutions
              </p>
              <Link href="/packages">
                <button className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 rounded-lg font-semibold text-base hover:scale-105 flex items-center gap-2 mx-auto">
                  See All Packages
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            Prices shown are starting rates. Final pricing may vary based on
            specific requirements.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Note: Some packages cannot be selected together due to service
            overlap
          </p>
        </div>
      </div>
    </section>
  );
}

export default LitePackagesSection;
