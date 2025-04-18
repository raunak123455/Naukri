import type React from 'react';
import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex w-full items-center justify-between text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-base font-medium text-gray-800">{question}</h3>
        <svg
          className={`h-5 w-5 transform text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-3 text-sm text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const faqItems = [
    {
      question: "I have purchased Job posting plan on Naukri. How do I create my job listing?",
      answer: "After purchasing a job posting plan, you can create your job listing by logging into your Naukri recruiter account. Navigate to the 'Post a Job' section, fill in the job details including job title, description, requirements, and other relevant information, and submit it for review. Once approved, your job will be live on Naukri.com."
    },
    {
      question: "What is the difference between Resume Database Access (Resdex) and a Job posting?",
      answer: "Resume Database Access (Resdex) allows recruiters to search through Naukri's database of millions of candidate resumes to find suitable candidates for their open positions. Job posting, on the other hand, lets employers list their job openings on Naukri.com for job seekers to view and apply. While job posting is a passive approach where you wait for candidates to apply, Resdex is an active approach where you can search for and reach out to potential candidates directly."
    },
    {
      question: "How is Resdex lite different from Resdex?",
      answer: "Resdex Lite is a more affordable version of the full Resdex database access with some limitations on features. It typically offers fewer CV views, simplified search filters, and might have restrictions on database validity periods compared to the full Resdex offering. The full Resdex provides more advanced search filters, higher CV view limits, and additional features like bulk downloads and multiple user access."
    },
    {
      question: "What information is needed to create a \"requirement\" in Resdex Lite?",
      answer: "To create a requirement in Resdex Lite, you need to provide job-related information such as job title, key skills required, experience range, location, industry, and functional area. You may also need to specify education requirements and salary range. This information helps the system filter and suggest relevant candidate profiles from the database that match your specific hiring needs."
    },
    {
      question: "How does pricing work for the different Naukri recruiter plans?",
      answer: "Naukri offers different pricing structures based on the services you need. For job postings, pricing depends on the number of postings and validity period. For Resdex, pricing varies based on factors like CV view limits, validity period, and feature access. Packages can be customized to fit your specific hiring needs, and volume discounts are available for larger organizations with extensive hiring requirements."
    },
    {
      question: "What kind of support can I expect from Naukri Recruiter?",
      answer: "Naukri Recruiter provides comprehensive support including a dedicated account manager for premium plans, technical support for platform-related issues, assistance with optimizing job postings and search strategies, training on using Resdex effectively, and regular updates on new features. They also offer phone, email, and chat support for quick resolution of queries."
    }
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-center text-2xl font-bold text-gray-800">
          <span className="text-red-600">Frequently</span> asked questions
        </h2>
        <div className="mx-auto max-w-3xl divide-y divide-gray-200 rounded-lg bg-white p-6 shadow-sm">
          {faqItems.map((item) => (
            <FAQItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
