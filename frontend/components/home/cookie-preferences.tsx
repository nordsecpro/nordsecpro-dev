'use client';
import { useState } from 'react';

// Cookie Preferences Modal
type CookieCategory = 'essential' | 'analytics' | 'marketing' | 'functional';

function CookiePreferences({ isOpen, onClose, onSave }) {
  const [preferences, setPreferences] = useState<{
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
    functional: boolean;
  }>({
    essential: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    functional: false,
  });

  const handleToggle = (category: CookieCategory) => {
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

export default CookiePreferences;
