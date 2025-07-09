'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getProfile } from '@/lib/api/profile'; // Assuming `getProfile` is defined in the API

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');

  // Fetch admin profile data when component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await getProfile();
        setEmail(response.data.admin.email);
        setName(
          response.data.admin.firstName + ' ' + response.data.admin.lastName
        );
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfileData();
  }, []);

  // Handle user logout
  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      localStorage.removeItem('adminData');
      localStorage.removeItem('adminToken');

      // Redirect to login page after 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Navigation items array
  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
          />
        </svg>
      ),
    },
    {
      name: 'Subscription Management',
      href: '/subscription-management',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
    },
    {
      name: 'Inquiries',
      href: '/inquiries',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: (
        <svg
          className="w-5 h-5"
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
      ),
    },
    {
      name: 'Reset Password',
      href: '/reset-password',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z"
          />
        </svg>
      ),
    },
    {
      name: 'Sign Out',
      href: '/logout',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      ),
    },
  ];

  // Check if the current link is active
  const isActiveLink = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Overlay - Lower z-index */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Lower z-index to allow modals above */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-blue-600/95 via-blue-700/95 to-blue-800/95 backdrop-blur-xl border-r border-white/10 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
        style={{ isolation: 'auto' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        <div className="absolute top-8 right-8 w-12 h-12 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-20 left-8 w-8 h-8 bg-blue-300/20 rounded-full blur-lg" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Admin Panel</h2>
                  <p className="text-xs text-blue-200">Management Portal</p>
                </div>
              </div>

              {/* Mobile close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
                <svg
                  className="w-5 h-5"
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
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item, index) => (
              <div key={item.name}>
                {/* Add divider before Sign Out */}
                {item.name === 'Sign Out' && (
                  <div className="my-4 border-t border-white/10"></div>
                )}

                {item.name === 'Sign Out' ? (
                  <button
                    onClick={handleLogout}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group cursor-pointer ${
                      isLoggingOut
                        ? 'opacity-60 cursor-not-allowed'
                        : 'text-red-200 hover:bg-red-500/20 hover:text-red-100'
                    }`}
                    disabled={isLoggingOut}>
                    <span className="transition-transform duration-200 group-hover:scale-110">
                      {isLoggingOut ? (
                        <svg
                          className="animate-spin w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        item.icon
                      )}
                    </span>
                    <span className="font-medium">
                      {isLoggingOut ? 'Signing out...' : item.name}
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActiveLink(item.href)
                        ? 'bg-white/20 text-white border border-white/30 shadow-lg'
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }`}>
                    <span
                      className={`transition-transform duration-200 ${
                        isActiveLink(item.href)
                          ? 'scale-110'
                          : 'group-hover:scale-110'
                      }`}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.name}</span>
                    {isActiveLink(item.href) && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse" />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-white/10 space-y-2">
            {/* User Profile */}
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                {name ? name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-sm">
                  {name || 'Admin User'}
                </p>
                <p className="text-blue-200 text-xs">
                  {email || 'admin@company.com'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
