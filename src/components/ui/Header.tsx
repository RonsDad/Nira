import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">Ron AI</Link>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link
            to="/"
            className={`text-gray-600 hover:text-blue-500 ${
              location.pathname === '/' ? 'text-blue-500' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/security-compliance"
            className={`text-gray-600 hover:text-blue-500 ${
              location.pathname === '/security-compliance' ? 'text-blue-500' : ''
            }`}
          >
            Security & Compliance
          </Link>
          <Link
            to="/our-products"
            className={`text-gray-600 hover:text-blue-500 ${
              location.pathname === '/our-products' ? 'text-blue-500' : ''
            }`}
          >
            Our Products
          </Link>
          <Link
            to="/about-us"
            className={`text-gray-600 hover:text-blue-500 ${
              location.pathname === '/about-us' ? 'text-blue-500' : ''
            }`}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className={`text-gray-600 hover:text-blue-500 ${
              location.pathname === '/contact' ? 'text-blue-500' : ''
            }`}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
