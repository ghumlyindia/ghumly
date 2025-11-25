'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { fetchJson } from '../utils/api';
import Link from 'next/link';

export default function AccountPage() {
  const { user, token, login } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!token) return;
      setLoading(true); setError('');
      try {
        // Prefer dedicated booking history endpoint if available
        let res;
        try {
          res = await fetchJson('/bookings/my-bookings');
        } catch (_) {
          res = await fetchJson('/auth/booking-history');
        }
        // Normalize different response shapes
        const normalized = Array.isArray(res)
          ? res
          : (res?.bookings || res?.data || []);
        setBookings(Array.isArray(normalized) ? normalized : []);
      } catch (e) {
        setError(e?.message || 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');
    setProfileLoading(true);

    try {
      // Basic client-side validation for Indian phone format
      const phoneStr = String(profileForm.phone || '').trim();
      if (phoneStr && !/^[6-9]\d{9}$/.test(phoneStr)) {
        throw new Error('Please enter a valid 10-digit Indian phone number');
      }
      const res = await fetchJson('/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm),
      });

      if (res.success) {
        setProfileSuccess('Profile updated successfully!');
        if (res.user) {
          // Update auth context and local storage with latest user
          login(token, res.user);
        }
        setShowProfileEdit(false);
      }
    } catch (err) {
      setProfileError(err?.message || 'Failed to update profile');
    } finally {
      setProfileLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-700">
        Please <Link href="/login" className="text-teal-600 hover:text-teal-700">login</Link> to view your bookings.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
      <p className="text-gray-600 mt-1">Welcome{user?.name ? `, ${user.name}` : ''}.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Profile Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
            {!showProfileEdit && (
              <button
                onClick={() => setShowProfileEdit(true)}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
              >
                Edit
              </button>
            )}
          </div>

          {!showProfileEdit ? (
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-600">Name</div>
                <div className="font-medium text-gray-900">{user?.name || '-'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Email</div>
                <div className="font-medium text-gray-900">{user?.email || '-'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Phone</div>
                <div className="font-medium text-gray-900">{user?.phone || '-'}</div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              {profileError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {profileError}
                </div>
              )}
              {profileSuccess && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                  {profileSuccess}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={profileLoading}
                  className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 disabled:opacity-50 font-medium"
                >
                  {profileLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileEdit(false);
                    setProfileForm({ name: user?.name || '', phone: user?.phone || '' });
                    setProfileError('');
                    setProfileSuccess('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Bookings Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">My Bookings</h2>
          {loading ? (
            <div className="text-gray-600">Loading bookings...</div>
          ) : error ? (
            <div className="text-red-600 text-sm">{error}</div>
          ) : bookings.length === 0 ? (
            <div className="text-gray-600">No bookings yet.</div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div key={b._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="font-medium text-gray-900">{b?.tourPackage?.title || b?.tour?.title || 'Tour'}</div>
                  <div className="text-sm text-gray-700 mt-1">Status: {b?.status || 'N/A'}</div>
                  <div className="text-sm text-gray-700">Travelers: {b?.numberOfTravelers || 1}</div>
                  {b?.createdAt && (
                    <div className="text-sm text-gray-500 mt-1">
                      Booked on {new Date(b.createdAt).toLocaleDateString('en-IN')}
                    </div>
                  )}
                  {b?.tourPackage?._id && (
                    <Link href={`/tours/${b.tourPackage._id}`} className="inline-block mt-2 text-sm text-teal-600 hover:text-teal-700">
                      View tour
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


