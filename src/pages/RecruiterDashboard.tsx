import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecruiter } from "../context/RecruiterContext";
import { getRecruiterProfile } from "../services/recruiterService";
import { createJob, getRecruiterJobs } from "../services/jobService";
import axios from "axios";

// Toast notification component
const Toast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto close after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 rounded-md p-4 shadow-lg ${
        type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {type === "success" ? (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={onClose}
            className="inline-flex text-white focus:outline-none"
          >
            <span className="sr-only">Close</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const { recruiter, logout, isAuthenticated } = useRecruiter();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    title: "",
    company: "",
    experience: "",
    salary: "",
    location: "",
    skills: "",
    workMode: "Work from office",
    department: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [postedJobs, setPostedJobs] = useState<any[]>([]);
  const [showPostedJobs, setShowPostedJobs] = useState(false);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);

  // Get auth token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem("recruiterToken");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/recruiter/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await getRecruiterProfile();
        setProfile(data);
        // Pre-fill company name from recruiter profile
        setJobFormData((prev) => ({
          ...prev,
          company: data.companyName || "",
        }));
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/recruiter/login");
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setJobFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchPostedJobs = async () => {
    setIsLoadingJobs(true);
    try {
      const jobs = await getRecruiterJobs();
      setPostedJobs(jobs);
      setShowPostedJobs(true);
    } catch (error: any) {
      console.error("Error fetching posted jobs:", error);
      setNotification({
        message:
          error.message ||
          "Failed to fetch your posted jobs. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoadingJobs(false);
    }
  };

  const handleSubmitJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    try {
      // Format skills as array
      const formattedJobData = {
        ...jobFormData,
        skills: jobFormData.skills.split(",").map((skill) => skill.trim()),
        postedDate: new Date().toISOString().split("T")[0],
      };

      const response = await createJob(formattedJobData);

      setFormSuccess("Job posted successfully!");
      // Show notification
      setNotification({
        message: `Job "${jobFormData.title}" has been successfully posted!`,
        type: "success",
      });
      // Reset form
      setJobFormData({
        title: "",
        company: profile?.companyName || "",
        experience: "",
        salary: "",
        location: "",
        skills: "",
        workMode: "Work from office",
        department: "",
      });
      setShowJobForm(false);

      // Refresh the posted jobs list
      fetchPostedJobs();
    } catch (error: any) {
      console.error("Error posting job:", error);
      const errorMessage =
        error.message || "Failed to post job. Please try again.";
      setFormError(errorMessage);
      // Show error notification
      setNotification({
        message: errorMessage,
        type: "error",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="https://ext.same-assets.com/3084481074/3499267156.png"
                alt="Naukri Logo"
                className="h-8"
              />
              <span className="ml-2 text-xl font-medium text-blue-600">
                Recruiter Dashboard
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-6 shadow">
          <h1 className="mb-6 text-2xl font-bold text-gray-800">
            Welcome, {recruiter?.fullName || "Recruiter"}
          </h1>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-700">
                Profile Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{recruiter?.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{recruiter?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-medium">{recruiter?.companyName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Designation</p>
                  <p className="font-medium">{recruiter?.designation}</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-700">
                Quick Actions
              </h2>
              <div className="space-y-4">
                <button
                  onClick={() => setShowJobForm(true)}
                  className="w-full rounded-md bg-blue-600 px-4 py-2 text-center font-medium text-white hover:bg-blue-700"
                >
                  Post a New Job
                </button>
                <button
                  onClick={fetchPostedJobs}
                  className="w-full rounded-md border border-blue-600 bg-white px-4 py-2 text-center font-medium text-blue-600 hover:bg-blue-50"
                >
                  View Posted Jobs
                </button>
{/*                 <button className="w-full rounded-md border border-blue-600 bg-white px-4 py-2 text-center font-medium text-blue-600 hover:bg-blue-50">
                  View Applications
                </button>
                <button className="w-full rounded-md border border-blue-600 bg-white px-4 py-2 text-center font-medium text-blue-600 hover:bg-blue-50">
                  Edit Profile
                </button> */}
              </div>
            </div>
          </div>

          {/* Job Posting Form */}
          {showJobForm && (
            <div className="mt-8 rounded-lg border border-gray-200 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-700">
                  Post a New Job
                </h2>
                <button
                  onClick={() => setShowJobForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {formError && (
                <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
                  {formError}
                </div>
              )}

              {formSuccess && (
                <div className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-700">
                  {formSuccess}
                </div>
              )}

              <form onSubmit={handleSubmitJob} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Job Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={jobFormData.title}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={jobFormData.company}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Experience Required *
                    </label>
                    <input
                      type="text"
                      id="experience"
                      name="experience"
                      value={jobFormData.experience}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 2-5 years"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="salary"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Salary *
                    </label>
                    <input
                      type="text"
                      id="salary"
                      name="salary"
                      value={jobFormData.salary}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., 5-10 LPA"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={jobFormData.location}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Mumbai, Maharashtra"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="workMode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Work Mode *
                    </label>
                    <select
                      id="workMode"
                      name="workMode"
                      value={jobFormData.workMode}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    >
                      <option value="Work from office">Work from office</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="department"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Department *
                    </label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={jobFormData.department}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Engineering, Marketing"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="skills"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Skills Required (comma-separated) *
                    </label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      value={jobFormData.skills}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., JavaScript, React, Node.js"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Post Job
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Posted Jobs Section */}
          {showPostedJobs && (
            <div className="mt-8 rounded-lg border border-gray-200 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-700">
                  Your Posted Jobs
                </h2>
                <button
                  onClick={() => setShowPostedJobs(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {isLoadingJobs ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
                </div>
              ) : postedJobs.length === 0 ? (
                <div className="rounded-md bg-yellow-50 p-4 text-center">
                  <p className="text-yellow-700">
                    You haven't posted any jobs yet.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Job Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Company
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Location
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Posted Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {postedJobs.map((job) => (
                        <tr key={job._id}>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {job.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {job.department}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {job.company}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {job.location}
                            </div>
                            <div className="text-sm text-gray-500">
                              {job.workMode}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {job.postedDate}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RecruiterDashboard;
