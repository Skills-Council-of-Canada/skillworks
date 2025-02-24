import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { 
  BriefcaseIcon, 
  GraduationCap, 
  DollarSign, 
  Rocket, 
  HandshakeIcon, 
  BarChart,
  ChevronRight,
  Download
} from "lucide-react";

const CareerPathways = () => {
  const tradesSectors = [
    {
      title: "Construction & Building Trades",
      careers: ["Carpenter", "Plumber", "Electrician", "HVAC Technician", "Roofer"],
      icon: BriefcaseIcon
    },
    {
      title: "Industrial & Manufacturing Trades",
      careers: ["Welder", "Machinist", "Industrial Mechanic", "Tool & Die Maker"],
      icon: BriefcaseIcon
    },
    {
      title: "Automotive & Transportation Trades",
      careers: ["Auto Service Technician", "Heavy Equipment Mechanic", "Truck & Coach Technician"],
      icon: BriefcaseIcon
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Explore Careers & Choose a Trade",
      description: "Discover high-demand trades and required skills."
    },
    {
      number: "2",
      title: "Get Educated",
      description: "Enroll in a pre-apprenticeship program or complete high school courses relevant to trades."
    },
    {
      number: "3",
      title: "Find an Employer & Register as an Apprentice",
      description: "Secure a paid apprenticeship opportunity and register with Ontario's Apprenticeship Program."
    },
    {
      number: "4",
      title: "Complete Apprenticeship Training",
      description: "Complete 4,000-9,000 hours of combined training and attend trade school classes."
    },
    {
      number: "5",
      title: "Pass the Red Seal Exam & Get Certified",
      description: "Write and pass the Certificate of Qualification (Red Seal Exam)."
    },
    {
      number: "6",
      title: "Career Growth & Advancement",
      description: "Work as a journeyperson, become a mentor/trainer, or start your own business."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-secondary pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Explore Your Future in Skilled Trades
              </h1>
              <p className="text-xl text-white/80">
                Discover high-demand careers, competitive salaries, and structured pathways 
                to success in Ontario's skilled trades industry.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <ScrollLink to="career-options" smooth={true} duration={500}>
                  <Button size="lg" className="w-full sm:w-auto">
                    Find Your Career Path
                  </Button>
                </ScrollLink>
                <ScrollLink to="apprenticeship" smooth={true} duration={500}>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20"
                  >
                    Explore Apprenticeship Programs
                  </Button>
                </ScrollLink>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/lovable-uploads/94a47665-7d23-445b-bbf6-888c7af17c65.png"
                alt="Skilled trade worker in action"
                className="rounded-lg shadow-xl object-cover w-full h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose a Skilled Trade Career?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: DollarSign,
                title: "Earn While You Learn",
                description: "Get paid apprenticeship opportunities with on-the-job training."
              },
              {
                icon: BriefcaseIcon,
                title: "Job Security & High Demand",
                description: "Tradespeople are in demand across multiple industries."
              },
              {
                icon: Rocket,
                title: "Great Salary Potential",
                description: "Skilled trades offer competitive wages with opportunities for growth."
              }
            ].map((benefit, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full bg-secondary/10">
                      <benefit.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Pathways Section */}
      <section id="career-options" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Career Pathways in Skilled Trades
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tradesSectors.map((sector, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-secondary/10">
                      <sector.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">{sector.title}</h3>
                      <ul className="space-y-2">
                        {sector.careers.map((career, idx) => (
                          <li key={idx} className="flex items-center text-gray-600">
                            <ChevronRight className="h-4 w-4 mr-2 text-secondary" />
                            {career}
                          </li>
                        ))}
                      </ul>
                      <Button className="mt-4" variant="outline">
                        Explore Careers
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pathway Steps Section */}
      <section id="apprenticeship" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Your Path to Becoming a Certified Skilled Tradesperson
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="relative">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Resources & Getting Started
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Download className="h-8 w-8 text-secondary" />
                  <h3 className="text-xl font-semibold">Download Career Guide</h3>
                  <p className="text-gray-600">
                    Get our comprehensive guide on starting your career in skilled trades,
                    including tips for resumes, interviews, and financial assistance.
                  </p>
                  <Button>Download Guide</Button>
                </div>
              </CardContent>
            </Card>
            <div className="text-center">
              <Link to="/login">
                <Button size="lg" className="mt-8">
                  Start Your Journey Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareerPathways;
