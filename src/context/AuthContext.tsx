import React, { createContext, useContext, useState, useEffect } from "react";
import {
  login as loginService,
  register as registerService,
  setAuthToken,
  AuthResponse,
} from "../services/authService";

interface AuthContextType {
  user: AuthResponse["user"] | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullName: string,
    email: string,
    password: string,
    mobile: string,
    workStatus: "experienced" | "fresher",
    receiveUpdates: boolean
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthResponse["user"] | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);

  const clearError = () => setError(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginService({ email, password });
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem("token", response.token);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
      throw error;
    }
  };

  const register = async (
    fullName: string,
    email: string,
    password: string,
    mobile: string,
    workStatus: "experienced" | "fresher",
    receiveUpdates: boolean
  ) => {
    try {
      const response = await registerService({
        fullName,
        email,
        password,
        mobile,
        workStatus,
        receiveUpdates,
      });
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem("token", response.token);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    setAuthToken(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!token,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
