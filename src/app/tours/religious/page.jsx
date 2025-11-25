import ToursGrid from '../../components/tours/ToursGrid';
import FeaturedAgenciesGrid from '../../components/agencies/FeaturedAgenciesGrid';
import ToursFilters from '../../components/tours/ToursFilters';
import { fetchJson } from '../../utils/api';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';
import PageHero from '../../components/shared/PageHero';

async function fetchReligiousData(searchParams) {
  const params = new URLSearchParams();
  // Base filters for religious page
  params.set('tourTheme', 'religious');
  params.set('status', 'active');

  // Dynamic filters from searchParams
  if (searchParams?.q) params.set('search', searchParams.q);
  if (searchParams?.agency) params.set('agency', searchParams.agency);
  if (searchParams?.region) params.set('region', searchParams.region);
  if (searchParams?.category) params.set('category', searchParams.category);
  if (searchParams?.minPrice) params.set('minPrice', searchParams.minPrice);
  if (searchParams?.maxPrice) params.set('maxPrice', searchParams.maxPrice);
  if (searchParams?.minDays) params.set('minDays', searchParams.minDays);
  if (searchParams?.maxDays) params.set('maxDays', searchParams.maxDays);
  if (searchParams?.startFrom) params.set('startFrom', searchParams.startFrom);
  if (searchParams?.startTo) params.set('startTo', searchParams.startTo);
  if (searchParams?.departureCity) params.set('departureCity', searchParams.departureCity);

  params.set('limit', searchParams?.limit || '12');
  params.set('page', searchParams?.page || '1');

  const [tours, categories, agencies, allAgencies, allRegions, allCategories] = await Promise.all([
    fetchJson(`/tour-packages?${params.toString()}`),
    fetchJson('/destination-categories?page=1&limit=12&status=active&travelTheme=religious').catch(() => ({ data: [] })),
    fetchJson('/agencies?page=1&limit=12&status=active&tourType=religious').catch(() => ({ data: [] })),
    // Fetch all metadata for filters
    fetchJson('/agencies?page=1&limit=200').catch(() => ({ data: [] })),
    fetchJson('/destination-regions?page=1&limit=200').catch(() => ({ data: [] })),
    fetchJson('/destination-categories?page=1&limit=200').catch(() => ({ data: [] })),
  ]);

  return {
    tours: tours || { data: [], pagination: { page: 1, totalPages: 1 } },
    categories: categories?.data || [],
    agencies: agencies?.data || [],
    meta: {
      agencies: allAgencies?.data || [],
      regions: allRegions?.data || [],
      categories: allCategories?.data || [],
    }
  };
}

export const metadata = {
  title: 'Religious Tours in India | Ghumly',
  description: 'Discover curated religious and pilgrimage tours from trusted agencies across India.'
};

export default async function ReligiousToursPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const { tours, categories, agencies, meta } = await fetchReligiousData(resolvedParams);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <PageHero
        title={
          <>
            Sacred & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200">Religious</span> Tours
          </>
        }
        subtitle="Explore India’s most revered pilgrimage circuits curated by verified travel agencies. Each itinerary balances comfort with soulful experiences."
        bgImage="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop"
        badgeText="Spiritual Journeys"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-20">

        {/* Filters Section */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-900/5 border border-gray-100 p-6 md:p-8 mb-12">
          <ToursFilters agencies={meta.agencies} regions={meta.regions} categories={meta.categories} />
        </div>

        {/* Featured Tours */}
        <div className="space-y-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 font-serif mb-2">Featured Pilgrimages</h2>
              <p className="text-gray-600">Handpicked spiritual journeys for peace and devotion</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="font-medium text-gray-900">{tours.pagination?.total || tours.data?.length || 0}</span>
              <span>tours found</span>
            </div>
          </div>
          <ToursGrid items={tours.data || []} pagination={tours.pagination} />
        </div>

        {/* Top Destinations */}
        {categories.length > 0 && (
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 font-serif mb-4">Sacred Destinations</h2>
              <p className="text-gray-600">Discover the holiest places across the subcontinent</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div key={category._id} className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-100 overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <MapPin size={48} className="text-orange-500" />
                  </div>

                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 text-xs font-semibold mb-4">
                      <MapPin size={12} />
                      {category.parentRegion?.name}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors font-serif">
                      {category.categoryName}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                      {category.description}
                    </p>

                    <div className="flex items-center text-orange-600 text-sm font-medium group-hover:gap-2 transition-all">
                      Explore Tours <ArrowRight size={16} className="ml-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trusted Agencies */}
        {agencies.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-end justify-between border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 font-serif mb-2">Trusted Travel Partners</h2>
                <p className="text-gray-600">Verified agencies specializing in religious tourism</p>
              </div>
            </div>
            <FeaturedAgenciesGrid agencies={agencies} />
          </div>
        )}
      </div>
    </div>
  );
}
