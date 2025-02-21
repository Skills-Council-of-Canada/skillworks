
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const EmployerLandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <main className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              For Employers
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Connect with skilled participants and shape the future workforce.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/registration/employer">
                <Button>Register as Employer</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployerLandingPage;
