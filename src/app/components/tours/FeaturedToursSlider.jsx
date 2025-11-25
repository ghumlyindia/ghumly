'use client';
import { useState } from 'react';
import { MapPin, Calendar, Users, Clock } from 'lucide-react';

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function FeaturedToursSlider({ tours = [] }) {
  if (!tours || tours.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600">
        No featured tours available
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          width: 22px;
          height: 22px;
          background: #0B3D60;
          border-radius: 50%;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          transition: all 0.3s;
          color:white; 
          padding: 3px;
        }
        
        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background: #F68A3A;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
          transform: scale(1.1);
        }
        
        .swiper-button-prev:after,
        .swiper-button-next:after {
          font-size: 12px;
          font-weight: bold;
          color: white !important;
        }
        
        .swiper-button-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        @media (max-width: 1023px) {
          .swiper-button-prev,
          .swiper-button-next {
            width: 20px;
            height: 20px;
          }
          
          .swiper-button-prev:after,
          .swiper-button-next:after {
            font-size: 11px;
          }
        }
      `}</style>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={12}
        slidesPerView={1.5}
        navigation
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 3.5,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4.5,
            spaceBetween: 24,
          },
        }}
        className="!px-4 lg:!px-16 !pb-8"
      >
        {tours.map((tour, index) => (
          <SwiperSlide key={tour._id || index}>
            <TourCard tour={tour} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function TourCard({ tour }) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = tour.mainImage?.url;
  const originalPrice = tour.price?.amount;

  const duration = tour.durationDays 
    ? `${tour.durationDays}N/${tour.durationNights || tour.durationDays}D`
    : tour.duration;

  return (
    <a
      href={`/tours/${tour._id}`}
      className="block group relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-[420px] lg:h-[480px]"
    >
      {/* Background Image */}
      {imageUrl && !imageError ? (
        <img
          src={imageUrl}
          alt={tour.title || 'Tour image'}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#61BAEC] to-teal-600 flex items-center justify-center">
          <MapPin className="w-16 h-16 text-white/50" />
        </div>
      )}
      
      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/95 transition-all duration-300" />
      
      {/* Price Badge */}
      {originalPrice && (
        <div className="absolute top-3 lg:top-4 left-3 lg:left-4 z-10">
          <div className="bg-[#61BAEC] text-white px-2.5 lg:px-3 py-1 lg:py-1.5 rounded-full shadow-xl transform group-hover:scale-110 transition-transform">
            <div className="flex items-center gap-1">
              <span className="text-xs lg:text-sm font-semibold">
                ₹{originalPrice.toLocaleString('en-IN')}
              </span>
              {tour.price?.type === 'per_person' && (
                <span className="text-[10px] lg:text-xs opacity-90">Per Person</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6">
        <div className="space-y-2 lg:space-y-3">
          {/* Agency */}
          {tour.agency?.name && (
            <div className="w-fit px-2 py-0.5 rounded-full bg-white/15 text-white/90 text-[10px] lg:text-xs font-medium uppercase tracking-wide backdrop-blur-sm drop-shadow-xl">
              {tour.agency.name}
            </div>
          )}

          {/* Title */}
          <h3 className="text-white text-sm lg:text-base font-bold drop-shadow-2xl line-clamp-2 group-hover:text-[#61BAEC] transition-colors leading-tight">
            {tour.title}
          </h3>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-1.5 lg:gap-2">
            {duration && (
              <div className="flex items-center gap-1.5 text-white/90">
                <Clock className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#61BAEC] flex-shrink-0" />
                <span className="text-[11px] lg:text-xs font-medium drop-shadow-lg">
                  {duration}
                </span>
              </div>
            )}

            {tour.region?.name && (
              <div className="flex items-center gap-1.5 text-white/90">
                <MapPin className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#61BAEC] flex-shrink-0" />
                <span className="text-[11px] lg:text-xs font-medium drop-shadow-lg truncate">
                  {tour.region.name}
                </span>
              </div>
            )}

            {tour.startDate && (
              <div className="flex items-center gap-1.5 text-white/90">
                <Calendar className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#61BAEC] flex-shrink-0" />
                <span className="text-[11px] lg:text-xs font-medium drop-shadow-lg">
                  {new Date(tour.startDate).toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: 'short' 
                  })}
                </span>
              </div>
            )}

            {tour.groupSize && (
              <div className="flex items-center gap-1.5 text-white/90">
                <Users className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#61BAEC] flex-shrink-0" />
                <span className="text-[11px] lg:text-xs font-medium drop-shadow-lg">
                  {tour.groupSize} People
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}