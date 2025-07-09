const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Types and Interfaces
export interface Contact {
  _id: string;
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  type: 'security_consultation' | 'general_inquiry' | 'support' | string;
  status: 'new' | 'in_progress' | 'completed' | 'closed' | string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
}

export interface ContactsResponse {
  success: boolean;
  message: string;
  data: {
    contacts: Contact[];
    pagination: Pagination;
  };
}

export interface SingleContactResponse {
  success: boolean;
  message: string;
  data: {
    contact: Contact;
  };
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface ApiError extends Error {
  status?: number;
  code?: string;
}

// Custom Error Class
export class ContactApiError extends Error implements ApiError {
  status?: number;
  code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = 'ContactApiError';
    this.status = status;
    this.code = code;
  }
}

// Helper function to get auth token
const getAuthToken = (): string => {
  if (typeof window === 'undefined') {
    throw new ContactApiError('Cannot access localStorage on server side');
  }

  const token = localStorage.getItem('adminToken');
  if (!token) {
    throw new ContactApiError(
      'No authentication token found. Please login again.',
      401,
      'NO_TOKEN'
    );
  }
  return token;
};

// Helper function to handle API errors
const handleApiError = async (response: Response): Promise<never> => {
  let errorMessage = `Request failed with status ${response.status}`;

  try {
    const errorData = await response.json();
    errorMessage = errorData.message || errorMessage;
  } catch {
    // If JSON parsing fails, use default message
  }

  switch (response.status) {
    case 401:
      if (typeof window !== 'undefined') {
        localStorage.removeItem('adminToken');
      }
      throw new ContactApiError(
        'Authentication failed. Please login again.',
        401,
        'UNAUTHORIZED'
      );
    case 403:
      throw new ContactApiError(
        'Access denied. You do not have permission to access this resource.',
        403,
        'FORBIDDEN'
      );
    case 404:
      throw new ContactApiError('Resource not found.', 404, 'NOT_FOUND');
    case 422:
      throw new ContactApiError(
        errorMessage || 'Validation error.',
        422,
        'VALIDATION_ERROR'
      );
    case 500:
      throw new ContactApiError(
        'Server error. Please try again later.',
        500,
        'SERVER_ERROR'
      );
    default:
      throw new ContactApiError(errorMessage, response.status, 'API_ERROR');
  }
};

// Main API Functions
export const getContacts = async (
  page: number = 1,
  limit: number = 10
): Promise<ContactsResponse> => {
  try {
    const token = getAuthToken();

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(
      `${API_BASE_URL}/api/admin/contacts?${queryParams}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      await handleApiError(response);
    }

    const data: ContactsResponse = await response.json();

    // Validate response structure
    if (
      !data ||
      typeof data !== 'object' ||
      !data.data ||
      !Array.isArray(data.data.contacts)
    ) {
      throw new ContactApiError(
        'Invalid response format received from server.',
        0,
        'INVALID_RESPONSE'
      );
    }

    return data;
  } catch (error) {
    console.error('Contacts Fetching Error:', error);

    if (error instanceof ContactApiError) {
      throw error;
    }

    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ContactApiError(
        'Network error. Please check your internet connection.',
        0,
        'NETWORK_ERROR'
      );
    }

    throw new ContactApiError(
      'An unexpected error occurred while fetching contacts.',
      0,
      'UNKNOWN_ERROR'
    );
  }
};

export const getContactById = async (
  contactId: string
): Promise<SingleContactResponse> => {
  try {
    if (!contactId) {
      throw new ContactApiError(
        'Contact ID is required.',
        400,
        'INVALID_INPUT'
      );
    }

    const token = getAuthToken();

    const response = await fetch(
      `${API_BASE_URL}/api/admin/contacts/${contactId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      await handleApiError(response);
    }

    const data: SingleContactResponse = await response.json();

    if (!data || typeof data !== 'object' || !data.data || !data.data.contact) {
      throw new ContactApiError(
        'Invalid response format received from server.',
        0,
        'INVALID_RESPONSE'
      );
    }

    return data;
  } catch (error) {
    console.error('Contact Fetching Error:', error);

    if (error instanceof ContactApiError) {
      throw error;
    }

    throw new ContactApiError(
      'An unexpected error occurred while fetching the contact.',
      0,
      'UNKNOWN_ERROR'
    );
  }
};

export const updateContactStatus = async (
  contactId: string,
  status: Contact['status']
): Promise<ApiResponse> => {
  try {
    if (!contactId) {
      throw new ContactApiError(
        'Contact ID is required.',
        400,
        'INVALID_INPUT'
      );
    }

    if (!status) {
      throw new ContactApiError('Status is required.', 400, 'INVALID_INPUT');
    }

    const token = getAuthToken();

    const response = await fetch(
      `${API_BASE_URL}/api/admin/contacts/${contactId}/status`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!response.ok) {
      await handleApiError(response);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Contact Status Update Error:', error);

    if (error instanceof ContactApiError) {
      throw error;
    }

    throw new ContactApiError(
      'An unexpected error occurred while updating the contact status.',
      0,
      'UNKNOWN_ERROR'
    );
  }
};

export const deleteContact = async (
  contactId: string
): Promise<ApiResponse> => {
  try {
    if (!contactId) {
      throw new ContactApiError(
        'Contact ID is required.',
        400,
        'INVALID_INPUT'
      );
    }

    const token = getAuthToken();

    const response = await fetch(
      `${API_BASE_URL}/api/admin/contacts/${contactId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      await handleApiError(response);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Contact Deletion Error:', error);

    if (error instanceof ContactApiError) {
      throw error;
    }

    throw new ContactApiError(
      'An unexpected error occurred while deleting the contact.',
      0,
      'UNKNOWN_ERROR'
    );
  }
};

// Utility function to check if error is a ContactApiError
export const isContactApiError = (error: unknown): error is ContactApiError => {
  return error instanceof ContactApiError;
};
