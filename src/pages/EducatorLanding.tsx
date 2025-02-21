
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Building2, UsersRound, GraduationCap, Home } from "lucide-react";

const EducatorLanding = () => {
  const navigate = useNavigate();

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
              className="bg-primary hover:bg-primary/90"
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
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Transform Learning with Real-World Projects & Employer Partnership
              </h1>
              <p className="text-lg text-white/70">
                Empower your students with hands-on, career-aligned experiences—directly integrated into your curriculum.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/educator/registration")}
                  className="bg-primary hover:bg-primary/90 gap-2"
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg" />
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                alt="Educator working with students"
                className="rounded-lg shadow-xl w-full object-cover h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
              Everything you need to manage and enhance your skilled trades education program.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-white border shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-3">
                Industry Partnerships
              </h3>
              <p className="text-secondary/70">
                Connect with leading employers to provide real-world opportunities and projects for your students.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white border shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-3">
                Learning Management
              </h3>
              <p className="text-secondary/70">
                Comprehensive tools to track student progress, manage courses, and coordinate hands-on training.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white border shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <UsersRound className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-3">
                Student Engagement
              </h3>
              <p className="text-secondary/70">
                Foster collaboration and track student participation in projects and practical assignments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex flex-col items-center gap-6">
            <GraduationCap className="h-16 w-16 text-white/90" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Transform Your Teaching?
            </h2>
            <p className="text-lg text-white/80 max-w-2xl">
              Join our community of educators who are revolutionizing skilled trades education.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/educator/registration")}
              className="bg-white text-secondary hover:bg-white/90 mt-4"
            >
              Get Started Today
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
