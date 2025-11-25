'use client';
import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, MapPin, ArrowRight } from 'lucide-react';

const RegionCard = ({ region }) => {
  return (
    <Link href={`/destinations/${region._id}`} className="block group h-full">
      <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
        {/* Image */}
        <div className="absolute inset-0">
          <img
            src={region?.bannerImage?.url}
            alt={region.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {/* Tag/Subtitle */}
            <div className="mb-2 overflow-hidden">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium border border-white/10 transform -translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                {region.subtitle || 'Explore Now'}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-3xl font-bold text-white mb-2 leading-tight">
              {region.name}
            </h3>

            {/* Divider */}
            <div className="w-12 h-1 bg-sky-500 rounded-full mb-4 group-hover:w-20 transition-all duration-500" />

            {/* Action Row */}
            <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <MapPin size={16} className="text-sky-400" />
                <span>View Packages</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center hover:bg-sky-400 hover:text-white transition-colors duration-300">
                <ArrowRight size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const RegionGrid = ({ regions = [], initialQuery = '' }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(initialQuery);

  useEffect(() => {
    setQ(initialQuery);
  }, [initialQuery]);

  const filtered = useMemo(() => {
    const query = (q || '').trim().toLowerCase();
    if (!query) return regions;
    return regions.filter(r =>
      r?.name?.toLowerCase().includes(query) ||
      r?.regionTag?.toLowerCase().includes(query) ||
      r?.subtitle?.toLowerCase().includes(query)
    );
  }, [q, regions]);

  const handleSearchClick = () => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    q ? params.set('q', q) : params.delete('q');
    router.push(`/destinations?${params.toString()}`);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen -mt-10 relative z-10 rounded-t-[3rem]">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Search Section */}
        <div className="max-w-3xl mx-auto -mt-24 relative z-20">
          <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
                placeholder="Where do you want to go?"
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-100 text-lg"
              />
            </div>
            <button
              onClick={handleSearchClick}
              className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-sky-600 transition-colors shadow-lg hover:shadow-sky-500/30 flex items-center gap-2"
            >
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center space-y-4 pt-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Popular Destinations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore our most popular destinations and start planning your next adventure today.
          </p>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
              <Search className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No destinations found</h3>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map((r) => (
              <RegionCard key={r._id} region={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegionGrid;