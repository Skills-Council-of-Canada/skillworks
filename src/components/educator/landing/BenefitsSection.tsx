
import { LucideIcon } from "lucide-react";

interface Benefit {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface BenefitsSectionProps {
  benefits: Benefit[];
}

export const BenefitsSection = ({ benefits }: BenefitsSectionProps) => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          Supporting Benefits
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-gray-100 shadow-md hover:shadow-lg transition-shadow"
            >
              {benefit.icon}
              <h3 className="text-xl font-semibold text-primary">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
