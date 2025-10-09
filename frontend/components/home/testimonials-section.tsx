'use client';
import CypentraReviewProfile from '@/components/profileOne';
import { useState, useEffect, SetStateAction } from 'react';

interface Card1Props {
  className?: string;
  children: React.ReactNode;
}

const Card1 = ({ className, children }: Card1Props) => (
  <div className={`rounded-lg shadow-md border ${className}`}>{children}</div>
);

interface CardContent1Props {
  className?: string;
  children: React.ReactNode;
}

const CardContent1 = ({ className, children }: CardContent1Props) => (
  <div className={className}>{children}</div>
);

// Star rating component
const StarRating = ({ rating = 5 }) => (
  <div className="flex items-center mb-3">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        } fill-current`}
        viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// Verified badge component
const VerifiedBadge = () => (
  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 ml-2">
    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
    Verified
  </span>
);

// Trustpilot See More component
const TrustpilotSeeMore = () => {
  const handleClick = () => {
    window.open(
      'https://www.trustpilot.com/review/cypentra.com',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="flex justify-center mt-6 mb-4">
      <div
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleClick();
        }}
        className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400/60 rounded-lg w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-3">
            <CypentraReviewProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

// Individual testimonial component
const TestimonialCard = ({
  name,
  title,
  company,
  location,
  review,
  reviewTitle,
  date,
  verified = false,
  rating = 5,
}: any) => {
  const getInitials = (name: any) => {
    return name
      .split(' ')
      .map((word: any[]) => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="h-full">
      <Card1 className="bg-white min-h-[280px] flex flex-col hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <CardContent1 className="p-4 sm:p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <StarRating rating={rating} />
            {verified && <VerifiedBadge />}
          </div>

          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
            {reviewTitle}
          </h4>

          <p className="text-gray-600 mb-4 italic flex-grow leading-relaxed text-sm">
            "{review}"
          </p>

          <div className="border-t pt-4 mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                  <span className="text-white font-semibold text-xs sm:text-sm">
                    {getInitials(name)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm">
                    {name}
                  </p>
                  {title && company && (
                    <p className="text-xs text-gray-500">
                      {title}, {company}
                    </p>
                  )}
                  <div className="flex items-center text-xs text-gray-400 mt-1">
                    <span className="mr-2">{location}</span>
                    <span className="hidden sm:inline">{date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent1>
      </Card1>
    </div>
  );
};

interface CarouselDotsProps {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
}

const CarouselDots = ({ total, current, onDotClick }: CarouselDotsProps) => (
  <div className="flex justify-center space-x-1 ">
    {[...Array(total)].map((_, index) => (
      <button
        key={index}
        onClick={() => onDotClick(index)}
        className={`w-3 h-3 rounded-full transition-all duration-200 ${
          index === current
            ? 'bg-blue-600 scale-110'
            : 'bg-gray-300 hover:bg-gray-400'
        }`}
      />
    ))}
  </div>
);

// Main testimonials section component
function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const testimonials = [
    {
      name: 'Thomas Anderson',
      title: 'vCISO',
      company: 'Tech Solutions',
      location: 'US',
      review:
        'vCISO support gave us real, actionable steps instead of endless reports. The practical advice has been invaluable for our security posture.',
      reviewTitle: 'Practical advice!',
      date: 'August 13, 2025',
      verified: true,
      rating: 5,
    },
    {
      name: 'Lily Prose',
      title: 'Founder',
      company: 'SaaS Austin',
      location: 'US',
      review:
        "We're a SaaS in Austin and needed SOC 2. Thought it'd be a nightmare but they just handled it. Simple and efficient process.",
      reviewTitle: 'SOC 2 without the headache',
      date: 'February 02, 2025',
      verified: false,
      rating: 5,
    },
    {
      name: 'Théodore Bodin',
      title: 'CTO',
      company: 'Small SaaS',
      location: 'US',
      review:
        "As a small SaaS, we don't have a big security team. Cypentra fills that gap perfectly with their comprehensive support.",
      reviewTitle: 'Perfect for startups',
      date: 'August 13, 2025',
      verified: true,
      rating: 5,
    },
    {
      name: 'Andre Hobbs',
      title: 'Compliance Manager',
      company: 'EU Startup',
      location: 'US',
      review:
        'They understood EU compliance needs better than anyone we spoke with. Their expertise in international regulations is outstanding.',
      reviewTitle: 'Good for Europe based startups',
      date: 'August 12, 2025',
      verified: true,
      rating: 5,
    },
    {
      name: 'Owen Adams',
      title: 'Security Lead',
      company: 'TechCorp',
      location: 'US',
      review:
        'Got our penetration test results within the week. Very professional team and thorough analysis.',
      reviewTitle: 'Fast penetration test delivery',
      date: 'June 12, 2025',
      verified: true,
      rating: 5,
    },
    {
      name: 'Lucas Poole',
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'US',
      review:
        'Our AWS setup is much safer now. Professional service with clear communication throughout the process.',
      reviewTitle: 'Strong on cloud security',
      date: 'August 13, 2025',
      verified: true,
      rating: 5,
    },
    {
      name: 'Jacob Miller',
      title: 'Finance Director',
      company: 'StartupCo',
      location: 'US',
      review:
        'No surprise costs, no contracts. Just clear pricing and reliable support. The flat fee model works perfectly for our budget.',
      reviewTitle: 'Flat fee is a big win',
      date: 'August 13, 2025',
      verified: true,
      rating: 5,
    },
    {
      name: 'Christopher Thomas',
      title: 'IT Director',
      company: 'TechFlow',
      location: 'US',
      review:
        "We always know what's happening and why. No hidden agendas. Transparent communication throughout our engagement.",
      reviewTitle: 'Reliable and transparent!',
      date: 'August 14, 2025',
      verified: false,
      rating: 5,
    },
    {
      name: 'Dominic Owen',
      title: 'CEO',
      company: 'DataSecure',
      location: 'US',
      review:
        'They feel like part of our company, not just an outside vendor. True partnership approach to cybersecurity.',
      reviewTitle: 'Trustworthy team',
      date: 'August 12, 2025',
      verified: true,
      rating: 5,
    },
  ];

  const totalSlides = Math.ceil(testimonials.length / 3);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex: SetStateAction<number>) => {
    setCurrentSlide(slideIndex);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlay]);

  // Get current testimonials to display (3 per slide)
  const getCurrentTestimonials = () => {
    const startIndex = currentSlide * 3;
    return testimonials.slice(startIndex, startIndex + 3);
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Trusted by businesses worldwide to protect their digital assets and
            ensure compliance
          </p>
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-600 font-medium">
              5.0 out of 5 stars
            </span>
          </div>
        </div>
        {/* Trustpilot See More Button */}
        <TrustpilotSeeMore />
        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}>
          {/* Testimonials Display */}
          <div className="overflow-hidden">
            <div
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-500 ease-in-out"
              style={{
                minHeight: '300px',
                opacity: 1,
              }}>
              {getCurrentTestimonials().map((testimonial, index) => (
                <div
                  key={`${currentSlide}-${index}`}
                  className="animate-fade-in">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Dots */}
          <CarouselDots
            total={totalSlides}
            current={currentSlide}
            onDotClick={goToSlide}
          />
        </div>

        {/* Progress indicator */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Showing {currentSlide * 3 + 1}-
            {Math.min((currentSlide + 1) * 3, testimonials.length)} of{' '}
            {testimonials.length} reviews
          </p>
          <p className="text-gray-400 text-xs mt-2">
            All reviews are from verified customers • Last updated August 2025
          </p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-fade-in:nth-child(2) {
          animation-delay: 0.1s;
        }

        .animate-fade-in:nth-child(3) {
          animation-delay: 0.2s;
        }
      `}</style>
    </section>
  );
}

export default TestimonialsSection;
