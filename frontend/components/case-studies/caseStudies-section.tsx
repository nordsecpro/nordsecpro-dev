'use client';
import {
  Shield,
  Rocket,
  Zap,
  TrendingUp,
  Award,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

// Case Studies Section Component
function CaseStudiesSection() {
  const caseStudies = [
    {
      icon: Rocket,
      category: 'SaaS Startup',
      title: 'Fast-Track to SOC 2',
      client: 'Early-stage HR tech platform',
      description:
        'We helped the CTO implement controls, draft policies, and pass their audit in under 12 weeks.',
      outcome: 'Enterprise client win and faster due diligence for investors.',
      metrics: ['12 weeks', 'SOC 2 Type II', '100% Pass Rate'],
      gradient: 'from-blue-500 to-blue-600',
      bgPattern:
        'bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]',
    },
    {
      icon: Shield,
      category: 'Fintech Platform',
      title: 'Deep Penetration Testing',
      client: 'Series B payments company',
      description:
        'Our test uncovered two critical flaws missed by prior assessments. With our remediation plan, they closed a seven-figure funding round.',
      outcome: 'Critical vulnerabilities patched, funding secured.',
      metrics: ['2 Critical Issues', '7-Figure Round', '0 Breaches'],
      gradient: 'from-blue-600 to-blue-700',
      bgPattern:
        'bg-[radial-gradient(circle_at_70%_30%,rgba(37,99,235,0.1),transparent_50%)]',
    },
    {
      icon: Zap,
      category: 'Cloud Security',
      title: 'Security Overhaul',
      client: 'AI SaaS with hybrid AWS/Azure environment',
      description:
        'We delivered a prioritized roadmap that eliminated 85% of open cloud risks within 30 days.',
      outcome: '85% risk reduction in 30 days.',
      metrics: ['85% Reduction', '30 Days', 'Multi-Cloud'],
      gradient: 'from-blue-500 to-blue-700',
      bgPattern:
        'bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]',
    },
  ];

  return (
    <section
      id="case-studies"
      className="py-32 bg-gradient-to-br from-white via-blue-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-28">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <TrendingUp className="h-4 w-4" />
            <span>Success Stories</span>
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-blue-900 mb-10 tracking-tight leading-none">
            Case Studies
          </h2>
          <p className="text-xl md:text-2xl text-blue-800/70 max-w-3xl mx-auto leading-relaxed font-medium">
            Real results for real businesses — see how we've helped companies
            secure their growth and achieve compliance excellence
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
          {caseStudies.map((study, index) => {
            const Icon = study.icon;
            return (
              <div
                key={index}
                className="relative group"
                style={{
                  animation: 'fadeInUp 0.8s ease-out forwards',
                  animationDelay: `${index * 200}ms`,
                  opacity: 0,
                }}>
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-700" />

                {/* Card */}
                <div
                  className={`relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl border-2 border-blue-300 hover:border-blue-500 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/20 h-full flex flex-col ${study.bgPattern}`}>
                  {/* Decorative Corner Element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-[100px] rounded-tr-3xl" />

                  {/* Header */}
                  <div className="relative mb-8">
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`bg-gradient-to-br ${study.gradient} p-5 rounded-2xl shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-full border-2 border-blue-200">
                        {study.category}
                      </span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-black text-blue-900 mb-4 leading-tight group-hover:text-blue-700 transition-colors duration-500">
                      {study.title}
                    </h3>
                    <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full group-hover:w-32 transition-all duration-500" />
                  </div>

                  {/* Content */}
                  <div className="space-y-6 flex-grow">
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <p className="text-blue-900/70 font-semibold text-base">
                        <strong className="text-blue-900 block mb-1">
                          Client
                        </strong>
                        {study.client}
                      </p>
                    </div>

                    <p className="text-blue-900/75 text-base leading-relaxed font-medium">
                      {study.description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-3 py-4">
                      {study.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-center text-center bg-blue-50 rounded-xl p-3 border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all duration-300">
                          <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                            {metric}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outcome Section */}
                  <div
                    className={`relative bg-gradient-to-br ${study.gradient} rounded-2xl p-6 shadow-lg overflow-hidden group-hover:shadow-xl transition-all duration-500`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                    <div className="relative z-10 flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-white flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white/90 font-bold text-sm uppercase tracking-wide mb-2">
                          Outcome
                        </p>
                        <p className="text-white font-semibold text-base leading-relaxed">
                          {study.outcome}
                        </p>
                      </div>
                    </div>

                    {/* Hover Arrow */}
                    {/* <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                      <ArrowRight className="h-5 w-5 text-white" />
                    </div> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

export default CaseStudiesSection;
