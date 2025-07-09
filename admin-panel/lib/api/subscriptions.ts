// lib/api/subscriptions.ts

export interface CustomerDetails {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  address?: string;
  [key: string]: any;
}

export interface Subscription {
  _id: string;
  planTitle: string;
  numberOfEmployees: number;
  price: number;
  status: 'active' | 'pending' | 'inactive' | 'cancelled';
  paymentStatus: 'succeeded' | 'pending' | 'failed';
  confirmationEmailSent: boolean;
  invoiceEmailSent: boolean;
  customerDetails: CustomerDetails;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  startDate?: string;
  endDate?: string;
  billingCycle?: 'monthly' | 'yearly';
}

export interface SubscriptionFilters {
  status?: 'active' | 'pending' | 'inactive' | 'cancelled' | 'all';
  page?: number;
  limit?: number;
  sort?: string; // e.g., '-createdAt', 'price', '-price', 'planTitle'
  search?: string; // Search in customer email, name, company, or plan title
  startDate?: string; // Filter by creation date range
  endDate?: string;
  minPrice?: number; // Filter by price range
  maxPrice?: number;
  planTitle?: string; // Filter by specific plan
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface SubscriptionsResponse {
  success: boolean;
  message: string;
  data: {
    success: boolean;
    data: Subscription[];
    pagination: PaginationMeta;
  };
}

export interface SubscriptionResponse {
  success: boolean;
  message: string;
  data: {
    subscription: Subscription;
  };
}

interface UpdateSubscriptionResponse {
  success: boolean;
  message: string;
  data: {
    subscription: Subscription;
  };
}

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Get authentication headers for API requests
 */
const getAuthHeaders = (): Record<string, string> => {
  try {
    const token = localStorage.getItem('adminToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  } catch (error) {
    console.error('Error getting auth token:', error);
    return {};
  }
};

/**
 * Create headers object for API requests
 */
const createHeaders = (additionalHeaders: Record<string, string> = {}): HeadersInit => {
  const authHeaders = getAuthHeaders();
  return {
    'Content-Type': 'application/json',
    ...authHeaders,
    ...additionalHeaders,
  };
};

/**
 * Build query string from filters
 */
const buildQueryString = (filters: SubscriptionFilters): string => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value.toString());
    }
  });
  
  return params.toString();
};

/**
 * Get all subscriptions with filtering, pagination, and search
 */
export const getAllSubscriptions = async (filters: SubscriptionFilters = {}): Promise<SubscriptionsResponse> => {
  try {
    const queryString = buildQueryString(filters);
    const url = `${API_BASE_URL}/api/admin/subscriptions${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: createHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch subscriptions');
    }

    return data;
  } catch (error) {
    console.error('Subscriptions API Error:', error);
    throw error;
  }
};


export const getSubscriptionStats = async (): Promise<{
  success: boolean;
  data: {
    totalSubscriptions: number;
    activeSubscriptions: number;
    pendingSubscriptions: number;
    cancelledSubscriptions: number;
    totalRevenue: number;
    monthlyRevenue: number;
    averagePrice: number;
    popularPlans: Array<{ planTitle: string; count: number }>;
  };
}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/subscriptions/stats`, {
      method: 'GET',
      headers: createHeaders(),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch subscription statistics');
    }

    return data;
  } catch (error) {
    console.error('Subscription Stats API Error:', error);
    throw error;
  }
};

