const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const getProfile = async () => {
  try {
    const token = localStorage.getItem('adminToken');

    const response = await fetch(`${API_BASE_URL}/api/admin/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch profile data');
    }

    return data;
  } catch (error) {
    console.error('Profile Fetching Error:', error);
    throw error;
  }
};
