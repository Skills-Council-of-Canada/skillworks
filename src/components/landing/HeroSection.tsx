
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 bg-muted">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Connect with Skilled Trade Professionals
            </h1>
            <p className="text-lg text-white">
              Your gateway to finding and hiring qualified trade professionals.
              Streamline your recruitment process and build your workforce efficiently.
            </p>
            <div className="flex gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/login")}
                className="bg-white text-primary hover:bg-white/90 gap-2"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/about")}
                className="border-white text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Skilled trades professionals"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
