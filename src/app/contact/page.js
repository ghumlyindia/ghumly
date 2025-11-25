"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, ShieldCheck, Users, Briefcase, ArrowRight, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import PageHero from '../components/shared/PageHero';

export default function ContactPage() {
    const [activeTab, setActiveTab] = useState('traveler'); // 'traveler' or 'agency'
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        {
            question: "How do I book a tour?",
            answer: "Simply browse our verified tours, select the one you like, and click 'Book Now' or 'Enquire'. You can also contact the agency directly through the platform."
        },
        {
            question: "Are the agencies verified?",
            answer: "Yes! Every agency on Ghumly goes through a strict verification process, including document checks and past performance reviews."
        },
        {
            question: "Can I customize my package?",
            answer: "Most agencies offer customization. You can mention your specific requirements in the enquiry form or discuss them directly with the agency."
        },
        {
            question: "How do I list my agency on Ghumly?",
            answer: "Click on the 'Agency' tab above and select 'Register as Partner'. You'll need to submit some basic details and documents for verification."
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            {/* Hero Section */}
            <PageHero
                title={
                    <>
                        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Touch</span>
                    </>
                }
                subtitle="Whether you're a traveler planning your next trip or an agency looking to grow, we're here to help."
                bgImage="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop"
                badgeText="24/7 Support"
            />

            {/* Tab Switcher */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
                <div className="bg-white rounded-full shadow-lg p-2 flex max-w-md mx-auto border border-gray-100">
                    <button
                        onClick={() => setActiveTab('traveler')}
                        className={`flex-1 py-3 px-6 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 ${activeTab === 'traveler'
                            ? 'bg-[#0B3D60] text-white shadow-md'
                            : 'text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        I am a Traveler
                    </button>
                    <button
                        onClick={() => setActiveTab('agency')}
                        className={`flex-1 py-3 px-6 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 ${activeTab === 'agency'
                            ? 'bg-[#F68A3A] text-white shadow-md'
                            : 'text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        I am an Agency
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* Traveler Section */}
                {activeTab === 'traveler' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in">
                        {/* Contact Form */}
                        <div className="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100">
                            <h2 className="text-2xl font-bold text-[#0B3D60] mb-6">Send us a Message</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0B3D60] focus:border-transparent outline-none transition-all" placeholder="Your Name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0B3D60] focus:border-transparent outline-none transition-all" placeholder="your@email.com" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0B3D60] focus:border-transparent outline-none transition-all bg-white">
                                        <option>General Enquiry</option>
                                        <option>Booking Support</option>
                                        <option>Feedback</option>
                                        <option>Report an Issue</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0B3D60] focus:border-transparent outline-none transition-all" placeholder="How can we help you?"></textarea>
                                </div>
                                <button type="button" className="w-full py-4 bg-[#0B3D60] text-white font-bold rounded-xl hover:bg-[#092c45] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                    Send Message <Send size={18} />
                                </button>
                            </form>
                        </div>

                        {/* Info & Support */}
                        <div className="space-y-8 flex flex-col justify-center">
                            <div>
                                <h2 className="text-3xl font-bold text-[#0B3D60] mb-4">We&apos;re here for you</h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Have a question about a tour? Need help with a booking? Our support team is ready to assist you on your journey.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#0B3D60] shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#0B3D60]">Email Support</h3>
                                        <p className="text-gray-600">support@ghumly.com</p>
                                        <p className="text-sm text-gray-400 mt-1">Response within 24 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-[#F68A3A] shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#0B3D60]">Phone Support</h3>
                                        <p className="text-gray-600">+91 98765 43210</p>
                                        <p className="text-sm text-gray-400 mt-1">Mon-Sat, 10am - 7pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#0B3D60]">Office</h3>
                                        <p className="text-gray-600">Ghumly HQ, Cyber City,<br />Gurugram, Haryana, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Agency Section */}
                {activeTab === 'agency' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in">
                        <div className="space-y-8 flex flex-col justify-center order-2 lg:order-1">
                            <div>
                                <div className="inline-block px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-sm font-semibold tracking-wide uppercase mb-4">
                                    Partner with Us
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-[#0B3D60] mb-6">
                                    Grow Your Travel Business with <span className="text-[#F68A3A]">Ghumly</span>
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                    Join India&apos;s first verified travel marketplace. Get access to high-quality leads, build your brand trust, and manage bookings effortlessly.
                                </p>

                                <div className="space-y-4 mb-8">
                                    {[
                                        "Verified Agency Badge",
                                        "Unlimited Tour Listings",
                                        "Dedicated Support Manager",
                                        "Access to Premium Leads"
                                    ].map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                                            <ShieldCheck className="text-green-500" size={20} />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href="/agencies/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F68A3A] text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30">
                                        Register as Partner <ArrowRight size={20} />
                                    </Link>
                                    <a href="mailto:partners@ghumly.com" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all">
                                        Contact Sales
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#0B3D60] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden order-1 lg:order-2 flex flex-col justify-center">
                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                            <div className="relative z-10 space-y-8">
                                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4">
                                    <Briefcase size={32} className="text-[#F68A3A]" />
                                </div>
                                <h3 className="text-2xl font-bold">&quot;Ghumly has transformed how we get leads. The verification badge instantly builds trust with customers.&quot;</h3>
                                <div>
                                    <p className="font-bold text-lg">Rajesh Kumar</p>
                                    <p className="text-blue-200">Founder, Himalayan Treks</p>
                                </div>
                                <div className="pt-8 border-t border-white/10">
                                    <p className="text-sm text-blue-200 mb-2">Partner Support</p>
                                    <p className="text-xl font-bold">partners@ghumly.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


            </div>

            {/* FAQ Section */}
            <section className="py-20 bg-[#F1F7FB]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#0B3D60]">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
                                >
                                    <span className="font-bold text-[#0B3D60]">{faq.question}</span>
                                    {openFaq === index ? (
                                        <ChevronUp className="text-[#F68A3A]" size={20} />
                                    ) : (
                                        <ChevronDown className="text-gray-400" size={20} />
                                    )}
                                </button>
                                <div
                                    className={`px-6 overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
