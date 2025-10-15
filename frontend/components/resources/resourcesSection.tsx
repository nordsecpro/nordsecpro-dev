'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield,
  CheckCircle,
  FileCheck,
  Search,
  Download,
  BookOpen,
} from 'lucide-react';

// Hero Section
function ResourcesHero() {
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
            <span className="block text-blue-600 mt-2">Resources</span>
          </h1>

          <p
            className={`text-lg sm:text-xl text-gray-600 leading-relaxed transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}>
            Build your internal knowledge base with our expert-crafted
            materials. No email required, just instant access to valuable
            security guides.
          </p>
        </div>
      </div>
    </section>
  );
}

// Resource Card Component
type Resource = {
  icon: React.ElementType;
  title: string;
  description: string;
  fileName: string;
  displayName: string;
};

interface ResourceCardProps {
  resource: Resource;
  index: number;
}

function ResourceCard({ resource, index }: ResourceCardProps) {
  const Icon = resource.icon;
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);

    return () => clearTimeout(timer);
  }, [index]);

  const handleDownload = () => {
    // Simulate download
    console.log(`Downloading: ${resource.displayName}`);
    alert(`Downloading: ${resource.title}`);
  };

  return (
    <div
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:border-blue-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
        {/* Icon */}
        <div
          className={`bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
            isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'
          }`}>
          <Icon className="h-8 w-8 text-blue-600" />
        </div>

        {/* Content */}
        <div className="flex-grow mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-300">
            {resource.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {resource.description}
          </p>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-3 hover:shadow-lg transition-all duration-300 group">
          <Download className="h-5 w-5 group-hover:animate-bounce" />
          <span>Download Free</span>
        </button>
      </div>
    </div>
  );
}

// Resources Grid Section
function ResourcesGrid() {
  const resources = [
    {
      icon: FileCheck,
      title: 'SOC 2 Starter Kit',
      description:
        'Policies, templates, and controls checklist to jumpstart your compliance journey',
      fileName: 'soc2-starter-kit.pdf',
      displayName: 'SOC 2 Starter Kit - SecureCore.pdf',
    },
    {
      icon: Shield,
      title: 'Cloud Security Cheat Sheet',
      description:
        'What to lock down first in AWS, Azure, or GCP — prioritized by risk',
      fileName: 'cloud-security-cheat-sheet.pdf',
      displayName: 'Cloud Security Cheat Sheet - SecureCore.pdf',
    },
    {
      icon: Search,
      title: 'PenTest Readiness Guide',
      description:
        'How to prep your team for a security assessment and maximize value',
      fileName: 'pentest-readiness-guide.pdf',
      displayName: 'PenTest Readiness Guide - SecureCore.pdf',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} index={index} />
          ))}
        </div>

        {/* Free Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border-2 border-blue-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
            <CheckCircle className="h-6 w-6 text-blue-600" />
            <span className="text-gray-900 font-semibold text-lg">
              Free, no email gates
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Why Download Section
function WhyDownloadSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('why-download');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      title: 'Expert Crafted',
      description: 'Created by certified security professionals',
      icon: Shield,
    },
    {
      title: 'Actionable Guides',
      description: 'Step-by-step instructions you can implement today',
      icon: BookOpen,
    },
    {
      title: 'Free Forever',
      description: 'No strings attached, no email required',
      icon: CheckCircle,
    },
  ];

  return (
    <section id="why-download" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Download Our Resources?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to strengthen your security posture
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`text-center p-6 transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('cta-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cta-section"
      className="py-16 bg-gradient-to-br from-blue-600 to-blue-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className={`text-3xl sm:text-4xl font-bold text-white mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          Need More Guidance?
        </h2>
        <p
          className={`text-lg text-blue-100 mb-8 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          Our team is here to help you implement these strategies
        </p>
        <div
          className={`transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <Link href="/contact">
            <button className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 rounded-lg font-semibold text-base shadow-lg transition-all duration-300 hover:scale-105">
              Schedule a Consultation
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Main Resources Page Component
export default function ResourcesPage() {
  return (
    <div className="bg-white min-h-screen">
      <ResourcesHero />
      <ResourcesGrid />
      <WhyDownloadSection />
      <CTASection />
    </div>
  );
}
