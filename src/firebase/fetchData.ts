import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get token from local storage
const getToken = () => {
  return localStorage.getItem('token');
};

// Configure axios with token
const getAxiosConfig = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
};

// Get followers for a user
export const getFollowers = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}/followers`, getAxiosConfig());
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching followers:', error);
    return [];
  }
};

// Get following for a user
export const getFollowing = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}/following`, getAxiosConfig());
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching following:', error);
    return [];
  }
};

// Get user profile
export const getUserProfile = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`, getAxiosConfig());
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};