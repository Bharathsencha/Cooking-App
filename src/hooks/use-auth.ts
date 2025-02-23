import { LoginData, RegisterData } from "@/types/auth";
import { User, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useState, useEffect } from "react";

export interface MutationHandler<T> {
    mutate: (data: T) => Promise<void>;
    isLoading: boolean;
    error: Error | null;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginMutation: MutationHandler<LoginData>;
  registerMutation: MutationHandler<RegisterData>;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState<Error | null>(null);
  const [registerError, setRegisterError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const loginMutation: MutationHandler<LoginData> = { 
    mutate: async (data: LoginData) => {
      console.log("Attempting login..."); // Debugging log
      setLoading(true);
      setLoginError(null);
      try {
        await signInWithEmailAndPassword(auth, data.username, data.password);
      } catch (error) {
      setLoginError(error as Error);
      console.error("Login error:", error); // Log the error for debugging

      } finally {
        setLoading(false);
      }
    },
    isLoading: loading,
    error: loginError,
  };

  const registerMutation: MutationHandler<RegisterData> = { 
  
    mutate: async (data: RegisterData) => {
      console.log("Attempting registration..."); // Debugging log
      setRegisterError(null);
      try {
        await createUserWithEmailAndPassword(auth, data.username, data.password);
      } catch (error) {
      setRegisterError(error as Error);
      console.error("Registration error:", error); // Log the error for debugging

      } finally {
        setLoading(false);
      }
    },
    isLoading: loading,
    error: registerError,
  };

  return {
    user,
    loading,
    loginMutation,
    registerMutation,
  } as AuthContextType;
};
