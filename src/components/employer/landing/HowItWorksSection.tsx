
import { ArrowDown } from "lucide-react";

interface StepProps {
  number: string;
  title: string;
  description: string;
  showArrow?: boolean;
}

const Step = ({ number, title, description, showArrow = true }: StepProps) => (
  <div className="flex flex-col items-center">
    <div className="w-full bg-white rounded-lg p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow text-center">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
          {number}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-secondary mb-2">{title}</h3>
      <p className="text-secondary/60">{description}</p>
    </div>
    {showArrow && (
      <ArrowDown className="h-8 w-8 text-primary/60 my-4" />
    )}
  </div>
);

export const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      title: "Create a Project",
      description: "Define your project needs and scope.",
    },
    {
      number: "2",
      title: "Match with Participants",
      description: "Get paired with skilled learners aligned to your industry.",
    },
    {
      number: "3",
      title: "Collaborate & Evaluate",
      description: "Work on real-world challenges, mentor talent, and assess potential hires.",
    },
    {
      number: "4",
      title: "Hire Top Performers",
      description: "Seamlessly transition top participants into full-time roles.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-muted/50">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-secondary mb-12">
          How It Works
        </h2>
        <div className="space-y-8">
          {steps.map((step, index) => (
            <Step
              key={index}
              {...step}
              showArrow={index < steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
