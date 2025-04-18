import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link to="/" className="mr-10">
            <img
              src="https://ext.same-assets.com/1229505073/457701190.png"
              alt="Naukri Logo"
              className="h-8"
            />
          </Link>
          <div className="hidden items-center space-x-6 md:flex">
            <span className="text-sm font-medium">Naukri Talent Cloud</span>
            <span className="rounded bg-red-500 px-1 py-0.5 text-xs text-white">NEW</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <a href="tel:+918066572742" className="hidden items-center text-sm text-gray-700 md:flex">
            <span className="mr-1">+91 866 557 2742</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Buy online
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a href="tel:+918066572742" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100">
              +91 866 557 2742
            </a>
            <button className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-100">
              Naukri Talent Cloud
              <span className="ml-2 rounded bg-red-500 px-1 py-0.5 text-xs text-white">NEW</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
