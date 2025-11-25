'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Calendar, MapPin, Search, Sparkles } from 'lucide-react';

const Hero = ({ regions = [], categories = [], agencies = [] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get('q') || '');
  const [startDate, setStartDate] = useState(searchParams.get('startDate') || '');
  const [endDate, setEndDate] = useState(searchParams.get('endDate') || '');
  const [departureCity, setDepartureCity] = useState(searchParams.get('departureCity') || '');
  const [region, setRegion] = useState(searchParams.get('region') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [agency, setAgency] = useState(searchParams.get('agency') || '');

  const onSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    q ? params.set('q', q) : params.delete('q');
    startDate ? params.set('startDate', startDate) : params.delete('startDate');
    endDate ? params.set('endDate', endDate) : params.delete('endDate');
    departureCity ? params.set('departureCity', departureCity) : params.delete('departureCity');
    region ? params.set('region', region) : params.delete('region');
    category ? params.set('category', category) : params.delete('category');
    agency ? params.set('agency', agency) : params.delete('agency');
    params.set('page', '1');

    router.push(`/tours?${params.toString()}`);
  };

  return (
    <>
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Travel Background"
            fill
            className="object-cover"
            priority
          />
          {/* Lighter Gradient Overlays for a fresher look */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#3FA5E0]/80 via-[#2E7FB8]/70 to-[#1A5F8F]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Main Heading */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-3">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-white text-sm font-semibold">India's Trusted Travel Platform</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
              Ghoomna Hai?{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100">
                Ghumly
              </span>{' '}
              Hai!
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium">
              Compare verified tour packages across India — start your next trip confidently.
            </p>
          </div>

          {/* Search Form Card - White Card Design */}
          <form onSubmit={onSubmit} className="bg-white rounded-3xl shadow-2xl p-6 backdrop-blur-sm">
            {/* Main Search Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3">
              {/* Search Input */}
              <div className="md:col-span-4 relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3FA5E0]" />
                <input
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Where do you want to go?"
                  className="w-full pl-14 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#3FA5E0]/20 focus:border-[#3FA5E0] focus:bg-white transition-all outline-none text-gray-900 placeholder:text-gray-400 font-medium text-sm"
                />
              </div>

              {/* Region Select */}
              <div className="md:col-span-3 relative">
                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3FA5E0] pointer-events-none z-10" />
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full pl-14 pr-8 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#3FA5E0]/20 focus:border-[#3FA5E0] focus:bg-white transition-all outline-none appearance-none text-gray-900 cursor-pointer font-medium text-sm"
                >
                  <option value="">Region</option>
                  {regions.map(r => (
                    <option key={r._id} value={r._id}>{r.name}</option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▼</span>
              </div>

              {/* Dates */}
              <div className="md:col-span-3 relative">
                <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3FA5E0] pointer-events-none z-10" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-14 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#3FA5E0]/20 focus:border-[#3FA5E0] focus:bg-white transition-all outline-none text-gray-900 font-medium cursor-pointer text-sm"
                />
              </div>

              {/* Search Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full h-full bg-gradient-to-r from-[#3FA5E0] to-[#2E7FB8] text-white font-bold py-3 px-6 rounded-xl hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </div>

            {/* Advanced Filters Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 bg-transparent text-xs font-medium text-gray-600 hover:text-[#3FA5E0] transition-colors cursor-pointer outline-none rounded-lg border border-transparent hover:border-gray-200"
              >
                <option value="">+ Add Category</option>
                {categories.map(c => (
                  <option key={c._id} value={c._id}>{c.categoryName}</option>
                ))}
              </select>

              <select
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
                className="w-full px-4 py-2 bg-transparent text-xs font-medium text-gray-600 hover:text-[#3FA5E0] transition-colors cursor-pointer outline-none rounded-lg border border-transparent hover:border-gray-200"
              >
                <option value="">+ Add Agency</option>
                {agencies.map(a => (
                  <option key={a._id} value={a._id}>{a.name}</option>
                ))}
              </select>

              <input
                type="text"
                value={departureCity}
                onChange={(e) => setDepartureCity(e.target.value)}
                placeholder="+ Add Departure City"
                className="w-full px-4 py-2 bg-transparent text-xs font-medium text-gray-600 placeholder:text-gray-600 hover:text-[#3FA5E0] hover:placeholder:text-[#3FA5E0] transition-colors outline-none rounded-lg border border-transparent hover:border-gray-200"
              />
            </div>
          </form>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {[
              { label: 'Tour Packages', value: '500+' },
              { label: 'Verified Agencies', value: '150+' },
              { label: 'Destinations', value: '30+' },
              { label: 'Happy Travelers', value: '10k+' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/20 backdrop-blur-md rounded-xl p-3 text-center hover:bg-white/30 transition-all duration-300 border border-white/20"
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-white/90 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;