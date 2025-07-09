'use client';
import { updatePassword } from '@/lib/api/setting';
import React, { useState } from 'react';

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof PasswordData, string>>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (errors[name as keyof PasswordData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PasswordData, string>> = {};

    // Current password validation
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    // New password validation
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword =
        'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Check if new password is different from current
    if (
      formData.currentPassword &&
      formData.newPassword &&
      formData.currentPassword === formData.newPassword
    ) {
      newErrors.newPassword =
        'New password must be different from current password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrength = (
    password: string
  ): { strength: number; text: string; color: string } => {
    let strength = 0;
    const checks = [
      password.length >= 8,
      /[a-z]/.test(password),
      /[A-Z]/.test(password),
      /\d/.test(password),
      /[!@#$%^&*(),.?":{}|<>]/.test(password),
    ];

    strength = checks.filter(Boolean).length;

    if (strength <= 2)
      return { strength: strength * 20, text: 'Weak', color: 'bg-red-500' };
    if (strength <= 3)
      return { strength: strength * 20, text: 'Fair', color: 'bg-yellow-500' };
    if (strength <= 4)
      return { strength: strength * 20, text: 'Good', color: 'bg-blue-500' };
    return { strength: 100, text: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await updatePassword(
        formData.currentPassword,
        formData.newPassword
      );
      if (response && response.success) {
        setShowSuccess(true);

        // Reset form data after success
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });

        // Hide success message after 3 seconds
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Password reset failed:', error);
    } finally {
      setIsLoading(false);
    }
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
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Reset Password</h1>
            <p className="text-blue-100">
              Update your account password for enhanced security
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Reset Password Form */}
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
                <span>
                  Password updated successfully! Please use your new password
                  for future logins.
                </span>
              </div>
            )}

            <div className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Change Password
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Current Password Field */}
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type={showPasswords.current ? 'text' : 'password'}
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 bg-white/50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors backdrop-blur-sm"
                      placeholder="Enter your current password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                      {showPasswords.current ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.currentPassword}
                    </p>
                  )}
                </div>

                {/* New Password Field */}
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={showPasswords.new ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 bg-white/50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors backdrop-blur-sm"
                      placeholder="Enter your new password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                      {showPasswords.new ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.newPassword && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">
                          Password Strength:
                        </span>
                        <span
                          className={`font-medium ${
                            passwordStrength.text === 'Weak'
                              ? 'text-red-600'
                              : passwordStrength.text === 'Fair'
                              ? 'text-yellow-600'
                              : passwordStrength.text === 'Good'
                              ? 'text-blue-600'
                              : 'text-green-600'
                          }`}>
                          {passwordStrength.text}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{
                            width: `${passwordStrength.strength}%`,
                          }}></div>
                      </div>
                    </div>
                  )}

                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 bg-white/50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors backdrop-blur-sm"
                      placeholder="Confirm your new password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                      {showPasswords.confirm ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg">
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <svg
                          className="animate-spin h-5 w-5"
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
                        <span>Updating Password...</span>
                      </div>
                    ) : (
                      'Update Password'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Password Requirements Card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Password Requirements
            </h3>
            <div className="space-y-3">
              <div
                className={`flex items-center space-x-2 ${
                  formData.newPassword.length >= 8
                    ? 'text-green-600'
                    : 'text-gray-500'
                }`}>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      formData.newPassword.length >= 8
                        ? 'M5 13l4 4L19 7'
                        : 'M6 18L18 6M6 6l12 12'
                    }
                  />
                </svg>
                <span className="text-sm">At least 8 characters long</span>
              </div>
              <div
                className={`flex items-center space-x-2 ${
                  /[a-z]/.test(formData.newPassword)
                    ? 'text-green-600'
                    : 'text-gray-500'
                }`}>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      /[a-z]/.test(formData.newPassword)
                        ? 'M5 13l4 4L19 7'
                        : 'M6 18L18 6M6 6l12 12'
                    }
                  />
                </svg>
                <span className="text-sm">One lowercase letter</span>
              </div>
              <div
                className={`flex items-center space-x-2 ${
                  /[A-Z]/.test(formData.newPassword)
                    ? 'text-green-600'
                    : 'text-gray-500'
                }`}>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      /[A-Z]/.test(formData.newPassword)
                        ? 'M5 13l4 4L19 7'
                        : 'M6 18L18 6M6 6l12 12'
                    }
                  />
                </svg>
                <span className="text-sm">One uppercase letter</span>
              </div>
              <div
                className={`flex items-center space-x-2 ${
                  /\d/.test(formData.newPassword)
                    ? 'text-green-600'
                    : 'text-gray-500'
                }`}>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      /\d/.test(formData.newPassword)
                        ? 'M5 13l4 4L19 7'
                        : 'M6 18L18 6M6 6l12 12'
                    }
                  />
                </svg>
                <span className="text-sm">One number</span>
              </div>
              <div
                className={`flex items-center space-x-2 ${
                  /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword)
                    ? 'text-green-600'
                    : 'text-gray-500'
                }`}>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword)
                        ? 'M5 13l4 4L19 7'
                        : 'M6 18L18 6M6 6l12 12'
                    }
                  />
                </svg>
                <span className="text-sm">
                  One special character (recommended)
                </span>
              </div>
            </div>
          </div>

          {/* Security Tips Card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Security Tips
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <svg
                  className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  Use a unique password that you don&apos;t use elsewhere
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <svg
                  className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Consider using a password manager</span>
              </div>
              <div className="flex items-start space-x-2">
                <svg
                  className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Never share your password with anyone</span>
              </div>
              <div className="flex items-start space-x-2">
                <svg
                  className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Update your password regularly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
