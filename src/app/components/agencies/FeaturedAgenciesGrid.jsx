'use client';
import Link from 'next/link';
import { MapPin, Star, Award, Building2, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { TRAVEL_THEMES } from '../../constants/travelThemes';

const AgencyCard = ({ agency, index }) => {
  return (
    <Link
      href={`/agencies/${agency._id}`}
      className="block group h-full"
      style={{
        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
      }}
    >
      <article className="relative h-full bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1">

        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="relative">
              {agency.logo?.url ? (
                <div className="w-20 h-20 rounded-2xl border border-gray-100 overflow-hidden bg-white p-2 shadow-sm group-hover:border-blue-200 transition-colors">
                  <img
                    src={agency.logo.url}
                    alt={agency.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                  <span className="text-blue-600 font-bold text-3xl playfair-italic">
                    {agency.name?.[0]?.toUpperCase() || 'A'}
                  </span>
                </div>
              )}

              {agency.isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md border border-gray-100">
                  <ShieldCheck className="w-5 h-5 text-blue-500 fill-blue-50" />
                </div>
              )}
            </div>

            <div className="flex flex-col items-end gap-2">
              {agency.averageRating > 0 && (
                <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" strokeWidth={0} />
                  <span className="text-sm font-bold text-gray-900">{agency.averageRating.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1 font-serif">
                {agency.name}
              </h3>
              {agency.cityLocation && (
                <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="truncate">{agency.cityLocation}</span>
                </div>
              )}
            </div>

            {agency.description ? (
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                {agency.description}
              </p>
            ) : (
              <p className="text-sm text-gray-400 italic">
                Trusted travel partner on Ghumly.
              </p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {agency.isFeatured && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-100">
                  <Sparkles className="w-3 h-3" /> Featured
                </span>
              )}
              {agency.primaryTourType && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                  {TRAVEL_THEMES.find((t) => t.value === agency.primaryTourType)?.label || agency.primaryTourType}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between group-hover:bg-blue-50/30 transition-colors duration-300">
          <span className="text-xs font-medium text-gray-500">
            {agency.totalReviews} verified reviews
          </span>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm group-hover:gap-3 transition-all">
            View Profile <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default function FeaturedAgenciesGrid({ agencies = [] }) {
  if (!agencies || agencies.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-transparent py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {agencies.map((agency, index) => (
          <AgencyCard key={agency._id} agency={agency} index={index} />
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}