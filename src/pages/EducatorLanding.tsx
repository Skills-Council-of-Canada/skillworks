
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Users, CheckCircle } from "lucide-react";

const EducatorLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">TradesConnect - Educator Portal</div>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
              className="text-secondary hover:text-primary"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/login")}
              className="bg-primary hover:bg-primary/90"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-secondary leading-tight">
                Empower Students Through Trade Education
              </h1>
              <p className="text-lg text-secondary/60">
                Connect your students with real-world trade opportunities and shape the future workforce through hands-on learning experiences.
              </p>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/login")}
                  className="bg-primary hover:bg-primary/90 gap-2"
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/about")}
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/placeholder.svg"
                alt="Education in trades"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-secondary mb-12">
            Why Choose Our Educator Portal?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 space-y-4 text-center">
              <Briefcase className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold text-secondary">
                Industry Connections
              </h3>
              <p className="text-secondary/60">
                Connect with leading trade employers and provide real opportunities for your students
              </p>
            </div>
            <div className="p-6 space-y-4 text-center">
              <Users className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold text-secondary">
                Student Progress Tracking
              </h3>
              <p className="text-secondary/60">
                Monitor your students' development and engagement with hands-on projects
              </p>
            </div>
            <div className="p-6 space-y-4 text-center">
              <CheckCircle className="h-12 w-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold text-secondary">
                Verified Outcomes
              </h3>
              <p className="text-secondary/60">
                Track and verify student achievements and certifications
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">TradesConnect</h3>
              <p className="text-white/60">
                Empowering trade education and workforce development
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-white/60 hover:text-white">About</a></li>
                <li><a href="/contact" className="text-white/60 hover:text-white">Contact</a></li>
                <li><a href="/support" className="text-white/60 hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><a href="/features" className="text-white/60 hover:text-white">Features</a></li>
                <li><a href="/pricing" className="text-white/60 hover:text-white">Pricing</a></li>
                <li><a href="/faq" className="text-white/60 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/privacy" className="text-white/60 hover:text-white">Privacy Policy</a></li>
                <li><a href="/terms" className="text-white/60 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/60">
            <p>&copy; {new Date().getFullYear()} TradesConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EducatorLanding;
