'use client';
import {
  BookOpen,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  FileText,
  Sparkles,
  Zap,
} from 'lucide-react';

// Insights Section Component
function InsightsSection() {
  const insights = [
    {
      category: 'COMPLIANCE',
      icon: FileText,
      title: 'SOC 2 vs ISO 27001: What Your SaaS Needs to Know',
      description:
        'Understanding the key differences and choosing the right framework for your business stage.',
      gradient: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      categoryColor: 'text-blue-600',
      bgPattern:
        'bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.08),transparent_50%)]',
    },
    {
      category: 'FUNDING',
      icon: TrendingUp,
      title: 'Security Debt: The Silent Killer of Series A Deals',
      description:
        'How security gaps can derail fundraising and what VCs really look for in due diligence.',
      gradient: 'from-blue-600 to-blue-700',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-700',
      categoryColor: 'text-blue-700',
      bgPattern:
        'bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.08),transparent_50%)]',
    },
    {
      category: 'STRATEGY',
      icon: Lightbulb,
      title: 'Prioritizing Security with a Team of Three',
      description:
        'Practical security wins for resource-constrained startups — maximum impact, minimal overhead.',
      gradient: 'from-blue-500 to-blue-700',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      categoryColor: 'text-blue-600',
      bgPattern:
        'bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_50%)]',
    },
  ];

  return (
    <section
      id="insights"
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
        <div className="text-center mb-28">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <BookOpen className="h-4 w-4" />
            <span>Knowledge Base</span>
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-blue-900 mb-10 tracking-tight leading-none">
            Insights
          </h2>
          <p className="text-xl md:text-2xl text-blue-800/70 max-w-2xl mx-auto leading-relaxed font-medium">
            Actionable ideas. No fluff.
          </p>
        </div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div
                key={index}
                className="relative group cursor-pointer"
                style={{
                  animation: 'fadeInUp 0.8s ease-out forwards',
                  animationDelay: `${index * 200}ms`,
                  opacity: 0,
                }}>
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-700" />

                {/* Card */}
                <div
                  className={`relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl border-2 border-blue-300 hover:border-blue-500 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/20 h-full flex flex-col ${insight.bgPattern} group-hover:-translate-y-2`}>
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-[100px] rounded-tr-3xl" />

                  {/* Header */}
                  <div className="relative mb-6">
                    {/* Icon */}
                    <div
                      className={`${insight.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                      <Icon className={`h-8 w-8 ${insight.iconColor}`} />
                    </div>

                    {/* Category Badge */}
                    <div className="mb-4">
                      <span
                        className={`text-xs font-bold ${insight.categoryColor} uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-full border-2 border-blue-200 inline-block`}>
                        {insight.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl lg:text-3xl font-black text-blue-900 leading-tight group-hover:text-blue-700 transition-colors duration-500">
                      {insight.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-blue-900/75 text-base leading-relaxed font-medium flex-grow mb-6">
                    {insight.description}
                  </p>

                  {/* Read More Link */}
                  <div className="flex items-center gap-2 text-blue-600 font-bold group-hover:gap-4 transition-all duration-300">
                    <span className="text-sm uppercase tracking-wide">
                      Read More
                    </span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>

                  {/* Bottom Accent Line */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${insight.gradient} rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
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

export default InsightsSection;
