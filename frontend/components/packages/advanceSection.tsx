'use client';

import {
  Check,
  Calendar,
  Mail,
  Star,
  ArrowRight,
  Zap,
  Award,
  Lock,
} from 'lucide-react';
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  Key,
} from 'react';

// Advanced Packages Data
const advancedPackages = [
  {
    id: 'soc2-ready',
    title: 'SOC 2 Readiness Program',
    icon: Award,
    badge: 'Most Popular',
    scope:
      'Complete SOC 2 Type II preparation with gap analysis and documentation',
    format: 'Comprehensive program',
    duration: '3-6 months',
    features: [
      'Full gap analysis & remediation',
      'Policy & procedure development',
      'Control implementation support',
      'Pre-audit readiness assessment',
      'Vendor management framework',
      'Continuous monitoring setup',
    ],
  },
  {
    id: 'enterprise-vciso',
    title: 'Enterprise vCISO',
    icon: Lock,
    scope:
      'Dedicated security leadership and strategic guidance for your organization',
    format: 'Ongoing engagement',
    duration: 'Monthly retainer',
    features: [
      'Dedicated vCISO support',
      'Strategic security roadmap',
      'Board-level reporting',
      'Incident response leadership',
      'Security program management',
      'Compliance oversight (SOC 2, ISO, GDPR)',
    ],
  },
  {
    id: 'penetration-testing',
    title: 'Advanced Penetration Testing',
    icon: Zap,
    scope: 'Comprehensive security testing with detailed remediation guidance',
    format: 'One-time assessment',
    duration: '2-4 weeks',
    features: [
      'External & internal testing',
      'Web application testing',
      'API security assessment',
      'Social engineering testing',
      'Detailed remediation report',
      'Post-test consultation',
    ],
  },
];

// Advanced Package Card
type AdvancedPackage = {
  id: string;
  title: string;
  icon: React.ElementType;
  badge?: string;
  scope: string;
  format: string;
  duration: string;
  features: (
    | string
    | number
    | bigint
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | Promise<AwaitedReactNode>
    | null
    | undefined
  )[];
};

function AdvancedPackageCard({ pkg }: { pkg: AdvancedPackage }) {
  const Icon = pkg.icon;

  const handleCalendlyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(
      'https://calendly.com/cypentra-consultation',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = 'mailto:support@cypentra.com';
  };

  return (
    <div className="h-full">
      <div className="bg-white border-2 border-blue-200 rounded-2xl p-8 hover:border-blue-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col relative overflow-hidden group">
        {/* Badge */}
        {pkg.badge && (
          <div className="inline-flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold mb-4 w-fit shadow-md">
            <Star className="h-3 w-3" />
            {pkg.badge}
          </div>
        )}

        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Icon */}
          <div className="bg-blue-600 rounded-xl p-3 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
            <Icon className="h-7 w-7 text-white" />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{pkg.title}</h3>

          {/* Pricing */}
          <div className="mb-4">
            <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-md">
              Custom Pricing
            </div>
            <p className="text-sm text-gray-600 mt-3">
              {pkg.format} • {pkg.duration}
            </p>
          </div>

          {/* Scope */}
          <p className="text-sm text-gray-700 mb-6 leading-relaxed">
            {pkg.scope}
          </p>

          {/* Features */}
          <div className="space-y-3 mb-6 flex-1">
            {pkg.features.map(
              (
                feature:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<AwaitedReactNode>
                  | null
                  | undefined,
                i: Key | null | undefined
              ) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">
                    {feature}
                  </span>
                </div>
              )
            )}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 mt-auto">
            <button
              onClick={handleCalendlyClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group/btn flex items-center justify-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>Book a Zoom Meeting</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>

            <button
              onClick={handleEmailClick}
              className="w-full bg-white border-2 border-blue-200 hover:border-blue-600 hover:bg-blue-50 text-blue-600 h-12 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2">
              <Mail className="h-5 w-5" />
              <span>Email Us</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Component
function AdvancedPackageSection() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, #2563eb 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Advanced Packages
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive security programs for growing and established
            businesses
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advancedPackages.map((pkg, index) => (
            <AdvancedPackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            All advanced packages include dedicated support and custom
            implementation
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Contact us for a personalized quote based on your specific needs
          </p>
        </div>
      </div>
    </section>
  );
}

export default AdvancedPackageSection;
