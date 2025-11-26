'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { fetchJson } from '../utils/api';
import Link from 'next/link';
import { Package, Clock, Users, AlertCircle } from 'lucide-react';

export default function TripsPage() {
    const { user, token } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
                    <p className="text-gray-600 mb-6">Please login to view your trips.</p>
                    <Link href="/login" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#40A4DE] hover:bg-[#3090C7] transition-colors">
                        Sign In
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
                    <p className="text-gray-600 mt-2">View your upcoming and past adventures</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center">
                            <Package className="mr-2 text-[#40A4DE]" size={24} />
                            All Bookings
                        </h2>
                    </div>

                    <div className="p-6">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#40A4DE] mb-4"></div>
                                Loading your adventures...
                            </div>
                        ) : error ? (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center">
                                <AlertCircle size={20} className="mr-3" />
                                {error}
                            </div>
                        ) : bookings.length === 0 ? (
                            <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                <Package size={48} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">No bookings yet</h3>
                                <p className="text-gray-500 mt-1 mb-6">Looks like you haven't booked any trips yet.</p>
                                <Link href="/tours" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#40A4DE] hover:bg-[#3090C7] transition-colors shadow-md hover:shadow-lg">
                                    Explore Tours
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {bookings.map((b) => (
                                    <div key={b._id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-300 group">
                                        <div className="flex flex-col h-full justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${b?.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                            b?.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                                'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {b?.status ? b.status.charAt(0).toUpperCase() + b.status.slice(1) : 'Pending'}
                                                    </span>
                                                    <span className="text-xs text-gray-400 flex items-center">
                                                        <Clock size={12} className="mr-1" />
                                                        Booked on {b?.createdAt ? new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#40A4DE] transition-colors">
                                                    {b?.tourPackage?.title || b?.tour?.title || 'Tour Package'}
                                                </h3>
                                                <div className="flex items-center mt-2 text-sm text-gray-600">
                                                    <Users size={16} className="mr-1.5 text-gray-400" />
                                                    {b?.numberOfTravelers || 1} Traveler{b?.numberOfTravelers !== 1 ? 's' : ''}
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-gray-100 mt-2">
                                                {b?.tourPackage?._id && (
                                                    <Link
                                                        href={`/tours/${b.tourPackage._id}`}
                                                        className="inline-flex items-center justify-center px-4 py-2 border border-[#40A4DE] text-[#40A4DE] rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors w-full"
                                                    >
                                                        View Tour
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
