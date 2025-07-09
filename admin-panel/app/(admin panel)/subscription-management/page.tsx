'use client';
import React, { useCallback, useEffect, useState } from 'react';
import {
  deleteSubscription,
  getAllSubscriptions,
  SubscriptionFilters,
  updateSubscription,
} from '@/lib/api/subscriptions';
import { DeleteConfirmationDialog } from '@/components/DeleteConfirmationDialog';
import { BulkDeleteConfirmationDialog } from '@/components/BulkDeleteConfirmationDialog';
import { SubscriptionDetailModal } from '@/components/SubscriptionDetailModal';
import { EditStatusModal } from '@/components/EditStatusModal';

// Updated types based on your actual API response
export interface CustomerDetails {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface Plan {
  planTitle: string;
  numberOfEmployees: number;
  price: number;
  _id: string;
}

export interface Subscription {
  _id: string;
  customerDetails: CustomerDetails;
  customerName: string;
  plans: Plan[];
  planTitles: string; // Comma-separated plan names
  planCount: number;
  totalPrice: number;
  totalEmployees: number;
  status: 'active' | 'inactive';
  paymentStatus: 'succeeded' | 'failed' | 'pending';
  confirmationEmailSent?: boolean;
  invoiceEmailSent?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface PaginationInfo {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

const SubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<
    Set<string>
  >(new Set());
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] =
    useState<Subscription | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [bulkDeleteConfirmOpen, setBulkDeleteConfirmOpen] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState<{
    id: string;
    customerName: string;
  } | null>(null);

