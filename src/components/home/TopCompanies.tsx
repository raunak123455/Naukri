import type React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

interface CompanyCardProps {
  name: string;
  logo: string;
  category: string;
  activeJobs: number;
  link: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  name,
  logo,
  category,
  activeJobs,
  link,
}) => {
  const [imgError, setImgError] = useState(false);
  const [imgSrc, setImgSrc] = useState(logo);

  const handleImageError = () => {
    if (!imgError) {
      // Try fallback image first
      setImgSrc("https://cdn-icons-png.flaticon.com/512/2504/2504839.png");
      setImgError(true);
    }
  };

  return (
    <Link
      to={link}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
    >
      <div className="p-4 border-b">
        <div className="flex items-center mb-3">
          {imgError ? (
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
              <span className="text-gray-500 text-sm font-medium">
                {name.charAt(0)}
              </span>
            </div>
          ) : (
            <img
              src={imgSrc}
              alt={`${name} logo`}
              className="w-12 h-12 object-contain mr-3"
              onError={handleImageError}
            />
          )}
          <div>
            <h3 className="font-medium text-gray-800">{name}</h3>
            <span className="text-sm text-gray-500">{category}</span>
          </div>
        </div>
        <div className="text-sm text-naukri-blue font-medium">
          {activeJobs}+ active jobs
        </div>
      </div>
      <div className="bg-gray-50 p-3 text-center">
        <span className="text-sm font-medium text-naukri-teal">View jobs</span>
      </div>
    </Link>
  );
};

interface CompanyCategoryProps {
  title: string;
  description: string;
  companies: CompanyCardProps[];
  link: string;
}

const CompanyCategory: React.FC<CompanyCategoryProps> = ({
  title,
  description,
  companies,
  link,
}) => {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium text-gray-800">{title}</h2>
          <p className="text-gray-500">{description}</p>
        </div>
        {/* <Link
          to={link}
          className="text-naukri-blue hover:underline font-medium"
        >
          View all
        </Link> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {companies.map((company, index) => (
          <CompanyCard key={company.name} {...company} />
        ))}
      </div>
    </div>
  );
};

const TopCompanies: React.FC = () => {
  const [mncCompanies, setMncCompanies] = useState<CompanyCardProps[]>([]);
  const [startupCompanies, setStartupCompanies] = useState<CompanyCardProps[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/companies");
        const allCompanies = response.data;

        // Filter MNC companies
        const mncs = allCompanies
          .filter(
            (company: any) =>
              company.type === "MNC" || company.type === "Indian MNC"
          )
          .map((company: any) => ({
            name: company.name,
            logo: company.logo,
            category: company.industry,
            activeJobs: company.activeJobs,
            link: `/jobs?company=${encodeURIComponent(company.name)}`,
          }));

        // Filter startup companies
        const startups = allCompanies
          .filter((company: any) => company.type === "Startup")
          .map((company: any) => ({
            name: company.name,
            logo: company.logo,
            category: company.industry,
            activeJobs: company.activeJobs,
            link: `/jobs?company=${encodeURIComponent(company.name)}`,
          }));

        setMncCompanies(mncs);
        setStartupCompanies(startups);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch companies");
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <div className="py-10 bg-naukri-bg">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading companies...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 bg-naukri-bg">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 bg-naukri-bg">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">
          Top companies hiring now
        </h2>

        <CompanyCategory
          title="MNCs"
          description={`${mncCompanies.length}+ are actively hiring`}
          companies={mncCompanies}
          link="/mnc-companies-in-india"
        />

        <CompanyCategory
          title="Startups"
          description={`${startupCompanies.length}+ are actively hiring`}
          companies={startupCompanies}
          link="/startup-companies-in-india"
        />
      </div>
    </div>
  );
};

export default TopCompanies;
