import type React from 'react';
import { Link } from 'react-router-dom';

const TalentCloudContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              One-Stop Solution.
              <br />
              Talent Decoded.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              One-stop solution for planning, sourcing, screening, employer branding, hiring automation, powered by AI to help you decode Indian talent.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition">
                Request demo
              </button>
              <button className="border border-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-black transition">
                Watch video
              </button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
          <img
            src="https://ext.same-assets.com/2019966699/3132766602.gif"
            alt="Naukri Logo"
            className="object-cover h-full w-full opacity-50"
          />
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-10 bg-gray-900">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-400 mb-6">NAUKRI IS PART OF</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <img
              src="https://ext.same-assets.com/2019966699/3128316183.svg"
              alt="Naukri Talent Cloud"
              className="h-8"
            />
            <img
              src="https://ext.same-assets.com/2019966699/1176215415.png"
              alt="iim jobs"
              className="h-6"
            />
            <img
              src="https://ext.same-assets.com/2019966699/3051715106.png"
              alt="hirist"
              className="h-6"
            />
            <img
              src="https://ext.same-assets.com/2019966699/4001852626.png"
              alt="Naukri Campus"
              className="h-6"
            />
            <img
              src="https://ext.same-assets.com/2019966699/2480636150.png"
              alt="Ambition Box"
              className="h-6"
            />
            <img
              src="https://ext.same-assets.com/2019966699/1518232876.png"
              alt="DoSelect"
              className="h-6"
            />
          </div>
        </div>
      </section>

      {/* Talent Solutions Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Explore all solutions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition">
              <h3 className="text-xl font-bold mb-2">Talent Sourcing</h3>
              <p className="text-gray-300 mb-4">Find the best talent from India's largest talent pool.</p>
              <Link to="/talent-sourcing" className="text-blue-400 hover:text-blue-300">Learn more →</Link>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition">
              <h3 className="text-xl font-bold mb-2">Talent Planning</h3>
              <p className="text-gray-300 mb-4">Plan your hiring strategy with data-driven insights.</p>
              <Link to="/talent-planning" className="text-blue-400 hover:text-blue-300">Learn more →</Link>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition">
              <h3 className="text-xl font-bold mb-2">Screening & Evaluation</h3>
              <p className="text-gray-300 mb-4">Assess candidates with precision and speed.</p>
              <Link to="/screening-evaluation" className="text-blue-400 hover:text-blue-300">Learn more →</Link>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition">
              <h3 className="text-xl font-bold mb-2">Employer Branding</h3>
              <p className="text-gray-300 mb-4">Showcase your employer brand to millions of candidates.</p>
              <Link to="/employer-branding" className="text-blue-400 hover:text-blue-300">Learn more →</Link>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition">
              <h3 className="text-xl font-bold mb-2">Hiring Automation</h3>
              <p className="text-gray-300 mb-4">Streamline your hiring process with intelligent automation.</p>
              <Link to="/hiring-automation" className="text-blue-400 hover:text-blue-300">Learn more →</Link>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition">
              <h3 className="text-xl font-bold mb-2">Assisted Hiring</h3>
              <p className="text-gray-300 mb-4">Get expert help to find the perfect candidates.</p>
              <Link to="/assisted-hiring" className="text-blue-400 hover:text-blue-300">Learn more →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <p className="text-blue-300 font-medium mb-2">Largest recruitment AI. Talent decoded.</p>
              <h2 className="text-3xl font-bold mb-6">
                Naukri <span className="text-blue-400">AI</span> has an unparalleled edge
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center mr-3 mt-1">
                    <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6L5 8L9 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-gray-200">Deeply understands India's talent language</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center mr-3 mt-1">
                    <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6L5 8L9 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-gray-200">Personalizes talent discovery</p>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black bg-opacity-30 rounded-lg p-6">
                  <h3 className="text-4xl font-bold text-white mb-1">50cr+</h3>
                  <p className="text-gray-300">Profile views</p>
                </div>
                <div className="bg-black bg-opacity-30 rounded-lg p-6">
                  <h3 className="text-4xl font-bold text-white mb-1">10cr+</h3>
                  <p className="text-gray-300">Applies</p>
                </div>
                <div className="bg-black bg-opacity-30 rounded-lg p-6">
                  <h3 className="text-4xl font-bold text-white mb-1">50lac+</h3>
                  <p className="text-gray-300">Profile updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Experience the one-stop solution</h2>

          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6L5 8L9 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-200">Single sign-on</p>
            </div>
            <div className="mx-4 text-gray-500">|</div>
            <div className="flex items-center space-x-3">
              <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6L5 8L9 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-gray-200">Smart recommendations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/naukri" className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition">
              <h3 className="text-xl font-bold mb-2">Naukri</h3>
              <p className="text-gray-300 mb-3">Talent decoded</p>
              <p className="text-sm text-gray-400">Decode India's largest talent pool with the power of AI</p>
            </Link>

            <Link to="/iimjobs" className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition">
              <h3 className="text-xl font-bold mb-2">iimjobs</h3>
              <p className="text-gray-300 mb-3">Premium management talent decoded</p>
              <p className="text-sm text-gray-400">Decode the complexities of hiring India's premium management talent</p>
            </Link>

            <Link to="/hirist" className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition">
              <h3 className="text-xl font-bold mb-2">hirist</h3>
              <p className="text-gray-300 mb-3">Premium tech talent decoded</p>
              <p className="text-sm text-gray-400">Decode modern tech hiring challenges with hirist's tech solutions</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Know more about Naukri Talent Cloud</h2>
            <p className="text-gray-200 mb-8">Get personalized insights into how our platform can transform your hiring process.</p>

            <div className="flex flex-col md:flex-row gap-6">
              <button className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition">
                Request a demo
              </button>
              <button className="border border-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-black transition">
                Learn how it will help you
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TalentCloudContent;
