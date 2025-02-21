
import { Button } from "@/components/ui/button";
import { UserPlus, Search, Users, Trophy, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HowItWorksSection = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up & Create a Profile",
      description: "Choose your role (Employer, Educator, or Participant)."
    },
    {
      icon: Search,
      title: "Find & Match with Opportunities",
      description: "Employers post projects, educators integrate experiences, participants apply."
    },
    {
      icon: Users,
      title: "Work, Learn, and Collaborate",
      description: "Gain real-world experience and receive feedback."
    },
    {
      icon: Trophy,
      title: "Showcase Your Work & Get Hired",
      description: "Build your portfolio and unlock career opportunities."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Simple & Actionable Steps to Success</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/4 right-0 w-full h-0.5 bg-primary/20">
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="text-primary w-6 h-6" />
                  </div>
                </div>
              )}
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-6">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            onClick={() => navigate("/login")}
            className="group"
          >
            Join Now – It's Free!
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};
