import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const TrustedCompanies = () => {
  // Company logos using Clearbit API for high-quality logos
  const companyLogos = [
    {
      name: "Fortis",
      logo: "https://logo.clearbit.com/fortishealthcare.com",
      domain: "fortishealthcare.com",
    },
    {
      name: "Tesco",
      logo: "https://logo.clearbit.com/tesco.com",
      domain: "tesco.com",
    },
    {
      name: "Wipro",
      logo: "https://logo.clearbit.com/wipro.com",
      domain: "wipro.com",
    },
    {
      name: "Amazon",
      logo: "https://logo.clearbit.com/amazon.com",
      domain: "amazon.com",
    },
    {
      name: "Reliance",
      logo: "https://logo.clearbit.com/relianceindustries.com",
      domain: "relianceindustries.com",
    },
    {
      name: "Infosys",
      logo: "https://logo.clearbit.com/infosys.com",
      domain: "infosys.com",
    },
    {
      name: "Tata",
      logo: "https://logo.clearbit.com/tata.com",
      domain: "tata.com",
    },
    {
      name: "HDFC Bank",
      logo: "https://logo.clearbit.com/hdfcbank.com",
      domain: "hdfcbank.com",
    },
    {
      name: "TCS",
      logo: "https://logo.clearbit.com/tcs.com",
      domain: "tcs.com",
    },
    {
      name: "Accenture",
      logo: "https://logo.clearbit.com/accenture.com",
      domain: "accenture.com",
    },
  ];

  // Fallback logo in case Clearbit fails
  const getLogoUrl = (company: {
    name: string;
    logo: string;
    domain: string;
  }) => {
    return `${company.logo}?size=128&format=png`;
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-blue-600">
            TRUSTED BY INDUSTRY LEADERS
          </p>
          <h2 className="mb-4 text-3xl font-bold text-gray-800">
            Join 7 Lakh+ businesses
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            who choose Naukri for their hiring needs
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent"></div>
          <div className="absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent"></div>

          <div className="flex overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex space-x-8 px-4">
              {companyLogos.map((company) => (
                <div
                  key={`company-${company.name}`}
                  className="flex flex-col items-center justify-center min-w-[120px] group"
                >
                  <div className="h-16 w-16 flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110">
                    <img
                      src={getLogoUrl(company)}
                      alt={`${company.name} logo`}
                      className="max-h-full max-w-full object-contain opacity-90 transition-all duration-300 group-hover:opacity-100"
                      onError={(e) => {
                        // Fallback to a generic icon if the logo fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=0D8ABC&color=fff`;
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                    {company.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <FaQuoteLeft className="text-blue-600 text-2xl" />
              </div>
            </div>
            <div className="md:w-3/4">
              <blockquote className="text-gray-700 italic mb-4">
                "Naukri's resume database has transformed our hiring process.
                We've reduced our time-to-hire by 40% and found exceptional
                talent that perfectly matches our requirements."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Testimonial"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Rajesh Kumar</p>
                  <p className="text-sm text-gray-500">
                    HR Director, Tech Solutions Inc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedCompanies;
