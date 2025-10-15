'use client';
import { useState, useEffect } from 'react';
import CypentraLogo from './cypentraLogo';

// Cookie Banner Component
type CookieBannerProps = {
  onAccept: () => void;
  onDecline: () => void;
  onCustomize: () => void;
};

function CookieBanner({ onAccept, onDecline, onCustomize }: CookieBannerProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex-1 pr-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-blue-600 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  We value your privacy
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We use cookies to enhance your browsing experience, analyze
                  site traffic, and personalize content. By clicking "Accept
                  All", you consent to our use of cookies. You can manage your
                  preferences anytime.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 flex-shrink-0">
            <button
              onClick={onCustomize}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
              Customize
            </button>
            <button
              onClick={onDecline}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              Decline All
            </button>
            <button
              onClick={onAccept}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200">
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Cookie Preferences Modal
type CookiePreferencesProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (preferences: {
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
    functional: boolean;
  }) => void;
};

function CookiePreferences({
  isOpen,
  onClose,
  onSave,
}: CookiePreferencesProps) {
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    functional: false,
  });

  const handleToggle = (
    category: 'essential' | 'analytics' | 'marketing' | 'functional'
  ) => {
    if (category === 'essential') return; // Can't toggle essential cookies
    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSave = () => {
    onSave(preferences);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}></div>

        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              Cookie Preferences
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Essential Cookies */}
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <h4 className="text-sm font-medium text-gray-900">
                  Essential Cookies
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Required for the website to function properly. Cannot be
                  disabled.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-11 h-6 bg-blue-600 rounded-full flex items-center justify-end px-1">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <h4 className="text-sm font-medium text-gray-900">
                  Analytics Cookies
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Help us understand how visitors interact with our website.
                </p>
              </div>
              <button
                onClick={() => handleToggle('analytics')}
                className="flex-shrink-0">
                <div
                  className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors ${
                    preferences.analytics
                      ? 'bg-blue-600 justify-end'
                      : 'bg-gray-300 justify-start'
                  }`}>
                  <div className="w-4 h-4 bg-white rounded-full transition-transform"></div>
                </div>
              </button>
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <h4 className="text-sm font-medium text-gray-900">
                  Marketing Cookies
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Used to deliver personalized advertisements and track campaign
                  performance.
                </p>
              </div>
              <button
                onClick={() => handleToggle('marketing')}
                className="flex-shrink-0">
                <div
                  className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors ${
                    preferences.marketing
                      ? 'bg-blue-600 justify-end'
                      : 'bg-gray-300 justify-start'
                  }`}>
                  <div className="w-4 h-4 bg-white rounded-full transition-transform"></div>
                </div>
              </button>
            </div>

            {/* Functional Cookies */}
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <h4 className="text-sm font-medium text-gray-900">
                  Functional Cookies
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Enable enhanced functionality and personalization features.
                </p>
              </div>
              <button
                onClick={() => handleToggle('functional')}
                className="flex-shrink-0">
                <div
                  className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors ${
                    preferences.functional
                      ? 'bg-blue-600 justify-end'
                      : 'bg-gray-300 justify-start'
                  }`}>
                  <div className="w-4 h-4 bg-white rounded-full transition-transform"></div>
                </div>
              </button>
            </div>
          </div>

          <div className="flex space-x-3 mt-8">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Footer Component with Cookie Management
function Footer() {
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [showCookiePreferences, setShowCookiePreferences] = useState(false);
  type CookieConsent = {
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
    functional: boolean;
    timestamp: string;
  } | null;

  const [cookieConsent, setCookieConsent] = useState<CookieConsent>(null);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowCookieBanner(true), 1000);
    } else {
      setCookieConsent(JSON.parse(consent));
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setCookieConsent(consent);
    setShowCookieBanner(false);
  };

  const handleDeclineAll = () => {
    const consent = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setCookieConsent(consent);
    setShowCookieBanner(false);
  };

  const handleCustomize = () => {
    setShowCookiePreferences(true);
  };

  const handleSavePreferences = (preferences: any) => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setCookieConsent(consent);
    setShowCookieBanner(false);
    setShowCookiePreferences(false);
  };

  const handleManageCookies = () => {
    setShowCookiePreferences(true);
  };

  return (
    <>
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Main Footer Content */}
        <div className="relative">
          {/* Decorative Element */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
            {/* Top Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
              {/* Brand Section */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-4">
                  <CypentraLogo className="filter invert brightness-0 h-36 mb-6" />
                  <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                    Cybersecurity consulting built for modern SaaS businesses.
                    Fast, reliable, and focused on enabling your growth.
                  </p>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    Secure Payments
                  </p>
                  <img
                    src="/payment-icons.png"
                    alt="Accepted payment methods"
                    className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>

                {/* Trust Badges */}
                <div className="flex space-x-4 pt-4">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs">SOC 2 Certified</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs">ISO 27001</span>
                  </div>
                </div>
              </div>

              {/* Links Section */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-4 gap-2">
                {/* Social Links */}
                <div>
                  <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                    Links
                  </h4>
                  <ul className="space-y-3">
                    {/* Twitter */}
                    <li>
                      <a
                        href="https://x.com/cypentra?s=21"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Twitter
                      </a>
                    </li>

                    {/* LinkedIn */}
                    <li>
                      <a
                        href="https://www.linkedin.com/in/sam-josefi-615b9537a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        LinkedIn (X)
                      </a>
                    </li>

                    {/* Book a Meeting (Calendly) */}
                    <li>
                      <a
                        href="https://calendly.com/cypentra-consultation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Book a Meeting
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Services */}
                <div>
                  <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                    Services
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="#services"
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Security Assessments
                      </a>
                    </li>
                    <li>
                      <a
                        href="#services"
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        SOC 2 Compliance
                      </a>
                    </li>
                    <li>
                      <a
                        href="#services"
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        24/7 Monitoring
                      </a>
                    </li>
                    <li>
                      <a
                        href="#services"
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        vCISO Services
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                    Resources
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="#resources"
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        SOC 2 Starter Kit
                      </a>
                    </li>
                    <li>
                      <a
                        href="#resources"
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Security Guides
                      </a>
                    </li>
                    <li>
                      <a
                        href="/contact"
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Contact
                      </a>
                    </li>
                    <li>
                      <a
                        href="/assets/privacy-notice.pdf"
                        download
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Download Privacy Notice
                        <svg
                          className="w-3 h-3 ml-1 opacity-50"
                          fill="currentColor"
                          viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Legal & Privacy */}
                <div>
                  <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                    Legal & Privacy
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="/assets/privacy_policy.pdf"
                        download
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Download Privacy Policy
                        <svg
                          className="w-3 h-3 ml-1 opacity-50"
                          fill="currentColor"
                          viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/assets/terms_of_service.pdf"
                        download
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Download Terms of Service
                        <svg
                          className="w-3 h-3 ml-1 opacity-50"
                          fill="currentColor"
                          viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="/assets/cookie_policy.pdf"
                        download
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Download Cookie Policy
                        <svg
                          className="w-3 h-3 ml-1 opacity-50"
                          fill="currentColor"
                          viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={handleManageCookies}
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center group">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Manage Cookie Preferences
                        <svg
                          className="w-3 h-3 ml-1 opacity-50"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cookie Status Indicator */}
            {cookieConsent && (
              <div className="mb-8 p-3 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-gray-300">
                      Cookie preferences saved: Essential (
                      {cookieConsent.essential ? 'On' : 'Off'}), Analytics (
                      {cookieConsent.analytics ? 'On' : 'Off'}), Marketing (
                      {cookieConsent.marketing ? 'On' : 'Off'}), Functional (
                      {cookieConsent.functional ? 'On' : 'Off'})
                    </span>
                  </div>
                  <button
                    onClick={handleManageCookies}
                    className="text-xs text-blue-400 hover:text-blue-300 font-medium">
                    Change Settings
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex items-center space-x-6">
                  <p className="text-gray-500 text-sm">
                    © 2025 Cypentra. All rights reserved.
                  </p>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <span className="text-xs">Built with</span>
                    <svg
                      className="w-4 h-4 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs">for security</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 text-center md:text-right">
                  Trusted by SaaS teams worldwide • Committed to your compliance
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Banner */}
      {showCookieBanner && (
        <CookieBanner
          onAccept={handleAcceptAll}
          onDecline={handleDeclineAll}
          onCustomize={handleCustomize}
        />
      )}

      {/* Cookie Preferences Modal */}
      <CookiePreferences
        isOpen={showCookiePreferences}
        onClose={() => setShowCookiePreferences(false)}
        onSave={handleSavePreferences}
      />
    </>
  );
}

export default Footer;
