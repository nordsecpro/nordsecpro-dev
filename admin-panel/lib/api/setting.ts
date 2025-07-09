const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const updateProfile = async (
  email: string,
  firstName: string,
  lastName: string
) => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    // Validate the input data
    if (!email || !firstName || !lastName) {
      throw new Error('All fields are required');
    }

    const response = await fetch(`${API_BASE_URL}/api/admin/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, firstName, lastName }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update profile');
    }
    
    // Refresh the page after a successful update
    window.location.reload();

    return data;
  } catch (error) {
    console.error('Update Profile API Error:', error);
    throw error;
  }
};


export const updatePassword = async (
  currentPassword: string,
  newPassword: string,
) => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    // Validate the input data
    if (!currentPassword || !newPassword) {
      throw new Error('All fields are required');
    }

    const response = await fetch(`${API_BASE_URL}/api/admin/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update password');
    }

    return data;
  } catch (error) {
    console.error('Update Password API Error:', error);
    throw error;
  }
};