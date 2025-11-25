import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative w-full h-[70vh] min-h-[600px] lg:h-[80vh] overflow-hidden rounded-b-[3rem] shadow-2xl">
      {/* Background Image with Parallax-like feel */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop"
          alt="World Travel"
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-32">

        {/* Floating Badge */}
        <div className="mb-6 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium tracking-wide">
            <MapPin size={14} className="text-sky-400" />
            Explore the World's Best Kept Secrets
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-lg animate-fade-in-up delay-100">
          Discover Your Next <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
            Great Adventure
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light animate-fade-in-up delay-200">
          Curated holiday packages for every traveler. From serene beaches to majestic mountains, find the perfect destination for your dream vacation.
        </p>

        {/* CTA Button */}
        <div className="animate-fade-in-up delay-300">
          <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg transition-all hover:bg-sky-50 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]">
            Start Exploring
            <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center group-hover:bg-sky-500 transition-colors">
              <ArrowRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </div>
          </button>
        </div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default HeroSection;
