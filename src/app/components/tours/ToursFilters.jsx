'use client';
import React, { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TRAVEL_THEMES } from '../../constants/travelThemes';
import { MapPin, Tag, Star, Calendar, DollarSign, Clock, Filter, X } from 'lucide-react';

const FilterSection = ({ title, icon: Icon, children }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
      {Icon && <Icon className="w-4 h-4 text-blue-500" />}
      {title}
    </div>
    {children}
  </div>
);

const StyledSelect = ({ name, value, onChange, options, placeholder }) => (
  <div className="relative">
    <select
      name={name}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
    >
      <option value="">{placeholder}</option>
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
    </div>
  </div>
);

const StyledInput = ({ type = "text", value, onChange, placeholder, min }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    min={min}
    className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-gray-400"
  />
);

const ToursFilters = ({ agencies = [], regions = [], categories = [] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const values = useMemo(() => ({
    agency: searchParams.get('agency') || '',
    region: searchParams.get('region') || '',
    category: searchParams.get('category') || '',
    featured: searchParams.get('featured') || '',
    status: searchParams.get('status') || 'active',
    sort: searchParams.get('sort') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minDays: searchParams.get('minDays') || '',
    maxDays: searchParams.get('maxDays') || '',
    startFrom: searchParams.get('startFrom') || '',
    startTo: searchParams.get('startTo') || '',
    tourTheme: searchParams.get('tourTheme') || ''
  }), [searchParams]);

  const updateParam = (key, val) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    val ? params.set(key, val) : params.delete(key);
    params.set('page', '1');
    const base = typeof window !== 'undefined' && window.location.pathname.startsWith('/tours') ? '/tours' : '/';
    router.push(`${base}?${params.toString()}`);
  };

  const activeFiltersCount = Object.keys(values).filter(k => values[k] && k !== 'status').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Filter className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">Filters</h3>
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={() => router.push((typeof window !== 'undefined' && window.location.pathname.startsWith('/tours') ? '/tours' : '/'))}
            className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1 transition-colors"
          >
            <X className="w-4 h-4" /> Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
        {/* Primary Filters */}
        <FilterSection title="Location & Agency" icon={MapPin}>
          <StyledSelect
            name="region"
            value={values.region}
            onChange={updateParam}
            placeholder="All Regions"
            options={regions.map(r => ({ value: r._id, label: r.name }))}
          />
          <StyledSelect
            name="agency"
            value={values.agency}
            onChange={updateParam}
            placeholder="All Agencies"
            options={agencies.map(a => ({ value: a._id, label: a.name }))}
          />
        </FilterSection>

        <FilterSection title="Type & Theme" icon={Tag}>
          <StyledSelect
            name="category"
            value={values.category}
            onChange={updateParam}
            placeholder="All Categories"
            options={categories.map(c => ({ value: c._id, label: c.categoryName }))}
          />
          <StyledSelect
            name="tourTheme"
            value={values.tourTheme}
            onChange={updateParam}
            placeholder="All Themes"
            options={TRAVEL_THEMES.map((theme) => ({ value: theme.value, label: theme.label }))}
          />
        </FilterSection>

        <FilterSection title="Budget & Duration" icon={DollarSign}>
          <div className="grid grid-cols-2 gap-2">
            <StyledInput
              type="number"
              value={values.minPrice}
              onChange={(e) => updateParam('minPrice', e.target.value)}
              placeholder="Min ₹"
              min={0}
            />
            <StyledInput
              type="number"
              value={values.maxPrice}
              onChange={(e) => updateParam('maxPrice', e.target.value)}
              placeholder="Max ₹"
              min={0}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <StyledInput
              type="number"
              value={values.minDays}
              onChange={(e) => updateParam('minDays', e.target.value)}
              placeholder="Min Days"
              min={1}
            />
            <StyledInput
              type="number"
              value={values.maxDays}
              onChange={(e) => updateParam('maxDays', e.target.value)}
              placeholder="Max Days"
              min={1}
            />
          </div>
        </FilterSection>

        <FilterSection title="Dates & Sorting" icon={Calendar}>
          <div className="grid grid-cols-2 gap-2">
            <StyledInput
              type="date"
              value={values.startFrom}
              onChange={(e) => updateParam('startFrom', e.target.value)}
              placeholder="From"
            />
            <StyledInput
              type="date"
              value={values.startTo}
              onChange={(e) => updateParam('startTo', e.target.value)}
              placeholder="To"
            />
          </div>
          <StyledSelect
            name="sort"
            value={values.sort}
            onChange={updateParam}
            placeholder="Sort By"
            options={[
              { value: 'newest', label: 'Newest' },
              { value: 'price_asc', label: 'Price: Low to High' },
              { value: 'price_desc', label: 'Price: High to Low' },
              { value: 'startDate_asc', label: 'Start Date: Soonest' },
              { value: 'startDate_desc', label: 'Start Date: Latest' }
            ]}
          />
        </FilterSection>
      </div>

      {/* Active Filters Chips */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
          {['agency', 'region', 'category', 'featured', 'minPrice', 'maxPrice', 'minDays', 'maxDays', 'startFrom', 'startTo', 'tourTheme']
            .filter(k => values[k])
            .map(k => (
              <button
                key={k}
                onClick={() => updateParam(k, '')}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors"
              >
                <span className="opacity-60 uppercase tracking-wider text-[10px]">{k}:</span>
                {values[k]}
                <X className="w-3 h-3 ml-1" />
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default ToursFilters;


