// Types based on your actual API response
export interface MonthlyRevenueData {
  _id: {
    month: number;
    year: number;
  };
  revenue: number;
  count: number;
}

export interface PlanDistribution {
  _id: string; // Plan name
  count: number;
  totalEmployees: number;
  totalRevenue: number;
}

export interface RecentSubscription {
  _id: string;
  customerName: string;
  customerEmail: string;
  planCount: number;
  planTitles: string; // Comma-separated plan names
  totalValue?: number;
  [key: string]: any; // For any additional fields
}

export interface DashboardData {
  activeSubscriptions: number;
  avgOrderValue: number;
  inactiveSubscriptions: number;
  monthlyGrowth: number;
  monthlyRevenue: MonthlyRevenueData[];
  planDistribution: PlanDistribution[];
  popularPlan: string;
  recentSubscriptions: RecentSubscription[];
  totalEmployees: number;
  totalRevenue: number;
  totalSubscriptions: number;
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const getDashboardData = async (): Promise<DashboardResponse> => {
  try {
    const token = localStorage.getItem('adminToken');

    const response = await fetch(`${API_BASE_URL}/api/admin/dashboard`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!data) {
      throw new Error(data.message || 'Failed to fetch dashboard data');
    }

    return data;
  } catch (error) {
    console.error('Dashboard API Error:', error);
    throw error;
  }
};

export const isAuthenticated = (): boolean => {
  try {
    const token = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('adminData');
    return !!(token && adminData);
  } catch (error) {
    return false;
  }
};

export const getStoredAdminData = () => {
  try {
    const adminData = localStorage.getItem('adminData');
    return adminData ? JSON.parse(adminData) : null;
  } catch (error) {
    console.error('Error parsing stored admin data:', error);
    return null;
  }
};
