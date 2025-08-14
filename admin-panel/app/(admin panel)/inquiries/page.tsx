'use client';

import {
  Contact,
  getContacts,
  isContactApiError,
  Pagination,
} from '@/lib/api/contact';
import React, { useEffect, useState, useCallback, useMemo } from 'react';

interface ContactPageState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  pagination: Pagination | null;
  lastUpdated: Date | null;
}

interface Filters {
  search: string;
  status: string;
  type: string;
  sortBy: 'name' | 'email' | 'createdAt' | 'status';
  sortOrder: 'asc' | 'desc';
}

const InquiryPage: React.FC = () => {
  const [state, setState] = useState<ContactPageState>({
    contacts: [],
    loading: true,
    error: null,
    pagination: null,
    lastUpdated: null,
  });

  const [filters, setFilters] = useState<Filters>({
    search: '',
    status: '',
    type: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const fetchContacts = useCallback(
    async (page: number = 1, limit: number = 10): Promise<void> => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const response = await getContacts(page, limit);

        setState((prev) => ({
          ...prev,
          contacts: response.data?.contacts || [],
          pagination: response.data?.pagination || null,
          loading: false,
          error: null,
          lastUpdated: new Date(),
        }));
      } catch (error) {
        console.error('Error fetching contacts:', error);

        let errorMessage = 'Failed to fetch contacts. Please try again.';

        if (isContactApiError(error)) {
          errorMessage = error.message;
        }

        setState((prev) => ({
          ...prev,
          contacts: [],
          pagination: null,
          loading: false,
          error: errorMessage,
        }));
      }
    },
    []
  );

  // Main effect for fetching data
  useEffect(() => {
    fetchContacts(currentPage, itemsPerPage);
  }, [
    currentPage,
    itemsPerPage,
    filters.status,
    filters.type,
    filters.sortBy,
    filters.sortOrder,
    fetchContacts,
  ]);

  // Debounced search effect
  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      if (currentPage === 1) {
        fetchContacts(1, itemsPerPage);
      } else {
        setCurrentPage(1);
      }
    }, 500);

    setSearchTimeout(timeout);

    return () => {
      clearTimeout(timeout); // Ensure to clear the timeout on component unmount or before re-running the effect
    };
  }, [filters.search, fetchContacts, itemsPerPage, currentPage]);

  // Filtered and sorted contacts
  const filteredContacts = useMemo(() => {
    let filtered = [...state.contacts];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (contact) =>
          contact.name?.toLowerCase().includes(searchLower) ||
          contact.email?.toLowerCase().includes(searchLower) ||
          contact.company?.toLowerCase().includes(searchLower) ||
          contact.subject?.toLowerCase().includes(searchLower) ||
          contact.message?.toLowerCase().includes(searchLower)
      );
    }

    if (filters.status) {
      filtered = filtered.filter(
        (contact) => contact.status === filters.status
      );
    }

    if (filters.type) {
      filtered = filtered.filter((contact) => contact.type === filters.type);
    }

    filtered.sort((a, b) => {
      let aValue: string | Date;
      let bValue: string | Date;

      switch (filters.sortBy) {
        case 'name':
          aValue = a.name || '';
          bValue = b.name || '';
          break;
        case 'email':
          aValue = a.email || '';
          bValue = b.email || '';
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        case 'status':
          aValue = a.status || '';
          bValue = b.status || '';
          break;
        default:
          aValue = a.createdAt;
          bValue = b.createdAt;
      }

      if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [state.contacts, filters]);

  const uniqueTypes = useMemo(() => {
    const types = [
      ...new Set(state.contacts.map((c) => c.type).filter(Boolean)),
    ];
    return types;
  }, [state.contacts]);

  const getStatusBadge = useCallback((status: Contact['status']): string => {
    const baseClasses =
      'inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm transition-all duration-200 hover:scale-105';

    switch (status?.toLowerCase()) {
      case 'new':
        return `${baseClasses} bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200`;
      case 'resolved':
        return `${baseClasses} bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200`;
      default:
        return `${baseClasses} bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-gray-200`;
    }
  }, []);

  const getTypeBadge = useCallback((type: Contact['type']): string => {
    const baseClasses =
      'inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm transition-all duration-200 hover:scale-105';

    switch (type?.toLowerCase()) {
      case 'security_consultation':
      case 'security-consultation':
        return `${baseClasses} bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 border-purple-200`;
      case 'general_inquiry':
      case 'general-inquiry':
        return `${baseClasses} bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-800 border-indigo-200`;
      case 'support':
        return `${baseClasses} bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800 border-orange-200`;
      default:
        return `${baseClasses} bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-gray-200`;
    }
  }, []);

  const formatDate = useCallback((dateString: string | undefined): string => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      return 'Invalid Date';
    }
  }, []);

  const truncateText = useCallback(
    (text: string | undefined, maxLength: number = 100): string => {
      if (!text) return '';
      return text.length > maxLength
        ? text.substring(0, maxLength) + '...'
        : text;
    },
    []
  );

  const formatContactType = useCallback((type: string): string => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  }, []);

  const formatContactStatus = useCallback((status: string): string => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  }, []);

  const exportToExcel = useCallback(() => {
    // Create Excel data
    const excelData = filteredContacts.map((contact) => ({
      'Contact Name': contact.name || '',
      'Email Address': contact.email || '',
      Company: contact.company || '',
      Subject: contact.subject || '',
      Message: contact.message || '',
      'Contact Type': formatContactType(contact.type || ''),
      Status: formatContactStatus(contact.status || ''),
      'Date Created': new Date(contact.createdAt).toLocaleString(),
    }));

    // Convert to Excel format (simplified CSV that Excel can read)
    const headers = Object.keys(excelData[0]);
    const csvContent = [
      headers.join(','),
      ...excelData.map((row) =>
        headers
          .map((header) => {
            const value = row[header as keyof typeof row];
            // Escape quotes and wrap in quotes if contains comma
            return typeof value === 'string' &&
              (value.includes(',') || value.includes('"'))
              ? `"${value.replace(/"/g, '""')}"`
              : value;
          })
          .join(',')
      ),
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts_export_${
      new Date().toISOString().split('T')[0]
    }.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [filteredContacts, formatContactStatus, formatContactType]);

  // Enhanced Loading Component
  const LoadingSpinner: React.FC = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-white rounded-xl shadow-sm"></div>
            ))}
          </div>
          <div className="h-64 bg-white rounded-xl shadow-sm"></div>
        </div>
      </div>
    </div>
  );

  // Enhanced Error Component
  const ErrorState: React.FC = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-2xl"></div>
          <div className="relative bg-red-50/80 backdrop-blur-sm border border-red-200/50 text-red-700 px-6 py-8 rounded-2xl shadow-lg text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
              <svg
                className="w-8 h-8 text-red-600"
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
            </div>
            <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
            <p className="text-red-600 mb-6">{state.error}</p>
            <button
              onClick={() => fetchContacts(currentPage, itemsPerPage)}
              disabled={state.loading}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              {state.loading ? 'Retrying...' : 'Try Again'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (state.loading && state.contacts.length === 0) return <LoadingSpinner />;
  if (state.error && state.contacts.length === 0) return <ErrorState />;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 rounded-2xl"></div>
          <div className="relative bg-white/50 rounded-2xl p-8 border border-black/20 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Inquiries
                </h1>
                <p className="text-gray-600 text-lg">
                  View and manage all inquiry form submissions
                </p>
                {state.lastUpdated && (
                  <p className="text-sm text-gray-500">
                    Last updated: {state.lastUpdated.toLocaleTimeString()}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-3 mt-6 lg:mt-0">
                <button
                  onClick={exportToExcel}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Export to Excel
                </button>

                <div className="flex rounded-lg border border-gray-300 bg-white shadow-sm">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`px-4 py-3 text-sm font-medium rounded-l-lg transition-colors duration-200 ${
                      viewMode === 'table'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
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
                        d="M3 10h18M3 6h18m-9 8h9"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`px-4 py-3 text-sm font-medium rounded-r-lg transition-colors duration-200 ${
                      viewMode === 'cards'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
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
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        {state.pagination && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-black/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5"></div>
              <div className="relative flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">
                    Total Submissions
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {state.pagination.total.toLocaleString()}
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-black/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5"></div>
              <div className="relative flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">
                    New Submissions
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {state.contacts.filter((c) => c.status === 'new').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-black/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/5"></div>
              <div className="relative flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {
                      state.contacts.filter((c) => c.status === 'resolved')
                        .length
                    }
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
          </div>
        )}

        {/* Search and Filters */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl"></div>
          <div className="relative bg-white/80 rounded-2xl p-6 border border-black/20 backdrop-blur-sm">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Search & Filter Inquiries
                </h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 mt-4 sm:mt-0">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
                    />
                  </svg>
                  Filters
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      showFilters ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {/* Search Bar */}
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
                  placeholder="Search contacts by name, email, company, subject, or message..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, search: e.target.value }))
                  }
                  className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/80 focus:bg-white"
                />
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-gray-50/50 border border-gray-200/50">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }))
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white">
                      <option value="">All Statuses</option>
                      <option value="new">New</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      value={filters.type}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          type: e.target.value,
                        }))
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white">
                      <option value="">All Types</option>
                      {uniqueTypes.map((type) => (
                        <option key={type} value={type}>
                          {formatContactType(type)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sort By
                    </label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          sortBy: e.target.value as any,
                        }))
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white">
                      <option value="createdAt">Date Created</option>
                      <option value="name">Name</option>
                      <option value="email">Email</option>
                      <option value="status">Status</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order
                    </label>
                    <select
                      value={filters.sortOrder}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          sortOrder: e.target.value as any,
                        }))
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white">
                      <option value="desc">Newest First</option>
                      <option value="asc">Oldest First</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contacts Display */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-500/5 to-gray-500/5 rounded-2xl"></div>
          <div className="relative bg-white/80 rounded-2xl border border-black/20 backdrop-blur-sm overflow-hidden">
            {filteredContacts.length === 0 ? (
              <div className="text-center py-16">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No contacts found
                </h3>
                <p className="text-gray-500">
                  {filters.search || filters.status || filters.type
                    ? 'Try adjusting your search or filters'
                    : 'Contact submissions will appear here'}
                </p>
              </div>
            ) : viewMode === 'table' ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Contact Info
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Subject & Message
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/50 backdrop-blur-sm divide-y divide-gray-100/50">
                    {filteredContacts.map((contact: Contact, index) => (
                      <tr
                        key={contact._id}
                        className={`hover:bg-blue-50/50 transition-all duration-200 ${
                          index % 2 === 0 ? 'bg-white/30' : 'bg-gray-50/30'
                        }`}>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="font-medium text-gray-900">
                              {contact.name || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-600">
                              {contact.email || 'N/A'}
                            </div>
                            {contact.company && (
                              <div className="text-sm text-gray-500">
                                {contact.company}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-xs space-y-1">
                            <div className="font-medium text-gray-900 truncate">
                              {contact.subject || 'No Subject'}
                            </div>
                            <div
                              className="text-sm text-gray-600"
                              title={contact.message || ''}>
                              {truncateText(contact.message, 80)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={getTypeBadge(contact.type)}>
                            {formatContactType(contact.type || 'unknown')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="mt-1">
                            <span className={getStatusBadge(contact.status)}>
                              {formatContactStatus(contact.status || 'new')}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatDate(contact.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContacts.map((contact: Contact) => (
                  <div
                    key={contact._id}
                    className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 transition-all duration-300 hover:shadow-xl hover:scale-105">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {contact.name || 'N/A'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {contact.email || 'N/A'}
                        </p>
                        {contact.company && (
                          <p className="text-sm text-gray-500">
                            {contact.company}
                          </p>
                        )}
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          {contact.subject || 'No Subject'}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {contact.message || 'No message provided'}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={getTypeBadge(contact.type)}>
                          {formatContactType(contact.type || 'unknown')}
                        </span>
                        <div className="flex flex-col items-end gap-1">
                          <span className={getStatusBadge(contact.status)}>
                            {formatContactStatus(contact.status || 'new')}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <span className="text-xs text-gray-500">
                          {formatDate(contact.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Pagination */}
        {state.pagination && state.pagination.totalPages > 1 && (
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl"></div>
            <div className="relative bg-white/80 rounded-2xl p-6 border border-white/20 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-700">Items per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white">
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105">
                    Previous
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from(
                      { length: Math.min(5, state.pagination.totalPages) },
                      (_, i) => {
                        let page;
                        if (state.pagination!.totalPages <= 5) {
                          page = i + 1;
                        } else if (currentPage <= 3) {
                          page = i + 1;
                        } else if (
                          currentPage >=
                          state.pagination!.totalPages - 2
                        ) {
                          page = state.pagination!.totalPages - 4 + i;
                        } else {
                          page = currentPage - 2 + i;
                        }

                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 border rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 ${
                              page === currentPage
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
                    onClick={() =>
                      setCurrentPage(
                        Math.min(state.pagination!.totalPages, currentPage + 1)
                      )
                    }
                    disabled={currentPage === state.pagination.totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105">
                    Next
                  </button>
                </div>

                <div className="text-sm text-gray-600">
                  Showing{' '}
                  <span className="font-bold text-gray-900">
                    {(currentPage - 1) * itemsPerPage + 1}
                  </span>{' '}
                  to{' '}
                  <span className="font-bold text-gray-900">
                    {Math.min(
                      currentPage * itemsPerPage,
                      state.pagination.total
                    )}
                  </span>{' '}
                  of{' '}
                  <span className="font-bold text-gray-900">
                    {state.pagination.total.toLocaleString()}
                  </span>{' '}
                  contacts
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiryPage;
