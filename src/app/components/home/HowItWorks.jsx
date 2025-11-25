'use client';
import React from 'react';

const steps = [
  {
    title: 'Step 1 — Explore Tours',
    body: 'Browse curated itineraries from multiple verified travel agencies in one dashboard.',
  },
  {
    title: 'Step 2 — Compare Everything',
    body: 'Check prices, inclusions, hotels, meals, activities and reviews side-by-side.',
  },
  {
    title: 'Step 3 — Reserve for ₹21',
    body: 'Pay a simple ₹21 reservation token to block your seat instantly before the batch fills.',
  },
  {
    title: 'Step 4 — Complete Booking with Agency',
    body: 'Settle the remaining amount directly with the agency you loved the most.',
  },
];

export default function HowItWorks() {
  return (
    <section className="px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#0F172A]">How Ghumly Works</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
            <span className="text-[#FF8C42] playfair-italic inline-block">How</span> Ghumly helps you choose smarter
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-[#61BAEC] mb-2">0{index + 1}</div>
              <h3 className="text-xl font-semibold text-[#0F172A] mb-3">{step.title}</h3>
              <p className="text-[#4B5563] leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

