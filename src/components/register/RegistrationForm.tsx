import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
    workStatus: "" as "experienced" | "fresher",
    agreeToTerms: false,
    receiveUpdates: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleWorkStatusChange = (status: "experienced" | "fresher") => {
    setFormData((prev) => ({
      ...prev,
      workStatus: status,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await register(
        formData.fullName,
        formData.email,
        formData.password,
        formData.mobile,
        formData.workStatus,
        formData.receiveUpdates
      );
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-naukri-bg min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Left side - Benefits */}
            <div className="md:w-1/3 bg-blue-50 p-6">
              <div className="mb-8">
                <img
                  src="https://ext.same-assets.com/2976187256/192203162.png"
                  alt="Registration"
                  className="mx-auto w-32"
                />
              </div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                On registering, you can
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 bg-green-500 rounded-full flex items-center justify-center mr-2 mt-0.5">
                    <svg
                      className="h-3 w-3 text-white"
                      viewBox="0 0 12 12"
                      fill="currentColor"
                    >
                      <path d="M3.707 5.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L5 6.586 3.707 5.293z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">
                    Build your profile and let recruiters find you
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 bg-green-500 rounded-full flex items-center justify-center mr-2 mt-0.5">
                    <svg
                      className="h-3 w-3 text-white"
                      viewBox="0 0 12 12"
                      fill="currentColor"
                    >
                      <path d="M3.707 5.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L5 6.586 3.707 5.293z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">
                    Get job postings delivered right to your email
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 bg-green-500 rounded-full flex items-center justify-center mr-2 mt-0.5">
                    <svg
                      className="h-3 w-3 text-white"
                      viewBox="0 0 12 12"
                      fill="currentColor"
                    >
                      <path d="M3.707 5.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L5 6.586 3.707 5.293z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">
                    Find a job and grow your career
                  </p>
                </li>
              </ul>
            </div>

            {/* Right side - Form */}
            <div className="md:w-2/3 p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                  Create your Naukri profile
                </h1>
                <p className="text-gray-600">
                  Search & apply to jobs from India's No.1 Job Site
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="What is your name?"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email ID<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Tell us your Email ID"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      disabled={isLoading}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      We'll send relevant jobs and updates to this email
                    </p>
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="(Minimum 6 characters)"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      minLength={6}
                      required
                      disabled={isLoading}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This helps your account stay protected
                    </p>
                  </div>

                  {/* Mobile */}
                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Mobile number<span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <div className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                        <span className="text-gray-500">+91</span>
                      </div>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Enter your mobile number"
                        className="flex-1 p-3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Recruiters will contact you on this number
                    </p>
                  </div>

                  {/* Work Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Work status<span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        className={`border rounded-md p-4 cursor-pointer hover:border-blue-500 transition ${formData.workStatus === "experienced" ? "border-blue-500 bg-blue-50" : "border-gray-300"} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() =>
                          !isLoading && handleWorkStatusChange("experienced")
                        }
                      >
                        <div className="flex items-start">
                          <div className="mr-3">
                            <img
                              src="https://ext.same-assets.com/2976187256/768276206.svg"
                              alt=""
                              className="w-9"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">
                              I'm experienced
                            </h3>
                            <p className="text-sm text-gray-600">
                              I have work experience (excluding internships)
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`border rounded-md p-4 cursor-pointer hover:border-blue-500 transition ${formData.workStatus === "fresher" ? "border-blue-500 bg-blue-50" : "border-gray-300"} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() =>
                          !isLoading && handleWorkStatusChange("fresher")
                        }
                      >
                        <div className="flex items-start">
                          <div className="mr-3">
                            <img
                              src="https://ext.same-assets.com/2976187256/212652476.svg"
                              alt=""
                              className="w-9"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">
                              I'm a fresher
                            </h3>
                            <p className="text-sm text-gray-600">
                              I am a student/ Haven't worked after graduation
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Updates Consent */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="receiveUpdates"
                      name="receiveUpdates"
                      checked={formData.receiveUpdates}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      disabled={isLoading}
                    />
                    <label
                      htmlFor="receiveUpdates"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Send me important updates & promotions via SMS, email, and
                      WhatsApp
                    </label>
                  </div>

                  {/* Terms and Conditions */}
                  <div>
                    <p className="text-sm text-gray-600">
                      By clicking Register, you agree to the
                      <Link
                        to="/terms-conditions"
                        className="text-blue-600 hover:underline"
                      >
                        {" "}
                        Terms and Conditions{" "}
                      </Link>
                      &
                      <Link
                        to="/privacy-policy"
                        className="text-blue-600 hover:underline"
                      >
                        {" "}
                        Privacy Policy{" "}
                      </Link>
                      of Naukri.com
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                        formData.fullName &&
                        formData.email &&
                        formData.password &&
                        formData.mobile &&
                        formData.workStatus &&
                        !isLoading
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-blue-300 cursor-not-allowed"
                      }`}
                      disabled={
                        !(
                          formData.fullName &&
                          formData.email &&
                          formData.password &&
                          formData.mobile &&
                          formData.workStatus
                        ) || isLoading
                      }
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Registering...
                        </span>
                      ) : (
                        "Register now"
                      )}
                    </button>
                  </div>

                  {/* Google Sign-up */}
                  <div className="relative mt-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    {/* <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or</span>
                    </div> */}
                  </div>

                  <div className="mt-6">
                    {/* <button
                      type="button"
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                      disabled={isLoading}
                    >
                      <FaGoogle className="h-5 w-5 text-red-500 mr-2" />
                      Continue with Google
                    </button> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
