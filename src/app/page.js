import Hero from "./components/home/Hero";
import { ArrowRight, Sparkles, Calendar } from 'lucide-react';
import FeaturedToursSlider from "./components/tours/FeaturedToursSlider";
import { fetchJson } from "./utils/api";
import HeroSlider from "./components/home/HeroSlider";
import CTABanner from "./components/home/CTABanner";
import WhyGhumly from "./components/home/WhyGhumly";
import JourneyInFrames from "./components/home/JourneyInFrames";
import ContactForm from "./components/home/ContactForm";
import FeaturedAgenciesGrid from "./components/agencies/FeaturedAgenciesGrid";
import ProblemSolution from "./components/home/ProblemSolution";
import HowGhumlyWorks from "./components/home/HowGhumlyWorks";
import ReservationExplainer from "./components/home/ReservationExplainer";
import SecondHero from "./components/home/SecondHero";
import Link from "next/link";

async function fetchMeta() {
  const [agencies, regions, categories] = await Promise.all([
    fetchJson('/agencies?page=1&limit=100').catch(() => ({ data: [] })),
    fetchJson('/destination-regions?page=1&limit=100').catch(() => ({ data: [] })),
    fetchJson('/destination-categories?page=1&limit=100').catch(() => ({ data: [] })),
  ]);
  return {
    agencies: agencies?.data || [],
    regions: regions?.data || [],
    categories: categories?.data || [],
  };
}

async function fetchFeatured() {
  const data = await fetchJson('/tour-packages?featured=true&status=active&limit=12&page=1');
  return data?.data || [];
}

async function fetchPopularDestinations() {
  const data = await fetchJson('/destination-regions?page=1&limit=8&status=active');
  return data?.data || [];
}

async function fetchFeaturedAgencies() {
  const data = await fetchJson('/agencies?page=1&limit=8&status=active&featured=true');
  return data?.data || [];
}

async function fetchLatestAgencies() {
  const data = await fetchJson('/agencies?page=1&limit=6&status=active');
  return data?.data || [];
}

async function fetchReligiousHighlights() {
  const tours = await fetchJson('/tour-packages?tourTheme=religious&status=active&limit=3&page=1').catch(() => ({ data: [] }));
  return {
    tours: tours?.data || []
  };
}

export default async function Home() {
  const [meta, featured, popularRegions, featuredAgencies, latestAgencies, religiousHighlights] = await Promise.all([
    fetchMeta(),
    fetchFeatured(),
    fetchPopularDestinations(),
    fetchFeaturedAgencies(),
    fetchLatestAgencies(),
    fetchReligiousHighlights()
  ]);

  return (
    <div className="bg-white">
      <Hero regions={meta.regions} categories={meta.categories} agencies={meta.agencies} />
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold tracking-wide uppercase">
              Top Destinations
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Destinations for Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 playfair-italic">Traveler</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Discover popular trips curated from verified travel agencies across India. Plan your weekend, holiday or adventure trip with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
            {popularRegions.map((r) => (
              <Link
                key={r._id}
                href={`/destinations/${r._id}`}
                className="group relative h-[400px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {r?.bannerImage?.url ? (
                  <img
                    src={r.bannerImage.url}
                    alt={r.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>

                <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {r.name}
                  </h3>
                  <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                    <p className="text-white/80 text-sm line-clamp-2 mb-4">
                      Explore the beauty of {r.name} with our curated packages.
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                      Explore Now <span className="text-xl">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-500/30"
            >
              View All Destinations
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <SecondHero />
      {/* <ProblemSolution /> */}
      {/* <HowGhumlyWorks /> */}
      {/* <ReservationExplainer /> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HeroSlider />
      </div>

      {featured.length > 0 && (
        <section className="w-full py-24 bg-gray-50">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-block px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-semibold tracking-wide uppercase">
                Featured
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                Handpicked <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 playfair-italic">Tours</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                Real itineraries. Real photos. Real prices. Get instant access to the best value-for-money trips listed by trusted partners.
              </p>
            </div>

            <FeaturedToursSlider tours={featured} />

            <div className="text-center mt-16">
              <Link
                href="/tours?featured=true"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-900 text-gray-900 font-bold rounded-full hover:bg-gray-900 hover:text-white transition-all"
              >
                View All Tours
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Religious Highlights */}
      <section className="py-24 bg-gradient-to-b from-white to-orange-50/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-sm font-semibold tracking-wide uppercase">
              <Sparkles size={14} className="text-orange-600" />
              <span>Pilgrimage Ready</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B3D60] tracking-tight">
              Sacred <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 playfair-italic">Journeys</span> Await
            </h2>
            <p className="text-[#475569] text-lg max-w-3xl mx-auto font-medium leading-relaxed">
              Handpicked experiences for Char Dham, Kailash Mansarovar, Vaishno Devi, Kedarnath, Somnath and more—planned by agencies that specialise in spiritual tours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {religiousHighlights.tours.map((tour) => {
              const imageUrl = tour.mainImage?.url || tour.gallery?.[0]?.url;
              const price = tour.price?.amount?.toLocaleString('en-IN');
              return (
                <Link
                  key={tour._id}
                  href={`/tours/${tour._id}`}
                  className="group relative bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative h-72 w-full overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={tour.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                        Sacred journey imagery
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                    {tour.region?.name && (
                      <span className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                        {tour.region.name}
                      </span>
                    )}

                    {price && (
                      <span className="absolute bottom-4 right-4 px-5 py-2 rounded-full bg-white text-[#0B3D60] text-sm font-bold shadow-lg flex items-center gap-1">
                        <span className="text-orange-500">₹</span> {price}
                      </span>
                    )}
                  </div>

                  <div className="p-8 space-y-5">
                    <h3 className="text-xl font-bold text-[#0B3D60] group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                      {tour.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                      {tour.highlights?.[0] || tour.departureCity}
                    </p>

                    <div className="pt-5 border-t border-gray-100 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600 font-medium">
                        <Calendar size={16} className="text-orange-400" />
                        <span>{tour.durationDays} Days</span>
                      </div>
                      <span className="flex items-center gap-2 text-[#0B3D60] font-bold group-hover:translate-x-1 transition-transform">
                        View Details <ArrowRight size={16} className="text-orange-500" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>



          <div className="text-center">
            <Link
              href="/tours/religious"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#0B3D60] text-white font-bold rounded-full hover:bg-[#F68A3A] transition-all transform hover:scale-105 shadow-xl hover:shadow-orange-500/20"
            >
              Explore All Religious Tours
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>




      {/* Featured Agencies */}
      {featuredAgencies.length > 0 && (
        <section className="w-full py-16 bg-[#F1F7FB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0B3D60]">Trusted Agencies</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0B3D60]">
                Trusted Travel <span className="text-[#F68A3A] playfair-italic">Partners</span>
              </h2>
              <p className="text-[#475569] text-lg max-w-2xl mx-auto">
                We list only verified agencies after checking their identity, past tours and customer experiences. Your trip is in safe hands.
              </p>
            </div>
          </div>

          <FeaturedAgenciesGrid agencies={featuredAgencies} />

          <div className="text-center mt-12">
            <Link
              href="/agencies?featured=true"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#0B3D60] text-white font-semibold rounded-full hover:bg-[#F68A3A] transition-all shadow-md"
            >
              View All Partners
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      )}

      <CTABanner />
      <WhyGhumly />
      <JourneyInFrames />
      <ContactForm />
    </div>
  );
}