'use client';
import { Award } from 'lucide-react';

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
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Trust & Certifications
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Security is only as strong as the team behind it
          </p>
        </div>

        <div className="mb-16">
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {credentials.map((cred, index) => {
                  const Icon = cred.icon;
                  return (
                    <div
                      key={index}
                      className="group flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}>
                      {/* <div className="bg-blue-100 p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div> */}
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
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
