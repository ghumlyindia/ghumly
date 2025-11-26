'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function HeroSlider({ slides = [] }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Default slides if none provided
  const defaultSlides = [
    {
      id: 1,
      desktopImage: '/images/hero/kerala-1.jpg',
      mobileImage: '/images/hero/andaman_card.avif',
      alt: 'Northern Lights Package'
    },
    {
      id: 2,
      desktopImage: '/images/hero/rajasthan-1.jpg',
      mobileImage: '/images/hero/rajasthan_card.avif',
      alt: 'Bali Paradise'
    },
    {
      id: 3,
      desktopImage: '/images/hero/kerala-1.jpg',
      mobileImage: '/images/hero/meghalya_card.avif',
      alt: 'Maldives Getaway'
    }
  ];

  const slidesData = slides.length > 0 ? slides : defaultSlides;

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
          bulletClass: 'custom-bullet',
          bulletActiveClass: 'custom-bullet-active',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        speed={800}
        className="w-full h-full"
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Desktop Image */}
              <div className="hidden md:block w-full h-full">
                <Image
                  src={slide.desktopImage}
                  alt={slide.alt}
                  fill
                  priority={slide.id === 1}
                  quality={90}
                  sizes="100vw"
                  className="object-fit"
                />
              </div>

              {/* Mobile Image */}
              <div className="block md:hidden w-full h-full">
                <Image
                  src={slide.mobileImage}
                  alt={slide.alt}
                  fill
                  priority={slide.id === 1}
                  quality={90}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              {/* Overlay for better contrast (optional) */}
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        className="custom-prev absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-[#0B3D60] hover:bg-[#F68A3A] text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        className="custom-next absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-[#0B3D60] hover:bg-[#F68A3A] text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Custom Pagination */}
      <div className="custom-pagination absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2" />

      {/* Custom Styles */}
      <style jsx global>{`
        .custom-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 2px solid transparent;
        }

        .custom-bullet:hover {
          background: rgba(255, 255, 255, 0.8);
          transform: scale(1.2);
        }

        .custom-bullet-active {
          width: 32px;
          border-radius: 5px;
          background: #0B3D60;
          border-color: white;
        }

        @media (min-width: 768px) {
          .custom-bullet {
            width: 12px;
            height: 12px;
          }

          .custom-bullet-active {
            width: 40px;
          }
        }
      `}</style>
    </div>
  );
}