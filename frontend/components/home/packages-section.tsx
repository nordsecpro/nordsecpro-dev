'use client';

import {
  Shield,
  Users,
  CheckCircle,
  Rocket,
  FileCheck,
  Search,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';

// Packages Section Component
function PackagesSection() {
  const [expandedPackages, setExpandedPackages] = useState<{
    [key: string]: boolean;
  }>({});

  const togglePackage = (packageId: string) => {
    setExpandedPackages((prev) => ({
      ...prev,
      [packageId]: !prev[packageId],
    }));
  };

  return (
    <section id="packages" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Remove Shield icon for mobile, show only on lg+ */}
          <div className="hidden lg:flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Security & Compliance Packages
            </h2>
          </div>
          <div className="lg:hidden mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Security & Compliance Packages
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Designed for Scaling Startups — Tailored security solutions for
            every stage of your business growth
          </p>
        </div>

        {/* No Contract Banner */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center space-x-3 bg-green-50 border-2 border-green-200 px-8 py-4 rounded-full">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <span className="text-lg font-bold text-green-800">
              No contract. Cancel anytime.
            </span>
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <p className="mt-3 text-gray-600">
            Flexible cybersecurity services that adapt to your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* 1. Startup Security Launchpad */}
          <Card className="relative hover:shadow-xl transition-shadow border-2 hover:border-blue-200 h-full flex flex-col">
            <CardHeader className="text-center pb-6 flex-grow flex flex-col">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg mb-2 min-h-[3.5rem] flex items-center justify-center">
                1. Startup Security Launchpad
              </CardTitle>
              <CardDescription className="text-gray-600 font-medium mb-3 min-h-[3rem] flex items-center justify-center">
                For early-stage startups and SaaS companies (5–25 employees)
              </CardDescription>
              <div className="bg-blue-50 p-3 rounded-lg mb-4 min-h-[5rem] flex items-center">
                <p className="text-sm text-blue-800 font-semibold italic">
                  "Your first vCISO — everything you need to prove you're
                  security-conscious to partners, investors, and customers."
                </p>
              </div>
              <div className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                One-time retainer
              </div>

              <div className="flex-grow"></div>
              <div className="mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => togglePackage('startup')}
                  className="flex items-center space-x-2 text-blue-600 border-blue-600 hover:bg-blue-50">
                  <span>
                    {expandedPackages['startup']
                      ? 'Hide Details'
                      : "What's Included"}
                  </span>
                  {expandedPackages['startup'] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>

            {expandedPackages['startup'] && (
              <CardContent className="space-y-3 border-t pt-4">
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">
                      Initial 1:1 discovery session with security expert
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">
                      Tailored written report with actionable steps
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">
                      Custom security policy templates
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">
                      Product-specific risk checklist
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">
                      Drafted incident response plan
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">
                      Vendor security evaluation checklist
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">
                      Cloud infrastructure security review
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">
                      1-hour live Q&A strategy call
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">
                      14 days email support post-delivery
                    </span>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* 2. SOC 2 Pre-Audit Blueprint */}
          <Card className="relative hover:shadow-xl transition-shadow border-2 border-blue-500 bg-gradient-to-b from-blue-50 to-white h-full flex flex-col">
            <CardHeader className="text-center pb-6 flex-grow flex flex-col">
              <div className="relative w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="h-8 w-8 text-blue-600" />
                <div className="absolute -top-7 w-24 py-1 bg-blue-100 text-sm rounded-full">
                  <span>Top Choice</span>
                </div>
              </div>
              <CardTitle className="text-lg mb-2 min-h-[3.5rem] flex items-center justify-center">
                2. SOC 2 Pre-Audit Blueprint
              </CardTitle>
              <CardDescription className="text-blue-700 font-medium mb-3 min-h-[3rem] flex items-center justify-center">
                For B2B SaaS preparing for enterprise contracts or VC due
                diligence
              </CardDescription>
              <div className="bg-blue-100 p-3 rounded-lg mb-4 min-h-[5rem] flex items-center">
                <p className="text-sm text-blue-800 font-semibold italic">
                  "Avoid guesswork. Get a clear SOC 2 roadmap, policies, and
                  tooling to stay compliant without wasting months."
                </p>
              </div>
              <div className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                One-time retainer
              </div>

              <div className="flex-grow"></div>
              <div className="mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => togglePackage('soc2')}
                  className="flex items-center space-x-2 text-blue-600 border-blue-600 hover:bg-blue-50">
                  <span>
                    {expandedPackages['soc2']
                      ? 'Hide Details'
                      : "What's Included"}
                  </span>
                  {expandedPackages['soc2'] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>

            {expandedPackages['soc2'] && (
              <CardContent className="space-y-3 border-t pt-4">
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">
                      SOC 2 gap assessment
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">
                      Custom implementation roadmap
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">
                      Compliance tooling onboarding (Vanta, Drata)
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">
                      Internal training & documentation templates
                    </span>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* 3. Audit Check: Final Review */}
          <Card className="relative hover:shadow-xl transition-shadow border-2 hover:border-green-200 h-full flex flex-col">
            <CardHeader className="text-center pb-6 flex-grow flex flex-col">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-lg mb-2 min-h-[3.5rem] flex items-center justify-center">
                3. Audit Check: Final Review
              </CardTitle>
              <CardDescription className="text-gray-600 font-medium mb-3 min-h-[3rem] flex items-center justify-center">
                For teams close to SOC 2 Type II audit needing professional
                final review
              </CardDescription>
              <div className="bg-green-50 p-3 rounded-lg mb-4 min-h-[5rem] flex items-center">
                <p className="text-sm text-green-800 font-semibold italic">
                  "A second set of expert eyes before the auditors arrive — so
                  nothing gets missed."
                </p>
              </div>
              <div className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                One-time retainer
              </div>

              <div className="flex-grow"></div>
              <div className="mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => togglePackage('audit')}
                  className="flex items-center space-x-2 text-green-600 border-green-600 hover:bg-green-50">
                  <span>
                    {expandedPackages['audit']
                      ? 'Hide Details'
                      : "What's Included"}
                  </span>
                  {expandedPackages['audit'] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>

            {expandedPackages['audit'] && (
              <CardContent className="space-y-3 border-t pt-4">
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">
                      Full review of evidence & controls
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">
                      Pre-audit checklist
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">
                      Auditor coordination
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">
                      Remediation guidance
                    </span>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* 4. vCISO On-Demand */}
          <Card className="relative hover:shadow-xl transition-shadow border-2 hover:border-purple-200 h-full flex flex-col">
            <CardHeader className="text-center pb-6 flex-grow flex flex-col">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-lg mb-2 min-h-[3.5rem] flex items-center justify-center">
                4. vCISO On-Demand
              </CardTitle>
              <CardDescription className="text-gray-600 font-medium mb-3 min-h-[3rem] flex items-center justify-center">
                For growing tech companies (25–250 employees) with ongoing needs
              </CardDescription>
              <div className="bg-purple-50 p-3 rounded-lg mb-4 min-h-[5rem] flex items-center">
                <p className="text-sm text-purple-800 font-semibold italic">
                  "Enterprise-grade security leadership — without hiring
                  full-time."
                </p>
              </div>

              <div className="flex-grow"></div>
              <div className="mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => togglePackage('vciso')}
                  className="flex items-center space-x-2 text-purple-600 border-purple-600 hover:bg-purple-50">
                  <span>
                    {expandedPackages['vciso']
                      ? 'Hide Details'
                      : "What's Included"}
                  </span>
                  {expandedPackages['vciso'] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>

            {expandedPackages['vciso'] && (
              <CardContent className="space-y-3 border-t pt-4">
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">
                      Ongoing vCISO engagement (8–12 hours/month)
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">
                      Monthly compliance reporting
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">
                      Multi-framework support (SOC 2, ISO 27001, HIPAA)
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">
                      Risk management and leadership advisory
                    </span>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-50 px-6 py-3 rounded-full">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-semibold">
              30-Day Money-Back Guarantee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PackagesSection;
