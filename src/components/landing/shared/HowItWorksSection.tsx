
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Step {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  steps: Step[];
  signUpPath: string;
}

export const HowItWorksSection = ({ steps, signUpPath }: HowItWorksSectionProps) => {
  const navigate = useNavigate();

  return (
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
            onClick={() => navigate(signUpPath)}
            size="lg"
            className="bg-[#8B0000] hover:bg-[#8B0000]/90 text-white gap-2"
          >
            Join Now – It's Free! <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
