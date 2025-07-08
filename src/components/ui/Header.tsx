'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

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
    { href: '/about-us', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          <Link 
            href="/" 
            className="text-xl sm:text-2xl font-bold text-slate-900 transition-colors"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ron AI
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-slate-600 hover:text-slate-900 font-medium transition-colors ${
                    pathname === link.href ? 'text-slate-900' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            <Link
              href="/contact"
              className="bg-slate-800 text-white px-6 py-2.5 rounded-md font-medium hover:bg-slate-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Request Early Access
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
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
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t border-slate-200">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2 rounded-md text-slate-700 hover:bg-slate-100 font-medium transition-colors ${
                    pathname === link.href ? 'bg-slate-100 text-slate-900' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-slate-200">
                <Link
                  href="/contact"
                  className="block w-full text-center bg-slate-800 text-white px-6 py-3 rounded-md font-medium hover:bg-slate-900 transition-all duration-300"
                >
                  Request Early Access
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
