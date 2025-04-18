import { useState } from "react";
import Navbar from "../components/BuyOnline/Navbar";
import Hero from "../components/BuyOnline/Hero";
import Features from "../components/BuyOnline/Features";
import DiscoverWays from "../components/BuyOnline/DiscoverWays";
import ResdexSection from "../components/BuyOnline/ResdexSection";
import ContactHelp from "../components/BuyOnline/ContactHelp";
import TrustedCompanies from "../components/BuyOnline/TrustedCompanies";
import FAQ from "../components/BuyOnline/FAQ";
import Footer from "../components/BuyOnline/Footer";
import {
  FaCheckCircle,
  FaSearch,
  FaUserFriends,
  FaChartLine,
} from "react-icons/fa";

const ResumeDatabase = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* <Navbar /> */}
      <main className="flex-1">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-50 opacity-50"></div>
          <Hero />
        </div>

        <div className="relative -mt-8 z-10">
          <Features />
        </div>

        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Why Choose Our Resume Database?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
                  <FaSearch className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-blue-600 text-4xl font-bold mb-4 text-center">
                  1M+
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">
                  Active Resumes
                </h3>
                <p className="text-gray-600 text-center">
                  Access to a vast pool of qualified candidates actively looking
                  for opportunities
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6 mx-auto">
                  <FaUserFriends className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="text-indigo-600 text-4xl font-bold mb-4 text-center">
                  50K+
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">
                  Companies
                </h3>
                <p className="text-gray-600 text-center">
                  Trusted by leading companies across industries for their
                  hiring needs
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto">
                  <FaChartLine className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-green-600 text-4xl font-bold mb-4 text-center">
                  24/7
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">
                  Access
                </h3>
                <p className="text-gray-600 text-center">
                  Search and contact candidates anytime, anywhere with our
                  easy-to-use platform
                </p>
              </div>
            </div>
          </div>
        </div>

        <DiscoverWays />
        <ResdexSection />

        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-3">Choose a Plan</h3>
                <p className="text-gray-600">
                  Select the package that best fits your hiring needs
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-3">Search Resumes</h3>
                <p className="text-gray-600">
                  Use advanced filters to find the perfect candidates
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-3">
                  Contact Candidates
                </h3>
                <p className="text-gray-600">
                  Reach out to potential candidates directly
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h3 className="text-lg font-semibold mb-3">Hire Talent</h3>
                <p className="text-gray-600">
                  Complete your hiring process successfully
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Key Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <FaCheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Advanced Search Filters
                  </h3>
                  <p className="text-gray-600">
                    Find candidates by skills, experience, location, and more
                    with our powerful search tools
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <FaCheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Direct Communication
                  </h3>
                  <p className="text-gray-600">
                    Connect with candidates directly through our platform
                    without intermediaries
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <FaCheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Resume Download
                  </h3>
                  <p className="text-gray-600">
                    Download candidate resumes in multiple formats for easy
                    sharing with your team
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <FaCheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Candidate Tracking
                  </h3>
                  <p className="text-gray-600">
                    Keep track of all candidates you've contacted and manage
                    your hiring pipeline
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ContactHelp />
        <TrustedCompanies />
        <FAQ />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default ResumeDatabase;
