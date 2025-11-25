'use client';
import React from 'react';

const highlights = [
  {
    title: 'All Agencies Together',
    description: 'Find all trusted tour companies in one place. No more searching different websites.',
  },
  {
    title: 'Compare Prices & Plans',
    description: 'See what each tour includes, where you stay, and daily activities side by side.',
  },
  {
    title: 'Verified Companies',
    description: 'Every tour company is checked by us for quality and real customer experiences.',
  },
  {
    title: 'Book Now for ₹21',
    description: 'Save your spot with a small fee. You can change plans later if needed.',
  },
];

export default function ProblemSolution() {
  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B3D60] mb-4">
            Find Your Perfect Tour Made Simple
          </h2>
          <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
            We make booking tours easy - compare options, check real reviews, and secure your spot in minutes.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((item, index) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[#D6E8F4] bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#0B3D60] group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#F0F7FF] rounded-lg flex items-center justify-center group-hover:bg-[#0B3D60] transition-colors">
                  <span className="text-[#0B3D60] group-hover:text-white font-semibold text-sm">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#0B3D60] mb-3">{item.title}</h3>
                  <p className="text-[#4B5563] leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      
      </div>
    </section>
  );
}