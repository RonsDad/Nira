'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Linkedin, Twitter, Instagram } from 'lucide-react';
import Image from 'next/image';

const Header = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/our-products', label: 'Our Products' },
    { href: '/blog', label: 'Blog' },
    { href: '/about-us', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  const isProductPage = pathname === '/our-products';

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isProductPage 
          ? 'bg-transparent' 
          : 'bg-white/90 backdrop-blur-md shadow-sm'
      }`}
      style={{
        fontFamily: "'Crimson Pro', serif"
      }}
    >
      <div className={`absolute inset-0 transition-all duration-300 ${isProductPage ? 'bg-black/50 backdrop-blur-lg border-b border-white/10 shadow-lg' : ''}`}></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-2">
          <Link 
            href="/" 
            className="flex items-center"
          >
            <Image 
              src={isProductPage ? "/images/The Logo2.png" : "/images/The Logo.png"}
              alt="Ron AI"
              width={300}
              height={120}
              className="h-20 w-auto sm:h-24"
              priority
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors ${
                    isProductPage
                      ? `text-gray-300 hover:text-white ${pathname === link.href ? 'text-blue-400' : ''}`
                      : `text-slate-600 hover:text-slate-900 ${pathname === link.href ? 'text-slate-900' : ''}`
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            <Link
              href="/our-products#early-access"
              className={`px-6 py-2.5 rounded-md font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                isProductPage
                  ? 'bg-blue-500 text-white hover:bg-blue-400'
                  : 'bg-slate-800 text-white hover:bg-slate-900'
              }`}
            >
              Request Early Access
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-md transition-colors touch-manipulation ${
              isProductPage ? 'text-gray-300 hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className={`md:hidden absolute top-full left-0 right-0 shadow-lg border-t z-50 ${
            isProductPage ? 'bg-black/80 backdrop-blur-lg border-white/10' : 'bg-white/95 backdrop-blur-md border-slate-200'
          }`}>
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors touch-manipulation ${
                    isProductPage
                      ? `text-gray-300 hover:bg-white/10 ${pathname === link.href ? 'text-blue-400' : ''}`
                      : `text-slate-700 hover:bg-slate-100 ${pathname === link.href ? 'text-slate-900' : ''}`
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/our-products#early-access"
                className={`block w-full text-center px-4 py-3 mt-2 rounded-md font-medium transition-all duration-300 touch-manipulation ${
                  isProductPage
                    ? 'bg-blue-500 text-white hover:bg-blue-400'
                    : 'bg-slate-800 text-white hover:bg-slate-900'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Request Early Access
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
