import type React from 'react';
import Hero from '../components/home/Hero';
import TrendingJobs from '../components/home/TrendingJobs';
import TopCompanies from '../components/home/TopCompanies';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Hero />
      <TrendingJobs />
      <TopCompanies />
    </div>
  );
};

export default HomePage;
