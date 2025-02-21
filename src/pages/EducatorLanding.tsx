
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  BookOpen, 
  Building2, 
  UsersRound, 
  GraduationCap, 
  Home,
  Briefcase,
  ClipboardCheck,
  Puzzle,
  Users,
  CheckCircle
} from "lucide-react";

const EducatorLanding = () => {
  const navigate = useNavigate();

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
            <div className="text-2xl font-bold text-primary">Skilled Trades Educator Portal</div>
          </div>
          <div>
            <Button
              onClick={() => navigate("/educator/registration")}
              className="bg-[#8B0000] hover:bg-[#8B0000]/90"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-[#1A1F2C]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                Transform Learning with Real-World Projects & Employer Partnership
              </h1>
              <p className="text-lg text-white/90">
                Empower your students with hands-on, career-aligned experiences—directly integrated into your curriculum.
              </p>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg" />
              <img
                src="/lovable-uploads/638ea052-fa93-4bd7-ba45-e71de765b2be.png"
                alt="Professional pointing to success concept with light bulbs and planning diagram"
                className="rounded-lg shadow-xl w-full object-cover h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Supporting Benefits
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-gray-100 shadow-md hover:shadow-lg transition-shadow"
              >
                {benefit.icon}
                <h3 className="text-xl font-semibold text-primary">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
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
              onClick={() => navigate("/educator/registration")}
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
