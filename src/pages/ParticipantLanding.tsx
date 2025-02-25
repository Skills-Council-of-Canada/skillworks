
import {
  Briefcase,
  Globe2,
  Building2,
  Network,
  UserPlus,
  Search,
  Laptop,
  Trophy,
  Link2
} from "lucide-react";
import { LandingHeader } from "@/components/landing/shared/LandingHeader";
import { BenefitsSection } from "@/components/participant/landing/BenefitsSection";
import { HeroSection } from "@/components/participant/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/shared/HowItWorksSection";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ParticipantLanding = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <Briefcase className="h-12 w-12 text-primary mx-auto" />,
      title: "Gain Real-World Experience",
      description: "Work on live projects from employers in your industry"
    },
    {
      icon: <Trophy className="h-12 w-12 text-primary mx-auto" />,
      title: "Showcase Your Skills",
      description: "Build a portfolio that stands out to future employers"
    },
    {
      icon: <Globe2 className="h-12 w-12 text-primary mx-auto" />,
      title: "Flexible & Remote Opportunities",
      description: "Work from anywhere on your schedule"
    },
    {
      icon: <Building2 className="h-12 w-12 text-primary mx-auto" />,
      title: "Direct Access to Hiring Employers",
      description: "Get noticed by companies looking for fresh talent"
    },
    {
      icon: <Network className="h-12 w-12 text-primary mx-auto" />,
      title: "Build Your Network & Get Mentorship",
      description: "Connect with professionals in your field"
    }
  ];

  const steps = [
    {
      icon: <UserPlus className="h-8 w-8 text-white" />,
      title: "Create Your Profile",
      description: "Highlight your skills, interests, and career goals"
    },
    {
      icon: <Search className="h-8 w-8 text-white" />,
      title: "Find & Apply for Projects",
      description: "Choose projects that match your aspirations"
    },
    {
      icon: <Laptop className="h-8 w-8 text-white" />,
      title: "Work & Learn",
      description: "Gain hands-on experience while collaborating with employers"
    },
    {
      icon: <Trophy className="h-8 w-8 text-white" />,
      title: "Get Recognized & Hired",
      description: "Receive feedback, build a strong portfolio, and land your next job"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader signUpPath="/participant/registration" buttonText="Sign Up" />
      <HeroSection imagePath="/lovable-uploads/d1c9ee85-c87d-4832-8d5d-1044f3b08ac1.png" />
      <BenefitsSection benefits={benefits} />
      <HowItWorksSection steps={steps} signUpPath="/participant/registration" />

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <img 
                  src="/lovable-uploads/8803d62e-86da-4278-91b7-5992abfc4aa7.png" 
                  alt="Skill Works Logo" 
                  className="h-8"
                />
              </div>
              <p className="text-secondary/60">
                Your gateway to a successful trade career
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-secondary">Resources</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-secondary/60 hover:text-primary">About</a></li>
                <li><a href="/contact" className="text-secondary/60 hover:text-primary">Contact</a></li>
                <li><a href="/support" className="text-secondary/60 hover:text-primary">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-secondary">Platform</h4>
              <ul className="space-y-2">
                <li><a href="/features" className="text-secondary/60 hover:text-primary">Features</a></li>
                <li><a href="/pricing" className="text-secondary/60 hover:text-primary">Pricing</a></li>
                <li><a href="/faq" className="text-secondary/60 hover:text-primary">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-secondary">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-secondary/60 hover:text-primary">Privacy Policy</a></li>
                <li><a href="/terms" className="text-secondary/60 hover:text-primary">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-secondary/70">
            <p>&copy; {new Date().getFullYear()} Skills Council of Canada. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ParticipantLanding;
