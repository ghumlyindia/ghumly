'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchJson } from '../utils/api';
import { useAuth } from '../providers/AuthProvider';
import { CheckCircle, Calendar, MapPin, Users, FileText, Home } from 'lucide-react';

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { token } = useAuth();
  const bookingId = searchParams.get('bookingId');

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId || !token) {
        router.push('/account');
        return;
      }

      try {
        const data = await fetchJson(`/bookings/${bookingId}`);
        setBooking(data?.booking || data?.data);
      } catch (err) {
        console.error('Failed to fetch booking:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, token, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-orange-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-orange-50 px-4">
        <div className="max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Not Found</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find your booking details.
          </p>
          <button
            onClick={() => router.push('/account')}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium transition-colors"
          >
            Go to My Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <CheckCircle className="text-green-600" size={48} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Booking Confirmed! 🎉
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Your tour package has been successfully booked.
          </p>
          <p className="text-sm text-gray-500">
            You will receive a confirmation email shortly with all the details.
          </p>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Booking Details</h2>
          <div className="space-y-4">
            <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-600">Booking ID</p>
                <p className="text-lg font-semibold text-gray-900">{booking._id}</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-gray-50 rounded-lg">
              <FileText className="text-teal-600 mr-3 mt-1" size={20} />
              <div>
                <p className="text-sm font-medium text-gray-600">Tour Package</p>
                <p className="text-lg font-semibold text-gray-900">
                  {booking.tourPackage?.title || 'Tour Package'}
                </p>
                {booking.tourPackage?.agency?.name && (
                  <p className="text-sm text-gray-600 mt-1">
                    Agency: {booking.tourPackage.agency.name}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <Users className="text-teal-600 mr-3 mt-1" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-600">Travelers</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {booking.numberOfTravelers} {booking.numberOfTravelers === 1 ? 'Person' : 'People'}
                  </p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <Calendar className="text-teal-600 mr-3 mt-1" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-600">Booking Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(booking.bookingDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {booking.tourPackage?.startDate && (
              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <MapPin className="text-teal-600 mr-3 mt-1" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-600">Tour Start Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(booking.tourPackage.startDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start justify-between p-4 bg-teal-50 rounded-lg border border-teal-200">
              <div>
                <p className="text-sm font-medium text-teal-700">Total Amount Paid</p>
                <p className="text-2xl font-bold text-teal-900">
                  ₹{booking.totalAmount.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-teal-700">Status</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                  {booking.status === 'confirmed' ? 'Confirmed' : booking.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push('/account')}
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 font-medium transition-colors flex items-center justify-center"
          >
            View My Bookings
          </button>
          <button
            onClick={() => router.push('/')}
            className="flex-1 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 font-medium transition-colors flex items-center justify-center"
          >
            <Home className="mr-2" size={20} />
            Browse More Tours
          </button>
        </div>

        {/* Important Note */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">📧 What's Next?</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• You will receive a confirmation email with all booking details</li>
            <li>• The tour agency will contact you shortly with further information</li>
            <li>• You can view and manage your bookings from your account page</li>
            <li>• Save your booking ID for future reference</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

