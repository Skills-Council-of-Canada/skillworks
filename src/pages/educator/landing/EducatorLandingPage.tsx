
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const EducatorLandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <main className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              For Educators
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Empower your students with real-world experience and industry connections.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/registration/educator">
                <Button>Register as Educator</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EducatorLandingPage;
