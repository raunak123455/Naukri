import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CompaniesPage from "./pages/CompaniesPage";
import ServicesPage from "./pages/ServicesPage";
import TalentCloudPage from "./pages/TalentCloudPage";
import RecruiterLoginPage from "./pages/RecruiterLogin";
import DashboardPage from "./pages/DashboardPage";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/registration/createAccount" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/companies-hiring-in-india" element={<CompaniesPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/naukri-talent-cloud" element={<TalentCloudPage />} />
      <Route path="/recruit/login" element={<RecruiterLoginPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