  const fetchSubscriptions = useCallback(
    async (filters?: Partial<SubscriptionFilters>) => {
      try {
        setLoading(true);
        setError('');

        const requestFilters: SubscriptionFilters = {
          page: currentPage,
          limit: pageSize,
          status: statusFilter !== 'all' ? (statusFilter as any) : undefined,
          search: searchTerm || undefined,
          ...filters,
        };

        // Remove undefined values
        Object.keys(requestFilters).forEach((key) => {
          if (requestFilters[key as keyof SubscriptionFilters] === undefined) {
            delete requestFilters[key as keyof SubscriptionFilters];
          }
        });

        const response: any = await getAllSubscriptions(requestFilters);

        if (response.success) {
          setSubscriptions(response.data.subscriptions);
          setPagination(response.data.pagination);
        } else {
          setError(response.message || 'Failed to fetch subscriptions');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to fetch subscriptions';
        setError(errorMessage);
        console.error('Error fetching subscriptions:', err);
      } finally {
        setLoading(false);
      }
    },
    [
      currentPage,
      pageSize,
      statusFilter,
      searchTerm,
      setLoading,
      setError,
      setSubscriptions,
      setPagination,
    ]
  );

  // Main effect for fetching data
  useEffect(() => {
    fetchSubscriptions();
  }, [
    currentPage,
    pageSize,
    statusFilter,
    paymentStatusFilter,
    sortBy,
    sortOrder,
  ]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentPage === 1) {
        fetchSubscriptions(); // Fetch directly if already on page 1
      } else {
        setCurrentPage(1); // Reset to page 1, which triggers main effect
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdown &&
        !(event.target as Element).closest('.dropdown-container')
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleSelectAll = () => {
    if (selectedSubscriptions.size === subscriptions.length) {
      setSelectedSubscriptions(new Set());
    } else {
      setSelectedSubscriptions(new Set(subscriptions.map((sub) => sub._id)));
    }
  };

  const toggleSelectSubscription = (id: string) => {
    const newSelected = new Set(selectedSubscriptions);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedSubscriptions(newSelected);
  };

  const toggleDropdown = (subscriptionId: string) => {
    setOpenDropdown(openDropdown === subscriptionId ? null : subscriptionId);
  };

  const handleAction = (action: string, subscriptionId: string) => {
    setOpenDropdown(null);

    switch (action) {
      case 'view':
        const subscription = subscriptions.find(
          (sub) => sub._id === subscriptionId
        );
        if (subscription) {
          setSelectedSubscription(subscription);
          setViewModalOpen(true);
        }
        break;
      case 'edit':
        const editSubscription = subscriptions.find(
          (sub) => sub._id === subscriptionId
        );
        if (editSubscription) {
          setSelectedSubscription(editSubscription);
          setEditModalOpen(true);
        }
        break;
      case 'delete':
        handleDeleteSubscription(subscriptionId);
        break;
      default:
        break;
    }
  };

  const handleDeleteSubscription = async (subscriptionId: string) => {
    const subscription = subscriptions.find(
      (sub) => sub._id === subscriptionId
    );
    const customerName = subscription
      ? subscription.customerName || 'Unknown Customer'
      : 'this subscription';

    setSubscriptionToDelete({ id: subscriptionId, customerName });
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!subscriptionToDelete) return;

    setDeleteConfirmOpen(false);
    setDeleteLoading(subscriptionToDelete.id);

    try {
      await deleteSubscription(subscriptionToDelete.id);

      // Remove subscription from local state
      setSubscriptions((prev) =>
        prev.filter((sub) => sub._id !== subscriptionToDelete.id)
      );

      // Update pagination if needed
      if (
        pagination &&
        subscriptions.length === 1 &&
        pagination.currentPage > 1
      ) {
        setCurrentPage((prev) => prev - 1);
      } else {
        // Refresh the current page
        fetchSubscriptions();
      }
    } catch (error) {
      console.error('Error deleting subscription:', error);
      alert(
        error instanceof Error
          ? error.message
          : 'Failed to delete subscription. Please try again.'
      );
    } finally {
      setDeleteLoading(null);
      setSubscriptionToDelete(null);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedSubscriptions.size === 0) return;
    setBulkDeleteConfirmOpen(true);
  };

  const confirmBulkDelete = async () => {
    setBulkDeleteConfirmOpen(false);
    setDeleteLoading('bulk');

    try {
      const deletePromises = Array.from(selectedSubscriptions).map((id) =>
        deleteSubscription(id)
      );
      await Promise.all(deletePromises);

      setSubscriptions((prev) =>
        prev.filter((sub) => !selectedSubscriptions.has(sub._id))
      );

      setSelectedSubscriptions(new Set());
      fetchSubscriptions();
    } catch (error) {
      console.error('Error during bulk delete:', error);
      alert('Some subscriptions could not be deleted. Please try again.');
      fetchSubscriptions();
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleStatusUpdate = async (
    subscriptionId: string,
    newStatus: string
  ) => {
    try {
      const response: any = await updateSubscription(subscriptionId, newStatus);

      setSubscriptions((prev) =>
        prev.map((sub) =>
          sub._id === subscriptionId
            ? { ...sub, ...response.data.subscription }
            : sub
        )
      );

      setEditModalOpen(false);
      setSelectedSubscription(null);
    } catch (error) {
      console.error('Error updating status:', error);
      alert(
        error instanceof Error
          ? error.message
          : 'Failed to update subscription status. Please try again.'
      );
    }
  };

  const getStatusBadge = (status: string = 'active') => {
    const statusConfig = {
      active: {
        color:
          'bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-500',
        icon: '✓',
      },
      inactive: {
        color:
          'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-gray-200',
        dot: 'bg-gray-500',
        icon: '◯',
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.active;

    return (
      <span
        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${config.color} transition-all duration-200 hover:scale-105`}>
        <div
          className={`w-2 h-2 ${config.dot} rounded-full mr-2 animate-pulse`}></div>
        <span className="mr-1">{config.icon}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPaymentStatusBadge = (paymentStatus: string) => {
    const statusConfig = {
      succeeded: {
        color:
          'bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200',
        dot: 'bg-green-500',
        icon: '💳',
      },
      failed: {
        color:
          'bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200',
        dot: 'bg-red-500',
        icon: '❌',
      },
      pending: {
        color:
          'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 border-yellow-200',
        dot: 'bg-yellow-500',
        icon: '⏳',
      },
    };

    const config =
      statusConfig[paymentStatus as keyof typeof statusConfig] ||
      statusConfig.pending;

    return (
      <span
        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${config.color} transition-all duration-200 hover:scale-105`}>
        <div
          className={`w-2 h-2 ${config.dot} rounded-full mr-2 animate-pulse`}></div>
        <span className="mr-1">{config.icon}</span>
        {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 py-4">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="w-20 h-4 bg-gray-200 rounded"></div>
          <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
        </div>
      ))}
    </div>
  );

  if (loading && subscriptions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-24 bg-white rounded-xl shadow-sm"></div>
              ))}
            </div>
            <div className="h-64 bg-white rounded-xl shadow-sm"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden">
          <div className="mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">
                    Subscription Management
                  </h2>
                  <p className="text-blue-100">
                    Monitor and manage all your subscription plans with ease
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Overview */}
        {pagination && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5"></div>
              <div className="relative flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">
                    Total Subscriptions
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {pagination.totalItems.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5"></div>
              <div className="relative flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">
                    Active Subscribers
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {subscriptions
                      .filter((s) => s.status === 'active')
                      .length.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-6 h-6 text-white"
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
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/5"></div>
              <div className="relative flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">
                    Successful Payments
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {subscriptions
                      .filter((s) => s.paymentStatus === 'succeeded')
                      .length.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-6 h-6 text-white"
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
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-600/5"></div>
              <div className="relative flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">
                    Failed Payments
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {subscriptions
                      .filter((s) => s.paymentStatus === 'failed')
                      .length.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-6 h-6 text-white"
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
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5"></div>
              <div className="relative flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">
                    Total Revenue
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(
                      subscriptions
                        .filter((s) => s.paymentStatus === 'succeeded')
                        .reduce((sum, sub) => sum + sub.totalPrice, 0)
                    )}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Filters and Search */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl"></div>
          <div className="relative bg-white/80 rounded-2xl p-8 border border-black/20">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Search & Filter
                </h3>
                {selectedSubscriptions.size > 0 && (
                  <div className="flex items-center gap-3 mt-4 sm:mt-0">
                    <span className="text-sm text-gray-600">
                      {selectedSubscriptions.size} selected
                    </span>
                    <button
                      onClick={handleBulkDelete}
                      disabled={deleteLoading !== null}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                      {deleteLoading === 'bulk' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Deleting...
                        </>
                      ) : (
                        'Delete Selected'
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {/* Enhanced Search */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Search Subscriptions
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search by plan, customer, or email..."
                      className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80 focus:bg-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Status Filter
                  </label>
                  <select
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80 focus:bg-white"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="active">✓ Active</option>
                    <option value="inactive">◯ Inactive</option>
                  </select>
                </div>

                {/* Payment Status Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Payment Status
                  </label>
                  <select
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80 focus:bg-white"
                    value={paymentStatusFilter}
                    onChange={(e) => setPaymentStatusFilter(e.target.value)}>
                    <option value="all">All Payments</option>
                    <option value="succeeded">💳 Succeeded</option>
                    <option value="failed">❌ Failed</option>
                    <option value="pending">⏳ Pending</option>
                  </select>
                </div>

                {/* Page Size */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Items per Page
                  </label>
                  <select
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80 focus:bg-white"
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}>
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-2xl"></div>
            <div className="relative bg-red-50/80 backdrop-blur-sm border border-red-200/50 text-red-700 px-6 py-4 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-red-500"
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
                <p className="font-medium">Error: {error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Subscriptions Table */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-500/5 to-gray-500/5 rounded-2xl"></div>
          <div className="relative bg-white/80 rounded-2xl border border-black/20 overflow-hidden text-xs">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        checked={
                          selectedSubscriptions.size === subscriptions.length &&
                          subscriptions.length > 0
                        }
                        onChange={toggleSelectAll}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700 uppercase tracking-wider">
                      Plans
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700 uppercase tracking-wider">
                      Employees
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700 uppercase tracking-wider">
                      Total Price
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/50 backdrop-blur-sm divide-y divide-gray-100/50">
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12">
                        <LoadingSkeleton />
                      </td>
                    </tr>
                  ) : subscriptions.length > 0 ? (
                    subscriptions.map((subscription, index) => (
                      <tr
                        key={subscription._id}
                        className={`hover:bg-blue-50/50 transition-all duration-200 ${
                          selectedSubscriptions.has(subscription._id)
                            ? 'bg-blue-50/30'
                            : index % 2 === 0
                            ? 'bg-white/30'
                            : 'bg-gray-50/30'
                        }`}>
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedSubscriptions.has(
                              subscription._id
                            )}
                            onChange={() =>
                              toggleSelectSubscription(subscription._id)
                            }
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="font-medium text-gray-900">
                              {subscription.customerName}
                            </div>
                            <div className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200">
                              {subscription.customerDetails.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="font-semibold text-gray-900">
                              {subscription.planCount} plan
                              {subscription.planCount > 1 ? 's' : ''}
                            </div>
                            <div
                              className="text-sm text-gray-500 truncate max-w-xs"
                              title={subscription.planTitles}>
                              {subscription.planTitles}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="font-medium text-gray-900">
                              {subscription.totalEmployees.toLocaleString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900 hover:text-green-600 transition-colors duration-200">
                            {formatCurrency(subscription.totalPrice)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(subscription.status)}
                        </td>
                        <td className="px-6 py-4">
                          {getPaymentStatusBadge(subscription.paymentStatus)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative dropdown-container">
                            <button
                              onClick={() => toggleDropdown(subscription._id)}
                              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20">
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {openDropdown === subscription._id && (
                              <div className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-xl z-50 overflow-hidden">
                                <div className="py-2">
                                  <button
                                    onClick={() =>
                                      handleAction('view', subscription._id)
                                    }
                                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 transition-all duration-200 flex items-center gap-3">
                                    <svg
                                      className="w-4 h-4"
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
                                    View Details
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleAction('edit', subscription._id)
                                    }
                                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50/80 hover:text-indigo-600 transition-all duration-200 flex items-center gap-3">
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24">
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                      />
                                    </svg>
                                    Edit Subscription
                                  </button>
                                  <div className="border-t border-gray-100 my-1"></div>
                                  <button
                                    onClick={() =>
                                      handleAction('delete', subscription._id)
                                    }
                                    disabled={
                                      deleteLoading === subscription._id
                                    }
                                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50/80 hover:text-red-700 transition-all duration-200 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
                                    {deleteLoading === subscription._id ? (
                                      <>
                                        <div className="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div>
                                        Deleting...
                                      </>
                                    ) : (
                                      <>
                                        <svg
                                          className="w-4 h-4"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24">
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                          />
                                        </svg>
                                        Delete Subscription
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-8 h-8 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                              />
                            </svg>
                          </div>
                          <div className="space-y-2">
                            <p className="text-xl font-semibold text-gray-900">
                              No subscriptions found
                            </p>
                            <p className="text-gray-500">
                              Try adjusting your search or filter criteria to
                              find what you&apos;re looking for.
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Enhanced Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl"></div>
            <div className="relative bg-white/80 rounded-2xl p-6 border border-black/20">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-bold text-gray-900">
                    {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}
                  </span>{' '}
                  to{' '}
                  <span className="font-bold text-gray-900">
                    {Math.min(
                      pagination.currentPage * pagination.itemsPerPage,
                      pagination.totalItems
                    )}
                  </span>{' '}
                  of{' '}
                  <span className="font-bold text-gray-900">
                    {pagination.totalItems.toLocaleString()}
                  </span>{' '}
                  results
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={!pagination.hasPrevPage}
                    className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105">
                    Previous
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from(
                      { length: Math.min(5, pagination.totalPages) },
                      (_, i) => {
                        let page;
                        if (pagination.totalPages <= 5) {
                          page = i + 1;
                        } else if (pagination.currentPage <= 3) {
                          page = i + 1;
                        } else if (
                          pagination.currentPage >=
                          pagination.totalPages - 2
                        ) {
                          page = pagination.totalPages - 4 + i;
                        } else {
                          page = pagination.currentPage - 2 + i;
                        }

                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 border rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 ${
                              page === pagination.currentPage
                                ? 'border-blue-500 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                                : 'border-gray-300 text-gray-700 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-lg'
                            }`}>
                            {page}
                          </button>
                        );
                      }
                    )}
                  </div>

                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={!pagination.hasNextPage}
                    className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals remain the same */}
      {viewModalOpen && selectedSubscription && (
        <SubscriptionDetailModal
          subscription={selectedSubscription}
          isOpen={viewModalOpen}
          onClose={() => {
            setViewModalOpen(false);
            setSelectedSubscription(null);
          }}
        />
      )}

      {editModalOpen && selectedSubscription && (
        <EditStatusModal
          subscription={selectedSubscription}
          isOpen={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedSubscription(null);
          }}
          onSave={handleStatusUpdate}
        />
      )}

      {deleteConfirmOpen && subscriptionToDelete && (
        <DeleteConfirmationDialog
          isOpen={deleteConfirmOpen}
          customerName={subscriptionToDelete.customerName}
          onConfirm={confirmDelete}
          onCancel={() => {
            setDeleteConfirmOpen(false);
            setSubscriptionToDelete(null);
          }}
          isLoading={deleteLoading === subscriptionToDelete.id}
        />
      )}

      {bulkDeleteConfirmOpen && (
        <BulkDeleteConfirmationDialog
          isOpen={bulkDeleteConfirmOpen}
          selectedCount={selectedSubscriptions.size}
          onConfirm={confirmBulkDelete}
          onCancel={() => setBulkDeleteConfirmOpen(false)}
          isLoading={deleteLoading === 'bulk'}
        />
      )}
    </div>
  );
};

export default SubscriptionsPage;
