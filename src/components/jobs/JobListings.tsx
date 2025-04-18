import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import axios from "axios";

interface Job {
  _id: string;
  title: string;
  company: string;
  experience: string;
  salary: string;
  location: string;
  skills: string[];
  postedDate: string;
  workMode: string;
  department: string;
}

const JobListings: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    workMode: [] as string[],
    department: [] as string[],
    salary: [] as string[],
  });
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());

  const handleApply = async (jobId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to apply for jobs");
        return;
      }

      const response = await axios.post(
        `https://naukri-x8b5.onrender.com/api/jobs/${jobId}/apply`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setAppliedJobs((prev) => new Set([...prev, jobId]));
        setError(null);
      }
    } catch (err: any) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(
          err.response.data.message ||
            "Failed to apply for the job. Please try again."
        );
      } else if (err.request) {
        // The request was made but no response was received
        setError("No response from server. Please check your connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("An error occurred. Please try again.");
      }
      console.error("Apply error:", err);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();

        // Add search parameters
        const keyword = searchParams.get("keyword");
        const experience = searchParams.get("experience");
        const location = searchParams.get("location");
        const company = searchParams.get("company");

        if (keyword) params.append("keyword", keyword);
        if (experience) params.append("experience", experience);
        if (location) params.append("location", location);
        if (company) params.append("company", company);

        // Add filter parameters
        if (filters.workMode.length > 0) {
          params.append("workMode", filters.workMode.join(","));
        }
        if (filters.department.length > 0) {
          params.append("department", filters.department.join(","));
        }
        if (filters.salary.length > 0) {
          params.append("salary", filters.salary.join(","));
        }

        const response = await axios.get(
          `https://naukri-x8b5.onrender.com/api/jobs?${params.toString()}`
        );
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch jobs");
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchParams, filters]); // Add filters to dependency array

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      const currentValues = prev[filterType as keyof typeof prev];

      if (currentValues.includes(value)) {
        newFilters[filterType as keyof typeof prev] = currentValues.filter(
          (v) => v !== value
        );
      } else {
        newFilters[filterType as keyof typeof prev] = [...currentValues, value];
      }

      return newFilters;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading jobs...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Filters Section */}
          <div className="w-1/4 bg-white rounded-lg shadow p-4">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">All Filters</h2>
              <div className="text-blue-600">
                Applied ({Object.values(filters).flat().length})
              </div>
            </div>

            {/* Work Mode Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Work mode</h3>
              <div className="space-y-2">
                {["Work from office", "Remote", "Hybrid"].map((mode) => (
                  <label key={mode} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={filters.workMode.includes(mode)}
                      onChange={() => handleFilterChange("workMode", mode)}
                    />
                    <span>{mode}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Department Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Department</h3>
              <div className="space-y-2">
                {[
                  "Engineering - Software",
                  "Data Science & Analytics",
                  "Human Resources",
                  "Marketing",
                  "Sales",
                  "Finance",
                  "Operations",
                  "Design",
                  "Content",
                  "Customer Success",
                  "Business Analysis",
                  "Product",
                  "Legal",
                  "IT",
                  "Research",
                ].map((dept) => (
                  <label key={dept} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={filters.department.includes(dept)}
                      onChange={() => handleFilterChange("department", dept)}
                    />
                    <span>{dept}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Salary Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Salary</h3>
              <div className="space-y-2">
                {[
                  "0-3 Lakhs",
                  "3-6 Lakhs",
                  "6-10 Lakhs",
                  "10-15 Lakhs",
                  "15-20 Lakhs",
                  "20-30 Lakhs",
                  "30+ Lakhs",
                ].map((range) => (
                  <label key={range} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={filters.salary.includes(range)}
                      onChange={() => handleFilterChange("salary", range)}
                    />
                    <span>{range}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Job Listings Section */}
          <div className="w-3/4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-sm text-gray-600">
                  {jobs.length} Jobs found
                </span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">Sort by:</span>
                <select className="border rounded p-1">
                  <option>Relevance</option>
                  <option>Date Posted</option>
                  <option>Salary</option>
                </select>
              </div>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-white rounded-lg shadow p-6 relative"
                  >
                    <button className="absolute top-4 right-4 text-gray-400 hover:text-blue-600">
                      <FaRegBookmark size={20} />
                    </button>

                    <h2 className="text-xl font-medium text-blue-600 mb-2">
                      {job.title}
                    </h2>
                    <h3 className="text-lg mb-3">{job.company}</h3>

                    <div className="flex items-center gap-6 text-gray-600 mb-4">
                      <div className="flex items-center">
                        <span className="mr-2">🧑‍💼</span>
                        <span>{job.experience}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">💰</span>
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">📍</span>
                        <span>{job.location}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{job.postedDate}</span>
                      <div className="flex items-center gap-4">
                        <button className="text-blue-600 hover:underline">
                          Save
                        </button>
                        <button
                          onClick={() => handleApply(job._id)}
                          className={`${
                            appliedJobs.has(job._id)
                              ? "bg-green-600"
                              : "bg-naukri-blue hover:bg-blue-700"
                          } text-white px-6 py-2 rounded transition duration-300`}
                        >
                          {appliedJobs.has(job._id) ? "Applied" : "Apply"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    No jobs found
                  </h3>
                  {searchParams.get("company") ? (
                    <p className="text-gray-600">
                      No jobs found for {searchParams.get("company")}. Please
                      try a different company or clear your filters.
                    </p>
                  ) : (
                    <p className="text-gray-600">
                      No jobs match your search criteria. Please try different
                      filters or search terms.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListings;
