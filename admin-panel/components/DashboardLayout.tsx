'use client';
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glass circles */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full backdrop-blur-sm animate-pulse"></div>
        <div className="absolute bottom-32 left-32 w-48 h-48 bg-gradient-to-br from-indigo-200/20 to-blue-200/20 rounded-full backdrop-blur-sm animate-pulse delay-1000"></div>

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="lg:ml-72 relative">
        {/* Top Header */}
        <header className="bg-white/70 backdrop-blur-sm border-b border-white/20 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              {/* Page Title - will be dynamic based on the page */}
              <div className="flex-1 lg:flex-none lg:ml-0 ml-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  Admin Panel
                </h1>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area - This is where page content will be rendered */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
