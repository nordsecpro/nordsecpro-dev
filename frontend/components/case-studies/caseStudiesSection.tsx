'use client';

import {
  Shield,
  Rocket,
  Zap,
  Award,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Case Studies Data
const caseStudies = [
  {
    icon: Rocket,
    category: 'SaaS Startup',
    title: 'Fast-Track to SOC 2',
    client: 'Early-stage HR tech platform',
    description:
      'We helped the CTO implement controls, draft policies, and pass their audit in under 12 weeks.',
    outcome: 'Enterprise client win and faster due diligence for investors.',
    metrics: ['12 weeks', 'SOC 2 Type II', '100% Pass Rate'],
  },
  {
    icon: Shield,
    category: 'Fintech Platform',
    title: 'Deep Penetration Testing',
    client: 'Series B payments company',
    description:
      'Our test uncovered two critical flaws missed by prior assessments. With our remediation plan, they closed a seven-figure funding round.',
    outcome: 'Critical vulnerabilities patched, funding secured.',
    metrics: ['2 Critical Issues', '7-Figure Round', '0 Breaches'],
  },
  {
    icon: Zap,
    category: 'Cloud Security',
    title: 'Security Overhaul',
    client: 'AI SaaS with hybrid AWS/Azure environment',
    description:
      'We delivered a prioritized roadmap that eliminated 85% of open cloud risks within 30 days.',
    outcome: '85% risk reduction in 30 days.',
    metrics: ['85% Reduction', '30 Days', 'Multi-Cloud'],
  },
];

// Hero Section
function CaseStudiesHero() {
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

      {/* Subtle background elements */}
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
            Case
            <span className="block text-blue-600 mt-2">Studies</span>
          </h1>

          <p
            className={`text-lg sm:text-xl text-gray-600 leading-relaxed transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}>
            Real results for real businesses — see how we've helped companies
            secure their growth and achieve compliance excellence
          </p>
        </div>
      </div>
    </section>
  );
}

// Case Study Card Component
type CaseStudy = {
  icon: React.ElementType;
  category: string;
  title: string;
  client: string;
  description: string;
  outcome: string;
  metrics: string[];
};

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  const Icon = study.icon;
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:border-blue-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div
              className={`bg-blue-600 p-4 rounded-xl shadow-md transition-all duration-300 ${
                isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'
              }`}>
              <Icon className="h-7 w-7 text-white" />
            </div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
              {study.category}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-300">
            {study.title}
          </h3>
          <div className="h-1 w-16 bg-blue-600 rounded-full" />
        </div>

        {/* Content */}
        <div className="space-y-5 flex-grow">
          <div className="flex items-start gap-3">
            <Award className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-1">Client</p>
              <p className="text-sm text-gray-600">{study.client}</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">{study.description}</p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2">
            {study.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="text-center bg-blue-50 rounded-lg p-2.5 border border-blue-100 hover:bg-blue-100 hover:border-blue-200 transition-all duration-300">
                <p className="text-xs font-bold text-blue-600">{metric}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Outcome */}
        <div className="mt-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-5 shadow-md">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white/90 font-semibold text-xs uppercase tracking-wide mb-1">
                Outcome
              </p>
              <p className="text-white font-medium leading-relaxed">
                {study.outcome}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Case Studies Grid Section
function CaseStudiesGrid() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={index} study={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Case Studies Page Component
export default function CaseStudiesPage() {
  return (
    <div className="bg-white min-h-screen">
      <CaseStudiesHero />
      <CaseStudiesGrid />
    </div>
  );
}
