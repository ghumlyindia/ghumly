'use client';
import React, { useState, useEffect } from 'react';
import { fetchJson } from '../../utils/api';
import ReviewForm from './ReviewForm';

const BookingReviewForm = ({ tourId = null, agencyId = null, onSuccess }) => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviewChecks, setReviewChecks] = useState({});

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetchJson('/bookings/my-bookings');
      const bookingsList = response?.bookings || response?.data || response || [];

      // Filter confirmed bookings for this tour/agency
      const relevantBookings = bookingsList.filter(booking => {
        if (booking.status !== 'confirmed') return false;
        if (tourId && String(booking.tourPackage?._id) === String(tourId)) return true;
        // For agency reviews, check if the booking's tour package belongs to this agency
        if (agencyId) {
          const bookingAgencyId = booking.tourPackage?.agency?._id || booking.tourPackage?.agency;
          if (String(bookingAgencyId) === String(agencyId)) return true;
        }
        return false;
      });

      setBookings(relevantBookings);

      // Check review status for each booking
      for (const booking of relevantBookings) {
        try {
          const check = await fetchJson(`/reviews/check/${booking._id}`);
          setReviewChecks(prev => ({
            ...prev,
            [booking._id]: check
          }));
        } catch (err) {
          // Ignore errors
        }
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-500 font-medium">Loading your bookings...</div>;
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-blue-700 text-sm font-medium flex items-center gap-3">
        <span className="text-xl">ℹ️</span>
        You need to have a confirmed booking to write a review.
      </div>
    );
  }

  // Filter bookings that can still be reviewed
  // IMPORTANT: Users can review BOTH tour and agency separately for the same booking
  // So if they reviewed the tour, they can still review the agency, and vice versa
  const reviewableBookings = bookings.filter(booking => {
    const check = reviewChecks[booking._id];
    if (!check || !check.canReview) return false;
    // For tour reviews: only filter if already reviewed THIS tour
    if (tourId && check.hasReviewedTour) return false;
    // For agency reviews: only filter if already reviewed THIS agency
    if (agencyId && check.hasReviewedAgency) return false;
    return true;
  });

  if (reviewableBookings.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-gray-700 text-sm font-medium">
        You have already reviewed all your bookings for this {tourId ? 'tour' : 'agency'}.
      </div>
    );
  }

  if (selectedBooking) {
    return (
      <div>
        <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-between">
          <p className="text-sm text-blue-900 font-medium">
            Reviewing booking for: <strong className="text-blue-950">{selectedBooking.tourPackage?.title || 'Tour'}</strong>
          </p>
          <button
            onClick={() => setSelectedBooking(null)}
            className="text-sm text-[#3FA5E0] hover:text-[#2E7FB8] font-semibold hover:underline"
          >
            Change booking
          </button>
        </div>
        <ReviewForm
          bookingId={selectedBooking._id}
          reviewType={tourId ? 'tour' : 'agency'}
          onSuccess={() => {
            setSelectedBooking(null);
            if (onSuccess) onSuccess();
          }}
          onCancel={() => setSelectedBooking(null)}
        />
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Select a Booking to Review</h3>
      <div className="space-y-3">
        {reviewableBookings.map(booking => {
          const check = reviewChecks[booking._id];
          return (
            <button
              key={booking._id}
              onClick={() => setSelectedBooking(booking)}
              className="w-full text-left p-4 border border-gray-200 rounded-xl hover:border-[#3FA5E0] hover:bg-[#3FA5E0]/5 transition-all duration-200 group"
            >
              <div className="font-bold text-gray-900 group-hover:text-[#3FA5E0] transition-colors">
                {booking.tourPackage?.title || 'Tour'}
              </div>
              <div className="text-sm text-gray-500 mt-1 font-medium">
                Booked on {new Date(booking.createdAt).toLocaleDateString('en-IN')} •
                {booking.numberOfTravelers} {booking.numberOfTravelers === 1 ? 'traveler' : 'travelers'}
              </div>
              {check && (
                <div className="text-xs text-green-600 mt-2 font-medium flex items-center gap-1">
                  {tourId && check.hasReviewedTour && '✓ Already reviewed this tour'}
                  {agencyId && check.hasReviewedAgency && '✓ Already reviewed this agency'}
                  {tourId && !check.hasReviewedTour && '✓ Can review this tour'}
                  {agencyId && !check.hasReviewedAgency && '✓ Can review this agency'}
                  {tourId && !check.hasReviewedTour && !check.hasReviewedAgency && '💡 You can review both the tour and agency separately'}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BookingReviewForm;

