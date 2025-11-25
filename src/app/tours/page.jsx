import ToursFilters from "../components/tours/ToursFilters";
import ToursGrid from "../components/tours/ToursGrid";
import { fetchJson } from "../utils/api";
import { Globe, Sparkles } from 'lucide-react';
import PageHero from '../components/shared/PageHero';

async function fetchTours(searchParams) {
  const params = new URLSearchParams();
  if (searchParams?.q) params.set('search', searchParams.q);
  if (searchParams?.agency) params.set('agency', searchParams.agency);
  if (searchParams?.region) params.set('region', searchParams.region);
  if (searchParams?.category) params.set('category', searchParams.category);
  if (searchParams?.featured) params.set('featured', searchParams.featured);
  if (searchParams?.status) params.set('status', searchParams.status);
  if (searchParams?.minPrice) params.set('minPrice', searchParams.minPrice);
  if (searchParams?.maxPrice) params.set('maxPrice', searchParams.maxPrice);
  if (searchParams?.minDays) params.set('minDays', searchParams.minDays);
  if (searchParams?.maxDays) params.set('maxDays', searchParams.maxDays);
  if (searchParams?.startFrom) params.set('startFrom', searchParams.startFrom);
  if (searchParams?.startTo) params.set('startTo', searchParams.startTo);
  if (searchParams?.departureCity) params.set('departureCity', searchParams.departureCity);
  if (searchParams?.startDate) params.set('startDate', searchParams.startDate);
  if (searchParams?.endDate) params.set('endDate', searchParams.endDate);
  if (searchParams?.tourTheme) params.set('tourTheme', searchParams.tourTheme);
  params.set('limit', searchParams?.limit || '12');
  params.set('page', searchParams?.page || '1');
  const data = await fetchJson(`/tour-packages?${params.toString()}`);
  return data;
}

async function fetchMeta() {
  const [agencies, regions, categories] = await Promise.all([
    fetchJson('/agencies?page=1&limit=200').catch(() => ({ data: [] })),
    fetchJson('/destination-regions?page=1&limit=200').catch(() => ({ data: [] })),
    fetchJson('/destination-categories?page=1&limit=200').catch(() => ({ data: [] })),
  ]);
  return {
    agencies: agencies?.data || [],
    regions: regions?.data || [],
    categories: categories?.data || [],
  };
}

export const metadata = {
  title: 'All Tours | Ghumly',
  description: 'Browse all available tours on Ghumly with powerful filters.',
};

export default async function ToursPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const [{ data: tours = [], pagination = {} }, meta] = await Promise.all([
    fetchTours(resolvedParams),
    fetchMeta(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <PageHero
        title={
          <>
            Explore the World with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Ghumly</span>
          </>
        }
        subtitle="Discover curated tours from verified agencies. Filter by region, category, price, and more to find your perfect getaway."
        bgImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop"
        badgeText="Global Adventures"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-900/5 border border-gray-100 p-6 md:p-8 mb-12">
          <ToursFilters agencies={meta.agencies} regions={meta.regions} categories={meta.categories} />
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 font-serif">
            Available Tours
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="font-medium text-gray-900">{pagination?.total || tours.length}</span>
            <span>tours found</span>
          </div>
        </div>

        <ToursGrid items={tours} pagination={pagination} />
      </div>
    </div>
  );
}


