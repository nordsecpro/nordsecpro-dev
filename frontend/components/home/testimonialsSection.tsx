'use client';
import { useState, useEffect } from 'react';
import { getProfile, getReviews } from '@/api/review';
import CypentraReviewProfile from '@/components/profileOne';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card1: React.FC<CardProps> = ({ className = '', children }) => (
  <div className={`rounded-lg shadow-md border ${className}`}>{children}</div>
);

const CardContent1: React.FC<CardProps> = ({ className = '', children }) => (
  <div className={className}>{children}</div>
);

// Skeleton Components
const SkeletonBox: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

const TestimonialCardSkeleton: React.FC = () => (
  <div className="h-full">
    <Card1 className="bg-white min-h-[280px] flex flex-col">
      <CardContent1 className="p-4 sm:p-6 flex flex-col h-full">
        {/* Stars and Badge Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <SkeletonBox key={i} className="w-4 h-4" />
            ))}
          </div>
          <SkeletonBox className="w-20 h-6" />
        </div>

        {/* Title Skeleton */}
        <SkeletonBox className="h-5 w-3/4 mb-2" />

        {/* Text Skeleton */}
        <div className="flex-grow mb-4 space-y-2">
          <SkeletonBox className="h-4 w-full" />
          <SkeletonBox className="h-4 w-full" />
          <SkeletonBox className="h-4 w-2/3" />
        </div>

        {/* Profile Skeleton */}
        <div className="border-t pt-4 mt-auto">
          <div className="flex items-center">
            <SkeletonBox className="w-10 h-10 rounded-full mr-3" />
            <div className="flex-1">
              <SkeletonBox className="h-4 w-32 mb-2" />
              <SkeletonBox className="h-3 w-24" />
            </div>
          </div>
        </div>
      </CardContent1>
    </Card1>
  </div>
);

const ProfileSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <SkeletonBox className="h-6 w-48 mb-3" />
        <SkeletonBox className="h-4 w-32" />
      </div>
      <SkeletonBox className="w-24 h-24 rounded-lg" />
    </div>
  </div>
);

