'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md' 
          : 'bg-white/90 backdrop-blur-md shadow-sm'
      }`}
      style={{
        fontFamily: "'Crimson Pro', serif"
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <Link 
            href="/" 
            className="text-2xl font-bold text-slate-900 transition-colors"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ron AI
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <Link
                href="/"
                className={`text-slate-600 hover:text-slate-900 font-medium transition-colors ${
                  pathname === '/' ? 'text-slate-900' : ''
                }`}
              >
                Home
              </Link>
              <Link
                href="/security-compliance"
                className={`text-slate-600 hover:text-slate-900 font-medium transition-colors ${
                  pathname === '/security-compliance' ? 'text-slate-900' : ''
                }`}
              >
                Security & Compliance
              </Link>
              <Link
                href="/our-products"
                className={`text-slate-600 hover:text-slate-900 font-medium transition-colors ${
                  pathname === '/our-products' ? 'text-slate-900' : ''
                }`}
              >
                Our Products
              </Link>
              <Link
                href="#"
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/about-us"
                className={`text-slate-600 hover:text-slate-900 font-medium transition-colors ${
                  pathname === '/about-us' ? 'text-slate-900' : ''
                }`}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className={`text-slate-600 hover:text-slate-900 font-medium transition-colors ${
                  pathname === '/contact' ? 'text-slate-900' : ''
                }`}
              >
                Contact
              </Link>
            </div>
            
            <Link
              href="#"
              className="bg-slate-800 text-white px-6 py-2.5 rounded-md font-medium hover:bg-slate-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Request Early Access
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
