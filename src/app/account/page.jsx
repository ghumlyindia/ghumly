'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { fetchJson } from '../utils/api';
import Link from 'next/link';
import { User, Mail, Phone, Edit2, Save, X, CheckCircle, AlertCircle, Map, ChevronRight } from 'lucide-react';

export default function AccountPage() {
  const { user, token, login } = useAuth();
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please login to view your account.</p>
          <Link href="/login" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#40A4DE] hover:bg-[#3090C7] transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600 mt-2">Manage your profile and settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Profile Section */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <User className="mr-2 text-[#40A4DE]" size={24} />
                  Profile Information
                </h2>
                {!showProfileEdit && (
                  <button
                    onClick={() => setShowProfileEdit(true)}
                    className="p-2 text-gray-500 hover:text-[#40A4DE] hover:bg-blue-50 rounded-full transition-all"
                    title="Edit Profile"
                  >
                    <Edit2 size={18} />
                  </button>
                )}
              </div>

              {!showProfileEdit ? (
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <User size={20} className="text-[#40A4DE]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Full Name</p>
                      <p className="text-gray-900 font-semibold mt-0.5 text-lg">{user?.name || '-'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <Mail size={20} className="text-[#40A4DE]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Email Address</p>
                      <p className="text-gray-900 font-semibold mt-0.5 break-all">{user?.email || '-'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <Phone size={20} className="text-[#40A4DE]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Phone Number</p>
                      <p className="text-gray-900 font-semibold mt-0.5">{user?.phone || '-'}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleProfileUpdate} className="space-y-5">
                  {profileError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start">
                      <AlertCircle size={16} className="mt-0.5 mr-2 flex-shrink-0" />
                      {profileError}
                    </div>
                  )}
                  {profileSuccess && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-start">
                      <CheckCircle size={16} className="mt-0.5 mr-2 flex-shrink-0" />
                      {profileSuccess}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#40A4DE] focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#40A4DE] focus:border-transparent outline-none transition-all"
                        placeholder="10-digit number"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={profileLoading}
                      className="flex-1 bg-[#40A4DE] text-white py-3 rounded-lg hover:bg-[#3090C7] disabled:opacity-50 font-medium flex items-center justify-center transition-colors shadow-md hover:shadow-lg"
                    >
                      {profileLoading ? (
                        'Saving...'
                      ) : (
                        <>
                          <Save size={18} className="mr-2" /> Save Changes
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileEdit(false);
                        setProfileForm({ name: user?.name || '', phone: user?.phone || '' });
                        setProfileError('');
                        setProfileSuccess('');
                      }}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-full">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Links</h2>

              <div className="space-y-4">
                <Link href="/trips" className="flex items-center justify-between p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group">
                  <div className="flex items-center">
                    <div className="bg-white p-2 rounded-lg shadow-sm mr-3 group-hover:scale-110 transition-transform">
                      <Map size={20} className="text-[#40A4DE]" />
                    </div>
                    <span className="font-semibold text-gray-900">My Trips</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 group-hover:text-[#40A4DE] group-hover:translate-x-1 transition-all" />
                </Link>

                {/* Add more links here if needed, e.g., Support, Settings */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
