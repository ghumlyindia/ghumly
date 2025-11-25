import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

const PageHero = ({
    title,
    subtitle,
    bgImage,
    badgeText,
    showBadge = true
}) => {
    return (
        <div className="relative w-full h-[60vh] min-h-[500px] lg:h-[70vh] overflow-hidden rounded-b-[3rem] shadow-2xl">
            {/* Background Image with Parallax-like feel */}
            <div className="absolute inset-0">
                <img
                    src={bgImage}
                    alt={title}
                    className="w-full h-full object-cover scale-105 animate-slow-zoom"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>
            </div>

            {/* Content Container */}
            <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">

                {/* Floating Badge */}
                {showBadge && badgeText && (
                    <div className="mb-6 animate-fade-in-up">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium tracking-wide">
                            <MapPin size={14} className="text-sky-400" />
                            {badgeText}
                        </span>
                    </div>
                )}

                {/* Main Heading */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-lg animate-fade-in-up delay-100">
                    {title}
                </h1>

                {/* Subheading */}
                {subtitle && (
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light animate-fade-in-up delay-200">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Decorative Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
        </div>
    );
};

export default PageHero;
