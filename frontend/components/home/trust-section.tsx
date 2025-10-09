'use client';
import { CheckCircle, Award } from 'lucide-react';

// Trust & Certifications Section Component
function TrustSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trust & Certifications
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Security is only as strong as the team behind it
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Our team holds credentials including:
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Award className="h-6 w-6 text-blue-600" />
                <span className="text-gray-700">
                  CISSP (Certified Information Systems Security Professional)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-6 w-6 text-blue-600" />
                <span className="text-gray-700">
                  OSCP (Offensive Security Certified Professional)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-6 w-6 text-blue-600" />
                <span className="text-gray-700">
                  AWS Certified Security Specialist
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Compliance experience:
            </h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <span className="text-gray-700">SOC 2, ISO 27001, PCI-DSS</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <span className="text-gray-700">
                  SaaS platforms, fintech firms, and high-growth startups
                </span>
              </div>
            </div>
            <p className="text-gray-600">
              Due diligence support available for VC funding, M&A, and
              enterprise onboarding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
