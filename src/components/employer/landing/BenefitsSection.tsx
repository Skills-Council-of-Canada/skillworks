
import { Users, Lightbulb, FastForward, Building, UserPlus } from "lucide-react";

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard = ({ icon, title, description }: BenefitCardProps) => (
  <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-secondary mb-2">{title}</h3>
        <p className="text-secondary/60">{description}</p>
      </div>
    </div>
  </div>
);

export const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Access a Curated Talent Pool",
      description: "Work with students and professionals trained with industry-relevant skills.",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "Solve Real Challenges",
      description: "Assign meaningful projects and gain fresh insights from emerging talent.",
    },
    {
      icon: <FastForward className="h-8 w-8 text-primary" />,
      title: "Fast & Efficient Matching",
      description: "Get connected to the right candidates without the hassle.",
    },
    {
      icon: <Building className="h-8 w-8 text-primary" />,
      title: "Build Your Talent Pipeline",
      description: "Identify top candidates for internships, co-ops, and full-time hires.",
    },
    {
      icon: <UserPlus className="h-8 w-8 text-primary" />,
      title: "Diversity & Inclusion",
      description: "Engage a wide range of learners from diverse backgrounds.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center text-secondary mb-12">
          Supporting Benefits
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
};
