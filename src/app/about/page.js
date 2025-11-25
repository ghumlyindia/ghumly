import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Search, Heart, Users, Globe, Award, ArrowRight, CheckCircle2, XCircle, MapPin, Star } from 'lucide-react';
import PageHero from '../components/shared/PageHero';

export default function AboutPage() {
    return (
        <div className="bg-white">
            <PageHero
                title={
                    <>
                        Travel with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F68A3A] to-amber-400 playfair-italic">Certainty</span>, Not Confusion
                    </>
                }
                subtitle="We are Ghumly. The only platform where you can compare verified tour packages, check real reviews, and book your dream trip without the fear of scams."
                bgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                badgeText="India’s First Verified Travel Marketplace"
            />

            {/* Stats / Trust Bar */}
            <div className="relative z-20 -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { label: "Verified Agencies", value: "100%", icon: ShieldCheck },
                        { label: "Happy Travelers", value: "10k+", icon: Users },
                        { label: "Destinations", value: "50+", icon: MapPin },
                        { label: "Real Reviews", value: "4.9/5", icon: Star },
                    ].map((stat, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-center text-[#F68A3A] mb-2">
                                <stat.icon size={28} />
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-[#0B3D60]">{stat.value}</div>
                            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* The Story: Instagram Trap vs Ghumly */}
            <section className="py-24 md:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#0B3D60] mb-6">
                            Why We Started <span className="text-[#F68A3A] playfair-italic">Ghumly</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            It all started with a simple observation: Planning a trip on social media is broken.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        {/* The Problem */}
                        <div className="space-y-8 order-2 lg:order-1">
                            <div className="bg-red-50 rounded-3xl p-8 border border-red-100">
                                <h3 className="text-2xl font-bold text-red-700 mb-4 flex items-center gap-3">
                                    <XCircle className="fill-red-100 text-red-600" size={32} />
                                    The &quot;Instagram Trap&quot;
                                </h3>
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    You see a reel. You get excited. Then comes the chaos. Dozens of DMs, hidden costs, unverified agents, and the constant worry: <em>&quot;Is this safe?&quot;</em>
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        "Overwhelming number of similar ads",
                                        "No way to verify agency credibility",
                                        "Hidden terms and confusing pricing",
                                        "Zero accountability if things go wrong"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* The Solution */}
                        <div className="space-y-8 order-1 lg:order-2">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-orange-100 rounded-[2.5rem] transform rotate-2 opacity-50"></div>
                                <div className="relative bg-white rounded-[2rem] p-8 md:p-12 border border-gray-100 shadow-2xl">
                                    <div className="inline-block px-4 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-700 text-sm font-bold tracking-wide uppercase mb-6">
                                        The Better Way
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-[#0B3D60] mb-6">
                                        Transparent. Verified. <br />
                                        <span className="text-[#F68A3A] playfair-italic">Simple.</span>
                                    </h3>
                                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                        Ghumly cuts through the noise. We verify every single agency, standardize every itinerary, and collect real reviews so you can book your <strong>budget trip</strong>, <strong>luxury honeymoon</strong>, or <strong>backpacking adventure</strong> with 100% peace of mind.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex items-center gap-3 text-[#0B3D60] font-semibold">
                                            <CheckCircle2 className="text-green-500" /> Verified Agents
                                        </div>
                                        <div className="flex items-center gap-3 text-[#0B3D60] font-semibold">
                                            <CheckCircle2 className="text-green-500" /> Best Price Guarantee
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Ghumly Promise */}
            <section className="py-24 bg-[#F1F7FB] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0B3D60]">
                            The Ghumly <span className="text-[#F68A3A] playfair-italic">Promise</span>
                        </h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            We are not just a listing site. We are your safety net in the world of travel.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Strict Verification",
                                desc: "Every agency submits legal documents, past tour records, and customer feedback before they can list a single trip on Ghumly.",
                                icon: ShieldCheck,
                                color: "text-blue-600",
                                bg: "bg-blue-50"
                            },
                            {
                                title: "Unbiased Comparison",
                                desc: "We don't play favorites. Compare itineraries, hotels, and meal plans side-by-side to find the best value for your money.",
                                icon: Search,
                                color: "text-orange-600",
                                bg: "bg-orange-50"
                            },
                            {
                                title: "Community Trust",
                                desc: "Our reviews come from real travelers who have actually taken the trip. No fake 5-star ratings, just honest experiences.",
                                icon: Users,
                                color: "text-green-600",
                                bg: "bg-green-50"
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                                <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-[#0B3D60] mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
                    <Globe className="w-20 h-20 text-[#0B3D60] mx-auto opacity-10" />
                    <h2 className="text-4xl md:text-6xl font-bold text-[#0B3D60] tracking-tight">
                        &quot;Ghoomna hai? <br />
                        Toh <span className="text-[#F68A3A]">Ghumly</span> hai!&quot;
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
                        The name <strong>Ghumly</strong> comes from the Hindi word <em>&quot;Ghumna&quot;</em> — to wander, to explore, to travel. <br /><br />
                        Our mission is to make that exploration safe, simple, and accessible for every Indian traveler. Whether you&apos;re planning a <strong>weekend getaway to Udaipur</strong> or a <strong>Char Dham Yatra</strong>, Ghumly is your trusted companion.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-[#0B3D60] relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#F68A3A] rounded-full blur-3xl opacity-20"></div>
                <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20"></div>

                <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                        Stop Searching. Start <span className="text-[#F68A3A] playfair-italic">Ghum-ing.</span>
                    </h2>
                    <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
                        Join thousands of smart travelers who have switched to the safe, transparent way of booking trips.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link
                            href="/tours"
                            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#F68A3A] text-white text-lg font-bold rounded-full hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1"
                        >
                            Explore Verified Tours <ArrowRight size={20} />
                        </Link>
                        <Link
                            href="/agencies/register"
                            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-lg font-bold rounded-full hover:bg-white/20 transition-all"
                        >
                            Become a Partner
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
