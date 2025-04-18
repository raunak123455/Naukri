import axios from "axios";

const API_URL = "http://localhost:5000/api/recruiter";

// Register a new recruiter
export const registerRecruiter = async (recruiterData: {
  fullName: string;
  email: string;
  password: string;
  mobile: string;
  companyName: string;
  designation: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/register`, recruiterData);
    if (response.data.token) {
      localStorage.setItem("recruiterToken", response.data.token);
      localStorage.setItem(
        "recruiterData",
        JSON.stringify(response.data.recruiter)
      );
    }
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

// Login a recruiter
export const loginRecruiter = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem("recruiterToken", response.data.token);
      localStorage.setItem(
        "recruiterData",
        JSON.stringify(response.data.recruiter)
      );
    }
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

// Get recruiter profile
export const getRecruiterProfile = async () => {
  try {
    const token = localStorage.getItem("recruiterToken");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

// Update recruiter profile
export const updateRecruiterProfile = async (profileData: {
  fullName?: string;
  mobile?: string;
  companyName?: string;
  designation?: string;
}) => {
  try {
    const token = localStorage.getItem("recruiterToken");
    const response = await axios.put(`${API_URL}/profile`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

// Logout recruiter
export const logoutRecruiter = () => {
  localStorage.removeItem("recruiterToken");
  localStorage.removeItem("recruiterData");
};