export const formatSubscription = (subscription: Subscription) => {
  const customerName = subscription.customerDetails?.firstName && subscription.customerDetails?.lastName
    ? `${subscription.customerDetails.firstName} ${subscription.customerDetails.lastName}`
    : subscription.customerDetails?.firstName || 
      subscription.customerDetails?.lastName ||
      subscription.customerDetails?.email || 
      subscription.customerDetails?.company || 
      'Unknown Customer';

  return {
    ...subscription,
    formattedPrice: `$${subscription.price.toLocaleString()}`,
    formattedDate: new Date(subscription.createdAt).toLocaleDateString(),
    customerName,
    statusBadge: {
      active: { color: 'green', label: 'Active' },
      pending: { color: 'yellow', label: 'Pending' },
      inactive: { color: 'gray', label: 'Inactive' },
      cancelled: { color: 'red', label: 'Cancelled' },
    }[subscription.status] || { color: 'gray', label: 'Unknown' },
    paymentStatusBadge: {
      succeeded: { color: 'green', label: 'Paid' },
      pending: { color: 'yellow', label: 'Pending' },
      failed: { color: 'red', label: 'Failed' },
    }[subscription.paymentStatus] || { color: 'gray', label: 'Unknown' },
  };
};

export const validateFilters = (filters: SubscriptionFilters): SubscriptionFilters => {
  const validatedFilters: SubscriptionFilters = {};
  
  // Validate and set page
  if (filters.page && filters.page > 0) {
    validatedFilters.page = filters.page;
  }
  
  // Validate and set limit
  if (filters.limit && filters.limit > 0 && filters.limit <= 100) {
    validatedFilters.limit = filters.limit;
  }
  
  // Validate and set status
  if (filters.status && ['active', 'pending', 'inactive', 'cancelled', 'all'].includes(filters.status)) {
    validatedFilters.status = filters.status;
  }
  
  // Validate and set search
  if (filters.search && filters.search.trim().length > 0) {
    validatedFilters.search = filters.search.trim();
  }
  
  // Validate and set sort
  if (filters.sort) {
    const validSortFields = ['createdAt', '-createdAt', 'price', '-price', 'planTitle', '-planTitle', 'status', '-status'];
    if (validSortFields.includes(filters.sort)) {
      validatedFilters.sort = filters.sort;
    }
  }
  
  // Validate price range
  if (filters.minPrice && filters.minPrice >= 0) {
    validatedFilters.minPrice = filters.minPrice;
  }
  
  if (filters.maxPrice && filters.maxPrice >= 0) {
    validatedFilters.maxPrice = filters.maxPrice;
  }
  
  return validatedFilters;
};

// Helper function to extract subscriptions from the response
export const extractSubscriptions = (response: SubscriptionsResponse): Subscription[] => {
  return response.data.data;
};

// Helper function to extract pagination from the response
export const extractPagination = (response: SubscriptionsResponse): PaginationMeta => {
  return response.data.pagination;
};



/**
 * Handle unauthorized responses
 */
const handleUnauthorized = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminData');
  window.location.href = '/login';
};


/**
 * Delete subscription by ID
 */
export const deleteSubscription = async (subscriptionId: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/subscriptions/${subscriptionId}`, {
      method: 'DELETE',
      headers: createHeaders(),
    });

    const data = await response.json();

    // Handle unauthorized access
    if (response.status === 401) {
      handleUnauthorized();
      throw new Error('Session expired. Please login again.');
    }

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete subscription');
    }

    return data;
  } catch (error) {
    console.error('Delete Subscription API Error:', error);
    throw error;
  }
};



/**
 * Update subscription by ID
 */
export const updateSubscription = async (
  subscriptionId: string, 
  status: string
): Promise<UpdateSubscriptionResponse> => {
  try {
    const metadata = {
        notes: "admin request",
        reason: "Customer request"
    }
    const response = await fetch(`${API_BASE_URL}/api/admin/subscriptions/${subscriptionId}`, {
      method: 'PUT',
      headers: createHeaders(),
      body: JSON.stringify({status, metadata}),
    });

    const data = await response.json();

    // Handle unauthorized access
    if (response.status === 401) {
      handleUnauthorized();
      throw new Error('Session expired. Please login again.');
    }

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update subscription');
    }

    return data;
  } catch (error) {
    console.error('Update Subscription API Error:', error);
    throw error;
  }
};