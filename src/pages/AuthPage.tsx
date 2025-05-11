import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from '../hooks/use-toast';
import { FcGoogle } from 'react-icons/fc';
import { FiMail, FiLock, FiArrowLeft} from 'react-icons/fi';

export default function AuthPage() {
  const navigate = useNavigate();
  const { user, loading, loginWithEmail, loginWithGoogle, register: registerUser, resetPassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  
  // Form state
  const [loginForm, setLoginForm] = useState<{
    username: string;
    password: string;
    errors: { username?: string; password?: string };
  }>({ username: '', password: '', errors: {} });
  const [registerForm, setRegisterForm] = useState<{
      username: string;
      password: string;
      confirmPassword: string;
      errors: { username?: string; password?: string; confirmPassword?: string };
    }>({ 
      username: '', 
      password: '', 
      confirmPassword: '',
      errors: {}
    });
  const [forgotForm, setForgotForm] = useState<{ email: string; errors: { email?: string } }>({ email: '', errors: {} });

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  if (user || loading) return null;

  // Validation functions
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handle input changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
      errors: {
        ...loginForm.errors,
        [name]: ''
      }
    });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
      errors: {
        ...registerForm.errors,
        [name]: ''
      }
    });
  };

  const handleForgotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForgotForm({
      ...forgotForm,
      [name]: value,
      errors: {
        ...forgotForm.errors,
        [name]: ''
      }
    });
  };

  // Form submissions
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    const errors: { username?: string; password?: string } = {};
    if (!loginForm.username) {
      errors.username = 'Email is required';
    } else if (!validateEmail(loginForm.username)) {
      errors.username = 'Invalid email address';
    }
    
    if (!loginForm.password) {
      errors.password = 'Password is required';
    } else if (loginForm.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (Object.keys(errors).length > 0) {
      setLoginForm({ ...loginForm, errors });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const result = await loginWithEmail(loginForm.username, loginForm.password);
      if (result && result.isNewUser) {
        toast({
          title: 'New User',
          description: result.message || 'You might be new user.. register first.',
          variant: 'default',
        });
      } else {
        navigate('/home');
        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in',
        });
      }
    } catch (error) {
      let message = 'Please check your credentials and try again';
      if (typeof error === 'object' && error !== null) {
        if ('code' in error) {
          switch (error.code) {
            case 'auth/user-not-found':
              message = 'User does not exist';
              break;
            case 'auth/wrong-password':
              message = 'Incorrect password';
              break;
            case 'auth/too-many-requests':
              message = 'Too many failed login attempts. Please try again later.';
              break;
            default:
              message = ('message' in error && typeof error.message === 'string') ? error.message : message;
          }
        }
      }
      toast({
        title: 'Login failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    const errors: { username?: string; password?: string; confirmPassword?: string } = {};
    if (!registerForm.username) {
      errors.username = 'Email is required';
    } else if (!validateEmail(registerForm.username)) {
      errors.username = 'Invalid email address';
    }
    
    if (!registerForm.password) {
      errors.password = 'Password is required';
    } else if (registerForm.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (!registerForm.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (registerForm.password !== registerForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(errors).length > 0) {
      setRegisterForm({ ...registerForm, errors });
      return;
    }
    
    setIsSubmitting(true);
    try {
      await registerUser(registerForm.username, registerForm.password);
      navigate('/home');
      toast({
        title: 'Welcome to Foodieshare!',
        description: 'Your account has been created successfully',
      });
    } catch (error) {
      let message = 'Please try again';
      if (typeof error === 'object' && error !== null) {
        if ('code' in error) {
          switch (error.code) {
            case 'auth/email-already-in-use':
              message = 'Email is already registered';
              break;
            case 'auth/invalid-email':
              message = 'Invalid email address';
              break;
            case 'auth/weak-password':
              message = 'Password is too weak';
              break;
            default:
              message = 'An unknown error occurred';
          }
        } else if ('message' in error && typeof error.message === 'string') {
          message = ('message' in error && typeof error.message === 'string') ? error.message : message;
        }
      }
      toast({
        title: 'Registration failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  // Validate form
  const errors: { email?: string } = {};
    if (!forgotForm.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(forgotForm.email)) {
      errors.email = 'Invalid email address';
    }
    
    if (Object.keys(errors).length > 0) {
      setForgotForm({ ...forgotForm, errors });
      return;
    }
    
    setIsSubmitting(true);
    try {
      if (!resetPassword) {
        throw new Error('Reset password function not implemented');
      }
      await resetPassword(forgotForm.email);
      toast({
        title: 'Password reset email sent',
        description: 'Please check your email to reset your password',
      });
      setActiveTab('login');
    } catch (error) {
      let message = 'Please try again';
      if (typeof error === 'object' && error !== null && 'message' in error) {
        message = ('message' in error && typeof error.message === 'string') ? error.message : message;
      }
      toast({
        title: 'Failed to send reset email',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Please try again';
      toast({
        title: 'Google login failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-orange-200 via-amber-100 to-red-100">
      {/* Left side - Form area */}
      <div className="w-full md:w-1/2 p-6 md:p-10 flex items-center justify-center">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl border-0 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-center mb-6">
              <div className="text-orange-500 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                  <path d="M5 8h10v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8z"></path>
                  <path d="M12 8v8"></path>
                  <path d="M8 8h0"></path>
                </svg>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                Foodieshare
              </h1>
            </div>
            
            {activeTab !== 'forgotPassword' ? (
              <div className="mb-6">
                <div className="flex rounded-lg bg-gray-100 p-1">
                  <button
                    onClick={() => setActiveTab('login')}
                    className={`w-1/2 py-2 text-center rounded-md transition-all ${
                      activeTab === 'login'
                        ? 'bg-white text-orange-600 font-medium shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setActiveTab('register')}
                    className={`w-1/2 py-2 text-center rounded-md transition-all ${
                      activeTab === 'register'
                        ? 'bg-white text-orange-600 font-medium shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Register
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center mb-6">
                <button
                  className="p-2 -ml-2 mr-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all"
                  onClick={() => setActiveTab('login')}
                  title="Back to login"
                >
                  <FiArrowLeft className="h-5 w-5" />
                </button>
                <h2 className="text-xl font-bold text-gray-800">Reset Password</h2>
              </div>
            )}
            
            {activeTab === 'login' && (
              <div>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FiMail className="h-5 w-5 text-black-400" />
                      </div>
                      <input
                        id="login-email"
                        type="email"
                        name="username"
                        value={loginForm.username}
                        onChange={handleLoginChange}
                        className={`w-full pl-10 pr-3 py-2 border ${
                          loginForm.errors.username ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-black`}
                        placeholder="name@example.com"
                      />
                    </div>
                    {loginForm.errors.username && (
                      <p className="text-red-500 text-xs mt-1">{loginForm.errors.username}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setActiveTab('forgotPassword')}
                        className="text-xs font-medium text-orange-600 hover:text-orange-800"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FiLock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="login-password"
                        type="password"
                        name="password"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                        className={`w-full pl-10 pr-3 py-2 border ${
                          loginForm.errors.password ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-black`}
                        placeholder="••••••••"
                      />
                    </div>
                    {loginForm.errors.password && (
                      <p className="text-red-500 text-xs mt-1">{loginForm.errors.password}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                  </button>
                </form>
                
                <div className="relative flex py-4 items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-600 text-sm">Or</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                
                <button
                  onClick={handleGoogleLogin}
                  type="button"
                  className="flex items-center justify-center w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-all duration-200"
                  disabled={isSubmitting}
                >
                  <FcGoogle className="h-5 w-5 mr-2" />
                  <span className="font-medium text-gray-700">Continue with Google</span>
                </button>
              </div>
            )}
            
            {activeTab === 'register' && (
              <div>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="register-email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FiMail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="register-email"
                        type="email"
                        name="username"
                        value={registerForm.username}
                        onChange={handleRegisterChange}
                        className={`w-full pl-10 pr-3 py-2 border ${
                          registerForm.errors.username ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-black`}
                        placeholder="name@example.com"
                      />
                    </div>
                    {registerForm.errors.username && (
                      <p className="text-red-500 text-xs mt-1">{registerForm.errors.username}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="register-password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FiLock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="register-password"
                        type="password"
                        name="password"
                        value={registerForm.password}
                        onChange={handleRegisterChange}
                        className={`w-full pl-10 pr-3 py-2 border ${
                          registerForm.errors.password ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-black`}
                        placeholder="••••••••"
                      />
                    </div>
                    {registerForm.errors.password && (
                      <p className="text-red-500 text-xs mt-1">{registerForm.errors.password}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="register-confirm-password" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FiLock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="register-confirm-password"
                        type="password"
                        name="confirmPassword"
                        value={registerForm.confirmPassword}
                        onChange={handleRegisterChange}
                        className={`w-full pl-10 pr-3 py-2 border ${
                          registerForm.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-black`}
                        placeholder="••••••••"
                      />
                    </div>
                    {registerForm.errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">{registerForm.errors.confirmPassword}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating account...' : 'Create Account'}
                  </button>
                </form>
                
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    By registering, you agree to our{' '}
                    <a href="/terms" className="text-orange-600 hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-orange-600 hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'forgotPassword' && (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Enter your email address below and we'll send you a link to reset your password.
                </p>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FiMail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="forgot-email"
                        type="email"
                        name="email"
                        value={forgotForm.email}
                        onChange={handleForgotChange}
                        className={`w-full pl-10 pr-3 py-2 border ${
                          forgotForm.errors.email ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-black`}
                        placeholder="name@example.com"
                      />
                    </div>
                    {forgotForm.errors.email && (
                      <p className="text-red-500 text-xs mt-1">{forgotForm.errors.email}</p>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-3">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className="w-full py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-all duration-200"
                    >
                      Back to Login
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Right side - Promotional area */}
      <div className="hidden md:block w-1/2 p-10 bg-gradient-to-br from-orange-100 to-red-50">
        <div className="h-full flex flex-col items-center justify-center">
          <div className="max-w-lg text-center space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              Share Your <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Culinary Journey</span>
            </h2>
            
            <p className="text-lg text-gray-700">
              Join our community of food lovers. Share recipes, discover new dishes, and connect with 
              fellow cooking enthusiasts from around the world.
            </p>
            
            <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
              <img 
                src="https://images.unsplash.com/photo-1464454709131-ffd692591ee5" 
                alt="Delicious food"
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
                <span className="text-orange-500 font-semibold mr-2">10K+</span>
                <span className="text-gray-700">Recipes</span>
              </div>
              <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
                <span className="text-orange-500 font-semibold mr-2">50K+</span>
                <span className="text-gray-700">Users</span>
              </div>
              <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
                <span className="text-orange-500 font-semibold mr-2">100+</span>
                <span className="text-gray-700">Countries</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}