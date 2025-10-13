'use client';

import {
  Check,
  Calendar,
  Mail,
  Star,
  Sparkles,
  ArrowRight,
  Zap,
  Award,
  Lock,
} from 'lucide-react';
import HeaderSection from '../header';

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

// Section Header Component
const SectionHeader = ({ title, description, badge }: any) => (
  <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
      <Zap className="h-4 w-4" />
      <span>{badge}</span>
      <Sparkles className="h-3.5 w-3.5" />
    </div>

    <HeaderSection title={title} description={description} />
  </div>
);

// Advanced Package Card
const AdvancedPackageCard = ({ pkg, index }: any) => {
  const Icon = pkg.icon;

  const handleCalendlyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(
      'https://calendly.com/cypentra',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = 'mailto:support@cypentra.com';
  };

  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-8 duration-700"
      style={{ animationDelay: `${index * 100}ms` }}>
      <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-300 rounded-3xl p-8 hover:border-blue-500 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
        {pkg.badge && (
          <div className="inline-flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-bold mb-4 w-fit shadow-lg">
            <Star className="h-3 w-3" />
            {pkg.badge}
          </div>
        )}

        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/30 rounded-bl-full" />

        <div className="relative z-10 flex flex-col h-full">
          <div className="bg-blue-600 rounded-2xl p-4 w-fit mb-6">
            <Icon className="h-8 w-8 text-white" />
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            {pkg.title}
          </h3>

          <div className="mb-6">
            <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
              Custom Pricing
            </div>
            <p className="text-sm text-slate-600 mt-3">
              {pkg.format} • {pkg.duration}
            </p>
          </div>

          <p className="text-sm text-slate-700 mb-6 leading-relaxed">
            {pkg.scope}
          </p>

          <div className="space-y-3 mb-8 flex-1">
            {pkg.features.map((feature: string, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-5 w-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm text-slate-700 font-medium">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-3 mt-auto">
            <button
              onClick={handleCalendlyClick}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white h-14 rounded-2xl font-bold shadow-xl hover:shadow-2xl active:shadow-lg transition-all duration-300 group flex items-center justify-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>Book a Zoom Meeting</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={handleEmailClick}
              className="w-full bg-white border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-50 active:bg-blue-100 text-blue-600 h-12 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2">
              <Mail className="h-5 w-5" />
              <span>Email Us</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const AdvancedPackageSection = () => {
  return (
    <section className="py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-200/40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Advanced Packages Section */}
        <SectionHeader
          badge="Enterprise Solutions"
          title="Advanced Packages"
          description="Comprehensive security programs for growing and established businesses"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advancedPackages.map((pkg, index) => (
            <AdvancedPackageCard key={pkg.id} pkg={pkg} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvancedPackageSection;
