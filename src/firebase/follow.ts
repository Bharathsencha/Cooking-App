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

// Follow a user
export const followUser = async (followerId: string, followingId: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/follow`,
      { followerId, followingId },
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Error following user:', error);
    throw error;
  }
};

// Unfollow a user
export const unfollowUser = async (followerId: string, followingId: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/unfollow`,
      { followerId, followingId },
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error('Error unfollowing user:', error);
    throw error;
  }
};