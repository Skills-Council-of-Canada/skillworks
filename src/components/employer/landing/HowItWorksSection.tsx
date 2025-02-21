
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Edit3, Search, Handshake, CheckCircle, BookOpen } from "lucide-react";

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
      icon: <BookOpen className="h-8 w-8 text-white" />,
      title: "Build an Experience",
      description: "Students select your project, work with mentors and build to your requirements.",
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
    <section className="py-12 px-4 bg-primary">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Your Steps to Employer Success
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
            onClick={() => navigate("/employer/registration")}
            size="lg"
            className="bg-[#8B0000] hover:bg-[#8B0000]/90 text-white gap-2"
          >
            Start Your Journey <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
