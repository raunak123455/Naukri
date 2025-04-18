import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { RecruiterProvider } from "./context/RecruiterContext";
import AppRoutes from "./routes";

// Layout
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Pages
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CompaniesPage from "./pages/CompaniesPage";
import ServicesPage from "./pages/ServicesPage";
import TalentCloudPage from "./pages/TalentCloudPage";
import JobListings from "./components/jobs/JobListings";
import CategoryJobs from "./components/jobs/CategoryJobs";
import ResumeDatabase from "./pages/ResumeDatabase";
import RecruitLogin from "./pages/RecruiterLogin";
import RecruiterRegistration from "./pages/RecruiterRegistration";
import RecruiterDashboard from "./pages/RecruiterDashboard";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <RecruiterProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/jobs" element={<JobListings />} />
                <Route path="/companies" element={<CompaniesPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/talent-cloud" element={<TalentCloudPage />} />
                <Route path="/recruiter/login" element={<RecruitLogin />} />
                <Route
                  path="/recruiter/register"
                  element={<RecruiterRegistration />}
                />
                <Route
                  path="/recruiter/dashboard"
                  element={<RecruiterDashboard />}
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/:category" element={<CategoryJobs />} />
                <Route path="/resume-database" element={<ResumeDatabase />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </RecruiterProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
