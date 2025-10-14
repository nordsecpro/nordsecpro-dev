'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Rocket,
  Search,
  Wrench,
  CheckCircle,
  TrendingUp,
  ArrowRight,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Link from 'next/link';

// Types
interface RoadmapStep {
  number: string;
  title: string;
  subtitle: string;
  timeline: string;
  icon: any;
  color: string;
  description: string;
  details: string[];
}

interface ColorClasses {
  bg: string;
  border: string;
  text: string;
  badge: string;
}

// Data
const roadmapSteps: RoadmapStep[] = [
  {
    number: '01',
    title: 'Kickoff',
    subtitle: 'Purchase & Setup',
    timeline: 'Day 0-2',
    icon: Rocket,
    color: 'blue',
    description: '15-min intro call & access setup',
    details: [
      'Secure online checkout completed',
      'Confirmation email with next steps',
      '15-min kickoff call scheduled within 2 business days',
      'Customer provides access list (read-only whenever possible)',
    ],
  },
  {
    number: '02',
    title: 'Discovery',
    subtitle: 'Mapping & Analysis',
    timeline: 'Week 1',
    icon: Search,
    color: 'blue',
    description: 'Environment mapping & baseline checks',
    details: [
      'Confirm scope (Cloud, GDPR, or vCISO Lite)',
      'Baseline checks on current setup',
      'Identify "quick wins" for immediate improvement',
      'Provide initial findings summary',
    ],
  },
  {
    number: '03',
    title: 'Implementation',
    subtitle: 'Fixes & Hardening',
    timeline: 'Week 2-3',
    icon: Wrench,
    color: 'blue',
    description: 'Policies, controls & hardening',
    details: [
      'Implement priority fixes (IAM, logging, compliance)',
      'Validate configurations and security controls',
      'Document changes in action log',
      'Ongoing check-ins via email/Slack',
    ],
  },
  {
    number: '04',
    title: 'Validation',
    subtitle: 'Review & Handover',
    timeline: 'End of Week 3',
    icon: CheckCircle,
    color: 'blue',
    description: 'Testing & risk assessment',
    details: [
      '30-min live walkthrough of results',
      'Delivery of final package (reports, templates)',
      'Customer Q&A with tailored recommendations',
      'Optional training for internal staff',
    ],
  },
  {
    number: '05',
    title: 'Advisory',
    subtitle: 'Optional Upgrade',
    timeline: 'Month 2+',
    icon: TrendingUp,
    color: 'blue',
    description: 'Continuous improvement & guidance',
    details: [
      'Move into SOC 2 gap analysis for compliance',
      'Schedule penetration test to validate security',
      'Upgrade to full vCISO retainer with monthly governance',
      'Ongoing strategic security partnership',
    ],
  },
];

// Utility function
const getColorClasses = (color: string): ColorClasses => {
  const colors: Record<string, ColorClasses> = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600',
      badge: 'bg-blue-600',
    },
  };
  return colors[color] || colors.blue;
};

// Section Header Component
const RoadmapHeader = () => (
  <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
    {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
      <Clock className="h-4 w-4" />
      <span>From Start to Secure in 3 Weeks</span>
    </div> */}
    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
      Our Proven 5-Step Security Roadmap
    </h2>
    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
      A clear, transparent process that takes you from vulnerability to victory
    </p>
  </div>
);

// Desktop Card Component
interface DesktopCardProps {
  step: RoadmapStep;
  index: number;
}

const DesktopCard: React.FC<DesktopCardProps> = ({ step, index }) => {
  const colors = getColorClasses(step.color);
  const Icon = step.icon;

  return (
    <div
      className="relative group animate-in fade-in slide-in-from-bottom-4 duration-700"
      style={{ animationDelay: `${index * 100}ms` }}>
      {/* Icon Circle */}
      <div
        className={`mx-auto w-20 h-20 ${colors.badge} rounded-full flex items-center justify-center mb-6 mt-10 shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}>
        <Icon className="h-10 w-10 text-white" />
      </div>

      {/* Card with fixed height */}
      <div
        className={`${colors.bg} border-2 ${colors.border} rounded-xl p-6 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 h-[280px] flex flex-col`}>
        <div className={`text-xs font-bold ${colors.text} mb-2`}>
          {step.number}
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h3>
        <p className="text-sm font-medium text-slate-600 mb-3">
          {step.subtitle}
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
          <Calendar className="h-3 w-3" />
          <span>{step.timeline}</span>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed flex-1">
          {step.description}
        </p>
      </div>
    </div>
  );
};

// Desktop Timeline Component
const DesktopTimeline = () => (
  <div className="hidden lg:block mb-16">
    <div className="relative">
      {/* Connection Line */}
      <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-indigo-200 to-blue-200" />

      <div className="grid grid-cols-5 gap-4">
        {roadmapSteps.map((step, index) => (
          <DesktopCard key={index} step={step} index={index} />
        ))}
      </div>
    </div>
  </div>
);

// Mobile Accordion Card Component
interface MobileCardProps {
  step: RoadmapStep;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const MobileCard: React.FC<MobileCardProps> = ({
  step,
  index,
  isExpanded,
  onToggle,
}) => {
  const colors = getColorClasses(step.color);
  const Icon = step.icon;

  return (
    <div
      className={`${colors.bg} border-2 ${colors.border} rounded-xl overflow-hidden transition-all animate-in fade-in slide-in-from-left duration-500`}
      style={{ animationDelay: `${index * 100}ms` }}>
      <button
        onClick={onToggle}
        className="w-full p-6 text-left flex items-start gap-4">
        <div className={`${colors.badge} rounded-full p-3 flex-shrink-0`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className={`text-xs font-bold ${colors.text}`}>
              {step.number}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Calendar className="h-3 w-3" />
              <span>{step.timeline}</span>
            </div>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            {step.title}
          </h3>
          <p className="text-sm text-slate-600">{step.subtitle}</p>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-slate-400 flex-shrink-0 mt-1" />
        ) : (
          <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0 mt-1" />
        )}
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
          <div className="border-t border-slate-200 pt-4">
            <p className="text-sm text-slate-700 mb-4 font-medium">
              {step.description}
            </p>
            <ul className="space-y-2">
              {step.details.map((detail, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// Mobile Accordion Component
const MobileAccordion = () => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div className="lg:hidden space-y-4 mb-16">
      {roadmapSteps.map((step, index) => (
        <MobileCard
          key={index}
          step={step}
          index={index}
          isExpanded={expandedStep === index}
          onToggle={() =>
            setExpandedStep(expandedStep === index ? null : index)
          }
        />
      ))}
    </div>
  );
};

// CTA Component
const RoadmapCTA = () => (
  <div
    className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700"
    style={{ animationDelay: '600ms' }}>
    <div className="inline-block bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
      <p className="text-lg text-slate-700 mb-6 font-medium">
        Want to know which package fits your stage?
      </p>
      <Link href="/packages" className="group">
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 rounded-xl font-semibold group-hover:scale-105">
          Explore Our Packages
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </Link>
    </div>
  </div>
);

// Main Section Component
const RoadmapSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RoadmapHeader />
        <DesktopTimeline />
        <MobileAccordion />
        <RoadmapCTA />
      </div>
    </section>
  );
};

export default RoadmapSection;
