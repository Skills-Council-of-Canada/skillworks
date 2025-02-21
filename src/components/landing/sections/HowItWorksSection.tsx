
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6">How TradesConnect Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple & Actionable Steps to Success
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-12 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="bg-primary/5 p-6 rounded-2xl shadow-sm border border-primary/10">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            onClick={() => navigate("/login")}
            className="group bg-[#8B0000] hover:bg-[#8B0000]/90 text-white px-8 py-6 text-lg h-auto"
          >
            Join Now – It's Free!
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};
