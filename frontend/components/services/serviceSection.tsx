'use client';
import {
  Shield,
  Eye,
  CheckCircle,
  FileCheck,
  Zap,
  AlertTriangle,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import Header from '@/components/common/header';

// Data
const services = [
  {
    icon: Shield,
    title: 'Security Assessments',
    description:
      'Comprehensive evaluation of your current security posture and vulnerabilities',
    features: [
      'Penetration Testing',
      'Vulnerability Scanning',
      'Risk Analysis',
    ],
  },
  {
    icon: Zap,
    title: 'Security Implementation',
    description:
      'Deploy robust security measures and protocols to protect your infrastructure',
    features: ['Firewall Configuration', 'Access Control', 'Encryption Setup'],
  },
  {
    icon: Eye,
    title: '24/7 Monitoring',
    description:
      'Continuous monitoring and threat detection to keep your systems secure',
    features: ['Real-time Alerts', 'Incident Response', 'Threat Intelligence'],
  },
  {
    icon: BookOpen,
    title: 'Security Training',
    description:
      'Educate your team on cybersecurity best practices and threat awareness',
    features: [
      'Phishing Simulation',
      'Security Workshops',
      'Policy Development',
    ],
  },
  {
    icon: FileCheck,
    title: 'Compliance Support',
    description:
      'Ensure your organization meets industry standards and regulatory requirements',
    features: ['GDPR Compliance', 'ISO 27001', 'SOC 2'],
  },
  {
    icon: AlertTriangle,
    title: 'Incident Response',
    description:
      'Rapid response and recovery services for cybersecurity incidents',
    features: ['Emergency Response', 'Incident Analysis', 'Recovery Planning'],
  },
];

// Section Header Component
const SectionHeader = ({ badge, title, description, isDark = false }: any) => (
  <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
    {/* <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
      <Shield className="h-4 w-4" />
      <span>{badge}</span>
      <Sparkles className="h-3.5 w-3.5" />
    </div> */}
    <Header title={title} description={description} />
  </div>
);

// Service Card Component
const ServiceCard = ({ service, index }: any) => {
  const Icon = service.icon;

  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-8 duration-700"
      style={{ animationDelay: `${index * 100}ms` }}>
      <div className="bg-white border-2 border-blue-200 rounded-3xl p-8 hover:border-blue-400 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col group">
        <div className="bg-blue-600 rounded-2xl p-4 w-fit mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
          <Icon className="h-8 w-8 text-white" />
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-3">
          {service.title}
        </h3>

        <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
          {service.description}
        </p>

        <ul className="space-y-3">
          {service.features.map((feature: string, i: number) => (
            <li key={i} className="flex items-center gap-3">
              <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm text-slate-700 font-medium">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Services Grid Component
const ServicesGrid = () => (
  <section className="py-24 bg-gradient-to-br from-white via-blue-50/20 to-white relative overflow-hidden">
    <div className="absolute inset-0 bg-grid-blue-100/30 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <SectionHeader
        badge="Comprehensive Security Solutions"
        title="Our Cybersecurity Services"
        description="Comprehensive remote cybersecurity solutions tailored to protect your business"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </div>
  </section>
);

// Main Component
function ServicesSection() {
  return (
    <div className="bg-white">
      <ServicesGrid />
    </div>
  );
}

export default ServicesSection;
