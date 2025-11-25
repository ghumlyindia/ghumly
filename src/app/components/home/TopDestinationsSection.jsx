'use client';
import React from 'react';
import Link from 'next/link';

export default function TopDestinationsSection({ regions = [] }) {
  if (!regions.length) return null;

  return (
    <section className="px-4 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#0F172A]">Top Destinations</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
            <span className="text-[#FF8C42] playfair-italic inline-block">Top</span> destinations for every type of traveler
          </h2>
          <p className="text-lg text-[#4B5563] max-w-3xl mx-auto">
            Discover popular trips curated from verified agencies. Plan your weekend escapes, long holidays or adventure runs
            with total confidence.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {regions.map((region) => (
            <Link
              key={region._id}
              href={`/destinations/${region._id}`}
              className="group relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm"
            >
              {region?.bannerImage?.url && (
                <img
                  src={region.bannerImage.url}
                  alt={region.name}
                  className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#0F172A]">{region.name}</h3>
                {region.shortDescription && (
                  <p className="text-sm text-[#4B5563] line-clamp-2 mt-1">{region.shortDescription}</p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 rounded-full border border-[#0F172A] px-6 py-3 text-sm font-semibold text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-colors"
          >
            View All Destinations
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

