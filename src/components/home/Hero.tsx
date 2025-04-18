import type React from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();

    if (keyword) searchParams.append("keyword", keyword);

    // Handle experience range
    if (experience) {
      switch (experience) {
        case "0-5":
          searchParams.append("experience", "0-5");
          break;
        case "5-10":
          searchParams.append("experience", "0-10");
          break;
        case "10-15":
          searchParams.append("experience", "0-15");
          break;
        case "15+":
          searchParams.append("experience", "15+");
          break;
        default:
          break;
      }
    }

    if (location) searchParams.append("location", location);

    navigate(`/jobs?${searchParams.toString()}`);
  };

  return (
    <div className="bg-gradient-to-r from-naukri-blue to-blue-900 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Find your dream job now
          </h1>
          <p className="text-lg text-gray-200">
            5 lakh+ jobs for you to explore
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 max-w-4xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter skills / designations / companies"
                  className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
            </div>

            <div className="md:w-48">
              <select
                className="w-full py-3 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="">Select experience</option>
                <option value="0-5">0-5 Years</option>
                <option value="5-10">5-10 Years</option>
                <option value="10-15">10-15 Years</option>
                <option value="15+">15+ Years</option>
              </select>
            </div>

            <div className="md:w-48">
              <input
                type="text"
                placeholder="Enter location"
                className="w-full py-3 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-naukri-blue hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
