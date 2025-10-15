'use client';

import { useState, useEffect } from 'react';
import { Cloud, Shield, Users, Lock, Zap, Award } from 'lucide-react';
import LitePackagesSection from '@/components/packages/liteSection';
import AdvancedPackagesSection from '@/components/packages/advanceSection';

// Lite Packages Data
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
    features: [
      'IAM configuration & MFA setup',
      'Logging & monitoring baseline',
      'Security hardening checklist',
      'Cloud architecture review',
    ],
    exclusiveWith: ['vciso-lite'],
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
    features: [
      'Cookie consent banner setup',
      'Privacy policy template',
      'Data mapping documentation',
      'Compliance risk assessment',
    ],
    exclusiveWith: ['vciso-lite'],
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
    features: [
      '4 hours monthly advisory',
      'Incident response plan',
      'Policy templates & guidance',
      'Priority email support',
    ],
    exclusiveWith: ['cloud-starter', 'gdpr-quick'],
  },
];

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

// Hero Section
function PackagesHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

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
        <div className="text-center max-w-4xl mx-auto">
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 transition-all duration-700 delay-100 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}>
            Security
            <span className="block text-blue-600 mt-2">Packages</span>
          </h1>

          <p
            className={`text-lg sm:text-xl text-gray-600 leading-relaxed transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}>
            From quick-start solutions to comprehensive enterprise programs.
            Choose the security package that fits your business needs and
            budget.
          </p>
        </div>
      </div>
    </section>
  );
}

// Main Packages Page
export default function PackagesPage() {
  return (
    <div className="bg-white min-h-screen">
      <PackagesHero />
      <LitePackagesSection seeAll={false} />
      <AdvancedPackagesSection />
    </div>
  );
}
