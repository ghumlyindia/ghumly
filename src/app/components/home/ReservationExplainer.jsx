'use client';
import React from 'react';

const benefits = [
  'Guarantees your seat instantly',
  'Filters out casual enquiries',
  'Confirms your spot before group fills',
  'Makes booking with agency smooth',
];

const steps = [
  { number: '01', title: 'Pay ₹21', description: 'Small reservation fee' },
  { number: '02', title: 'Seat Reserved', description: 'Instant confirmation' },
  { number: '03', title: 'Pay Balance', description: 'To travel agency directly' },
  { number: '04', title: '₹21 Adjusted', description: 'Deducted from final bill' },
];

export default function ReservationExplainer() {
  return (
    <section className="bg-[#0F172A] text-white px-4 py-16">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full border border-white/20">
            <div className="w-2 h-2 bg-[#61BAEC] rounded-full animate-pulse"></div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
              Why Just ₹21?
            </p>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-[#FF8C42] playfair-italic block">Smart Booking</span>
            Starts Small
          </h2>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            A tiny ₹21 secures your spot instantly. We deduct it later from your final payment - 
            no extra charges, completely transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Content - Benefits */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">
                Your ₹21 Does More
              </h3>
              <p className="text-lg text-white/80 leading-relaxed">
                This small amount shows you're serious, locks your preferred dates, 
                and ensures only genuine travelers book through us.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#61BAEC] transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-[#61BAEC] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <span className="text-white/90 text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Process Flow */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">How It Works</h3>
              <p className="text-white/70">Simple 4-step process</p>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-[#FF8C42] rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="text-white font-bold text-xl">{step.number}</span>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white mb-1">{step.title}</h4>
                    <p className="text-white/70">{step.description}</p>
                  </div>

                  {/* Connector Arrow */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 mt-24 w-4 h-0.5 bg-white/30">
                      <div className="absolute -right-1 -top-1 w-0 h-0 border-l-[6px] border-l-white/30 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Note */}
            <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-white/80 font-semibold">Simple • Transparent • Secure</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}