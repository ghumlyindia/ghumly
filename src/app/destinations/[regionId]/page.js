import { fetchJson } from "../../utils/api";
import RegionCategoriesFilter from "../../components/destinations/RegionCategoriesFilter";
import RegionExtraFilters from "../../components/destinations/RegionExtraFilters";
import ToursGrid from "../../components/tours/ToursGrid";

async function fetchRegion(regionId) {
  const data = await fetchJson(`/destination-regions/${regionId}`);
  return data?.data || null;
}

async function fetchCategories(regionId) {
  const data = await fetchJson(`/destination-categories/region/${regionId}`);
  return data?.data || [];
}

async function fetchTours(regionId, params) {
  const sp = new URLSearchParams();
  sp.set('region', regionId);
  if (params?.category) sp.set('category', params.category);
  if (params?.featured) sp.set('featured', params.featured);
  sp.set('status', params?.status || 'active');
  // Fetch larger batch; we'll client-filter for price/duration
  sp.set('page', '1');
  sp.set('limit', '200');
  const data = await fetchJson(`/tour-packages?${sp.toString()}`);
  return data;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const region = await fetchRegion(resolvedParams.regionId).catch(() => null);
  return {
    title: region?.name ? `${region.name} – Destinations | Ghumly` : 'Destination | Ghumly',
  };
}

export default async function RegionPage({ params, searchParams }) {
  const resolvedParams = await searchParams;
  const resolvedRouteParams = await params;
  const regionId = resolvedRouteParams.regionId;

  const [region, categories, { data: baseTours = [] }] = await Promise.all([
    fetchRegion(regionId),
    fetchCategories(regionId),
    fetchTours(regionId, resolvedParams),
  ]);
  // Client-side extra filters
  const minPrice = resolvedParams?.minPrice ? Number(resolvedParams.minPrice) : undefined;
  const maxPrice = resolvedParams?.maxPrice ? Number(resolvedParams.maxPrice) : undefined;
  const minDays = resolvedParams?.minDays ? Number(resolvedParams.minDays) : undefined;
  const maxDays = resolvedParams?.maxDays ? Number(resolvedParams.maxDays) : undefined;
  const tours = baseTours.filter(t => {
    const priceOk = (() => {
      const amount = t?.price?.amount;
      if (amount == null) return true;
      if (minPrice != null && amount < minPrice) return false;
      if (maxPrice != null && amount > maxPrice) return false;
      return true;
    })();
    const days = t?.durationDays || 0;
    const durationOk = (
      (minDays == null || days >= minDays) &&
      (maxDays == null || days <= maxDays)
    );
    return priceOk && durationOk;
  });
  const pagination = { page: 1, totalPages: 1 };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Immersive Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        {region?.bannerImage?.url ? (
          <img
            src={region.bannerImage.url}
            alt={region?.name}
            className="w-full h-full object-cover animate-slow-zoom"
          />
        ) : (
          <div className="w-full h-full bg-gray-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-gray-900/90"></div>

        <div className="absolute inset-0 flex flex-col justify-end pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-white/80 text-sm mb-6 font-medium">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <span>/</span>
              <a href="/destinations" className="hover:text-white transition-colors">Destinations</a>
              <span>/</span>
              <span className="text-white">{region?.name || 'Region'}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
              {region?.name}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl font-light leading-relaxed">
              {region?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 pb-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">

          {/* Filters Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-gray-100 pb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Available Packages</h2>
              <p className="text-gray-500 mt-1">Found {tours.length} tours for you</p>
            </div>
            <RegionExtraFilters />
          </div>

          {/* Categories */}
          <div className="mb-10">
            <RegionCategoriesFilter categories={categories} />
          </div>

          {/* Grid */}
          <ToursGrid items={tours} pagination={pagination} />
        </div>
      </section>
    </div>
  );
}


