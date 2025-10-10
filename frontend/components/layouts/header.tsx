'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import CartDropdown from '@/components/CartDropdown';
import CypentraLogo from '@/components/cypentra-logo';

const navLinks = [
  { href: '/services', label: 'Services', newTab: false },
  { href: '/packages', label: 'Packages', newTab: false },
  { href: '/about', label: 'About', newTab: false },
  { href: '/case-studies', label: 'Case Studies', newTab: false },
  { href: '/resources', label: 'Resources', newTab: true },
  { href: '/insights', label: 'Insights', newTab: true },
  { href: '/contact', label: 'Contact', newTab: false },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`
          bg-white/95 backdrop-blur-md border-b sticky top-0 z-50 
          transition-all duration-300
          ${
            isScrolled
              ? 'shadow-lg border-slate-200'
              : 'shadow-sm border-slate-100'
          }
        `}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <CypentraLogo />
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center space-x-1 xl:space-x-2"
              aria-label="Main navigation">
              {navLinks.map(({ href, label, newTab }) => (
                <Link
                  key={href}
                  href={href}
                  className="
                    relative px-3 py-2 text-sm font-medium text-slate-700 
                    hover:text-blue-600 transition-colors duration-200
                    group
                  "
                  target={newTab ? '_blank' : '_self'}
                  rel={newTab ? 'noopener noreferrer' : undefined}>
                  {label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-3/4 transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Medium Screen Navigation */}
            <nav
              className="hidden md:flex lg:hidden items-center space-x-1"
              aria-label="Main navigation">
              {navLinks.slice(0, 4).map(({ href, label, newTab }) => (
                <Link
                  key={href}
                  href={href}
                  className="
                    px-3 py-2 text-sm font-medium text-slate-700 
                    hover:text-blue-600 transition-colors duration-200
                    rounded-lg hover:bg-blue-50
                  "
                  target={newTab ? '_blank' : '_self'}
                  rel={newTab ? 'noopener noreferrer' : undefined}>
                  {label}
                </Link>
              ))}
            </nav>

            {/* Right Side - Mobile Optimized */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Cart Dropdown - Mobile Optimized */}
              <div className="flex-shrink-0">
                <CartDropdown />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="
                  md:hidden p-2 rounded-xl text-slate-700 
                  hover:text-blue-600 hover:bg-blue-50 
                  transition-all duration-200
                  active:scale-95
                  flex-shrink-0
                "
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}>
                <div className="relative w-6 h-6">
                  <Menu
                    className={`
                      absolute inset-0 h-6 w-6 transition-all duration-300
                      ${
                        isMenuOpen
                          ? 'rotate-90 opacity-0'
                          : 'rotate-0 opacity-100'
                      }
                    `}
                  />
                  <X
                    className={`
                      absolute inset-0 h-6 w-6 transition-all duration-300
                      ${
                        isMenuOpen
                          ? 'rotate-0 opacity-100'
                          : '-rotate-90 opacity-0'
                      }
                    `}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`
          fixed top-[65px] sm:top-[73px] left-0 right-0 z-40 md:hidden
          bg-white border-b shadow-xl
          transition-all duration-300 ease-out
          ${
            isMenuOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-full opacity-0 pointer-events-none'
          }
        `}>
        <nav
          className="max-h-[calc(100vh-65px)] sm:max-h-[calc(100vh-73px)] overflow-y-auto"
          aria-label="Mobile navigation">
          <div className="px-4 py-6 space-y-1">
            {navLinks.map(({ href, label, newTab }, index) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className="
                  block px-4 py-3.5 text-base font-semibold text-slate-700 
                  hover:text-blue-600 hover:bg-blue-50 
                  rounded-2xl transition-all duration-200
                  animate-in slide-in-from-left fade-in
                  hover:translate-x-1
                  active:scale-98
                "
                style={{ animationDelay: `${index * 50}ms` }}
                target={newTab ? '_blank' : '_self'}
                rel={newTab ? 'noopener noreferrer' : undefined}>
                <div className="flex items-center justify-between">
                  <span>{label}</span>
                  {newTab && (
                    <svg
                      className="w-4 h-4 opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Footer - Optional */}
          <div className="px-4 py-4 border-t border-slate-100 bg-slate-50">
            <p className="text-xs text-slate-500 text-center">
              © 2024 Cypentra. All rights reserved.
            </p>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
