import type React from "react";
import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaLaptopCode,
  FaChartLine,
  FaBuilding,
  FaGraduationCap,
  FaUserTie,
} from "react-icons/fa";

interface JobCategoryProps {
  icon: React.ReactNode;
  title: string;
  link: string;
}

const JobCategory: React.FC<JobCategoryProps> = ({ icon, title, link }) => {
  return (
    <Link
      to={link}
      className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition duration-300"
    >
      <div className="h-10 w-10 flex items-center justify-center bg-blue-50 text-naukri-blue rounded-full">
        {icon}
      </div>
      <span className="font-medium text-gray-700">{title}</span>
    </Link>
  );
};

const TrendingJobs: React.FC = () => {
  const categories = [
    {
      icon: <FaBriefcase size={18} />,
      title: "Remote",
      link: "/remote-jobs",
    },
    {
      icon: <FaBuilding size={18} />,
      title: "MNC",
      link: "/mnc-jobs",
    },
    {
      icon: <FaLaptopCode size={18} />,
      title: "Software & IT",
      link: "/it-jobs",
    },
    {
      icon: <FaGraduationCap size={18} />,
      title: "Fresher",
      link: "/fresher-jobs",
    },
    {
      icon: <FaChartLine size={18} />,
      title: "Marketing",
      link: "/marketing-jobs",
    },
    {
      icon: <FaUserTie size={18} />,
      title: "HR",
      link: "/hr-jobs",
    },
  ];

  return (
    <div className="py-10 bg-naukri-bg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <JobCategory
              key={index}
              icon={category.icon}
              title={category.title}
              link={category.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingJobs;
