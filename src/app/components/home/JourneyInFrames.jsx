'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { MapPin, Camera } from 'lucide-react';

export default function JourneyInFrames() {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
      title: 'Sikkim',
      location: 'Sikkim, India'
    },
    {
      url: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=1200&h=800&fit=crop',
      title: 'Ladakh',
      location: 'Ladakh, India'
    },
    {
      url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&h=800&fit=crop',
      title: 'Himachal',
      location: 'Himachal Pradesh'
    },
    {
      url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop',
      title: 'Spiti',
      location: 'Spiti Valley'
    },
    {
      url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&h=800&fit=crop',
      title: 'Jaipur',
      location: 'Jaipur, Rajasthan'
    },
    {
      url: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1200&h=800&fit=crop',
      title: 'Goa',
      location: 'Goa Beaches'
    }
  ];

  return (
    <section className="w-full bg-gray-900 py-24 px-4 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium tracking-wide uppercase mb-4">
            <Camera size={14} />
            <span>Travel Gallery</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Journeys Captured in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 playfair-italic">Frames</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
            A glimpse of the adventures our travelers enjoy — from the serene mountains to the vibrant streets.
          </p>
        </div>

        <div className="py-8">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: true,
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="journey-swiper !pb-12"
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="!w-[300px] sm:!w-[400px]">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold text-white mb-1">{image.title}</h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <MapPin size={14} className="text-orange-400" />
                      <span>{image.location}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}