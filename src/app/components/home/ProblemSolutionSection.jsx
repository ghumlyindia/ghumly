'use client';
import React from 'react';

const cards = [
  {
    title: 'All Agencies in One Place',
    description: 'Stop hopping between websites, ads and social feeds. Everything you need lives inside Ghumly.',
  },
  {
    title: 'Compare Real Prices & Itineraries',
    description: 'See inclusions, stays, meals and timelines side-by-side before you commit.',
  },
  {
    title: 'Verified Travel Agencies',
    description: 'We onboard only trusted operators with authentic paperwork and proven tours.',
  },
  {
    title: 'Reserve Your Seat for ₹21',
    description: 'Block your spot instantly while you finish final discussions with the agency.',
  },
];

export default function ProblemSolutionSection() {
  return (
    <section className="bg-[#F5FAFF] px-4 py-16">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="space-y-6 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#0F172A]">Problem → Solution</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] leading-tight">
            <span className="text-[#FF8C42] playfair-italic inline-block">Finding</span> the right travel agency shouldn’t feel stressful.
          </h2>
          <div className="text-lg text-[#4B5563] space-y-4 max-w-3xl">
            <p>Search for one trip and you are flooded with ads, DMs, screenshots and mismatched offers.</p>
            <p>Different prices, itineraries and promises make it impossible to choose. <strong className="text-[#0F172A] font-semibold">Ghumly brings clarity.</strong></p>
            <p className="font-medium text-[#0F172A]">All your travel options, curated in one simple platform.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-[#0F172A] mb-3">{card.title}</h3>
              <p className="text-[#4B5563] leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

