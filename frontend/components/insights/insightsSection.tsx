'use client';

import { useState, useEffect } from 'react';
import {
  BookOpen,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  FileText,
  Calendar,
} from 'lucide-react';

// Hero Section
function InsightsHero() {
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
            Security
            <span className="block text-blue-600 mt-2">Insights</span>
          </h1>

          <p
            className={`text-lg sm:text-xl text-gray-600 leading-relaxed transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}>
            Actionable ideas. No fluff. Expert guidance on compliance, security,
            and growth strategies for modern SaaS businesses.
          </p>
        </div>
      </div>
    </section>
  );
}

// Insight Card Component
type Insight = {
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

function InsightCard({ insight, index }: { insight: Insight; index: number }) {
  const Icon = insight.icon;
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:border-blue-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col cursor-pointer group">
        {/* Icon */}
        <div
          className={`bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
            isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'
          }`}>
          <Icon className="h-7 w-7 text-blue-600" />
        </div>

        {/* Category Badge */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            {insight.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
          {insight.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed flex-grow mb-6">
          {insight.description}
        </p>

        {/* Bottom accent line */}
        <div className="mt-6 h-1 w-0 bg-blue-600 rounded-full group-hover:w-full transition-all duration-500" />
      </div>
    </div>
  );
}

// Insights Grid Section
function InsightsGrid() {
  const insights = [
    {
      category: 'COMPLIANCE',
      icon: FileText,
      title: 'SOC 2 vs ISO 27001: What Your SaaS Needs to Know',
      description:
        'Understanding the key differences and choosing the right framework for your business stage.',
    },
    {
      category: 'FUNDING',
      icon: TrendingUp,
      title: 'Security Debt: The Silent Killer of Series A Deals',
      description:
        'How security gaps can derail fundraising and what VCs really look for in due diligence.',
    },
    {
      category: 'STRATEGY',
      icon: Lightbulb,
      title: 'Prioritizing Security with a Team of Three',
      description:
        'Practical security wins for resource-constrained startups — maximum impact, minimal overhead.',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((insight, index) => (
            <InsightCard key={index} insight={insight} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Insights Page Component
export default function InsightsPage() {
  return (
    <div className="bg-white min-h-screen">
      <InsightsHero />
      <InsightsGrid />
    </div>
  );
}
