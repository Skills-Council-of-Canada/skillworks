import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Home,
  Briefcase,
  Users,
  Globe2,
  Building2,
  Network,
  UserPlus,
  Search,
  Laptop,
  Trophy,
  Link2
} from "lucide-react";

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
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="text-secondary hover:text-primary"
            >
              <Home className="h-5 w-5" />
            </Button>
            <div className="text-2xl font-bold text-primary flex items-center gap-2">
              Skill <Link2 className="h-5 w-5" /> Works - Participant Portal
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/participant/registration")}
              className="bg-[#8B0000] hover:bg-[#8B0000]/90"
            >
              Sign Up Now
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-secondary">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Kickstart Your Career with Hands-On Experience
              </h1>
              <p className="text-lg text-white">
                Work on real projects with top companies. Build your resume. Land your dream job.
              </p>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/participant/registration")}
                  className="bg-white text-secondary hover:bg-white/90 gap-2"
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/lovable-uploads/d1c9ee85-c87d-4832-8d5d-1044f3b08ac1.png"
                alt="Professional looking towards success with planning ideas"
                className="rounded-lg shadow-xl object-cover w-full h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-secondary mb-12">
            Supporting Benefits
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-6 space-y-4 text-center bg-[#F1F1F1] rounded-lg shadow-md hover:shadow-lg transition-shadow">
                {benefit.icon}
                <h3 className="text-xl font-semibold text-secondary">
                  {benefit.title}
                </h3>
                <p className="text-secondary/60">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 px-4 bg-primary">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            How It Works
          </h2>
          <div className="flex flex-col space-y-4 mb-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 rounded-lg bg-[#1A1F2C] hover:bg-[#1A1F2C]/90 transition-colors"
              >
                <div className="shrink-0 bg-white/10 p-4 rounded-2xl">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-white/90">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button
              onClick={() => navigate("/participant/registration")}
              size="lg"
              className="bg-[#8B0000] hover:bg-[#8B0000]/90 text-white gap-2"
            >
              Join Now – It's Free! <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-secondary flex items-center gap-2">
                Skill <Link2 className="h-4 w-4" /> Works
              </h3>
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
            <p>&copy; {new Date().getFullYear()} Skill Works. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ParticipantLanding;
