import { 
  BookOpen, 
  Building2, 
  GraduationCap, 
  Briefcase,
  ClipboardCheck,
  Puzzle,
  Users,
  CheckCircle
} from "lucide-react";
import { LandingHeader } from "@/components/landing/shared/LandingHeader";
import { BenefitsSection } from "@/components/educator/landing/BenefitsSection";
import { HeroSection } from "@/components/educator/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/shared/HowItWorksSection";

const EducatorLanding = () => {
  const benefits = [
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      title: "Work-Integrated Learning",
      description: "Bring industry-driven projects into your classroom.",
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-primary" />,
      title: "Career-Ready Graduates",
      description: "Give students practical, real-world experience.",
    },
    {
      icon: <Puzzle className="h-8 w-8 text-primary" />,
      title: "Seamless Curriculum Integration",
      description: "Match projects to existing courses and training programs.",
    },
    {
      icon: <Building2 className="h-8 w-8 text-primary" />,
      title: "Employer & Industry Partnerships",
      description: "Connect with companies looking to invest in student development.",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Customizable Learning Paths",
      description: "Allow students to explore career options while building their portfolios.",
    },
  ];

  const steps = [
    {
      icon: <Users className="h-8 w-8 text-white" />,
      title: "Sign Up & Set Preferences",
      description: "Define your subject areas and desired employer collaborations.",
    },
    {
      icon: <ClipboardCheck className="h-8 w-8 text-white" />,
      title: "Match with Employer Projects",
      description: "Receive industry-relevant projects that fit your curriculum.",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-white" />,
      title: "Facilitate Learning & Mentorship",
      description: "Guide students through real-world problem-solving.",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-white" />,
      title: "Showcase Student Success",
      description: "Help learners build a portfolio that enhances their career prospects.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader signUpPath="/educator/registration" buttonText="Sign Up" />
      <HeroSection imagePath="/lovable-uploads/638ea052-fa93-4bd7-ba45-e71de765b2be.png" />
      <BenefitsSection benefits={benefits} />
      <HowItWorksSection steps={steps} signUpPath="/educator/registration" />

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-secondary">Skilled Trades Portal</h3>
              <p className="text-secondary/70">
                Empowering trade education and workforce development
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-secondary">Resources</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-secondary/70 hover:text-primary">About</a></li>
                <li><a href="/contact" className="text-secondary/70 hover:text-primary">Contact</a></li>
                <li><a href="/support" className="text-secondary/70 hover:text-primary">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-secondary">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-secondary/70 hover:text-primary">Features</a></li>
                <li><a href="/pricing" className="text-secondary/70 hover:text-primary">Pricing</a></li>
                <li><a href="/faq" className="text-secondary/70 hover:text-primary">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-secondary">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-secondary/70 hover:text-primary">Privacy Policy</a></li>
                <li><a href="/terms" className="text-secondary/70 hover:text-primary">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-secondary/70">
            <p>&copy; {new Date().getFullYear()} Skilled Trades Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EducatorLanding;
