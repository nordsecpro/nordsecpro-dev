'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Insights Section Component
function InsightsSection() {
  return (
    <section id="insights" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Actionable ideas. No fluff.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="text-sm text-blue-600 font-semibold mb-2">
                COMPLIANCE
              </div>
              <CardTitle className="text-lg">
                SOC 2 vs ISO 27001: What Your SaaS Needs to Know
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Understanding the key differences and choosing the right
                framework for your business stage.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="text-sm text-purple-600 font-semibold mb-2">
                FUNDING
              </div>
              <CardTitle className="text-lg">
                Security Debt: The Silent Killer of Series A Deals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                How security gaps can derail fundraising and what VCs really
                look for in due diligence.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="text-sm text-green-600 font-semibold mb-2">
                STRATEGY
              </div>
              <CardTitle className="text-lg">
                Prioritizing Security with a Team of Three
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Practical security wins for resource-constrained startups —
                maximum impact, minimal overhead.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default InsightsSection;
