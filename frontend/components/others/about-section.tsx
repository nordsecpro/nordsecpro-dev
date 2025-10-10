'use client';
import { CheckCircle, Target, MessageSquare } from 'lucide-react';

// About Us Section Component
function AboutSection() {
  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Us
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-600 mb-8">
              We are a cybersecurity firm built for the speed, scale, and
              sensitivity of modern SaaS businesses. Founded by Scandinavian
              engineers and operating on U.S. time zones, we deliver
              high-caliber, hands-on security services without the noise or
              overhead.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Our Philosophy
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Target className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  Security should enable growth, not obstruct it.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <MessageSquare className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  Communication should be direct and jargon-free.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700">
                  Results should be fast, tangible, and defensible.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why We Exist
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We saw too many startups overwhelmed by compliance, underwhelmed
              by overpriced consultants, and let down by cookie-cutter
              solutions. So we built something better.
            </p>
          </div>
        </div>
      </div>
      <div className="relative mt-32">
        <h3 className="text-3xl font-bold text-gray-900 text-center mb-16">
          Who We Are
        </h3>

        {/* Triangle Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* CEO - Top Center */}
          <div className="flex justify-center relative">
            <div className="text-center">
              <img
                src="/team/sam.jpg"
                alt="Sam Josefsson"
                className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-xl"
              />
              <p className="mt-4 text-lg font-semibold text-gray-800">
                Sam Josefi
              </p>
              <p className="text-sm text-gray-500">CEO</p>

              {/* Connecting Lines */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-full mt-2">
                <div className="flex justify-between w-48 mx-auto">
                  {/* Left Line */}
                  <div className="w-0.5 h-20 bg-gray-300 transform rotate-45 origin-top-left"></div>
                  {/* Right Line */}
                  <div className="w-0.5 h-20 bg-gray-300 transform -rotate-45 origin-top-right"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row - Left & Right Team Members */}
          <div className="mt-24 flex justify-center md:space-x-52 space-y-12 md:space-y-0 flex-col md:flex-row items-center">
            {/* Left Member */}
            <div className="flex flex-col items-center transform transition duration-300 hover:scale-105">
              <img
                src="/team/eric.jpg"
                alt="Eric"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <p className="mt-4 text-lg font-semibold text-gray-800">
                Eric Slavic
              </p>
              <p className="text-sm text-gray-500 text-center">
                SOC 2 Compliance Specialist
              </p>
            </div>

            {/* Right Member */}
            <div className="flex flex-col items-center transform transition duration-300 hover:scale-105">
              <img
                src="/team/victor.jpg"
                alt="Victor Snorklasev"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <p className="mt-4 text-lg font-semibold text-gray-800">
                Victor Snorklasev
              </p>
              <p className="text-sm text-gray-500 text-center">
                DevSecOps Engineer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
