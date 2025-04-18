import React from "react";
import { FaUserTie, FaBriefcase, FaIndianRupeeSign } from "react-icons/fa6";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  boldText,
  color,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  boldText?: string;
  color: string;
}) => {
  const renderTitle = () => {
    if (!boldText) return title;

    const parts = title.split(boldText);
    return (
      <>
        {parts[0]}
        <span className="font-bold">{boldText}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center py-8 text-center md:py-10 group hover:bg-gray-50 transition-colors duration-300 rounded-lg">
      <div
        className={`w-16 h-16 rounded-full ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="mb-2 text-lg md:text-xl font-semibold text-gray-800">
        {renderTitle()}
      </h3>
      <p className="text-sm text-gray-600 max-w-xs">{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <div className="bg-white py-6">
      <div className="container mx-auto max-w-5xl rounded-xl bg-white px-4 py-8 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={FaUserTie}
            title="Hire skilled candidates"
            description="Find the perfect talent for your business with our extensive database of qualified professionals"
            color="bg-blue-600"
          />
          <FeatureCard
            icon={FaBriefcase}
            title="Get candidates with relevant"
            description="Connect with candidates who have the exact industry experience you need"
            boldText="industry experience"
            color="bg-indigo-600"
          />
          <FeatureCard
            icon={FaIndianRupeeSign}
            title="Explore budget-friendly"
            description="Access our premium features with plans starting from just ₹400 per month"
            boldText="budget-friendly"
            color="bg-green-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
