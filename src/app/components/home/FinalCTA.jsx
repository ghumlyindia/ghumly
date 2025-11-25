'use client';
import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="px-4 py-16">
      <div className="max-w-5xl mx-auto rounded-3xl border border-[#E2E8F0] bg-[#F5FAFF] p-10 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
          <span className="text-[#FF8C42] playfair-italic inline-block">Ready</span> to find the best trip for your budget?
        </h2>
        <p className="text-lg text-[#4B5563] max-w-3xl mx-auto">
          Compare genuine tour packages, talk to trusted agencies and reserve your seat for just ₹21.
        </p>
        <Link
          href="/tours"
          className="inline-flex items-center justify-center rounded-full bg-[#61BAEC] px-8 py-3 text-base font-semibold text-white hover:bg-[#0F9A82] transition-colors"
        >
          Start Comparing
        </Link>
      </div>
    </section>
  );
}

