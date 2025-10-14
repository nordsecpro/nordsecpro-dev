'use client';
import { CheckCircle, Award, Shield, Star, Sparkles } from 'lucide-react';

const credentials = [
  {
    icon: Award,
    title: 'CISSP',
    description: 'Certified Information Systems Security Professional',
  },
  {
    icon: Award,
    title: 'OSCP',
    description: 'Offensive Security Certified Professional',
  },
  {
    icon: Award,
    title: 'AWS Security',
    description: 'AWS Certified Security Specialist',
  },
];

const compliance = [
  {
    items: ['SOC 2', 'ISO 27001', 'PCI-DSS'],
  },
  {
    items: ['SaaS platforms', 'Fintech firms', 'High-growth startups'],
  },
];

function TrustSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-200/40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <Shield className="h-4 w-4" />
            <span>Trusted by Industry Leaders</span>
            <Star className="h-3.5 w-3.5" />
          </div> */}
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Trust & Certifications
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Security is only as strong as the team behind it
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Credentials Section */}
          <div
            className="animate-in fade-in slide-in-from-left duration-700"
            style={{ animationDelay: '200ms' }}>
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border-2 border-blue-100 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-blue-100 p-3 rounded-2xl">
                  <Award className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Our Credentials
                </h3>
              </div>

              <p className="text-slate-600 mb-8 text-lg">
                Our team holds industry-leading certifications:
              </p>

              <div className="space-y-5">
                {credentials.map((cred, index) => {
                  const Icon = cred.icon;
                  return (
                    <div
                      key={index}
                      className="group flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="bg-blue-100 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-slate-900 mb-1">
                          {cred.title}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {cred.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Compliance Section */}
          <div
            className="animate-in fade-in slide-in-from-right duration-700"
            style={{ animationDelay: '400ms' }}>
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border-2 border-blue-100 hover:border-blue-200 transition-all duration-500 hover:shadow-2xl h-full flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-blue-100 p-3 rounded-2xl">
                  <CheckCircle className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Compliance Experience
                </h3>
              </div>

              <p className="text-slate-600 mb-8 text-lg">
                Extensive expertise across major frameworks:
              </p>

              <div className="space-y-5 mb-8 flex-1">
                {compliance.map((group, groupIndex) => (
                  <div
                    key={groupIndex}
                    className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
                    <div className="flex flex-wrap gap-3">
                      {group.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all duration-300">
                          <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                          <span className="text-sm font-semibold text-slate-700">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Due Diligence Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-200">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">
                      Due Diligence Support
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Available for VC funding, M&A, and enterprise onboarding
                      processes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats/Trust Indicators */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700"
          style={{ animationDelay: '600ms' }}>
          {[
            { number: '500+', label: 'Companies Secured' },
            { number: '50+', label: 'Audits Completed' },
            { number: '99.9%', label: 'Client Satisfaction' },
            { number: '24/7', label: 'Support Available' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-lg border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-slate-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
