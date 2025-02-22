
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 bg-muted">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center pt-16">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Real-World Experience. Real Opportunities. Real Impact.
            </h1>
            <p className="text-lg text-white">
              Connect with top companies, gain hands-on experience, and build your career—all in one platform.
            </p>
          </div>
          <div className="hidden md:block">
            <img
              src="/lovable-uploads/09ce0ccb-99ed-4905-a10b-116026b9384c.png"
              alt="Diverse group of professionals including business, medical, engineering, and culinary workers"
              className="rounded-lg shadow-xl w-full h-[400px] object-cover"
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

export default HeroSection;
