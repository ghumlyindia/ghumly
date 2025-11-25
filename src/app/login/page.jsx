'use client';
import React, { useState } from 'react';
import { fetchJson } from '../utils/api';
import { useAuth } from '../providers/AuthProvider';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await fetchJson('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const token = res?.token || res?.data?.token;
      const user = res?.user || res?.data?.user;
      if (!token) throw new Error('Invalid login response');
      login(token, user);
      router.push('/account');
    } catch (err) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900">Login</h1>
      <p className="text-gray-600 mt-2">Access your bookings and manage your account.</p>
      <form onSubmit={onSubmit} className="mt-6 space-y-4 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600" />
        </div>
        <div className="flex items-center justify-between text-sm">
          <a href="/forgot-password" className="text-teal-600 hover:text-teal-700 font-medium">
            Forgot password?
          </a>
        </div>
        <button type="submit" disabled={loading} className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 cursor-pointer">
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-teal-600 hover:text-teal-700 font-medium">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}


