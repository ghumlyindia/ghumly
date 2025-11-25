'use client';
import React from 'react';

const steps = [
  {
    title: 'Step 1 — Explore Tours',
    description: 'Browse curated trips from multiple verified travel agencies.',
  },
  {
    title: 'Step 2 — Compare Everything',
    description: 'Check prices, itineraries, hotels, meals, activities and reviews.',
  },
  {
    title: 'Step 3 — Reserve for ₹21',
    description: 'Pay a simple ₹21 reservation token to block your seat instantly.',
  },
  {
    title: 'Step 4 — Complete Booking with Agency',
    description: 'Pay the remaining trip amount directly to the travel agency you choose.',
  },
];

export default function HowGhumlyWorks() {
  return (
    <section className="w-full bg-[#F1F7FB] py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#D8E4F0] shadow-sm">
            <div className="w-2 h-2 bg-[#61BAEC] rounded-full"></div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0B3D60]">
              How Ghumly Works
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B3D60]">
            <span className="text-[#F68A3A] playfair-italic">Simple Steps</span> to Your Perfect Trip
          </h2>
          <p className="text-lg text-[#475569] max-w-2xl mx-auto">
            From exploring to booking - we make tour planning easy and transparent
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-2xl bg-white p-6 border border-[#D8E4F0] shadow-sm hover:shadow-md transition-all duration-300 group hover:border-[#61BAEC]"
            >
              {/* Number Badge */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#F0F7FF] rounded-xl flex items-center justify-center group-hover:bg-[#0B3D60] transition-colors duration-300">
                  <span className="text-lg font-bold text-[#0B3D60] group-hover:text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="w-8 h-0.5 bg-[#61BAEC] opacity-60 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-[#0B3D60] mb-3 group-hover:text-[#0a3352]">
                {step.title}
              </h3>
              <p className="text-[#475569] leading-relaxed">{step.description}</p>

              {/* Hover Effect Line */}
              <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-[#61BAEC] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          ))}
        </div>

        {/* Visual Connector for Mobile */}
        <div className="block md:hidden">
          <div className="flex justify-center">
            <div className="flex flex-col items-center space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-0.5 h-8 bg-[#61BAEC] opacity-40"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}