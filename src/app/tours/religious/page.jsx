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

  const [tours, agencies, allAgencies, allRegions, allCategories] = await Promise.all([
    fetchJson(`/tour-packages?${params.toString()}`),
    fetchJson('/agencies?page=1&limit=12&status=active&tourType=religious').catch(() => ({ data: [] })),
    // Fetch all metadata for filters
    fetchJson('/agencies?page=1&limit=200').catch(() => ({ data: [] })),
    fetchJson('/destination-regions?page=1&limit=200').catch(() => ({ data: [] })),
    fetchJson('/destination-categories?page=1&limit=200').catch(() => ({ data: [] })),
  ]);

  return {
    tours: tours || { data: [], pagination: { page: 1, totalPages: 1 } },
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
  const { tours, agencies, meta } = await fetchReligiousData(resolvedParams);

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
