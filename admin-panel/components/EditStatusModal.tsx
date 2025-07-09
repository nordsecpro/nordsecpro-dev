import {
  CustomerDetails,
  Subscription,
} from '@/app/(admin panel)/subscription-management/page';
import React, { useState } from 'react';

// Edit Status Modal Component
interface EditStatusModalProps {
  subscription: Subscription;
  isOpen: boolean;
  onClose: () => void;
  onSave: (subscriptionId: string, newStatus: string) => void;
}

export const EditStatusModal: React.FC<EditStatusModalProps> = ({
  subscription,
  isOpen,
  onClose,
  onSave,
}) => {
  // Ensuring selectedStatus can only be 'active' or 'inactive'
  const [selectedStatus, setSelectedStatus] = useState<'active' | 'inactive'>(
    subscription.status === 'inactive' ? 'inactive' : 'active'
  );
  const [isLoading, setIsLoading] = useState(false);

  const statusOptions = [
    {
      value: 'active',
      label: 'Active',
      icon: '✓',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    },
    {
      value: 'inactive',
      label: 'Inactive',
      icon: '◯',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
    },
  ];

  const currentStatusConfig = statusOptions.find(
    (option) => option.value === (subscription.status || 'active')
  );
  const selectedStatusConfig = statusOptions.find(
    (option) => option.value === selectedStatus
  );

  const handleSave = async () => {
    if (selectedStatus === subscription.status) {
      onClose();
      return;
    }

    setIsLoading(true);
    try {
      await onSave(subscription._id, selectedStatus);
    } catch (error) {
      console.error('Error saving status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCustomerDisplayName = (customerDetails: CustomerDetails) => {
    return customerDetails.email || 'Unknown Customer';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 w-full max-w-md transform transition-all duration-300 scale-100">
          {/* Header */}
          <div className="relative overflow-hidden rounded-t-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20"></div>
            <div className="relative px-6 py-6 bg-white/80 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Edit Status
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Update subscription status
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
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
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-6">
            {/* Subscription Info */}
            <div className="bg-gradient-to-br from-gray-50/80 to-gray-100/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Subscription Details
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Customer:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {getCustomerDisplayName(subscription.customerDetails)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Plan:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {subscription.planTitles}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Current Status:</span>
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded-lg ${currentStatusConfig?.bgColor} ${currentStatusConfig?.color} ${currentStatusConfig?.borderColor} border`}>
                    {currentStatusConfig?.icon} {currentStatusConfig?.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Status Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Select New Status
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {statusOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedStatus === option.value
                        ? `${option.bgColor} ${option.borderColor} shadow-md`
                        : 'bg-white/50 border-gray-200 hover:bg-gray-50/80'
                    }`}>
                    <input
                      type="radio"
                      name="status"
                      value={option.value}
                      checked={selectedStatus === option.value}
                      onChange={(e) =>
                        setSelectedStatus(
                          e.target.value as 'active' | 'inactive'
                        )
                      }
                      className="sr-only"
                    />

                    <div className="flex items-center gap-3 w-full">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedStatus === option.value
                            ? `${option.borderColor} ${option.bgColor}`
                            : 'border-gray-300 bg-white'
                        }`}>
                        {selectedStatus === option.value && (
                          <div
                            className={`w-2.5 h-2.5 rounded-full ${option.color.replace(
                              'text-',
                              'bg-'
                            )}`}></div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 flex-1">
                        <span
                          className={`text-lg ${
                            selectedStatus === option.value
                              ? option.color
                              : 'text-gray-400'
                          }`}>
                          {option.icon}
                        </span>
                        <span
                          className={`font-medium ${
                            selectedStatus === option.value
                              ? option.color
                              : 'text-gray-700'
                          }`}>
                          {option.label}
                        </span>
                      </div>

                      {selectedStatus === option.value && (
                        <div className={`${option.color}`}>
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Change Summary */}
            {selectedStatus !== subscription.status && (
              <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-sm rounded-2xl p-4 border border-blue-200/50">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">
                  Status Change Summary
                </h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    From:{' '}
                    <span
                      className={`font-medium ${currentStatusConfig?.color}`}>
                      {currentStatusConfig?.icon} {currentStatusConfig?.label}
                    </span>
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  <span className="text-gray-600">
                    To:{' '}
                    <span
                      className={`font-medium ${selectedStatusConfig?.color}`}>
                      {selectedStatusConfig?.icon} {selectedStatusConfig?.label}
                    </span>
                  </span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading || selectedStatus === subscription.status}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2">
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
