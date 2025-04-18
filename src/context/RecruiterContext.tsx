import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  loginRecruiter,
  registerRecruiter,
  logoutRecruiter,
  getRecruiterProfile,
} from "../services/recruiterService";

interface Recruiter {
  id: string;
  email: string;
  fullName: string;
  companyName: string;
  designation: string;
  isVerified: boolean;
}

interface RecruiterContextType {
  recruiter: Recruiter | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (recruiterData: {
    fullName: string;
    email: string;
    password: string;
    mobile: string;
    companyName: string;
    designation: string;
  }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const RecruiterContext = createContext<RecruiterContextType | undefined>(
  undefined
);

export const RecruiterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [recruiter, setRecruiter] = useState<Recruiter | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("recruiterToken");
      const recruiterData = localStorage.getItem("recruiterData");

      if (token && recruiterData) {
        try {
          const profile = await getRecruiterProfile();
          setRecruiter(profile);
        } catch (err) {
          console.error("Failed to fetch recruiter profile:", err);
          localStorage.removeItem("recruiterToken");
          localStorage.removeItem("recruiterData");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await loginRecruiter({ email, password });
      setRecruiter(data.recruiter);
    } catch (err: any) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (recruiterData: {
    fullName: string;
    email: string;
    password: string;
    mobile: string;
    companyName: string;
    designation: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await registerRecruiter(recruiterData);
      setRecruiter(data.recruiter);
    } catch (err: any) {
      setError(err.message || "Registration failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutRecruiter();
    setRecruiter(null);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <RecruiterContext.Provider
      value={{
        recruiter,
        isAuthenticated: !!recruiter,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </RecruiterContext.Provider>
  );
};

export const useRecruiter = () => {
  const context = useContext(RecruiterContext);
  if (context === undefined) {
    throw new Error("useRecruiter must be used within a RecruiterProvider");
  }
  return context;
};
