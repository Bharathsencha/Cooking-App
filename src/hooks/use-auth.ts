import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

// Custom hook to handle authentication with error messages
export const useAuthWithErrors = () => {
  const auth = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const clearError = () => setErrorMessage(null);

  const loginWithEmail = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      await auth.loginWithEmail(email, password);
      return true;
    } catch (error) {
      if (typeof error === 'object' && error !== null) {
        const err = error as {
          response?: { data?: { message?: string }, status?: number },
          request?: unknown,
          message?: string
        };

        if (err.response) {
          if (err.response.data?.message === 'You might be new user.. register first.') {
            setErrorMessage('You might be new user.. register first.');
          } else {
            setErrorMessage(err.response.data?.message || 'Invalid email or password');
          }
        } else if (err.request) {
          setErrorMessage('Network error. Please check your connection and try again.');
        } else {
          setErrorMessage(err.message || 'Login failed. Please try again.');
        }
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      await auth.register(email, password);
      return true;
    } catch (error) {
      if (typeof error === 'object' && error !== null) {
        const err = error as {
          response?: { data?: { message?: string }, status?: number },
          request?: unknown,
          message?: string
        };

        if (err.response) {
          if (err.response.status === 409) {
            setErrorMessage('This email is already registered. Please try logging in instead.');
          } else {
            setErrorMessage(err.response.data?.message || 'Registration failed');
          }
        } else if (err.request) {
          setErrorMessage('Network error. Please check your connection and try again.');
        } else {
          setErrorMessage(err.message || 'Registration failed. Please try again.');
        }
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      await auth.loginWithGoogle();
      return true;
    } catch (error) {
      if (typeof error === 'object' && error !== null) {
        const err = error as { message?: string };
        setErrorMessage(err.message || 'Google login failed. Please try again.');
      } else {
        setErrorMessage('Google login failed. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await auth.logout();
      return true;
    } catch (error) {
      if (typeof error === 'object' && error !== null) {
        const err = error as { message?: string };
        setErrorMessage(err.message || 'Logout failed');
      } else {
        setErrorMessage('Logout failed');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user: auth.user,
    loading: isLoading || auth.loading,
    errorMessage,
    clearError,
    loginWithEmail,
    loginWithGoogle,
    register,
    logout
  };
};
