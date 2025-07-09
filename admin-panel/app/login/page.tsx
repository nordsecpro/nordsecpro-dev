'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin, AdminData } from '@/lib/api/login';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  type FormFields = 'email' | 'password';
  const [errors, setErrors] = useState<Partial<Record<FormFields, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (errors[name as FormFields]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    // Clear API error when user starts typing
    if (apiError) {
      setApiError('');
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setApiError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Call login API
      const response = await loginAdmin(formData.email, formData.password);

      if (response.success && response.data) {
        console.log('Login successful:', response);
        console.log('Admin data:', response.data.admin);
        console.log('Token:', response.data.token);

        // Store admin data and token
        localStorage.setItem('adminData', JSON.stringify(response.data.admin));
        localStorage.setItem('adminToken', response.data.token);

        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        setApiError(response.message || 'Login failed');
      }
    } catch (error) {
      let errorMessage = 'Login failed. Please try again.';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setApiError(errorMessage);
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex items-center justify-center overflow-hidden relative">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Glass Circles */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full backdrop-blur-sm border border-white/20 animate-pulse"></div>
        <div className="absolute bottom-20 right-16 w-48 h-48 bg-gradient-to-br from-indigo-200/30 to-blue-200/30 rounded-full backdrop-blur-sm border border-white/20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-20 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full backdrop-blur-sm border border-white/20 animate-pulse delay-2000"></div>

        {/* Glass Rectangles */}
        <div className="absolute top-32 right-32 w-40 h-24 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl rotate-12 animate-pulse delay-500"></div>
        <div className="absolute bottom-40 left-32 w-36 h-20 bg-blue-100/20 backdrop-blur-sm border border-white/20 rounded-2xl -rotate-12 animate-pulse delay-1500"></div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}></div>
        </div>

        {/* Floating Glass Cards */}
        <div className="absolute top-24 right-1/4 w-28 h-16 bg-gradient-to-r from-white/10 to-blue-100/20 backdrop-blur-sm border border-white/30 rounded-xl rotate-6"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-14 bg-gradient-to-r from-purple-100/20 to-white/10 backdrop-blur-sm border border-white/30 rounded-xl -rotate-3"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        {/* Login Card */}
        <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl shadow-2xl p-8 backdrop-blur-sm border border-white/10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-blue-100">Sign in to your dashboard</p>
          </div>

          {/* API Error Display */}
          {apiError && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-red-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-red-200 text-sm">{apiError}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-colors backdrop-blur-sm disabled:opacity-50"
                placeholder="admin@yourcompany.com"
              />
              {errors.email && (
                <p className="text-red-200 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-colors backdrop-blur-sm disabled:opacity-50"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-200 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
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
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
