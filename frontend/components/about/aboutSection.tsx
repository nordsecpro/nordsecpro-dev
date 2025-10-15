'use client';

import {
  CheckCircle,
  Target,
  MessageSquare,
  Shield,
  Award,
  ExternalLink,
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Team members data
const teamMembers = [
  {
    name: 'Sam Josefi',
    role: 'CEO',
    image: '/team/sam.jpg',
    isCEO: true,
  },
  {
    name: 'Konstantin S.',
    role: 'Cybersecurity Engineer',
    image: '/team/victor.jpg',
    certifications: [
      {
        name: 'CompTIA Network Vulnerability Assessment Professional (CNVP)',
        shortName: 'CNVP',
        logo: '/certifications/cnvp-logo.png',
        link: 'https://www.credly.com/badges/8c78128b-4653-4b75-a24b-e2b8c7325e6e',
      },
      {
        name: 'CompTIA Security+ ce Certification',
        shortName: 'Security+',
        logo: '/certifications/security-plus-logo.png',
        link: 'https://www.credly.com/badges/b015d5bd-3f0d-4a25-9904-2b4bf650330b',
      },
    ],
  },
  {
    name: 'Ian H.',
    role: 'Cybersecurity & Compliance Consultant',
    image: '/team/eric.jpg',
    certifications: [
      {
        name: 'Certified Information Systems Security Professional',
        shortName: 'CISSP',
        logo: '/certifications/cissp-logo.png',
        link: 'https://www.credly.com/badges/aee79f8f-0ad7-4780-ba23-b777551f3588',
      },
      {
        name: 'Certified Cloud Security Professional',
        shortName: 'CCSP',
        logo: '/certifications/ccsp-logo.png',
        link: 'https://www.credly.com/badges/c0fd36b2-9388-4be1-9ecf-914029ea4510',
      },
    ],
  },
];

// Philosophy items
const philosophyItems = [
  {
    icon: Target,
    text: 'Security should enable growth, not obstruct it.',
  },
  {
    icon: MessageSquare,
    text: 'Communication should be direct and jargon-free.',
  },
  {
    icon: CheckCircle,
    text: 'Results should be fast, tangible, and defensible.',
  },
];

// Hero Section
function AboutHero() {
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

      {/* Subtle background elements */}
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
        <div className="text-center max-w-4xl mx-auto">
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 transition-all duration-700 delay-100 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}>
            About
            <span className="block text-blue-600 mt-2">SecureCore</span>
          </h1>

          <p
            className={`text-lg sm:text-xl text-gray-600 leading-relaxed transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}>
            We are a cybersecurity firm built for the speed, scale, and
            sensitivity of modern SaaS businesses. Founded by Scandinavian
            engineers and operating on U.S. time zones, we deliver high-caliber,
            hands-on security services without the noise or overhead.
          </p>
        </div>
      </div>
    </section>
  );
}

// Certification Badge Component
type Certification = {
  name: string;
  shortName: string;
  logo: string;
  link: string;
};

function CertificationBadge({ cert }: { cert: Certification }) {
  return (
    <a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-block"
      title={cert.name}>
      <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-100 transition-all duration-300 hover:scale-105">
        <Award className="h-3.5 w-3.5 text-blue-600" />
        <span className="text-xs font-semibold text-blue-700">
          {cert.shortName}
        </span>
        <ExternalLink className="h-3 w-3 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
    </a>
  );
}

// Team Member Card Component
type TeamMember = {
  name: string;
  role: string;
  image: string;
  isCEO?: boolean;
  certifications?: Certification[];
};

function TeamMemberCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`flex flex-col items-center transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
      <div className="relative group">
        <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        <img
          src={member.image}
          alt={member.name}
          className={`${
            member.isCEO
              ? 'w-32 h-32 sm:w-40 sm:h-40'
              : 'w-28 h-28 sm:w-36 sm:h-36'
          } rounded-full object-cover border-4 border-white shadow-xl relative z-10 group-hover:scale-105 transition-transform duration-300`}
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              member.name
            )}&size=200&background=2563eb&color=fff&bold=true`;
          }}
        />
        {member.isCEO && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-20">
            Founder
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
          {member.name}
        </h4>
        <p className="text-sm font-semibold text-blue-600 mb-4">
          {member.role}
        </p>

        {member.certifications && (
          <div className="flex flex-wrap gap-2 justify-center max-w-xs">
            {member.certifications.map((cert, i) => (
              <CertificationBadge key={i} cert={cert} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Philosophy and Mission Section
function PhilosophySection() {
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

    document.querySelectorAll('.philosophy-card').forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Philosophy Card */}
          <div
            data-index="0"
            className={`philosophy-card bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-700 ${
              visibleCards.includes(0)
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-10'
            }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-600 p-3 rounded-xl">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Our Philosophy
              </h3>
            </div>
            <div className="space-y-4">
              {philosophyItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-600 transition-colors duration-300 flex-shrink-0">
                      <Icon className="h-5 w-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <p className="text-gray-700 leading-relaxed flex-1 pt-1">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Why We Exist Card */}
          <div
            data-index="1"
            className={`philosophy-card bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 shadow-lg text-white transition-all duration-700 ${
              visibleCards.includes(1)
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-10'
            }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/20 p-3 rounded-xl">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Why We Exist</h3>
            </div>
            <p className="text-blue-50 text-lg leading-relaxed">
              We saw too many startups overwhelmed by compliance, underwhelmed
              by overpriced consultants, and let down by cookie-cutter
              solutions. So we built something better.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Team Section
function TeamSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('team-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="team-section" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Who We Are
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Industry-certified professionals dedicated to protecting your
            business
          </p>
        </div>

        {/* Team Layout */}
        <div className="max-w-5xl mx-auto">
          {/* CEO - Top Center */}
          <div className="flex justify-center mb-16">
            <TeamMemberCard member={teamMembers[0]} index={0} />
          </div>

          {/* Team Members - Bottom Row */}
          <div className="grid sm:grid-cols-2 gap-12 sm:gap-16 max-w-3xl mx-auto">
            <TeamMemberCard member={teamMembers[1]} index={1} />
            <TeamMemberCard member={teamMembers[2]} index={2} />
          </div>
        </div>

        {/* Certification Info */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <Shield className="h-4 w-4 text-blue-600" />
            Click on certification badges to verify credentials on Credly
          </p>
        </div>
      </div>
    </section>
  );
}

// Values Section
function ValuesSection() {
  const values = [
    {
      number: '01',
      title: 'Transparency',
      description: 'Clear communication and honest assessments at every step',
    },
    {
      number: '02',
      title: 'Excellence',
      description: 'Industry-leading expertise and certifications',
    },
    {
      number: '03',
      title: 'Partnership',
      description: 'We succeed when your business succeeds',
    },
    {
      number: '04',
      title: 'Innovation',
      description: 'Cutting-edge solutions for modern challenges',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Values
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:border-blue-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl font-bold text-blue-100 mb-4">
                {value.number}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main About Page Component
export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <AboutHero />
      <PhilosophySection />
      <TeamSection />
      <ValuesSection />
    </div>
  );
}
