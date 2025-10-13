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

interface CypentraReviewProfileProps {
  profileData: ProfileData | null;
}

const CypentraReviewProfile: React.FC<CypentraReviewProfileProps> = ({
  profileData,
}) => {
  if (!profileData) return null;

  const { total_reviews, rating_distribution } = profileData;

  // Calculate average rating
  const calculateAverageRating = () => {
    let totalStars = 0;
    let totalCount = 0;

    Object.entries(rating_distribution).forEach(([stars, count]) => {
      totalStars += parseInt(stars) * count;
      totalCount += count;
    });

    return totalCount > 0 ? totalStars / totalCount : 5.0;
  };

  const averageRating = calculateAverageRating();

  // Get rating label
  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.0) return 'Great';
    if (rating >= 3.5) return 'Good';
    if (rating >= 3.0) return 'Average';
    return 'Poor';
  };

  // Calculate percentages
  const getPercentage = (count: number) => {
    if (total_reviews === 0) return 0;
    return (count / total_reviews) * 100;
  };

  // Render Trustpilot stars for the rating box
  const renderTrustpilotStars = (rating: number = 5) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <div key={i} className="bg-[#00b67a] p-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="white"
              className="md:w-5 md:h-5">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="bg-gray-200 p-1 relative overflow-hidden">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="gray"
              className="md:w-5 md:h-5">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <div
              className="absolute inset-0 bg-[#00b67a] p-1"
              style={{ width: '60%' }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="white"
                className="md:w-5 md:h-5">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
          </div>
        );
      } else {
        stars.push(
          <div key={i} className="bg-gray-200 p-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="gray"
              className="md:w-5 md:h-5">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
        );
      }
    }
    return stars;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 bg-white w-full rounded-lg">
      {/* Left Side - Company Info */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="flex-1 w-full">
            {/* Claimed Profile Badge */}
            <div className="flex items-center gap-2 mb-2">
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs sm:text-sm text-gray-600">
                  Claimed profile
                </span>
              </div>
            </div>

            {/* Company Name */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3">
              Cypentra
            </h1>

            {/* Reviews and Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
              <a href="#" className="text-black underline text-sm sm:text-base">
                Reviews {total_reviews}
              </a>
              <span className="hidden sm:inline text-gray-400">•</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5 sm:gap-1">
                  {renderTrustpilotStars(averageRating)}
                </div>
                <span className="text-xl sm:text-2xl text-black">
                  {averageRating.toFixed(1)}
                </span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Service Type */}
            <a className="text-blue-600 text-sm sm:text-base">
              Computer Security Service
            </a>
          </div>
        </div>
      </div>

      {/* Right Side - Rating Distribution Box */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-lg w-full lg:w-1/3 self-center lg:mr-8">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          {/* Rating Summary */}
          <div className="flex-shrink-0">
            <div className="text-4xl sm:text-5xl font-bold text-black mb-1">
              {averageRating.toFixed(1)}
            </div>
            <div className="text-sm sm:text-base text-black mb-2 sm:mb-3">
              {getRatingLabel(averageRating)}
            </div>
            <div className="flex gap-0.5 mb-2 sm:mb-3">
              {renderTrustpilotStars(averageRating)}
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              {total_reviews} reviews
            </p>
          </div>

          {/* Rating Distribution Bars */}
          <div className="flex-1 w-full space-y-1.5 sm:space-y-2">
            {[
              { stars: 5, count: rating_distribution['5'] || 0 },
              { stars: 4, count: rating_distribution['4'] || 0 },
              { stars: 3, count: rating_distribution['3'] || 0 },
              { stars: 2, count: rating_distribution['2'] || 0 },
              { stars: 1, count: rating_distribution['1'] || 0 },
            ].map(({ stars, count }) => {
              const percentage = getPercentage(count);
              return (
                <div key={stars} className="flex items-center gap-2">
                  <span
                    className="text-xs sm:text-sm text-gray-600 text-right"
                    style={{ minWidth: '40px' }}>
                    {stars}-star
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5 sm:h-3 relative">
                    <div
                      className="bg-[#00b67a] h-full rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span
                    className="text-xs sm:text-sm text-gray-500 text-left"
                    style={{ minWidth: '20px' }}>
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CypentraReviewProfile;
