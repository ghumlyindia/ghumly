'use client';
import React, { useState } from 'react';
import { fetchJson } from '../../utils/api';
import StarRating from './StarRating';
import { useAuth } from '../../providers/AuthProvider';
import { useRouter } from 'next/navigation';

const ReviewForm = ({ bookingId, reviewType, onSuccess, onCancel, initialRating = 0, initialReviewText = '', reviewId = null }) => {
  const { token } = useAuth();
  const router = useRouter();
  const [rating, setRating] = useState(initialRating);
  const [reviewText, setReviewText] = useState(initialReviewText);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Update form when initial values change (for editing)
  React.useEffect(() => {
    setRating(initialRating);
    setReviewText(initialReviewText);
  }, [initialRating, initialReviewText]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!rating) {
      setError('Please select a rating');
      return;
    }

    if (!token) {
      router.push('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // If reviewId exists, update the review; otherwise create new
      const url = reviewId ? `/reviews/${reviewId}` : '/reviews';
      const method = reviewId ? 'PUT' : 'POST';
      
      const response = await fetchJson(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...(reviewId ? {} : { bookingId, reviewType }), // Only include bookingId and reviewType for new reviews
          rating,
          reviewText,
        }),
      });

      if (response.success) {
        if (!reviewId) {
          setRating(0);
          setReviewText('');
        }
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      setError(err.message || `Failed to ${reviewId ? 'update' : 'submit'} review. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {reviewId ? 'Edit Your Review' : 'Write a Review'}
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating *
        </label>
        <StarRating rating={rating} onRatingChange={setRating} />
      </div>

      <div className="mb-4">
        <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700 mb-2">
          Your Review
        </label>
        <textarea
          id="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          maxLength={1000}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
          placeholder="Share your experience..."
        />
        <p className="mt-1 text-xs text-gray-500">
          {reviewText.length}/1000 characters
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || !rating}
          className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (reviewId ? 'Updating...' : 'Submitting...') : (reviewId ? 'Update Review' : 'Submit Review')}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;

