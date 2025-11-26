'use client';

import React, { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Menu, X, User, Heart, MapPin, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../providers/AuthProvider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get('q') || '');
  const { user, token, logout } = useAuth();

  const isLoggedIn = Boolean(token);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleUserMenu = useCallback(() => {
    setShowUserMenu(prev => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    setShowUserMenu(false);
    setIsOpen(false);
  }, [logout]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    q ? params.set('q', q) : params.delete('q');
    params.set('page', '1');
    router.push(`/tours?${params.toString()}`);
  }, [q, searchParams, router]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Agencies', href: '/agencies' },
    { name: 'Tours', href: '/tours' },
    { name: 'Religious Tours', href: '/tours/religious' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Image
              src="/images/logo.png"
              alt="Ghumly Logo"
              width={180}
              height={60}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-[#40A4DE] px-3 py-2 text-sm font-medium transition-colors duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#40A4DE] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Right Section - Search & Auth */}
          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
            {/* Global Search */}
            <form onSubmit={handleSearch} className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search tours"
                className="pl-9 pr-4 py-2 w-48 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#40A4DE] focus:border-transparent text-sm outline-none transition-all"
              />
            </form>

            {/* Auth Section */}
            {!isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-[#40A4DE] hover:text-[#3090C7] font-medium transition-colors duration-300 px-4 py-2"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-[#40A4DE] hover:bg-[#3090C7] text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  className="text-gray-600 hover:text-[#40A4DE] transition-colors duration-300 p-2"
                  aria-label="Favorites"
                >
                  <Heart size={20} />
                </button>
                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 bg-[#40A4DE] text-white px-4 py-2 rounded-full hover:bg-[#3090C7] transition-all duration-300 shadow-md"
                    aria-label="User menu"
                  >
                    <User size={18} />
                    <span className="text-sm font-medium">Profile</span>
                  </button>

                  {/* User Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <Link
                        href="/account"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-[#40A4DE]/10 hover:text-[#40A4DE] transition-colors duration-200"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User size={16} className="mr-3" />
                        My Profile
                      </Link>
                      <Link
                        href="/trips"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-[#40A4DE]/10 hover:text-[#40A4DE] transition-colors duration-200"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <MapPin size={16} className="mr-3" />
                        My Trips
                      </Link>
                      <Link
                        href="/favorites"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-[#40A4DE]/10 hover:text-[#40A4DE] transition-colors duration-200"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Heart size={16} className="mr-3" />
                        Favorites
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-[#40A4DE]/10 hover:text-[#40A4DE] transition-colors duration-200"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings size={16} className="mr-3" />
                        Settings
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <LogOut size={16} className="mr-3" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-[#40A4DE] focus:outline-none focus:text-[#40A4DE] transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Side Drawer */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'visible' : 'invisible delay-300'
        }`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={closeMenu}
          aria-hidden="true"
        />

        {/* Side Menu */}
        <div className={`absolute left-0 top-0 h-full w-80 bg-white shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
          <div className="flex flex-col h-full">
            {/* Header with Logo */}
            <div className="p-6 border-b border-gray-200">
              <Link href="/" onClick={closeMenu}>
                <Image
                  src="/images/logo.png"
                  alt="Ghumly Logo"
                  width={140}
                  height={48}
                  className="h-12 w-auto object-contain"
                />
              </Link>
              {!isLoggedIn ? (
                <div className="mt-4 flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <User size={24} className="text-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Guest</h3>
                    <Link
                      href="/login"
                      onClick={closeMenu}
                      className="text-sm text-[#40A4DE] hover:text-[#3090C7] border border-gray-300 px-3 py-1 rounded mt-1 transition-colors duration-300 inline-block"
                    >
                      Login/Sign up
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#40A4DE] rounded-full flex items-center justify-center">
                    <User size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{user?.name || 'Welcome'}</h3>
                    <p className="text-sm text-gray-600">{user?.email || 'Travel Enthusiast'}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-between px-6 py-4 text-gray-700 hover:bg-[#40A4DE]/10 hover:text-[#40A4DE] transition-all duration-300"
                    onClick={closeMenu}
                  >
                    <span className="text-base font-medium">{item.name}</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>

              {/* Additional Menu Items (only when logged in) */}
              {isLoggedIn && (
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="space-y-1">
                    <Link
                      href="/account"
                      className="flex items-center justify-between px-6 py-4 text-gray-700 hover:bg-[#40A4DE]/10 hover:text-[#40A4DE] transition-all duration-300"
                      onClick={closeMenu}
                    >
                      <div className="flex items-center">
                        <User size={18} className="mr-3" />
                        <span className="text-base font-medium">My Profile</span>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link
                      href="/trips"
                      className="flex items-center justify-between px-6 py-4 text-gray-700 hover:bg-[#40A4DE]/10 hover:text-[#40A4DE] transition-all duration-300"
                      onClick={closeMenu}
                    >
                      <div className="flex items-center">
                        <MapPin size={18} className="mr-3" />
                        <span className="text-base font-medium">My Trips</span>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link
                      href="/favorites"
                      className="flex items-center justify-between px-6 py-4 text-gray-700 hover:bg-[#40A4DE]/10 hover:text-[#40A4DE] transition-all duration-300"
                      onClick={closeMenu}
                    >
                      <div className="flex items-center">
                        <Heart size={18} className="mr-3" />
                        <span className="text-base font-medium">Favorites</span>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center justify-between px-6 py-4 text-gray-700 hover:bg-[#40A4DE]/10 hover:text-[#40A4DE] transition-all duration-300"
                      onClick={closeMenu}
                    >
                      <div className="flex items-center">
                        <Settings size={18} className="mr-3" />
                        <span className="text-base font-medium">Settings</span>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Footer (Logout button when logged in) */}
            {isLoggedIn && (
              <div className="border-t border-gray-200 p-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-2 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                >
                  <LogOut size={18} className="mr-3" />
                  <span className="text-base font-medium">Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;