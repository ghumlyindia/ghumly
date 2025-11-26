import { fetchJson } from '../../utils/api';
import ToursGrid from '../../components/tours/ToursGrid';
import ReviewSection from '../../components/reviews/ReviewSection';
import StarRating from '../../components/reviews/StarRating';
import { MapPin, Phone, Mail, Instagram, CheckCircle, Info, Image as ImageIcon, Contact } from 'lucide-react';

async function fetchAgency(id) {
  const res = await fetchJson(`/agencies/${id}`);
  return res?.data || res;
}

async function fetchAgencyTours(id, searchParams) {
  const sp = new URLSearchParams();
  sp.set('agency', id);
  if (searchParams?.region) sp.set('region', searchParams.region);
  if (searchParams?.category) sp.set('category', searchParams.category);
  if (searchParams?.featured) sp.set('featured', searchParams.featured);
  sp.set('status', searchParams?.status || 'active');
  sp.set('page', searchParams?.page || '1');
  sp.set('limit', searchParams?.limit || '9');
  const res = await fetchJson(`/tour-packages?${sp.toString()}`);
  return res;
}

export default async function AgencyDetailPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const agencyId = resolvedParams.id;

  const [agency, { data: tours = [], pagination = {} }] = await Promise.all([
    fetchAgency(agencyId),
    fetchAgencyTours(agencyId, resolvedSearch)
  ]);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Logo */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-white p-1 overflow-hidden shadow-2xl ring-4 ring-white/10">
                {agency?.logo?.url ? (
                  <img
                    src={agency.logo.url}
                    alt={agency.name}
                    className="w-full h-full rounded-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400 font-bold text-5xl">
                    {agency?.name?.[0]?.toUpperCase() || 'A'}
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-serif text-white">
                    {agency?.name || 'Agency Name'}
                  </h1>
                  {agency?.isVerified && (
                    <span className="inline-flex items-center gap-1.5 bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                      <CheckCircle className="w-4 h-4" />
                      Verified
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-300 text-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    <span>{agency?.cityLocation || 'Location not specified'}</span>
                  </div>
                  {agency.averageRating > 0 && (
                    <>
                      <span className="hidden md:inline text-slate-600">•</span>
                      <div className="flex items-center gap-2">
                        <StarRating rating={Math.round(agency.averageRating)} readonly size={18} />
                        <span className="font-semibold text-white">{agency.averageRating.toFixed(1)}</span>
                        <span className="text-slate-400">({agency.totalReviews} reviews)</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                  <Info className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 font-serif">About Us</h2>
              </div>
              <div className="prose prose-lg prose-slate max-w-none text-gray-600 leading-relaxed">
                <p className="whitespace-pre-line">{agency?.description || 'No description available for this agency.'}</p>
              </div>
            </div>

            {/* Gallery Section */}
            {agency?.gallery?.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 font-serif">Gallery</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {agency.gallery.map((img, idx) => (
                    <div key={idx} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 cursor-zoom-in">
                      <img
                        src={img.url}
                        alt={`Gallery image ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Contact Card */}
          <aside className="lg:sticky lg:top-24 h-fit space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl">
                  <Contact className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-serif">Contact Information</h3>
              </div>

              <div className="space-y-4">
                <div className="group flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-gray-400 group-hover:text-blue-500 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Phone</div>
                    <div className="text-gray-900 font-medium">{agency?.contactInfo?.phone || 'Not available'}</div>
                  </div>
                </div>

                <div className="group flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-gray-400 group-hover:text-blue-500 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="break-all">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Email</div>
                    <div className="text-gray-900 font-medium">{agency?.contactInfo?.email || 'Not available'}</div>
                  </div>
                </div>

                {agency?.instagramLink && (
                  <a
                    href={agency.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-pink-50 transition-colors duration-300"
                  >
                    <div className="p-2 bg-white rounded-lg shadow-sm text-gray-400 group-hover:text-pink-500 transition-colors">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Instagram</div>
                      <div className="text-pink-600 font-medium group-hover:underline">Visit Profile</div>
                    </div>
                  </a>
                )}

                {agency?.contactInfo?.address && (
                  <div className="group flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300">
                    <div className="p-2 bg-white rounded-lg shadow-sm text-gray-400 group-hover:text-blue-500 transition-colors">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Address</div>
                      <div className="text-gray-900 font-medium text-sm leading-relaxed">
                        {agency.contactInfo.address.street}<br />
                        {agency.contactInfo.address.city} {agency.contactInfo.address.pincode}<br />
                        {agency.contactInfo.address.state}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* Tours Section */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 font-serif mb-2">
                Tours by {agency?.name}
              </h2>
              <p className="text-gray-600">Explore the best packages offered by this agency</p>
            </div>
            <div className="hidden md:block h-px flex-1 bg-gray-200 ml-8"></div>
          </div>
          <ToursGrid items={tours} pagination={pagination} />
        </section>

        {/* Reviews Section */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <ReviewSection
            agencyId={agency?._id}
            averageRating={agency?.averageRating || 0}
            totalReviews={agency?.totalReviews || 0}
          />
        </div>
      </div>
    </div>
  );
}