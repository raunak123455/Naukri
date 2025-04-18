import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-cover bg-center py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-xl">
          <h1 className="mb-6 text-4xl font-bold text-blue-900 md:text-5xl">
            Find, attract, and hire talent with Naukri
          </h1>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link
              to="#"
              className="rounded-md bg-blue-600 px-6 py-3 text-center font-medium text-white hover:bg-blue-700"
            >
              Post job for free
            </Link>
            <Link
              to="#"
              className="rounded-md border border-blue-600 bg-white px-6 py-3 text-center font-medium text-blue-600 hover:bg-blue-50"
            >
              Explore plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
