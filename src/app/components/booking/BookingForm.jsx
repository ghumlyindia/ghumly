'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchJson } from '../../utils/api';
import { useAuth } from '../../providers/AuthProvider';
import { Users, CreditCard, Loader } from 'lucide-react';

const BookingForm = ({ tour }) => {
  const router = useRouter();
  const { user, token } = useAuth();
  const [numberOfTravelers, setNumberOfTravelers] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!token) {
      router.push('/login?redirect=/tours/' + tour._id);
      return;
    }

    try {
      // Validate group size then navigate to checkout
      if (!validateTravelers()) { setLoading(false); return; }
      router.push(`/checkout?tourId=${tour._id}&num=${numberOfTravelers}`);
    } catch (err) {
      setError(err?.message || 'Failed to proceed to checkout.');
      setLoading(false);
    }
  };

  const initiateRazorpayPayment = (bookingData) => {
    if (!window.Razorpay) {
      setError('Payment gateway not loaded. Please refresh the page.');
      setLoading(false);
      return;
    }

    const options = {
      key: bookingData.razorpayKeyId,
      amount: bookingData.amount * 100, // Convert to paisa
      currency: 'INR',
      name: 'Ghumly',
      description: `Booking for ${tour.title}`,
      order_id: bookingData.razorpayOrderId,
      handler: async function (response) {
        // Payment successful, verify on backend
        await verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          bookingId: bookingData.bookingId,
        });
      },
      prefill: {
        name: user?.name || '',
        email: user?.email || '',
        contact: user?.phone || '',
      },
      theme: {
        color: '#40A4DF',
      },
      modal: {
        ondismiss: function () {
          setError('Payment cancelled by user');
          setLoading(false);
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const verifyPayment = async (paymentData) => {
    try {
      setLoading(true);
      const result = await fetchJson('/bookings/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      if (result.success) {
        router.push(`/booking-success?bookingId=${paymentData.bookingId}`);
      } else {
        setError(result.message || 'Payment verification failed. Please retry.');
        setLoading(false);
      }
    } catch (error) {
      setError(error?.message || 'Payment verification failed. Please try again.');
      setLoading(false);
    }
  };

  const validateTravelers = () => {
    if (numberOfTravelers < tour.minGroupSize) {
      setError(`Minimum ${tour.minGroupSize} traveler(s) required`);
      return false;
    }
    if (numberOfTravelers > tour.maxGroupSize) {
      setError(`Maximum ${tour.maxGroupSize} travelers allowed`);
      return false;
    }
    return true;
  };

  const handleTravelerChange = (value) => {
    setError('');
    setNumberOfTravelers(value);
  };

  return (
    <form onSubmit={handleBooking} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Travelers
        </label>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="number"
            min={tour.minGroupSize || 1}
            max={tour.maxGroupSize || 20}
            value={numberOfTravelers}
            onChange={(e) => handleTravelerChange(parseInt(e.target.value) || 1)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#40A4DF]"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Min: {tour.minGroupSize || 1} • Max: {tour.maxGroupSize || 20}
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Fee per traveler</span>
          <span className="text-base font-semibold text-[#40A4DF]">₹21</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Travelers × Fee</span>
          <span className="text-lg font-bold text-[#40A4DF]">₹{21 * (numberOfTravelers || 1)}</span>
        </div>
        <p className="text-xs text-gray-600 mt-1">You'll confirm the booking by paying this amount.</p>
      </div>

      <button
        type="submit"
        disabled={loading || !razorpayLoaded}
        className="w-full bg-[#40A4DF] text-white py-3 rounded-lg hover:bg-[#3593CE] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-medium transition-colors"
      >
        {loading ? (
          <>
            <Loader className="animate-spin mr-2" size={20} />
            Continue to checkout...
          </>
        ) : (
          <>
            <CreditCard className="mr-2" size={20} />
            Go to Checkout
          </>
        )}
      </button>
      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

      {!razorpayLoaded && (
        <p className="text-xs text-gray-500 text-center">Loading payment gateway...</p>
      )}

      <p className="text-xs text-gray-500 text-center">
        Secure payment powered by Razorpay
      </p>
    </form>
  );
};

export default BookingForm;