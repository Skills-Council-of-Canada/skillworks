
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
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6">How TradesConnect Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple & Actionable Steps to Success
          </p>
        </div>

        <div className="flex flex-col space-y-6 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-start space-x-4 p-6 rounded-lg border border-primary/10 hover:shadow-lg transition-shadow">
                <div className="bg-primary/5 p-4 rounded-2xl shrink-0">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">
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
