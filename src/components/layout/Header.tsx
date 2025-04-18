import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [showJobsDropdown, setShowJobsDropdown] = useState(false);
  const [showEmployersDropdown, setShowEmployersDropdown] = useState(false);

  // Close all dropdowns when clicking outside
  const handleClickOutside = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".dropdown-container")) {
      setShowJobsDropdown(false);
      setShowEmployersDropdown(false);
    }
  };

  // Toggle jobs dropdown
  const toggleJobsDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowJobsDropdown(!showJobsDropdown);
    // Close other dropdowns
    setShowEmployersDropdown(false);
  };

  // Toggle employers dropdown
  const toggleEmployersDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEmployersDropdown(!showEmployersDropdown);
  };

  return (
    <header className="bg-white shadow-sm" onClick={handleClickOutside}>
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="mr-6">
              <img
                src="https://ext.same-assets.com/4110698769/2521184810.svg"
                alt="Naukri Logo"
                className="h-8"
              />
            </Link>

            <nav className="hidden md:flex space-x-6">
              <div className="relative dropdown-container">
                <button
                  className="font-medium text-gray-700 hover:text-blue-600"
                  onClick={toggleJobsDropdown}
                >
                  Jobs
                </button>

                {showJobsDropdown && (
                  <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-lg rounded-md py-2 z-20">
                    <div className="p-3">
                      <h3 className="text-sm font-semibold mb-2">
                        Popular categories
                      </h3>
                      <Link
                        to="/it-jobs"
                        className="block py-1 text-sm text-gray-700 hover:text-blue-600"
                        onClick={() => setShowJobsDropdown(false)}
                      >
                        IT jobs
                      </Link>
                      <Link
                        to="/sales-jobs"
                        className="block py-1 text-sm text-gray-700 hover:text-blue-600"
                        onClick={() => setShowJobsDropdown(false)}
                      >
                        Sales jobs
                      </Link>
                      <Link
                        to="/marketing-jobs"
                        className="block py-1 text-sm text-gray-700 hover:text-blue-600"
                        onClick={() => setShowJobsDropdown(false)}
                      >
                        Marketing jobs
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/companies"
                className="font-medium text-gray-700 hover:text-blue-600"
              >
                Companies
              </Link>

              <Link
                to="/services"
                className="font-medium text-gray-700 hover:text-blue-600"
              >
                Services
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-blue-600 hover:bg-gray-50"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
            >
              Register
            </Link>
            <div className="relative dropdown-container">
              <button
                className="text-gray-700 hover:text-blue-600"
                onClick={toggleEmployersDropdown}
              >
                For employers
              </button>
              {showEmployersDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-20">
                  <Link
                    to="/resume-database"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowEmployersDropdown(false)}
                  >
                    Buy online
                  </Link>
                  {/* <Link
                    to="/naukri-talent-cloud"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowEmployersDropdown(false)}
                  >
                    Naukri Talent Cloud
                  </Link> */}
                  <Link
                    to="/recruiter/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowEmployersDropdown(false)}
                  >
                    Employer Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
