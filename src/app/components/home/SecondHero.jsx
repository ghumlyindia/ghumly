'use client';
import React from 'react';
import Image from 'next/image';

const SecondHero = () => {
  // Dummy image paths - replace with your actual paths
  const travelers = [
    '/images/traveler1.webp',
    '/images/traveler2.webp',
    '/images/traveler3.webp',
    '/images/traveler4.webp',
    '/images/traveler5.webp',
    '/images/traveler6.webp',
    '/images/traveler7.webp',
  ];

  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] w-full overflow-hidden">
      {/* Background Map Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-04.webp"
          alt="World Map Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex min-h-[500px] sm:min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        {/* Traveler Images Row */}
        <div className="mb-6 sm:mb-8 md:mb-12 flex items-center justify-center gap-1 sm:gap-2 md:gap-3">
          {travelers.map((src, index) => (
            <div
              key={index}
              className={`relative h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 xl:h-20 xl:w-20 overflow-hidden rounded-full border-2 sm:border-3 md:border-4 ${index === 0 || index === 4
                  ? 'border-dashed border-gray-400 bg-white'
                  : 'border-[#0B3D60]'
                }`}
            >
              <Image
                src={src}
                alt={`Traveler ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Main Heading */}
        <div className="max-w-6xl text-center px-2">
          <h1 className="mb-6 text-2xl leading-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
            <span className="text-orange-400 playfair-italic font-light">We Don't Just Plan</span>{' '}
            <span className="text-[#0B3D60]">Vacations, We Create Lifelong</span>{' '}
            <span className="text-orange-400 playfair-italic">Memories and Unforgettable</span>{' '}
            <span className="text-[#0B3D60]">Adventures</span>
          </h1>
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 sm:mt-8 md:mt-12 flex flex-col w-full max-w-md sm:max-w-none sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 px-4">
          <button className="w-full sm:w-auto rounded-full bg-[#0B3D60] px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 text-sm font-semibold text-white transition-all hover:bg-orange-400">
            OUR BEST TOURS
          </button>
          <button className="w-full sm:w-auto rounded-full border-2 border-[#0B3D60] bg-transparent px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 text-sm font-semibold text-[#0B3D60] transition-all hover:bg-blue-50">
            VIEW DESTINATION
          </button>
        </div>
      </div>
    </section>
  );
};

export default SecondHero;