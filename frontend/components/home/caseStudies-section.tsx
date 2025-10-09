'use client';
import { Shield, Rocket, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Case Studies Section Component
function CaseStudiesSection() {
  return (
    <section id="case-studies" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Case Studies
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real results for real businesses — see how we've helped companies
            secure their growth
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-4">
                <Rocket className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                  SaaS Startup
                </span>
              </div>
              <CardTitle>Fast-Track to SOC 2</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                <strong>Client:</strong> Early-stage HR tech platform
              </p>
              <p className="text-gray-700 mb-6">
                We helped the CTO implement controls, draft policies, and pass
                their audit in under 12 weeks.
              </p>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-green-800 font-semibold">
                  <strong>Outcome:</strong> Enterprise client win and faster due
                  diligence for investors.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
                <span className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                  Fintech Platform
                </span>
              </div>
              <CardTitle>Deep Penetration Testing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                <strong>Client:</strong> Series B payments company
              </p>
              <p className="text-gray-700 mb-6">
                Our test uncovered two critical flaws missed by prior
                assessments. With our remediation plan, they closed a
                seven-figure funding round.
              </p>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-purple-800 font-semibold">
                  <strong>Result:</strong> Critical vulnerabilities patched,
                  funding secured.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="h-6 w-6 text-orange-600" />
                <span className="text-sm font-semibold text-orange-600 uppercase tracking-wide">
                  Cloud Security
                </span>
              </div>
              <CardTitle>Security Overhaul</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                <strong>Client:</strong> AI SaaS with hybrid AWS/Azure
                environment
              </p>
              <p className="text-gray-700 mb-6">
                We delivered a prioritized roadmap that eliminated 85% of open
                cloud risks within 30 days.
              </p>
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-orange-800 font-semibold">
                  <strong>Impact:</strong> 85% risk reduction in 30 days.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default CaseStudiesSection;
