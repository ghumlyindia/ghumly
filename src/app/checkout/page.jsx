'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchJson } from '../utils/api';
import { useAuth } from '../providers/AuthProvider';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { token, user } = useAuth();

  const tourId = searchParams.get('tourId');
  const initialNum = Number(searchParams.get('num') || '1');
  const [tour, setTour] = useState(null);
  const [num, setNum] = useState(initialNum);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) { router.push(`/login?redirect=/checkout?tourId=${tourId}&num=${initialNum}`); return; }
  }, [token, router, tourId, initialNum]);

  useEffect(() => {
    const loadTour = async () => {
      if (!tourId) return;
      try {
        const res = await fetchJson(`/tour-packages/${tourId}`);
        setTour(res?.data || res);
      } catch (e) {
        setError('Failed to load tour');
      }
    };
    loadTour();
  }, [tourId]);

  const clampNum = (n) => {
    const min = tour?.minGroupSize || 1;
    const max = tour?.maxGroupSize || 20;
    return Math.max(min, Math.min(max, n));
  };

  const handlePay = async () => {
    try {
      setLoading(true); setError('');
      const order = await fetchJson('/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tourPackageId: tour._id, numberOfTravelers: num }),
      });
      if (!order?.success) throw new Error(order?.message || 'Failed to create order');

      // Load Razorpay script
      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://checkout.razorpay.com/v1/checkout.js';
          s.onload = resolve; s.onerror = reject; document.body.appendChild(s);
        });
      }

      const options = {
        key: order.razorpayKeyId,
        amount: order.amount * 100,
        currency: 'INR',
        name: 'Ghumly',
        description: `Booking confirmation for ${tour.title}`,
        order_id: order.razorpayOrderId,
        prefill: { name: user?.name || '', email: user?.email || '', contact: user?.phone || '' },
        theme: { color: '#14b8a6' },
        handler: async (response) => {
          try {
            const verify = await fetchJson('/bookings/verify-payment', {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: order.bookingId,
              })
            });
            if (verify?.success) {
              router.push(`/booking-success?bookingId=${order.bookingId}`);
            } else {
              setError(verify?.message || 'Payment verification failed');
            }
          } catch (e) { setError('Payment verification failed'); }
        },
        modal: { ondismiss: () => setError('Payment cancelled by user') }
      };
      const rz = new window.Razorpay(options);
      rz.open();
      setLoading(false);
    } catch (e) {
      setError(e?.message || 'Checkout failed');
      setLoading(false);
    }
  };

  const feePerTraveler = 21;
  const total = feePerTraveler * (num || 1);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Checkout</h1>
      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>}
      {!tour ? (
        <div className="text-gray-600">Loading...</div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex gap-4">
                {tour?.mainImage?.url && (
                  <img src={tour.mainImage.url} alt={tour.title} className="w-28 h-20 object-cover rounded" />
                )}
                <div>
                  <div className="font-semibold text-gray-900">{tour.title}</div>
                  <div className="text-sm text-gray-600">{tour?.agency?.name} • {tour?.region?.name}</div>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
                <input
                  type="number"
                  min={tour.minGroupSize || 1}
                  max={tour.maxGroupSize || 20}
                  value={num}
                  onChange={(e) => setNum(clampNum(parseInt(e.target.value) || 1))}
                  className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600"
                />
                <p className="text-xs text-gray-500 mt-1">Min: {tour.minGroupSize || 1} • Max: {tour.maxGroupSize || 20}</p>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Order Summary</h2>
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Booking fee per traveler</span>
                <span>₹{feePerTraveler}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Travelers</span>
                <span>× {num}</span>
              </div>
              <div className="border-t border-gray-200 mt-3 pt-3 flex items-center justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-teal-700">₹{total}</span>
              </div>
              <button
                onClick={handlePay}
                disabled={loading}
                className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-lg font-medium disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Pay and Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div></div>}>
      <CheckoutContent />
    </Suspense>
  );
}


