'use client';
import React, { useState, useEffect } from 'react';
import { fetchJson } from '../../utils/api';
import { useAuth } from '../../providers/AuthProvider';
import StarRating from './StarRating';
import ReviewForm from './ReviewForm';
// Using native date formatting instead of date-fns

const ReviewsList = ({ tourId = null, agencyId = null, onReviewUpdate }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [editingReview, setEditingReview] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const endpoint = tourId
          ? `/reviews/tour/${tourId}?page=${page}&limit=10`
          : `/reviews/agency/${agencyId}?page=${page}&limit=10`;

        const response = await fetchJson(endpoint);
        if (response.success) {
          setReviews(response.data);
          setPagination(response.pagination || {});
        }
      } catch (err) {
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    if (tourId || agencyId) {
      fetchReviews();
    }
  }, [tourId, agencyId, page]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3FA5E0] mx-auto mb-4"></div>
        <p className="text-gray-500 font-medium">Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-xl border border-red-100">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  const handleEdit = (review) => {
    setEditingReview(review);
  };

  const handleDelete = async (reviewId) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      await fetchJson(`/reviews/${reviewId}`, {
        method: 'DELETE',
      });
      // Refresh reviews
      const endpoint = tourId
        ? `/reviews/tour/${tourId}?page=${page}&limit=10`
        : `/reviews/agency/${agencyId}?page=${page}&limit=10`;
      const response = await fetchJson(endpoint);
      if (response.success) {
        setReviews(response.data);
        setPagination(response.pagination || {});
      }
      if (onReviewUpdate) onReviewUpdate();
    } catch (err) {
      alert('Failed to delete review: ' + (err.message || 'Unknown error'));
    }
  };

  const handleUpdateSuccess = () => {
    setEditingReview(null);
    // Refresh reviews
    const refreshReviews = async () => {
      const endpoint = tourId
        ? `/reviews/tour/${tourId}?page=${page}&limit=10`
        : `/reviews/agency/${agencyId}?page=${page}&limit=10`;
      const response = await fetchJson(endpoint);
      if (response.success) {
        setReviews(response.data);
        setPagination(response.pagination || {});
      }
    };
    refreshReviews();
    if (onReviewUpdate) onReviewUpdate();
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
        <div className="text-4xl mb-3">📝</div>
        <p className="text-gray-900 font-semibold text-lg mb-1">No reviews yet</p>
        <p className="text-gray-500">Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => {
        const isOwnReview = user && review.user?._id === user._id;
        const isEditing = editingReview?._id === review._id;

        if (isEditing) {
          return (
            <div key={review._id} className="bg-white border-2 border-[#3FA5E0]/30 rounded-2xl p-6 shadow-lg">
              <h4 className="font-semibold text-gray-900 mb-4 text-lg">Edit Your Review</h4>
              <ReviewForm
                bookingId={review.booking}
                reviewType={tourId ? 'tour' : 'agency'}
                initialRating={review.rating}
                initialReviewText={review.reviewText}
                reviewId={review._id}
                onSuccess={handleUpdateSuccess}
                onCancel={() => setEditingReview(null)}
              />
            </div>
          );
        }

        return (
          <div key={review._id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3FA5E0]/20 to-[#2E7FB8]/20 flex items-center justify-center text-[#2E7FB8] font-bold text-lg shadow-inner">
                    {review.user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg flex items-center gap-2">
                      {review.user?.name || 'Anonymous'}
                      {isOwnReview && (
                        <span className="text-xs text-[#3FA5E0] bg-[#3FA5E0]/10 px-2 py-0.5 rounded-full font-medium border border-[#3FA5E0]/20">
                          You
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                      {review.createdAt && new Date(review.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                      {review.updatedAt && review.updatedAt !== review.createdAt && (
                        <span className="ml-2 text-xs text-gray-400 italic">(edited)</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                  <StarRating rating={review.rating} readonly size={18} />
                </div>
                {isOwnReview && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(review)}
                      className="text-xs font-medium text-[#3FA5E0] hover:text-[#2E7FB8] px-2 py-1 hover:bg-[#3FA5E0]/5 rounded transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="text-xs font-medium text-red-500 hover:text-red-700 px-2 py-1 hover:bg-red-50 rounded transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {review.reviewText && (
              <div className="pl-16">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {review.reviewText}
                </p>
              </div>
            )}
          </div>
        );
      })}

      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-8">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            Previous
          </button>
          <span className="text-sm font-medium text-gray-900 bg-gray-50 px-3 py-1 rounded-lg">
            Page {page} of {pagination.pages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
            disabled={page >= pagination.pages}
            className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsList;

