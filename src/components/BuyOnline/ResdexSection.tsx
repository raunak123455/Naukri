import React from 'react';

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-start">
    <div className="mr-2 mt-1 flex-shrink-0 rounded-full bg-green-500 p-1">
      <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span className="text-sm">{text}</span>
  </div>
);

const ResdexSection = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="rounded-lg bg-gray-50 p-6 md:p-8">
          <div className="mb-6 text-center">
            <p className="text-sm font-medium uppercase text-blue-600">RESDEX</p>
            <h2 className="text-2xl font-bold">Search India's largest resume database</h2>
            <p className="text-gray-600">by location, industry, skills, and more to find the right fit</p>
          </div>

          <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-medium">Resdex</h3>
              <p className="text-sm text-gray-600">India's largest resume database with advanced search and filters for your hiring needs</p>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-xs font-medium uppercase text-gray-500">KEY FEATURES</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <FeatureItem text="CV views as per plan" />
                <FeatureItem text="Unlimited search results" />
                <FeatureItem text="Advance search filters" />
                <FeatureItem text="CV+ advanced filters" />
                <FeatureItem text="Multiple user access" />
                <FeatureItem text="Email multiple candidates together" />
                <FeatureItem text="Browse relevant searches" />
                <FeatureItem text="Download CVs in bulk" />
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              Database validity as per the plan
            </div>

            <div className="mt-6 text-center">
              <button className="rounded-md border border-blue-600 bg-white px-6 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50">
                Contact sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResdexSection;
