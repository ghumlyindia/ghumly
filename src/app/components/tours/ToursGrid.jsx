'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { TRAVEL_THEMES } from '../../constants/travelThemes';
import { Clock, MapPin, Star, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

const TourCard = ({ item }) => {
  const durationText =
    item.durationDays
      ? `${item.durationDays} Days`
      : item.duration || '';

  const themeLabel = item.primaryTheme
    ? (TRAVEL_THEMES.find((t) => t.value === item.primaryTheme)?.label || item.primaryTheme)
    : null;

  const secondaryThemes = (item.travelThemes || []).filter(
    (theme) => theme && theme !== item.primaryTheme
  );

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={item.mainImage?.url}
          alt={item.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {item.isFeatured && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-orange-500 text-white px-2.5 py-1 rounded-full shadow-lg backdrop-blur-sm">
              <Sparkles className="w-3 h-3" /> Premium
            </span>
          )}
          {item?.agency?.name && item?.agency?.isVerified && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white px-2.5 py-1 rounded-full shadow-lg backdrop-blur-sm">
              <CheckCircle className="w-3 h-3" /> Verified
            </span>
          )}
        </div>

        {/* Theme Badge */}
        {themeLabel && (
          <div className="absolute bottom-3 left-3">
            <span className="text-xs font-medium bg-white/90 backdrop-blur text-gray-900 px-3 py-1 rounded-full shadow-lg border border-white/20">
              {themeLabel}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 font-serif group-hover:text-blue-600 transition-colors leading-tight">
            {item.title}
          </h3>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="truncate max-w-[100px]">{item?.region?.name || 'Multiple Locations'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{durationText}</span>
          </div>
        </div>

        {/* Agency & Themes */}
        <div className="mb-6 flex-grow">
          <div className="flex flex-wrap gap-1.5">
            {secondaryThemes.slice(0, 3).map((theme) => (
              <span key={theme} className="inline-flex items-center px-2 py-1 bg-gray-50 text-gray-600 text-[10px] font-medium rounded-md border border-gray-100">
                {TRAVEL_THEMES.find((t) => t.value === theme)?.label || theme}
              </span>
            ))}
            {secondaryThemes.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 bg-gray-50 text-gray-400 text-[10px] font-medium rounded-md border border-gray-100">
                +{secondaryThemes.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Starting from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-blue-900">
                {item.price?.amount ? `₹${item.price.amount.toLocaleString('en-IN')}` : 'Contact'}
              </span>
              {item.price?.type === 'per_person' && (
                <span className="text-xs text-gray-500">/ person</span>
              )}
            </div>
          </div>

          <Link
            href={`/tours/${item._id}`}
            className="group/btn inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            <ArrowRight className="w-5 h-5 group-hover/btn:-rotate-45 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const ToursGrid = ({ items = [], pagination }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('page', String(page));
    const basePath =
      typeof window !== 'undefined' && window.location.pathname.startsWith('/tours')
        ? window.location.pathname
        : '/tours';
    router.push(`${basePath}?${params.toString()}`);
  };

  const totalPages = pagination?.totalPages || 0;
  const currentPage = pagination?.page || pagination?.currentPage || 1;

  return (
    <div className="space-y-8">
      {items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No tours found</h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            We couldn't find any tours matching your criteria. Try adjusting your filters or search terms.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <TourCard key={item._id} item={item} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <button
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={() => goToPage(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
          >
            Previous
          </button>

          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              const isCurrent = page === currentPage;
              // Show limited pages logic could go here, for now showing all if small number
              if (totalPages > 7 && Math.abs(page - currentPage) > 2 && page !== 1 && page !== totalPages) {
                if (Math.abs(page - currentPage) === 3) return <span key={page} className="px-1 text-gray-400">...</span>;
                return null;
              }

              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${isCurrent
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ToursGrid;


