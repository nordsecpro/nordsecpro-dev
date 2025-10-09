'use client';
import React from 'react';
import { Menu, X } from 'lucide-react';
import CartDropdown from '@/components/CartDropdown';
import CypentraLogo from '@/components/home/cypentra-logo';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper function to handle navigation with URL update
  const handleNavigation = (sectionId: string) => {
    // Scroll to section
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    // Update URL without page reload
    window.history.pushState({}, '');
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <CypentraLogo />

          {/* Desktop Navigation - Responsive breakpoints */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            <a
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('services');
              }}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer">
              Services
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('packages');
              }}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer">
              Packages
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('about');
              }}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer">
              About
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('case-studies');
              }}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer">
              Case Studies
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('resources');
              }}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer">
              Resources
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('insights');
              }}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer">
              Insights
            </a>
            <a href="/contact">Contact</a>
          </nav>

          {/* Medium Screen Navigation - Shows fewer items */}
          <nav className="hidden md:flex lg:hidden space-x-4">
            <a
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('services');
              }}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer">
              Services
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('packages');
              }}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer">
              Packages
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('about');
              }}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer">
              About
            </a>
            <a
              href="/contact"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium cursor-pointer">
              Contact
            </a>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Cart - Always visible */}
            <CartDropdown />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100">
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Full navigation for small screens */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-screen pb-4' : 'max-h-0'
          }`}>
          <nav className="space-y-1 pt-4 border-t">
            <a
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('services');
                setIsMenuOpen(false);
              }}
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded font-medium cursor-pointer">
              Services
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('packages');
                setIsMenuOpen(false);
              }}
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded font-medium cursor-pointer">
              Packages
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('about');
                setIsMenuOpen(false);
              }}
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded font-medium cursor-pointer">
              About
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('case-studies');
                setIsMenuOpen(false);
              }}
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded font-medium cursor-pointer">
              Case Studies
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('resources');
                setIsMenuOpen(false);
              }}
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded font-medium cursor-pointer">
              Resources
            </a>
            <a
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('insights');
                setIsMenuOpen(false);
              }}
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded font-medium cursor-pointer">
              Insights
            </a>
            <a
              href="/contact"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded font-medium cursor-pointer">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
