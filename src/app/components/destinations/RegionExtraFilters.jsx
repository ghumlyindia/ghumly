'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, X } from 'lucide-react';

const RegionExtraFilters = () => {
  const router = useRouter();
  const sp = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const [featured, setFeatured] = useState(sp.get('featured') || '');
  const [minPrice, setMinPrice] = useState(sp.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(sp.get('maxPrice') || '');
  const [minDays, setMinDays] = useState(sp.get('minDays') || '');
  const [maxDays, setMaxDays] = useState(sp.get('maxDays') || '');

  useEffect(() => {
    setFeatured(sp.get('featured') || '');
    setMinPrice(sp.get('minPrice') || '');
    setMaxPrice(sp.get('maxPrice') || '');
    setMinDays(sp.get('minDays') || '');
    setMaxDays(sp.get('maxDays') || '');
  }, [sp]);

  const apply = () => {
    const params = new URLSearchParams(Array.from(sp.entries()));
    featured ? params.set('featured', featured) : params.delete('featured');
    minPrice ? params.set('minPrice', minPrice) : params.delete('minPrice');
    maxPrice ? params.set('maxPrice', maxPrice) : params.delete('maxPrice');
    minDays ? params.set('minDays', minDays) : params.delete('minDays');
    maxDays ? params.set('maxDays', maxDays) : params.delete('maxDays');
    params.set('page', '1');
    router.push(`?${params.toString()}`);
    setIsOpen(false);
  };

  const reset = () => {
    setFeatured(''); setMinPrice(''); setMaxPrice(''); setMinDays(''); setMaxDays('');
    const params = new URLSearchParams(Array.from(sp.entries()));
    ['featured', 'minPrice', 'maxPrice', 'minDays', 'maxDays'].forEach(k => params.delete(k));
    params.set('page', '1');
    router.push(`?${params.toString()}`);
    setIsOpen(false);
  };

  const activeFiltersCount = [featured, minPrice, maxPrice, minDays, maxDays].filter(Boolean).length;

  return (
    <div className="relative mb-8">
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${isOpen || activeFiltersCount > 0
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
            }`}
        >
          <Filter size={16} />
          <span className="font-medium">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="bg-white text-gray-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-12 z-20 w-full md:w-[600px] bg-white rounded-2xl shadow-xl border border-gray-100 p-6 animate-fade-in-up">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Filter Tours</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Featured */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tour Type</label>
              <select
                value={featured}
                onChange={(e) => setFeatured(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-100 focus:border-sky-500 outline-none transition-all"
              >
                <option value="">All Tours</option>
                <option value="true">Featured Only</option>
                <option value="false">Standard Only</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Price Range (₹)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-100 focus:border-sky-500 outline-none transition-all"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-100 focus:border-sky-500 outline-none transition-all"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Duration (Days)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={minDays}
                  onChange={(e) => setMinDays(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-100 focus:border-sky-500 outline-none transition-all"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={maxDays}
                  onChange={(e) => setMaxDays(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-100 focus:border-sky-500 outline-none transition-all"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={reset}
              className="flex-1 px-4 py-2.5 text-gray-600 font-medium hover:bg-gray-50 rounded-xl transition-colors"
            >
              Reset All
            </button>
            <button
              onClick={apply}
              className="flex-1 px-4 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/20"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionExtraFilters;


