'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Send, Phone, Mail, User, MessageSquare } from 'lucide-react';

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <section className="w-full bg-white py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left Side - Content */}
            <div className="relative p-12 lg:p-16 bg-[#0B3D60] flex flex-col justify-between overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#61BAEC] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F68A3A] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

              <div className="relative z-10 space-y-8">
                <div>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#61BAEC] text-sm font-semibold tracking-wide uppercase mb-6">
                    Get in Touch
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                    Ready to plan your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F68A3A] to-[#FFD166] playfair-italic">Dream Trip?</span>
                  </h2>
                  <p className="text-lg text-blue-100 leading-relaxed max-w-md">
                    Compare genuine tour packages & reserve your seat for just ₹21. Tell us what you’re looking for and we’ll help you shortlist the perfect agency in minutes.
                  </p>
                </div>

                <div className="relative h-[300px] w-full mt-8">
                  <Image
                    src="/images/contact-form.png"
                    alt="Contact illustration"
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-12 lg:p-16 bg-white flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full space-y-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-[#0B3D60]">
                    Send us a message
                  </h3>
                  <p className="text-gray-500">
                    Share your details and we’ll send curated comparisons straight to your inbox.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#61BAEC] transition-colors" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#61BAEC]/20 focus:border-[#61BAEC] outline-none transition-all placeholder:text-gray-400 font-medium"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-[#61BAEC] transition-colors" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#61BAEC]/20 focus:border-[#61BAEC] outline-none transition-all placeholder:text-gray-400 font-medium"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#61BAEC] transition-colors" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#61BAEC]/20 focus:border-[#61BAEC] outline-none transition-all placeholder:text-gray-400 font-medium"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <div className="relative">
                      <div className="absolute top-4 left-4 pointer-events-none">
                        <MessageSquare className="h-5 w-5 text-gray-400 group-focus-within:text-[#61BAEC] transition-colors" />
                      </div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your travel plans..."
                        rows="4"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#61BAEC]/20 focus:border-[#61BAEC] outline-none resize-none transition-all placeholder:text-gray-400 font-medium"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-[#F68A3A] to-[#FF7E21] hover:from-[#E57A2F] hover:to-[#E56D15] text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-orange-500/20 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Start Comparing</span>
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}