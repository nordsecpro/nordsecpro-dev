'use client';

import {
  Shield,
  Zap,
  Users,
  Award,
  Lock,
  Star,
  Check,
  ChevronRight,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

// Services data
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
    icon: Users,
    title: '24/7 Monitoring',
    description:
      'Continuous monitoring and threat detection to keep your systems secure',
    features: ['Real-time Alerts', 'Incident Response', 'Threat Intelligence'],
  },
  {
    icon: Award,
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
    icon: Lock,
    title: 'Compliance Support',
    description:
      'Ensure your organization meets industry standards and regulatory requirements',
    features: ['GDPR Compliance', 'ISO 27001', 'SOC 2'],
  },
  {
    icon: Star,
    title: 'Incident Response',
    description:
      'Rapid response and recovery services for cybersecurity incidents',
    features: ['Emergency Response', 'Incident Analysis', 'Recovery Planning'],
  },
];

// Hero Section for Services Page
function ServicesHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}>
            Our Cybersecurity
            <span className="block text-blue-600 mt-2">Services</span>
          </h1>

          <p
            className={`text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 transition-all duration-1000 delay-200 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}>
            Comprehensive remote cybersecurity solutions tailored to protect
            your business from evolving threats and ensure compliance with
            industry standards
          </p>

          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}>
            <Button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-lg font-semibold text-base shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 hover:scale-105">
              <span className="flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Schedule Consultation
                <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Service Card Component
type Service = {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 150);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`h-full transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="bg-white border border-gray-200 rounded-xl p-8 hover:border-blue-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col group">
        <div
          className={`bg-blue-600 rounded-xl p-3 w-fit mb-6 transition-all duration-500 ${
            isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'
          }`}>
          <Icon className="h-7 w-7 text-white" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
          {service.title}
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
          {service.description}
        </p>

        <ul className="space-y-3">
          {service.features.map((feature: string, i: number) => (
            <li
              key={i}
              className="flex items-center gap-3 opacity-0 animate-slide-in"
              style={{
                animationDelay: `${isHovered ? i * 100 : 0}ms`,
                animationFillMode: 'forwards',
              }}>
              <div className="h-5 w-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Check className="h-3 w-3 text-blue-600" />
              </div>
              <span className="text-sm text-gray-700 font-medium">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Services Grid Section
function ServicesGrid() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, #2563eb 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Why Choose Us Section
function WhyChooseUs() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute('data-index') ?? ''
            );
            setVisibleCards((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.benefit-card').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      number: '01',
      title: 'Expert Team',
      description: 'Industry-certified professionals with years of experience',
    },
    {
      number: '02',
      title: 'Proven Track Record',
      description: '500+ businesses protected with 99.9% uptime',
    },
    {
      number: '03',
      title: 'Compliance Ready',
      description: 'SOC 2, ISO 27001, and GDPR compliant solutions',
    },
    {
      number: '04',
      title: '24/7 Support',
      description: 'Round-the-clock monitoring and incident response',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-blue-100 rounded-full opacity-20 animate-float" />
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-blue-50 rounded-full opacity-20 animate-float animation-delay-2000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We combine expertise, technology, and dedication to deliver
            unparalleled security solutions
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              data-index={index}
              className={`benefit-card text-center p-6 transition-all duration-700 ${
                visibleCards.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}>
              <div className="text-5xl font-bold text-blue-100 mb-4 animate-pulse-slow">
                {benefit.number}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('cta-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cta-section"
      className="py-16 sm:py-20 bg-gradient-to-br from-blue-600 to-blue-700 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full animate-pulse-slow animation-delay-2000" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2
          className={`text-3xl sm:text-4xl font-bold text-white mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          Ready to Secure Your Business?
        </h2>
        <p
          className={`text-lg text-blue-100 mb-8 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          Let's discuss how our services can protect your digital assets
        </p>
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <Button className="group bg-white hover:bg-gray-50 text-blue-600 px-8 py-6 rounded-lg font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <span className="flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Book Consultation
              <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </span>
          </Button>
          <Button
            variant="outline"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-6 rounded-lg font-semibold text-base transition-all duration-300 hover:scale-105">
            View Pricing
          </Button>
        </div>
      </div>
    </section>
  );
}

// Main Services Page Component
export default function ServicesSection() {
  return (
    <div className="bg-white min-h-screen">
      <ServicesHero />
      <ServicesGrid />
      <WhyChooseUs />
      <CTASection />

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
