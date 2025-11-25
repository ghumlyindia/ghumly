import { fetchJson } from "../utils/api";
import RegionGrid from "../components/destinations/RegionGrid";
import PageHero from "../components/shared/PageHero";

async function fetchRegions() {
  const data = await fetchJson('/destination-regions?page=1&limit=1000');
  return data?.data || [];
}

export const metadata = {
  title: 'Browse Destinations | Ghumly',
};

export default async function DestinationsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const regions = await fetchRegions();

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageHero
        title={
          <>
            Discover Your Next <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
              Great Adventure
            </span>
          </>
        }
        subtitle="Curated holiday packages for every traveler. From serene beaches to majestic mountains, find the perfect destination for your dream vacation."
        bgImage="https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop"
        badgeText="Explore the World's Best Kept Secrets"
      />
      <RegionGrid regions={regions} initialQuery={resolvedParams?.q || ''} />
    </div>
  );
}


