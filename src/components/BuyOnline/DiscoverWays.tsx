import React from "react";
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaSearch,
  FaDatabase,
  FaUsers,
  FaFilter,
  FaFileAlt,
  FaEnvelope,
} from "react-icons/fa";

const FeatureList = ({
  title,
  items,
  icon,
}: {
  title: string;
  items: string[];
  icon: React.ReactNode;
}) => {
  return (
    <div>
      <div className="flex items-center mb-3">
        <div className="mr-2 text-blue-600">{icon}</div>
        <p className="text-xs uppercase font-medium text-gray-700">{title}</p>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start text-sm">
            <FaCheckCircle className="mr-2 mt-1 h-4 w-4 text-green-500 flex-shrink-0" />
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProductCard = ({
  type,
  title,
  subtitle,
  featureItems,
  featureTitle,
  buttonText,
  icon,
  color,
}: {
  type: string;
  title: string;
  subtitle: string;
  featureItems: string[];
  featureTitle: string;
  buttonText: string;
  icon: React.ReactNode;
  color: string;
}) => {
  return (
    <div
      className={`flex-1 rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 ${color === "blue" ? "bg-blue-50" : "bg-indigo-50"}`}
    >
      <div className="flex items-center mb-4">
        <div
          className={`w-10 h-10 rounded-full ${color === "blue" ? "bg-blue-100" : "bg-indigo-100"} flex items-center justify-center mr-3`}
        >
          {icon}
        </div>
        <div>
          <p className="text-xs uppercase font-medium text-blue-600">{type}</p>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      </div>

      <p className="mb-6 text-sm text-gray-600">{subtitle}</p>

      <FeatureList
        title={featureTitle}
        items={featureItems}
        icon={
          color === "blue" ? (
            <FaSearch className="w-4 h-4" />
          ) : (
            <FaDatabase className="w-4 h-4" />
          )
        }
      />

      <div className="mt-8">
        <Link
          to="#"
          className={`inline-block rounded-lg px-6 py-2.5 text-center text-sm font-medium transition-colors duration-300 ${
            color === "blue"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

const DiscoverWays = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold text-gray-800">
            Discover 2 powerful ways to find your next candidate
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the hiring solution that best fits your recruitment needs
          </p>
        </div>

        <div className="flex flex-col space-y-8 md:flex-row md:space-x-8 md:space-y-0">
          <ProductCard
            type="JOB POSTING"
            title="Post a job and get relevant applies"
            subtitle="Reach the right candidates actively seeking new opportunities"
            featureTitle="KEY FEATURES"
            featureItems={[
              "Attract qualified candidates actively seeking new opportunities",
              "Customize job posting fields to match your requirements",
              "Advanced candidate management tools to streamline hiring",
              "Detailed analytics to track application performance",
              "Email notifications for new applications",
            ]}
            buttonText="View plans"
            icon={<FaUsers className="w-5 h-5 text-blue-600" />}
            color="blue"
          />

          <ProductCard
            type="RESDEX"
            title="Search Naukri's resume database"
            subtitle="Find talent in India's largest resume database"
            featureTitle="KEY FEATURES"
            featureItems={[
              "Discover ideal talent in every city with India's largest resume database",
              "Employment and job-seeking status filters for precise targeting",
              "Advanced resume search with 20+ parameters",
              "Direct messaging to candidates through our platform",
              "Save and organize candidate profiles for later review",
            ]}
            buttonText="View plans"
            icon={<FaDatabase className="w-5 h-5 text-indigo-600" />}
            color="indigo"
          />
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <FaFilter className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Advanced Filters</h3>
                <p className="text-sm text-gray-600">
                  Find candidates with specific skills, experience, and
                  qualifications
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaFileAlt className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Resume Download</h3>
                <p className="text-sm text-gray-600">
                  Download candidate resumes in multiple formats for easy
                  sharing
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <FaEnvelope className="w-4 h-4 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Direct Contact</h3>
                <p className="text-sm text-gray-600">
                  Connect with candidates directly through our secure messaging
                  system
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverWays;
