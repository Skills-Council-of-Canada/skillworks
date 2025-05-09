
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/employer/registration");
  };

  return (
    <section className="pt-24 pb-16 px-4 bg-secondary">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Engage Top Emerging Talent & Build Your Future Workforce
            </h1>
            <p className="text-lg text-white">
              Hire smarter. Connect with participants who are being becoming job-ready through real-world projects, internships, and work-integrated learning.
            </p>
            <div className="flex gap-4">
              <Button
                size="lg"
                onClick={handleSignUp}
                className="bg-white text-secondary hover:bg-white/90 gap-2"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="/lovable-uploads/94a47665-7d23-445b-bbf6-888c7af17c65.png"
              alt="Construction workers in safety gear reviewing project plans"
              className="rounded-lg shadow-xl object-cover w-full h-[400px]"
              onError={(e) => {
                console.error('Image failed to load:', e);
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
