'use client';
import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchJson } from '../utils/api';
import Link from 'next/link';
import { Search, MapPin, Star, CheckCircle, ChevronRight, Sparkles, Filter, Globe } from 'lucide-react';
import PageHero from '../components/shared/PageHero';
import { TRAVEL_THEMES } from '../constants/travelThemes';

const AgencyCard = ({ agency }) => {
  return (
    <Link href={`/agencies/${agency._id}`} className="group block h-full">
      <div className="relative h-full overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-blue-100/50 hover:-translate-y-1">
        <div className="relative p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start gap-4 mb-5">
            <div className="relative shrink-0">
              {agency?.logo?.url ? (
                <div className="relative">
                  <img
                    src={agency.logo.url}
                    alt={agency.name}
                    className="w-16 h-16 rounded-xl object-cover ring-1 ring-gray-100 shadow-sm group-hover:scale-105 transition-transform duration-300"
                  />
                  {agency.isVerified && (
                    <div className="absolute -bottom-1.5 -right-1.5 bg-white rounded-full p-0.5 shadow-sm ring-1 ring-gray-100">
                      <CheckCircle size={16} className="text-blue-500 fill-blue-500/10" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400 font-bold text-2xl shadow-sm group-hover:scale-105 transition-transform duration-300">
                    {agency.name?.[0]?.toUpperCase() || 'A'}
                  </div>
                  {agency.isVerified && (
                    <div className="absolute -bottom-1.5 -right-1.5 bg-white rounded-full p-0.5 shadow-sm ring-1 ring-gray-100">
                      <CheckCircle size={16} className="text-blue-500 fill-blue-500/10" />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2 font-serif group-hover:text-blue-600 transition-colors">
                {agency.name}
              </h3>
              {agency.isFeatured && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-600 border border-orange-100">
                  Premium
                </span>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 mb-4 text-gray-500 text-sm">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="truncate">{agency.cityLocation || 'Location not specified'}</span>
          </div>

          {/* Description */}
          <div className="flex-grow mb-6">
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {agency.description || 'No description available.'}
            </p>
          </div>

          {/* Tags */}
          {agency.tourTypes && agency.tourTypes.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {agency.tourTypes.slice(0, 3).map((theme) => (
                <span key={theme} className="inline-flex items-center px-2 py-1 rounded-md bg-gray-50 text-gray-600 text-xs font-medium border border-gray-100">
                  {TRAVEL_THEMES.find((t) => t.value === theme)?.label || theme}
                </span>
              ))}
              {agency.tourTypes.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-50 text-gray-400 text-xs font-medium border border-gray-100">
                  +{agency.tourTypes.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
              <span className="font-bold text-gray-900">{agency.averageRating?.toFixed(1) || 'New'}</span>
              {agency.totalReviews > 0 && (
                <span className="text-xs text-gray-400">({agency.totalReviews})</span>
              )}
            </div>

            <span className="text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
              View Profile <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

function AgenciesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [city, setCity] = useState(searchParams.get('city') || '');
  const [verifiedOnly, setVerifiedOnly] = useState(searchParams.get('verified') === 'true');
  const [selectedTheme, setSelectedTheme] = useState(searchParams.get('tourType') || '');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams();
        params.set('limit', '200');
        params.set('status', 'active');
        if (verifiedOnly) params.set('verified', 'true');
        if (city) params.set('city', city);
        if (query) params.set('search', query);
        if (selectedTheme) params.set('tourType', selectedTheme);
        const res = await fetchJson(`/agencies?${params.toString()}`);
        const sorted = (res?.data || []).sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          if (a.averageRating !== b.averageRating) return (b.averageRating || 0) - (a.averageRating || 0);
          return a.name.localeCompare(b.name);
        });
        setAgencies(sorted);
      } catch (e) {
        setError(e?.message || 'Failed to load agencies');
      } finally {
        setLoading(false);
      }
    };
    load();

    const params = new URLSearchParams();
    if (query) params.set('search', query);
    if (city) params.set('city', city);
    if (verifiedOnly) params.set('verified', 'true');
    if (selectedTheme) params.set('tourType', selectedTheme);
    const newUrl = params.toString() ? `/agencies?${params.toString()}` : '/agencies';
    router.replace(newUrl, { scroll: false });
  }, [query, city, verifiedOnly, selectedTheme, router]);

  const cities = useMemo(() => {
    const s = new Set();
    agencies.forEach(a => { if (a?.cityLocation) s.add(a.cityLocation); });
    return Array.from(s).sort();
  }, [agencies]);

  const handleSearchClick = () => {
    // Trigger re-fetch by updating query state
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <PageHero
        title={
          <>
            Trusted Travel <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Agencies</span>
          </>
        }
        subtitle="Connect with verified travel experts who can turn your dream vacation into reality."
        bgImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
        badgeText="Global Partners"
      />

      {/* Search & Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-20">
        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-gray-100 p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
                placeholder="Search by agency name..."
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-gray-900 placeholder-gray-500"
              />
            </div>

            {/* City Filter */}
            <div className="md:col-span-3 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <MapPin className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                list="cities"
                placeholder="City"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-gray-900 placeholder-gray-500"
              />
              <datalist id="cities">
                {cities.map(c => (<option key={c} value={c} />))}
              </datalist>
            </div>

            {/* Theme Filter */}
            <div className="md:col-span-3 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Filter className="w-5 h-5" />
              </div>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-gray-900 appearance-none cursor-pointer"
              >
                <option value="">All Types</option>
                {TRAVEL_THEMES.map((theme) => (
                  <option key={theme.value} value={theme.value}>{theme.label}</option>
                ))}
              </select>
            </div>

            {/* Verified Toggle */}
            <div className="md:col-span-1 flex items-center justify-center">
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`p-3.5 rounded-xl border transition-all ${verifiedOnly
                  ? 'bg-blue-50 border-blue-200 text-blue-600'
                  : 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100'
                  }`}
                title="Verified Only"
              >
                <CheckCircle className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 font-serif">
            {query || city || verifiedOnly ? 'Search Results' : 'All Agencies'}
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="font-medium text-gray-900">{agencies.length}</span>
            <span>agencies found</span>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-gray-100"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-red-100">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        ) : agencies.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No agencies found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {agencies.map((agency) => (
              <AgencyCard key={agency._id} agency={agency} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AgenciesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
      <AgenciesContent />
    </Suspense>
  );
}