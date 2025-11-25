'use client';
import React from 'react';
import { Shield, DollarSign, Clock, Search, Award } from 'lucide-react';

export default function WhyGhumly() {
  const reasons = [
    {
      icon: Search,
      title: 'One Platform, Zero Confusion',
      description: 'Everything sits inside one simple platform designed purely for travelers. No random websites, just clarity.',
      color: 'text-[#3FA5E0]',
      bg: 'bg-blue-50',
      borderColor: 'group-hover:border-[#3FA5E0]',
    },
    {
      icon: DollarSign,
      title: 'Transparent Pricing',
      description: 'See clear costs with zero hidden charges before confirming your trip. What you see is what you pay.',
      color: 'text-[#F68A3A]',
      bg: 'bg-orange-50',
      borderColor: 'group-hover:border-[#F68A3A]',
    },
    {
      icon: Shield,
      title: 'Verified Agencies',
      description: 'Only trustworthy operators with real history and customer love make it to our list. Your safety is priority.',
      color: 'text-[#0B3D60]',
      bg: 'bg-slate-100',
      borderColor: 'group-hover:border-[#0B3D60]',
    },
    {
      icon: Clock,
      title: 'Instant Seat Reservation',
      description: 'Secure your group seat with just ₹21 any time of the day. Flexible booking for modern travelers.',
      color: 'text-[#3FA5E0]',
      bg: 'bg-blue-50',
      borderColor: 'group-hover:border-[#3FA5E0]',
    },
    {
      icon: Award,
      title: 'Compare Before You Book',
      description: 'Make confident, informed choices with itinerary, hotel and review comparisons side-by-side.',
      color: 'text-[#F68A3A]',
      bg: 'bg-orange-50',
      borderColor: 'group-hover:border-[#F68A3A]',
    },
  ];

  return (
    <section className="w-full bg-white py-24 px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#3FA5E0] text-sm font-semibold tracking-wide uppercase mb-2">
            Why Choose Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B3D60] tracking-tight">
            Travel Smart with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3FA5E0] to-[#F68A3A] playfair-italic">Ghumly</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We're building the most trusted travel ecosystem in India. Here's why thousands of travelers start their journey with us.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${reason.borderColor}`}
              >
                <div className={`w-16 h-16 rounded-2xl ${reason.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${reason.color}`} strokeWidth={2} />
                </div>

                <h3 className="text-xl font-bold text-[#0B3D60] mb-3 group-hover:text-[#3FA5E0] transition-colors">
                  {reason.title}
                </h3>

                <p className="text-gray-600 leading-relaxed font-medium">
                  {reason.description}
                </p>
              </div>
            );
          })}

          {/* CTA Card as the last item to fill the grid nicely */}
          <div className="bg-gradient-to-br from-[#0B3D60] to-[#3FA5E0] rounded-[2rem] p-8 text-white flex flex-col justify-center items-center text-center shadow-lg transform hover:scale-[1.02] transition-transform relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F68A3A]/20 rounded-full blur-3xl -ml-16 -mb-16"></div>

            <h3 className="text-2xl font-bold mb-4 relative z-10">Ready to start?</h3>
            <p className="text-blue-100 mb-8 relative z-10">Join our community of happy travelers today.</p>
            <a href="/tours" className="px-8 py-3.5 bg-[#F68A3A] text-white rounded-xl font-bold hover:bg-[#e57a2f] transition-colors shadow-lg relative z-10">
              Explore Tours
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}