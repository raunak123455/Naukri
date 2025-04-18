import type React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  popular?: boolean;
  recommended?: boolean;
  image: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  price,
  popular = false,
  recommended = false,
  image,
  link,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {(popular || recommended) && (
        <div
          className={`${popular ? "bg-orange-500" : "bg-blue-500"} text-white text-xs font-medium text-center py-1`}
        >
          {popular ? "MOST POPULAR" : "RECOMMENDED"}
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-shrink-0">
            <img
              src={image}
              alt={title}
              className="w-28 h-28 object-contain mx-auto sm:mx-0"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-gray-500 mb-2 sm:mb-0">
                Subscription starts from{" "}
                <span className="font-medium">{price}</span>
              </div>
              <a
                href="mailto:raunakrana101@gmail.com"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                KNOW MORE
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesListing: React.FC = () => {
  const services: ServiceCardProps[] = [
    {
      title: "RESUME DISPLAY",
      description:
        "Increase your Profile Visibility to recruiters upto 3 times. Get a Featured Profile, Stand out and get noticed in recruiter eyes.",
      price: "₹ 0",
      popular: true,
      image: "https://ext.same-assets.com/4142944121/110460302.png",
      link: "/resume-display",
    },
    {
      title: "PRIORITY APPLICANT",
      description:
        "Be a Priority Applicant & increase your chance of getting a call. Be the first one to apply and catch recruiter attention.",
      price: "₹ 22 for 3 Months",
      recommended: true,
      image: "https://ext.same-assets.com/4142944121/1597053923.png",
      link: "/priority-job-application",
    },
    {
      title: "AI MOCK INTERVIEW",
      description:
        "Personalized AI driven mock interviews for your profile. Designed to streamline your interview preparation effortlessly.",
      price: "₹ 15 for 3 Months",
      image: "https://ext.same-assets.com/4142944121/2622557130.png",
      link: "/mock-interview-questions",
    },
    {
      title: "RESUME WRITING",
      description:
        "Standout from the crowd with our professionally written Resume by expert. Resume that highlights your strengths and showcase your experience.",
      price: "₹ 90 Only",
      image: "https://ext.same-assets.com/4142944121/158425252.png",
      link: "/resume-writing-services",
    },
    {
      title: "JOBS FOR YOU",
      description:
        "Stand out as an Early Applicant with instant access to jobs. Our experts will understand your job preference & set alerts. Instant job on SMS.",
      price: "₹ 76 for 3 Months",
      image: "https://ext.same-assets.com/4142944121/110460302.png",
      link: "/job-alerts-on-mobile-mail",
    },
    {
      title: "RECRUITER CONNECTION",
      description:
        "Send personalized message to recruiters. Search from a database of 1.6 Lakh recruiters and share your Naukri profile.",
      price: "₹ 20 for 5 Credits",
      image: "https://ext.same-assets.com/4142944121/1597053923.png",
      link: "/contact-recruiters-hr",
    },
    {
      title: "RESUME CRITIQUE",
      description:
        "Get your resume reviewed and improve your job application. Our experts will analyze your resume and send a detailed report.",
      price: "₹ 25 Only",
      image: "https://ext.same-assets.com/4142944121/158425252.png",
      link: "/resume-critique",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Move ahead in career, faster
          </h1>
          <p className="text-xl text-gray-600">with our paid services</p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">See Samples</h2>
          <p className="text-gray-600 mb-4">
            View select text resume, visual resume and cover letter samples
            across industries
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/resume-samples"
              className="text-blue-600 hover:underline"
            >
              Text Resume
            </Link>
            <Link
              to="/visual-resume-sample"
              className="text-blue-600 hover:underline"
            >
              Visual Resume
            </Link>
            <Link
              to="/cover-letter-samples-for-resume"
              className="text-blue-600 hover:underline"
            >
              Cover Letter
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Career Advice
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-3">
                Most Viewed Articles
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/career-advice/how-to-answer-the-tell-me-about-yourself-question"
                    className="text-blue-600 hover:underline"
                  >
                    How to Answer "Tell me about yourself" Question!
                  </Link>
                </li>
                <li>
                  <Link
                    to="/career-advice/resume-writing-tips-1"
                    className="text-blue-600 hover:underline"
                  >
                    Tips to Make an Impressive CV
                  </Link>
                </li>
                <li>
                  <Link
                    to="/career-advice/importance-of-keywords-in-resume-writing"
                    className="text-blue-600 hover:underline"
                  >
                    Does Your Resume Have The Magic Keywords?
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-gray-800 mb-3">
                Cover Letter Writing
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/career-advice/how-to-write-a-cover-letter"
                    className="text-blue-600 hover:underline"
                  >
                    7 Ways to Make your Cover Letter Recruiter Friendly
                  </Link>
                </li>
                <li>
                  <Link
                    to="/career-advice/common-cover-letter-mistakes"
                    className="text-blue-600 hover:underline"
                  >
                    Common Cover letter mistakes to avoid!
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-gray-800 mb-3">
                Appraisals and Promotions
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/career-advice/how-to-get-a-promotion"
                    className="text-blue-600 hover:underline"
                  >
                    Looking for a Promotion?
                  </Link>
                </li>
                <li>
                  <Link
                    to="/career-advice/how-to-deal-with-a-bad-appraisal"
                    className="text-blue-600 hover:underline"
                  >
                    Dealing With A Bad Appraisal
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link
              to="/career-advice/list-of-articles"
              className="text-blue-600 font-medium hover:underline"
            >
              VIEW ALL
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesListing;
