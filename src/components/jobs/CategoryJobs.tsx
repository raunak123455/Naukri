import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaRupeeSign,
  FaClock,
} from "react-icons/fa";

interface Job {
  _id: string;
  title: string;
  company: string;
  experience: string;
  salary: string;
  location: string;
  skills: string[];
  description: string;
  workMode: string;
  department: string;
  postedDate: string;
  reviews?: number;
  rating?: number;
}

interface Filters {
  workMode: string[];
  experience: string;
  department: string[];
  location: string[];
  salary: string[];
}

const CategoryJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState<Filters>({
    workMode: [],
    experience: "",
    department: [],
    location: [],
    salary: [],
  });
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const { category } = useParams();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://naukri-x8b5.onrender.com/api/trending-jobs/category/${category}`
        );
        setJobs(response.data);
        setFilteredJobs(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch jobs");
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [category]);

  // Function to parse salary range and return the minimum value
  const getSalaryMinValue = (salary: string) => {
    const match = salary.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  // Function to parse experience range and return the minimum value
  const getExperienceMinValue = (experience: string) => {
    const match = experience.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  // Apply filters to jobs
  useEffect(() => {
    let result = [...jobs];

    // Filter by work mode
    if (filters.workMode.length > 0) {
      result = result.filter((job) => filters.workMode.includes(job.workMode));
    }

    // Filter by location
    if (filters.location.length > 0) {
      result = result.filter((job) => filters.location.includes(job.location));
    }

    // Filter by department
    if (filters.department.length > 0) {
      result = result.filter((job) =>
        filters.department.includes(job.department)
      );
    }

    // Filter by experience
    if (filters.experience) {
      const minExperience = parseInt(filters.experience);
      result = result.filter((job) => {
        const jobMinExperience = getExperienceMinValue(job.experience);
        return jobMinExperience >= minExperience;
      });
    }

    // Filter by salary
    if (filters.salary.length > 0) {
      result = result.filter((job) => {
        const jobMinSalary = getSalaryMinValue(job.salary);
        return filters.salary.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return jobMinSalary >= min && (!max || jobMinSalary <= max);
        });
      });
    }

    setFilteredJobs(result);
  }, [filters, jobs]);

  const handleFilterChange = (type: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: Array.isArray(prev[type])
        ? (prev[type] as string[]).includes(value)
          ? (prev[type] as string[]).filter((item) => item !== value)
          : [...(prev[type] as string[]), value]
        : value,
    }));
  };

  // Get counts for each filter option
  const getFilterCounts = (filterType: string, value: string) => {
    return jobs.filter((job) => {
      switch (filterType) {
        case "workMode":
          return job.workMode === value;
        case "location":
          return job.location === value;
        case "department":
          return job.department === value;
        case "salary":
          const jobMinSalary = getSalaryMinValue(job.salary);
          const [min, max] = value.split("-").map(Number);
          return jobMinSalary >= min && (!max || jobMinSalary <= max);
        default:
          return false;
      }
    }).length;
  };

  const handleApply = async (jobId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to apply for jobs");
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/api/trending-jobs/${jobId}/apply`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setAppliedJobs((prev) => new Set([...prev, jobId]));
        setError("");
      }
    } catch (err: any) {
      if (err.response) {
        setError(
          err.response.data.message ||
            "Failed to apply for the job. Please try again."
        );
      } else if (err.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error("Apply error:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-naukri-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  const getCategoryTitle = (categorySlug: string) => {
    const titles: { [key: string]: string } = {
      "remote-jobs": "Remote Jobs",
      "mnc-jobs": "MNC Jobs",
      "it-jobs": "Software & IT Jobs",
      "fresher-jobs": "Fresher Jobs",
      "marketing-jobs": "Marketing Jobs",
      "hr-jobs": "HR Jobs",
    };
    return titles[categorySlug] || "Jobs";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Section */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold text-lg mb-4">All Filters</h2>

              {/* Work Mode Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Work mode</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.workMode.includes("Work from office")}
                      onChange={() =>
                        handleFilterChange("workMode", "Work from office")
                      }
                      className="rounded border-gray-300"
                    />
                    <span>
                      Work from office (
                      {getFilterCounts("workMode", "Work from office")})
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.workMode.includes("Remote")}
                      onChange={() => handleFilterChange("workMode", "Remote")}
                      className="rounded border-gray-300"
                    />
                    <span>
                      Remote ({getFilterCounts("workMode", "Remote")})
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.workMode.includes("Hybrid")}
                      onChange={() => handleFilterChange("workMode", "Hybrid")}
                      className="rounded border-gray-300"
                    />
                    <span>
                      Hybrid ({getFilterCounts("workMode", "Hybrid")})
                    </span>
                  </label>
                </div>
              </div>

              {/* Experience Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Experience</h3>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={filters.experience || "0"}
                    onChange={(e) =>
                      handleFilterChange("experience", e.target.value)
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>0 Yrs</span>
                    <span>Any</span>
                  </div>
                </div>
              </div>

              {/* Department Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Department</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.department.includes("Engineering")}
                      onChange={() =>
                        handleFilterChange("department", "Engineering")
                      }
                      className="rounded border-gray-300"
                    />
                    <span>
                      Engineering (
                      {getFilterCounts("department", "Engineering")})
                    </span>
                  </label>
                  {/* Add more department options */}
                </div>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Location</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.location.includes("Delhi/NCR")}
                      onChange={() =>
                        handleFilterChange("location", "Delhi/NCR")
                      }
                      className="rounded border-gray-300"
                    />
                    <span>
                      Delhi/NCR ({getFilterCounts("location", "Delhi/NCR")})
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.location.includes("Bangalore")}
                      onChange={() =>
                        handleFilterChange("location", "Bangalore")
                      }
                      className="rounded border-gray-300"
                    />
                    <span>
                      Bangalore ({getFilterCounts("location", "Bangalore")})
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.location.includes("Mumbai")}
                      onChange={() => handleFilterChange("location", "Mumbai")}
                      className="rounded border-gray-300"
                    />
                    <span>
                      Mumbai ({getFilterCounts("location", "Mumbai")})
                    </span>
                  </label>
                  {/* Add more location options */}
                </div>
              </div>

              {/* Salary Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Salary</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.salary.includes("0-3")}
                      onChange={() => handleFilterChange("salary", "0-3")}
                      className="rounded border-gray-300"
                    />
                    <span>0-3 Lakhs ({getFilterCounts("salary", "0-3")})</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.salary.includes("3-6")}
                      onChange={() => handleFilterChange("salary", "3-6")}
                      className="rounded border-gray-300"
                    />
                    <span>3-6 Lakhs ({getFilterCounts("salary", "3-6")})</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.salary.includes("6-10")}
                      onChange={() => handleFilterChange("salary", "6-10")}
                      className="rounded border-gray-300"
                    />
                    <span>
                      6-10 Lakhs ({getFilterCounts("salary", "6-10")})
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.salary.includes("10-15")}
                      onChange={() => handleFilterChange("salary", "10-15")}
                      className="rounded border-gray-300"
                    />
                    <span>
                      10-15 Lakhs ({getFilterCounts("salary", "10-15")})
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.salary.includes("15-25")}
                      onChange={() => handleFilterChange("salary", "15-25")}
                      className="rounded border-gray-300"
                    />
                    <span>
                      15-25 Lakhs ({getFilterCounts("salary", "15-25")})
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.salary.includes("25-50")}
                      onChange={() => handleFilterChange("salary", "25-50")}
                      className="rounded border-gray-300"
                    />
                    <span>
                      25-50 Lakhs ({getFilterCounts("salary", "25-50")})
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.salary.includes("50-100")}
                      onChange={() => handleFilterChange("salary", "50-100")}
                      className="rounded border-gray-300"
                    />
                    <span>
                      50-100 Lakhs ({getFilterCounts("salary", "50-100")})
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.salary.includes("100-")}
                      onChange={() => handleFilterChange("salary", "100-")}
                      className="rounded border-gray-300"
                    />
                    <span>
                      More than 1 Crore ({getFilterCounts("salary", "100-")})
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Jobs List Section */}
          <div className="flex-1">
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        {job.title}
                      </h2>
                      <h3 className="text-lg text-gray-700 mb-2 flex items-center gap-2">
                        {job.company}
                        {job.rating && (
                          <span className="text-sm bg-green-50 text-green-600 px-2 py-0.5 rounded">
                            ★ {job.rating}
                          </span>
                        )}
                        {job.reviews && (
                          <span className="text-sm text-gray-500">
                            ({job.reviews} Reviews)
                          </span>
                        )}
                      </h3>
                    </div>
                    <button className="text-naukri-blue hover:text-blue-700">
                      Save
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaBriefcase className="text-gray-400" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaRupeeSign className="text-gray-400" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-gray-400" />
                      <span>{job.workMode}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {job.description}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Posted {job.postedDate}
                    </span>
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
              ))}
            </div>
            {filteredJobs.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                No jobs found matching your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryJobs;
