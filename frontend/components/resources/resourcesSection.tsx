'use client';
import {
  Shield,
  CheckCircle,
  FileCheck,
  Search,
  Download,
  Package,
  Sparkles,
} from 'lucide-react';
import Header from '@/components/common/header';

function ResourcesSection() {
  const handleDownload = (fileName: string, displayName: string) => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = `/assets/${fileName}`;
    link.download = displayName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resources = [
    {
      icon: FileCheck,
      title: 'SOC 2 Starter Kit',
      description:
        'Policies, templates, and controls checklist to jumpstart your compliance journey',
      fileName: 'soc2-starter-kit.pdf',
      displayName: 'SOC 2 Starter Kit - Cypentra.pdf',
      gradient: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      bgPattern:
        'bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.08),transparent_50%)]',
    },
    {
      icon: Shield,
      title: 'Cloud Security Cheat Sheet',
      description:
        'What to lock down first in AWS, Azure, or GCP — prioritized by risk',
      fileName: 'cloud-security-cheat-sheet.pdf',
      displayName: 'Cloud Security Cheat Sheet - Cypentra.pdf',
      gradient: 'from-blue-600 to-blue-700',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-700',
      bgPattern:
        'bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.08),transparent_50%)]',
    },
    {
      icon: Search,
      title: 'PenTest Readiness Guide',
      description:
        'How to prep your team for a security assessment and maximize value',
      fileName: 'pentest-readiness-guide.pdf',
      displayName: 'PenTest Readiness Guide - Cypentra.pdf',
      gradient: 'from-blue-500 to-blue-700',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      bgPattern:
        'bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_50%)]',
    },
  ];

  return (
    <section
      id="resources"
      className="py-32 bg-gradient-to-br from-white via-blue-50 to-white relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e0f2fe_1px,transparent_1px),linear-gradient(to_bottom,#e0f2fe_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      <div
        className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: '6s' }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: '8s' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className="text-center mb-32"
          style={{ animation: 'fadeInUp 1s ease forwards' }}>
          {/* <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <Package className="h-4 w-4" />
            <span>Free Downloads</span>
            <Sparkles className="h-3.5 w-3.5" />
          </div> */}

          <Header
            title="Resources"
            description="Build your internal knowledge base with our expert-crafted materials"
          />
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div
                key={index}
                className="relative group animate-fadeInUp"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both',
                }}>
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-700" />

                {/* Card */}
                <div
                  className={`relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl border-2 border-blue-300 hover:border-blue-500 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/20 h-full flex flex-col ${resource.bgPattern} group-hover:-translate-y-2 overflow-hidden`}>
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-[100px] rounded-tr-3xl" />

                  {/* Icon */}
                  <div className="relative mb-6">
                    <div
                      className={`${resource.iconBg} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                      <Icon className={`h-10 w-10 ${resource.iconColor}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow mb-6">
                    <h3 className="text-2xl lg:text-3xl font-black text-blue-900 leading-tight mb-4 group-hover:text-blue-700 transition-colors duration-500">
                      {resource.title}
                    </h3>
                    <p className="text-blue-900/75 text-base leading-relaxed font-medium">
                      {resource.description}
                    </p>
                  </div>

                  {/* Download Button */}
                  <button
                    onClick={() =>
                      handleDownload(resource.fileName, resource.displayName)
                    }
                    className={`w-full bg-gradient-to-r ${resource.gradient} text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 hover:shadow-xl hover:scale-105 transition-all duration-300 group/btn`}>
                    <Download className="h-5 w-5 group-hover/btn:animate-bounce" />
                    <span className="text-base">Download Free</span>
                  </button>

                  {/* Bottom Accent Line */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${resource.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    style={{
                      borderBottomLeftRadius: '1.5rem',
                      borderBottomRightRadius: '1.5rem',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Free Badge */}
        <div className="mt-24 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white border border-blue-500 rounded-full shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:-translate-y-1">
            <CheckCircle className="h-6 w-6 text-blue-600" />
            <span className="text-blue-900 font-bold text-lg">
              Free, no email gates
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}

export default ResourcesSection;
