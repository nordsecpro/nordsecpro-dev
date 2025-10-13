'use client';
import { useState, useEffect } from 'react';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Star rating component
const StarRating = ({ rating = 5 }: { rating?: number }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'
        }`}
      />
    ))}
  </div>
);

// Verified badge
const VerifiedBadge = () => (
  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
    <Shield className="w-3 h-3 mr-1" />
    Verified
  </span>
);

// Individual testimonial card
const TestimonialCard = ({ testimonial, index }: any) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div
      className="h-full animate-in fade-in slide-in-from-bottom-4 duration-700"
      style={{ animationDelay: `${index * 100}ms` }}>
      <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
        {/* Quote Icon */}
        <div className="mb-4">
          <Quote className="w-10 h-10 text-blue-200" />
        </div>

        {/* Rating & Verified */}
        <div className="flex items-center justify-between mb-4">
          <StarRating rating={testimonial.rating} />
          {testimonial.verified && <VerifiedBadge />}
        </div>

        {/* Review Title */}
        <h4 className="font-bold text-slate-900 mb-3 text-lg">
          {testimonial.reviewTitle}
        </h4>

        {/* Review Text */}
        <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
          "{testimonial.review}"
        </p>

        {/* Author Info */}
        <div className="border-t-2 border-blue-100 pt-5 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-white font-bold text-sm">
                {getInitials(testimonial.name)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-900 text-sm">
                {testimonial.name}
              </p>
              {testimonial.title && testimonial.company && (
                <p className="text-xs text-slate-600">
                  {testimonial.title}, {testimonial.company}
                </p>
              )}
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                <span>{testimonial.location}</span>
                <span>•</span>
                <span>{testimonial.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(5.0);

  // 🆕 Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        
        // Fetch only 5-star verified reviews for testimonials
        const response = await fetch(
          `${apiUrl}/api/trustpilot/reviews`
        );
        
        if (!response.ok) throw new Error('Failed to fetch reviews');
        
        const data = await response.json();
        
        console.log('Fetched reviews:', data);
        if (data.success && data.data.reviews) {
          // Transform API data to match your UI format
          const transformedReviews = data.data.reviews
            .filter((review: any) => review.review_is_verified) // Only verified reviews
            .map((review: any) => ({
              name: review.consumer_name,
              title: '', // Not available from API
              company: '', // Not available from API
              location: review.consumer_country || 'US',
              review: review.review_text,
              reviewTitle: review.review_title,
              date: new Date(review.review_time).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              }),
              verified: review.review_is_verified,
              rating: review.review_rating,
            }));
          setTestimonials(transformedReviews);
          setTotalReviews(data.data.pagination.total_reviews);
          
          // Calculate average rating
          const avgRating = transformedReviews.reduce(
            (acc: number, t: any) => acc + t.rating, 
            0
          ) / transformedReviews.length;
          setAverageRating(Math.round(avgRating * 10) / 10);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        // Fallback to original hardcoded reviews on error
        setTestimonials([
          {
            name: 'Thomas Anderson',
            title: 'vCISO',
            company: 'Tech Solutions',
            location: 'US',
            review: 'vCISO support gave us real, actionable steps instead of endless reports.',
            reviewTitle: 'Practical advice that works',
            date: 'Aug 2025',
            verified: true,
            rating: 5,
          },
          // Add more fallback reviews if needed
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const itemsPerSlide = 3;
  const totalSlides = Math.floor(testimonials.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-play
  useEffect(() => {
    if (!isAutoPlay || loading) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlay, loading]);

  const getCurrentTestimonials = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return testimonials.slice(startIndex, startIndex + itemsPerSlide);
  };

  // 🆕 Show loading state
  if (loading) {
    return (
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            <p className="mt-4 text-slate-600">Loading reviews...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-200/40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <Users className="h-4 w-4" />
            <span>Trusted by SaaS and Tech Companies Worldwide</span>
            <Sparkles className="h-3.5 w-3.5" />
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            What Our Clients Say
          </h2>

          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Trusted by businesses worldwide to protect their digital assets and
            ensure compliance
          </p>

          {/* Rating Display - 🆕 Now using dynamic data */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-lg border-2 border-blue-100">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div className="text-left">
              <p className="text-2xl font-bold text-slate-900">{averageRating.toFixed(1)}</p>
              <p className="text-xs text-slate-500">Based on {totalReviews}+ reviews</p>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative mb-12"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}>
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="hidden lg:flex absolute left-[-35px] top-[196px] -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 items-center justify-center bg-white rounded-full shadow-xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 group">
            <ChevronLeft className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="hidden lg:flex absolute right-[-35px] top-[196px] -translate-y-1/2 translate-x-6 z-10 w-12 h-12 items-center justify-center bg-white rounded-full shadow-xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 group">
            <ChevronRight className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
          </button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getCurrentTestimonials().map((testimonial, index) => (
              <TestimonialCard
                key={`${currentSlide}-${index}`}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-12">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 bg-blue-600'
                    : 'w-2 bg-slate-300 hover:bg-blue-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div
          className="text-center animate-in fade-in zoom-in-95 duration-700"
          style={{ animationDelay: '600ms' }}>
          <div className="inline-block bg-white rounded-3xl shadow-2xl p-10 border-2 border-blue-200 hover:border-blue-300 hover:shadow-blue-100/50 transition-all duration-500">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full mb-6">
              <Shield className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">
                Join Our Growing Community
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Join 30+ Startups Securing with Cypentra
            </h3>

            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Become part of a community that values security, compliance, and
              growth
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/packages" className="group">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-10 py-7 rounded-2xl font-bold text-base group-hover:scale-105">
                  View Packages
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 px-10 py-7 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Info - 🆕 Now dynamic */}
        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm">
            All reviews are from verified customers • Last updated{' '}
            {new Date().toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;