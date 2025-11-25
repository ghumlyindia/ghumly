'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTABanner({
  backgroundImage = '/images/ctasection.jpg',
}) {
  return (
    <section className="w-full px-4 py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] shadow-2xl min-h-[400px] md:h-[500px] group">
          <Image
            src={backgroundImage}
            alt="Travel Adventure"
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

          <div className="relative h-full flex items-center px-6 py-12 md:px-20 md:py-0">
            <div className="space-y-6 md:space-y-8 max-w-2xl text-white">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs md:text-sm font-semibold tracking-wide uppercase">
                Mid-trip reminder
              </div>

              <h2 className="text-3xl md:text-6xl font-bold leading-tight">
                Dreaming of your next <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 playfair-italic">adventure</span>?
              </h2>

              <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-xl">
                Tell us what kind of trip you’re looking for — we’ll help you compare the best options instantly.
              </p>

              <Link href="/contact">
                <button className="group relative inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-white text-gray-900 rounded-full font-bold text-base md:text-lg transition-all hover:bg-blue-50 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]">
                  <span>Connect Now</span>
                  <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <ArrowRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}