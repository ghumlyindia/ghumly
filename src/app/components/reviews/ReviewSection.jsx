'use client';
import React, { useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import ReviewsList from './ReviewsList';
import BookingReviewForm from './BookingReviewForm';
import StarRating from './StarRating';

const ReviewSection = ({ tourId = null, agencyId = null, averageRating = 0, totalReviews = 0 }) => {
  const { token } = useAuth();
  const [showForm, setShowForm] = useState(false);

  const handleReviewSuccess = () => {
    setShowForm(false);
    // Refresh the page to show new review
    window.location.reload();
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-[family-name:var(--font-playfair-display)]">
              Guest Reviews
            </h2>
            {totalReviews > 0 && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                  <StarRating rating={Math.round(averageRating)} readonly size={20} />
                  <span className="text-lg font-bold text-gray-900">
                    {averageRating.toFixed(1)}
                  </span>
                </div>
                <span className="text-gray-600 font-medium">
                  Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
                </span>
              </div>
            )}
          </div>
          {token && !showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-[#3FA5E0] to-[#2E7FB8] text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 shadow-md"
            >
              Write a Review
            </button>
          )}
        </div>

        {showForm && (
          <div className="mb-8 bg-gray-50 rounded-2xl p-6 border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Share your experience</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
            <BookingReviewForm
              tourId={tourId}
              agencyId={agencyId}
              onSuccess={handleReviewSuccess}
            />
          </div>
        )}
      </div>

      <ReviewsList
        tourId={tourId}
        agencyId={agencyId}
        onReviewUpdate={handleReviewSuccess}
      />
    </section>
  );
};

export default ReviewSection;

