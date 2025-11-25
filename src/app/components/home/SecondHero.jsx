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
    <section className="relative min-h-[600px] w-full overflow-hidden">
      {/* Background Map Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg-04.webp"
          alt="World Map Background"
          fill
          className="object-fit "
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        {/* Traveler Images Row */}
        <div className="mb-8 flex items-center justify-center gap-2 sm:gap-3 md:mb-12">
          {travelers.map((src, index) => (
            <div
              key={index}
              className={`relative h-12 w-12 overflow-hidden rounded-full border-4 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 ${
                index === 0 || index === 4
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
        <div className="max-w-6xl text-center">
          <h1 className=" mb-6 text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <span className="text-orange-400 playfair-italic font-light">We Don't Just Plan</span>{' '}
            <span className="text-[#0B3D60]">Vacations, We Create Lifelong</span>{' '}
            <span className="text-orange-400 playfair-italic">Memories and Unforgettable</span>{' '}
            <span className="text-[#0B3D60]">Adventures</span>
          </h1>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-6 md:mt-12">
          <button className="rounded-full bg-[#0B3D60] px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-400 sm:px-10 sm:py-4 sm:text-base">
            OUR BEST TOURS
          </button>
          <button className="rounded-full border-2 border-[#0B3D60] bg-transparent px-8 py-3 text-sm font-semibold text-[#0B3D60] transition-all hover:bg-blue-50 sm:px-10 sm:py-4 sm:text-base">
            VIEW DESTINATION
          </button>
        </div>

       
      </div>

     
    </section>
  );
};

export default SecondHero;