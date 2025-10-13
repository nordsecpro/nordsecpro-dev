'use client';
import {
  CheckCircle,
  Target,
  MessageSquare,
  Shield,
  Award,
  ExternalLink,
  Sparkles,
  Zap,
} from 'lucide-react';
import HeaderSection from '../header';

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

// Certification Badge Component
const CertificationBadge = ({ cert }: any) => (
  <a
    href={cert.link}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative inline-block"
    title={cert.name}>
    <div className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
      <Award className="h-4 w-4 text-blue-600" />
      <span className="text-sm font-bold text-slate-800">{cert.shortName}</span>
      <ExternalLink className="h-3 w-3 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </div>
  </a>
);

// Team Member Card Component
const TeamMemberCard = ({ member, index }: any) => (
  <div
    className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700"
    style={{ animationDelay: `${index * 150}ms` }}>
    <div className="relative group">
      <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      <img
        src={member.image}
        alt={member.name}
        className={`${
          member.isCEO ? 'w-40 h-40' : 'w-36 h-36'
        } rounded-full object-cover border-4 border-white shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-300`}
        onError={(e) => {
          // Fallback to placeholder if image fails
          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            member.name
          )}&size=200&background=3B82F6&color=fff&bold=true`;
        }}
      />
      {member.isCEO && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg z-20">
          Founder
        </div>
      )}
    </div>

    <div className="mt-6 text-center">
      <h4 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h4>
      <p className="text-sm font-semibold text-blue-600 mb-4">{member.role}</p>

      {member.certifications && (
        <div className="flex flex-wrap gap-2 justify-center max-w-xs">
          {member.certifications.map((cert: any, i: number) => (
            <CertificationBadge key={i} cert={cert} />
          ))}
        </div>
      )}
    </div>
  </div>
);

// About Section Component
function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-200/40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <Shield className="h-4 w-4" />
            <span>Our Story</span>
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <HeaderSection
            title="About Us"
            description="We are a cybersecurity firm built for the speed, scale, and
              sensitivity of modern SaaS businesses. Founded by Scandinavian
              engineers and operating on U.S. time zones, we deliver
              high-caliber, hands-on security services without the noise or
              overhead."
          />
        </div>

        {/* Philosophy & Why We Exist */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          {/* Philosophy */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border-2 border-blue-100 hover:border-blue-300 transition-all animate-in fade-in slide-in-from-left duration-700">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-blue-600 p-3 rounded-2xl">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                Our Philosophy
              </h3>
            </div>
            <div className="space-y-6">
              {philosophyItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                      <Icon className="h-5 w-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <p className="text-slate-700 leading-relaxed flex-1">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Why We Exist */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 md:p-10 shadow-xl text-white animate-in fade-in slide-in-from-right duration-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/20 p-3 rounded-2xl">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">Why We Exist</h3>
            </div>
            <p className="text-blue-50 text-lg leading-relaxed">
              We saw too many startups overwhelmed by compliance, underwhelmed
              by overpriced consultants, and let down by cookie-cutter
              solutions. So we built something better.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="relative">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-blue-200 text-blue-600 rounded-full text-sm font-bold mb-6 shadow-lg">
              <Award className="h-4 w-4" />
              <span>Meet the Team</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900">
              Who We Are
            </h3>
          </div>

          {/* Team Layout */}
          <div className="max-w-5xl mx-auto">
            {/* CEO - Top Center */}
            <div className="flex justify-center mb-20">
              <TeamMemberCard member={teamMembers[0]} index={0} />
            </div>

            {/* Team Members - Bottom Row */}
            <div className="grid md:grid-cols-2 gap-16 md:gap-24 max-w-4xl mx-auto">
              <TeamMemberCard member={teamMembers[1]} index={1} />
              <TeamMemberCard member={teamMembers[2]} index={2} />
            </div>
          </div>

          {/* Certification Info */}
          <div className="mt-16 text-center">
            <p className="text-sm text-slate-500">
              Click on certification badges to verify credentials on Credly
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