// Star rating component
interface StarRatingProps {
  rating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating = 5 }) => (
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

// Trustpilot Profile Component
interface RatingDistribution {
  [key: string]: number;
}

interface ProfileData {
  domain: string;
  total_reviews: number;
  rating_distribution: RatingDistribution;
  language_distribution: {
    [key: string]: number;
  };
}

// Trustpilot See More component
interface TrustpilotSeeMoreProps {
  profileData: ProfileData | null;
  loading?: boolean;
}

const TrustpilotSeeMore: React.FC<TrustpilotSeeMoreProps> = ({
  profileData,
  loading = false,
}) => {
  const handleClick = () => {
    window.open(
      'https://www.trustpilot.com/review/cypentra.com',
      '_blank',
      'noopener,noreferrer'
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-6 mb-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-3">
              <ProfileSkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <CypentraReviewProfile profileData={profileData} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Individual testimonial component
interface Review {
  review_id: string;
  review_title: string;
  review_text: string;
  review_rating: number;
  review_is_verified: boolean;
  review_time: string;
  consumer_name: string;
  consumer_country?: string;
}

interface TestimonialCardProps {
  review: Review;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ review }) => {
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="h-full">
      <Card1 className="bg-white min-h-[280px] flex flex-col hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <CardContent1 className="p-4 sm:p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <StarRating rating={review.review_rating} />
            {review.review_is_verified && <VerifiedBadge />}
          </div>

          <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
            {review.review_title}
          </h4>

          <p className="text-gray-600 mb-4 italic flex-grow leading-relaxed text-sm">
            "{review.review_text}"
          </p>

          <div className="border-t pt-4 mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                  <span className="text-white font-semibold text-xs sm:text-sm">
                    {getInitials(review.consumer_name)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm">
                    {review.consumer_name}
                  </p>
                  <div className="flex items-center text-xs text-gray-400 mt-1">
                    {review.consumer_country && (
                      <span className="mr-2">{review.consumer_country}</span>
                    )}
                    <span className="hidden sm:inline">
                      {formatDate(review.review_time)}
                    </span>
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

// Carousel dots indicator
interface CarouselDotsProps {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
}

const CarouselDots: React.FC<CarouselDotsProps> = ({
  total,
  current,
  onDotClick,
}) => (
  <div className="flex justify-center space-x-1 mt-6">
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [profileLoading, setProfileLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  // Fetch profile data once on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfileLoading(true);
        const profileResponse = await getProfile();
        if (profileResponse.success && profileResponse.data?.profile) {
          setProfileData(profileResponse.data.profile);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Fetch reviews for a specific page
  const fetchReviewsForPage = async (page: number) => {
    try {
      setLoading(true);
      const reviewsResponse = await getReviews(page);

      if (reviewsResponse.success && reviewsResponse.data?.reviews) {
        const reviews = reviewsResponse.data.reviews;
        setAllReviews(reviews);

        // Set pagination info
        if (reviewsResponse.data.pagination) {
          setTotalPages(reviewsResponse.data.pagination.total_pages);
          setTotalReviews(reviewsResponse.data.pagination.total_reviews);
        }

        // Display first 3 reviews
        setDisplayedReviews(reviews.slice(0, 3));
        setCurrentSlide(0);
      } else {
        setError('Failed to load reviews');
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Error loading reviews');
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial reviews (page 1) on mount
  useEffect(() => {
    fetchReviewsForPage(1);
  }, []);

  // Calculate total slides across all pages
  const totalSlides = Math.ceil(totalReviews / 3);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const nextSlideIndex = prev + 1;
      const nextReviewIndex = nextSlideIndex * 3;

      // Check if we need to fetch next page
      if (nextReviewIndex >= allReviews.length) {
        // Move to next page or loop back to page 1
        const nextPage = currentPage >= totalPages ? 1 : currentPage + 1;
        setCurrentPage(nextPage);
        fetchReviewsForPage(nextPage);
        return 0;
      } else {
        // Show next 3 reviews from current page
        setDisplayedReviews(
          allReviews.slice(nextReviewIndex, nextReviewIndex + 3)
        );
        return nextSlideIndex;
      }
    });
  };

  const goToSlide = (slideIndex: number) => {
    const reviewIndex = slideIndex * 3;
    const reviewsPerPage = allReviews.length;

    // Calculate which page this slide is on
    const targetPage = Math.floor(reviewIndex / reviewsPerPage) + 1;
    const indexInPage = reviewIndex % reviewsPerPage;

    if (targetPage !== currentPage) {
      setCurrentPage(targetPage);
      fetchReviewsForPage(targetPage).then(() => {
        setCurrentSlide(Math.floor(indexInPage / 3));
        setDisplayedReviews(allReviews.slice(indexInPage, indexInPage + 3));
      });
    } else {
      setCurrentSlide(slideIndex);
      setDisplayedReviews(allReviews.slice(reviewIndex, reviewIndex + 3));
    }
  };

  // Auto-play functionality - change slide every 4 seconds
  useEffect(() => {
    if (!isAutoPlay || loading) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlay, allReviews, currentPage, totalPages, loading]);

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
            {profileLoading ? (
              <SkeletonBox className="ml-2 h-5 w-32" />
            ) : (
              <span className="ml-2 text-gray-600 font-medium">
                {profileData
                  ? profileData.total_reviews > 0
                    ? (
                        Object.entries(profileData.rating_distribution).reduce(
                          (acc, [stars, count]) =>
                            acc + parseInt(stars) * count,
                          0
                        ) / profileData.total_reviews
                      ).toFixed(1)
                    : '5.0'
                  : '5.0'}{' '}
                out of 5 stars
              </span>
            )}
          </div>
        </div>

        {/* Trustpilot See More Button */}
        <TrustpilotSeeMore profileData={profileData} loading={profileLoading} />

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}>
          {/* Testimonials Display */}
          <div className="overflow-hidden">
            {loading && displayedReviews.length === 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(3)].map((_, index) => (
                  <TestimonialCardSkeleton key={index} />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 text-lg">{error}</p>
                <button
                  onClick={() => fetchReviewsForPage(1)}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Try Again
                </button>
              </div>
            ) : (
              <div
                className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-500 ease-in-out"
                style={{
                  minHeight: '300px',
                  opacity: loading ? 0.5 : 1,
                }}>
                {displayedReviews.map((review, index) => (
                  <div
                    key={`${currentSlide}-${index}`}
                    className="animate-fade-in">
                    <TestimonialCard review={review} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Carousel Dots */}
          {!loading && totalSlides > 0 && (
            <CarouselDots
              total={totalSlides}
              current={
                currentSlide +
                (currentPage - 1) * Math.ceil(allReviews.length / 3)
              }
              onDotClick={goToSlide}
            />
          )}
        </div>

        {/* Progress indicator */}
        {!loading && displayedReviews.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Showing {currentSlide * 3 + 1}-
              {Math.min((currentSlide + 1) * 3, allReviews.length)} of{' '}
              {totalReviews} reviews
            </p>
            <p className="text-gray-400 text-xs mt-2">
              All reviews are from verified customers • Last updated August 2025
            </p>
          </div>
        )}
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

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}

export default TestimonialsSection;
