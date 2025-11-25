'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchJson } from '../../utils/api';
import BookingForm from '../../components/booking/BookingForm';
import ReviewSection from '../../components/reviews/ReviewSection';
import StarRating from '../../components/reviews/StarRating';
import {
  Loader,
  Calendar,
  MapPin,
  User,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  ChevronDown,
  XCircle,
  Info,
  Home,
  FileText,
  RefreshCw,
  Globe,
  Share2,
  Heart
} from 'lucide-react';
import { TRAVEL_THEMES } from '../../constants/travelThemes';

const TourSkeleton = () => (
  <div className="bg-gray-50 min-h-screen animate-pulse">
    {/* Hero Skeleton */}
    <div className="h-[85vh] w-full bg-gray-200 relative">
      <div className="absolute bottom-0 left-0 w-full p-8 pb-24 max-w-7xl mx-auto">
        <div className="h-8 w-32 bg-gray-300 rounded-full mb-6"></div>
        <div className="h-16 w-3/4 bg-gray-300 rounded-lg mb-6"></div>
        <div className="flex gap-4">
          <div className="h-6 w-24 bg-gray-300 rounded"></div>
          <div className="h-6 w-24 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>

    {/* Content Skeleton */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 pb-20">
      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-8">
          {/* Overview Card Skeleton */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 h-96">
            <div className="flex justify-between mb-8">
              <div className="h-8 w-48 bg-gray-200 rounded"></div>
              <div className="flex gap-2">
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
              </div>
            </div>
            <div className="space-y-4 mb-8">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-24 bg-gray-100 rounded-2xl"></div>
              ))}
            </div>
          </div>

          {/* Highlights Skeleton */}
          <div className="bg-white rounded-3xl p-8 shadow-sm h-64"></div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6 lg:sticky lg:top-24">
          <div className="bg-white rounded-3xl h-96 shadow-xl border border-gray-100"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function TourDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeDay, setActiveDay] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const data = await fetchJson(`/tour-packages/${params.id}`);
        setTour(data?.data || data);
      } catch (err) {
        setError('Tour not found');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchTour();
    }
  }, [params.id]);

  useEffect(() => {
    if (tour?.itinerary?.length > 0 && activeDay === null) {
      setActiveDay(0);
    }
  }, [tour, activeDay]);

  const formatPrice = () => {
    if (!tour?.price?.amount) return 'Contact for price';
    return `₹${tour.price.amount.toLocaleString('en-IN')}`;
  };

  const priceLabel =
    tour?.price?.type === 'per_person'
      ? 'per person'
      : tour?.price?.type === 'per_group'
        ? 'per group'
        : 'tour package';

  const primaryThemeLabel = tour?.primaryTheme
    ? (TRAVEL_THEMES.find((t) => t.value === tour.primaryTheme)?.label || tour.primaryTheme)
    : null;
  const otherThemes = (tour?.travelThemes || []).filter((theme) => theme && theme !== tour?.primaryTheme);

  const stats = [
    {
      label: 'Duration',
      value: `${tour?.durationDays || 0} Days${tour?.durationNights ? ` / ${tour.durationNights} Nights` : ''}`,
      icon: <Clock size={20} className="text-blue-500" />,
    },
    {
      label: 'Group Size',
      value: `${tour?.minGroupSize || 1} - ${tour?.maxGroupSize || 20} guests`,
      icon: <User size={20} className="text-blue-500" />,
    },
    {
      label: 'Departure',
      value: tour?.departureCity || 'Flexible',
      icon: <MapPin size={20} className="text-blue-500" />,
    },
    {
      label: 'Agency',
      value: tour?.agency?.name || 'Certified Partner',
      icon: <Globe size={20} className="text-blue-500" />,
    },
  ];

  if (loading) {
    return <TourSkeleton />;
  }

  if (error || !tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full border border-gray-100">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="text-red-500" size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Tour Not Found</h2>
          <p className="text-gray-500 mb-6">{error || 'The tour you are looking for does not exist.'}</p>
          <button
            onClick={() => router.push('/tours')}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            Browse All Tours
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        {tour?.mainImage?.url && (
          <img
            src={tour.mainImage.url}
            alt={tour.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/50 to-slate-900/90" />

        <div className="relative z-10 h-full flex flex-col justify-end pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {primaryThemeLabel && (
                <span className="px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-100 text-sm font-medium">
                  {primaryThemeLabel}
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium flex items-center gap-1.5">
                <MapPin size={14} /> {tour?.region?.name}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-4xl font-serif mb-6 drop-shadow-sm">
              {tour.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/90">
              {tour.averageRating > 0 && (
                <div className="flex items-center gap-2">
                  <StarRating rating={Math.round(tour.averageRating)} readonly size={20} />
                  <span className="font-bold text-lg">{tour.averageRating.toFixed(1)}</span>
                  <span className="text-white/60 text-sm">({tour.totalReviews} reviews)</span>
                </div>
              )}
              <div className="h-4 w-px bg-white/20 hidden sm:block" />
              <div className="flex items-center gap-2">
                <img
                  src={tour.agency?.logo?.url || '/placeholder-logo.png'}
                  alt={tour.agency?.name}
                  className="w-8 h-8 rounded-full border border-white/30 bg-white"
                  onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${tour.agency?.name}&background=random` }}
                />
                <span className="font-medium">Operated by {tour.agency?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-20 -mt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            {/* Left Column */}
            <div className="space-y-8">

              {/* Overview Card */}
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 font-serif">Tour Overview</h2>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full hover:bg-gray-50 text-gray-400 hover:text-red-500 transition-colors">
                      <Heart size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-50 text-gray-400 hover:text-blue-600 transition-colors">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  {tour.description || tour.summary || 'Experience the pinnacle of luxury and discovery with curated experiences, immersive culture, and breathtaking scenery.'}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                      <div className="mb-2">{stat.icon}</div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{stat.label}</p>
                      <p className="font-bold text-gray-900">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 font-serif mb-6">Highlights</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {(tour.highlights || []).map((highlight, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle size={12} className="text-green-600" />
                      </div>
                      <p className="text-gray-700 leading-relaxed">{highlight}</p>
                    </div>
                  ))}
                  {(!tour.highlights || tour.highlights.length === 0) && (
                    <p className="text-gray-500 italic">Highlights will be updated soon.</p>
                  )}
                </div>
              </div>

              {/* Itinerary */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 font-serif mb-6">Itinerary</h3>
                <div className="space-y-4">
                  {(tour.itinerary || []).map((day, index) => {
                    const isActive = activeDay === index;
                    return (
                      <div
                        key={index}
                        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isActive
                            ? 'border-blue-200 bg-blue-50/50 shadow-md'
                            : 'border-gray-100 hover:border-blue-100 hover:bg-gray-50'
                          }`}
                      >
                        <button
                          className="w-full flex items-center justify-between p-5 text-left"
                          onClick={() => setActiveDay(isActive ? null : index)}
                        >
                          <div className="flex items-center gap-4">
                            <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                              }`}>
                              {day.day}
                            </span>
                            <div>
                              <h4 className={`font-bold transition-colors duration-300 ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                                {day.title}
                              </h4>
                            </div>
                          </div>
                          <ChevronDown className={`text-gray-400 transition-transform duration-300 ${isActive ? 'rotate-180 text-blue-500' : ''}`} />
                        </button>

                        <div
                          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                            }`}
                        >
                          <div className="overflow-hidden">
                            <div className="px-5 pb-6 pl-[4.5rem] space-y-4">
                              <p className="text-gray-600 leading-relaxed">{day.description}</p>

                              {/* Day Details */}
                              <div className="flex flex-wrap gap-3 pt-2">
                                {day.meals && (day.meals.breakfast || day.meals.lunch || day.meals.dinner) && (
                                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-medium text-gray-600">
                                    <span className="w-2 h-2 rounded-full bg-orange-400" />
                                    Meals Included
                                  </div>
                                )}
                                {day.accommodation && (
                                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-medium text-gray-600">
                                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                                    {day.accommodation}
                                  </div>
                                )}
                              </div>

                              {/* Activities */}
                              {day.activities && day.activities.length > 0 && (
                                <div className="pt-2">
                                  <p className="text-sm font-semibold text-gray-900 mb-2">Activities</p>
                                  <ul className="space-y-2">
                                    {day.activities.map((activity, idx) => (
                                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" />
                                        {activity}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Inclusions & Exclusions Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Inclusions */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                  <h3 className="text-xl font-bold text-gray-900 font-serif mb-6 flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={20} /> Inclusions
                  </h3>
                  <ul className="space-y-3">
                    {tour.inclusions?.transport && (
                      <li className="flex gap-3 text-sm text-gray-600">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                        {tour.inclusions.transport}
                      </li>
                    )}
                    {tour.inclusions?.meals && (
                      <li className="flex gap-3 text-sm text-gray-600">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                        {tour.inclusions.meals}
                      </li>
                    )}
                    {(tour.inclusions?.other || []).map((item, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-gray-600">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                  <h3 className="text-xl font-bold text-gray-900 font-serif mb-6 flex items-center gap-2">
                    <XCircle className="text-red-500" size={20} /> Exclusions
                  </h3>
                  <ul className="space-y-3">
                    {(tour.exclusions || []).map((item, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-gray-600">
                        <XCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                    {(!tour.exclusions || tour.exclusions.length === 0) && (
                      <li className="text-sm text-gray-500 italic">No specific exclusions listed.</li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Gallery */}
              {Array.isArray(tour.galleryImages) && tour.galleryImages.length > 0 && (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 font-serif mb-6">Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {tour.galleryImages.map((img, idx) => (
                      <div key={idx} className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer">
                        <img
                          src={img.url}
                          alt={`Gallery ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews */}
              <ReviewSection tourId={tour._id} averageRating={tour.averageRating || 0} totalReviews={tour.totalReviews || 0} />
            </div>

            {/* Right Sidebar */}
            <div className="relative">
              <div className="sticky top-24 space-y-6">
                {/* Booking Card */}
                <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 p-6 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 -mx-6 -mt-6 p-6 mb-6 text-white">
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-3xl font-bold">{formatPrice()}</span>
                      <span className="text-blue-100 text-sm">{priceLabel}</span>
                    </div>
                    <p className="text-blue-100 text-sm flex items-center gap-1">
                      <CheckCircle size={12} /> Best Price Guarantee
                    </p>
                  </div>

                  <BookingForm tour={tour} />

                  <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-400">No hidden fees • Secure payment</p>
                  </div>
                </div>

                {/* Need Help Card */}
                <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
                  <h3 className="font-bold text-gray-900 mb-2">Need help booking?</h3>
                  <p className="text-sm text-gray-600 mb-4">Our travel experts are here to assist you with your trip planning.</p>
                  <div className="space-y-3">
                    <a href="tel:+15551234567" className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors bg-white p-3 rounded-xl border border-blue-100/50">
                      <Phone size={18} className="text-blue-500" />
                      +1 (555) 123-4567
                    </a>
                    <a href="mailto:support@ghumly.com" className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors bg-white p-3 rounded-xl border border-blue-100/50">
                      <Mail size={18} className="text-blue-500" />
                      support@ghumly.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}