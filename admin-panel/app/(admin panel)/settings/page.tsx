'use client';
import { getProfile } from '@/lib/api/profile';
import { updateProfile } from '@/lib/api/setting';
import React, { useState, useEffect } from 'react';

interface AdminData {
  email: string;
  firstName: string;
  lastName: string;
  lastLogin?: string;
  createdAt?: string;
}

const SettingsPage = () => {
  const [formData, setFormData] = useState<AdminData>({
    email: '',
    firstName: '',
    lastName: '',
  });

  const [originalData, setOriginalData] = useState<AdminData>({
    email: '',
    firstName: '',
    lastName: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AdminData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await getProfile();

        // Assuming response contains the admin data
        const currentData: AdminData = {
          email: response.data.admin.email,
          firstName: response.data.admin.firstName,
          lastName: response.data.admin.lastName,
          lastLogin: response.data.admin.lastLogin,
          createdAt: response.data.admin.createdAt,
        };

        setOriginalData(currentData);
        setFormData(currentData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfileData();
  }, []);

  // Check if form has changes
  useEffect(() => {
    const changed =
      formData.email !== originalData.email ||
      formData.firstName !== originalData.firstName ||
      formData.lastName !== originalData.lastName;
    setHasChanges(changed);
  }, [formData, originalData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (errors[name as keyof AdminData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof AdminData, string>> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await updateProfile(
        formData.email,
        formData.firstName,
        formData.lastName
      );

      // Update original data to reflect saved changes
      setOriginalData(formData);
      setShowSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update settings:', error);
      // Handle error state here
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setErrors({});
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl backdrop-blur-sm border border-white/10">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30">
            <svg
              className="w-6 h-6"
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
          </div>
          <div>
            <h1 className="text-2xl font-bold">Account Settings</h1>
            <p className="text-blue-100">
              Manage your profile information and preferences
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings Form */}
        <div className="lg:col-span-2">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            {/* Success Message */}
            {showSuccess && (
              <div className="bg-green-500/90 backdrop-blur-sm text-white p-4 flex items-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Settings updated successfully!</span>
              </div>
            )}

            <div className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Profile Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors backdrop-blur-sm"
                    placeholder="admin@company.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* First Name Field */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors backdrop-blur-sm"
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name Field */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors backdrop-blur-sm"
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={!hasChanges || isLoading}
                    className="px-6 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!hasChanges || isLoading}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg">
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <svg
                          className="animate-spin h-4 w-4"
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
                        <span>Saving...</span>
                      </div>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Account Info Card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Account Information
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Last Login</p>
                <p className="text-sm font-medium text-gray-900">
                  {formatDate(originalData.lastLogin)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Created</p>
                <p className="text-sm font-medium text-gray-900">
                  {formatDate(originalData.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Status</p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm font-medium text-green-600">Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Security
            </h3>
            <div className="space-y-4">
              <button className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200">
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Change Password
                    </p>
                    <p className="text-xs text-gray-600">
                      Update your account password
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
