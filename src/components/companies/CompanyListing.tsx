import type React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaSearch,
  FaFilter,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import axios from "axios";

interface CompanyType {
  _id: string;
  name: string;
  logo: string;
  rating: number;
  reviewCount: number;
  type: string;
  industry: string;
  location: string;
  foundedYear?: number;
  employeeCount?: string;
  activeJobs: number;
}

const CompanyListing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    companyType: [] as string[],
    location: [] as string[],
    industry: [] as string[],
    showFilters: true,
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("https://naukri-x8b5.onrender.com/api/companies");
        setCompanies(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch companies");
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Filter companies based on search term and filters
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCompanyType =
      filters.companyType.length === 0 ||
      filters.companyType.includes(company.type);

    const matchesLocation =
      filters.location.length === 0 ||
      filters.location.includes(company.location);

    const matchesIndustry =
      filters.industry.length === 0 ||
      filters.industry.includes(company.industry);

    return (
      matchesSearch && matchesCompanyType && matchesLocation && matchesIndustry
    );
  });

  const toggleFilter = (
    type: "companyType" | "location" | "industry",
    value: string
  ) => {
    setFilters((prev) => {
      const currentValues = [...prev[type]];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [type]: currentValues.filter((v) => v !== value),
        };
      } else {
        return {
          ...prev,
          [type]: [...currentValues, value],
        };
      }
    });
  };

  const toggleFiltersVisibility = () => {
    setFilters((prev) => ({
      ...prev,
      showFilters: !prev.showFilters,
    }));
  };

  const clearFilters = () => {
    setFilters({
      companyType: [],
      location: [],
      industry: [],
      showFilters: true,
    });
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-naukri-bg py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Top companies hiring now
        </h1>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Link
            to="/mnc-companies-in-india"
            className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-medium text-gray-800">MNCs</h3>
            <p className="text-sm text-gray-500">2.1K+ are actively hiring</p>
          </Link>
          <Link
            to="/product-companies-in-india"
            className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-medium text-gray-800">Product</h3>
            <p className="text-sm text-gray-500">1.1K+ are actively hiring</p>
          </Link>
          <Link
            to="/banking-and-finance-companies-in-india"
            className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-medium text-gray-800">Banking & Finance</h3>
            <p className="text-sm text-gray-500">373 are actively hiring</p>
          </Link>
          <Link
            to="/hospitality-companies-in-india"
            className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-medium text-gray-800">Hospitality</h3>
            <p className="text-sm text-gray-500">88 are actively hiring</p>
          </Link>
          <Link
            to="/fintech-companies-in-india"
            className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-medium text-gray-800">Fintech</h3>
            <p className="text-sm text-gray-500">127 are actively hiring</p>
          </Link>
          <Link
            to="/startup-companies-in-india"
            className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-medium text-gray-800">Startups</h3>
            <p className="text-sm text-gray-500">624 are actively hiring</p>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          <div
            className={`w-full lg:w-1/4 ${!filters.showFilters && "lg:hidden"}`}
          >
            <div className="bg-white rounded-md shadow-sm p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium text-gray-800">All Filters</h2>
                <button
                  onClick={toggleFiltersVisibility}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  <FaChevronDown />
                </button>
              </div>

              <div className="relative mb-4">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search companies"
                  className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-gray-800 flex items-center justify-between mb-2">
                  Company type
                  <FaChevronDown className="text-gray-500" />
                </h3>
                <ul className="space-y-2">
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.companyType.includes("MNC")}
                        onChange={() => toggleFilter("companyType", "MNC")}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">MNC (2)</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.companyType.includes("Indian MNC")}
                        onChange={() =>
                          toggleFilter("companyType", "Indian MNC")
                        }
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">
                        Indian MNC (2)
                      </span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.companyType.includes("Startup")}
                        onChange={() => toggleFilter("companyType", "Startup")}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">Startup (2)</span>
                    </label>
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-gray-800 flex items-center justify-between mb-2">
                  Location
                  <FaChevronDown className="text-gray-500" />
                </h3>
                <ul className="space-y-2">
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.location.includes("Bangalore")}
                        onChange={() => toggleFilter("location", "Bangalore")}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">
                        Bangalore (3)
                      </span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.location.includes("Mumbai")}
                        onChange={() => toggleFilter("location", "Mumbai")}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">Mumbai (1)</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.location.includes("Hyderabad")}
                        onChange={() => toggleFilter("location", "Hyderabad")}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">
                        Hyderabad (1)
                      </span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.location.includes("Gurgaon")}
                        onChange={() => toggleFilter("location", "Gurgaon")}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">Gurgaon (1)</span>
                    </label>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 flex items-center justify-between mb-2">
                  Industry
                  <FaChevronDown className="text-gray-500" />
                </h3>
                <ul className="space-y-2">
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.industry.includes(
                          "IT Services & Consulting"
                        )}
                        onChange={() =>
                          toggleFilter("industry", "IT Services & Consulting")
                        }
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">
                        IT Services & Consulting (2)
                      </span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.industry.includes("Internet")}
                        onChange={() => toggleFilter("industry", "Internet")}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">
                        Internet (2)
                      </span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.industry.includes(
                          "Banking & Financial Services"
                        )}
                        onChange={() =>
                          toggleFilter(
                            "industry",
                            "Banking & Financial Services"
                          )
                        }
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">
                        Banking & Financial Services (1)
                      </span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.industry.includes("Software Product")}
                        onChange={() =>
                          toggleFilter("industry", "Software Product")
                        }
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">
                        Software Product (1)
                      </span>
                    </label>
                  </li>
                </ul>
              </div>

              <button
                onClick={clearFilters}
                className="mt-4 w-full py-2 text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Company Listings */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-md shadow-sm p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-800">
                  Showing {filteredCompanies.length} companies
                </h2>
                <button
                  className="flex items-center gap-2 text-blue-600 lg:hidden"
                  onClick={toggleFiltersVisibility}
                >
                  <FaFilter />
                  <span>Filters</span>
                </button>
              </div>

              <div className="space-y-4">
                {filteredCompanies.map((company) => (
                  <div
                    key={company._id}
                    className="border border-gray-200 rounded-md overflow-hidden hover:shadow-md transition"
                  >
                    <div className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                          <img
                            src={company.logo}
                            alt={`${company.name} logo`}
                            className="h-16 w-16 object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h3 className="text-lg font-medium text-gray-800 mb-1">
                              {company.name}
                            </h3>
                            <div className="flex items-center mb-2 sm:mb-0">
                              <span className="flex items-center">
                                <span className="text-sm font-medium text-gray-700">
                                  {company.rating}
                                </span>
                                <FaStar className="text-yellow-500 ml-1" />
                              </span>
                              <span className="text-sm text-gray-500 ml-2">
                                {company.reviewCount.toLocaleString()} reviews
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                            <div className="text-sm text-gray-600">
                              {company.type}
                            </div>
                            <div className="text-sm text-gray-600">
                              {company.industry}
                            </div>
                            <div className="text-sm text-gray-600">
                              {company.location}
                            </div>
                            <div className="text-sm text-gray-600">
                              {company.foundedYear &&
                                `Founded: ${company.foundedYear}`}
                            </div>
                          </div>
                          <div className="text-sm font-medium text-blue-600">
                            {company.activeJobs} active jobs
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 flex justify-between items-center border-t border-gray-200">
                      <div className="flex items-center text-sm">
                        <span className="text-gray-600">View company</span>
                      </div>
                      <Link
                        to={`/jobs?company=${encodeURIComponent(company.name)}`}
                        className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        View jobs <FaChevronRight size={12} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}

                {filteredCompanies.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-600">
                      No companies found matching your filters.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="mt-2 text-blue-600 hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyListing;
