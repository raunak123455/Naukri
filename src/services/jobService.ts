import axios from "axios";

const API_URL = "https://naukri-x8b5.onrender.com/api/jobs";

// Get all jobs
export const getAllJobs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Failed to fetch jobs" };
  }
};

// Get job by ID
export const getJobById = async (jobId: string) => {
  try {
    const response = await axios.get(`${API_URL}/${jobId}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Failed to fetch job" };
  }
};

// Create a new job
export const createJob = async (jobData: any) => {
  try {
    const token = localStorage.getItem("recruiterToken");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.post(API_URL, jobData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Failed to create job" };
  }
};

// Get jobs posted by the current recruiter
export const getRecruiterJobs = async () => {
  try {
    const token = localStorage.getItem("recruiterToken");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.get(`${API_URL}/recruiter/jobs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Failed to fetch recruiter jobs" };
  }
};

// Update a job
export const updateJob = async (jobId: string, jobData: any) => {
  try {
    const token = localStorage.getItem("recruiterToken");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.put(`${API_URL}/${jobId}`, jobData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Failed to update job" };
  }
};

// Delete a job
export const deleteJob = async (jobId: string) => {
  try {
    const token = localStorage.getItem("recruiterToken");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.delete(`${API_URL}/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Failed to delete job" };
  }
};
