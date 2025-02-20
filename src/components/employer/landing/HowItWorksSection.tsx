
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Edit3, Search, Handshake, CheckCircle } from "lucide-react";

export const HowItWorksSection = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <Edit3 className="h-8 w-8 text-white" />,
      title: "Create Your Profile",
      description: "Set up your employer profile and specify your hiring needs.",
    },
    {
      icon: <Search className="h-8 w-8 text-white" />,
      title: "Browse Candidates",
      description: "Access our pool of verified trade professionals.",
    },
    {
      icon: <Handshake className="h-8 w-8 text-white" />,
      title: "Connect & Engage",
      description: "Interact with potential candidates directly through our platform.",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-white" />,
      title: "Hire With Confidence",
      description: "Make informed hiring decisions with our comprehensive tools.",
    },
  ];

  return (
    <section className="py-32 px-4 bg-primary">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-white/5"
            >
              {step.icon}
              <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              <p className="text-white/90">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button
            onClick={() => navigate("/employer/registration")}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 gap-2"
          >
            Start Your Journey <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
