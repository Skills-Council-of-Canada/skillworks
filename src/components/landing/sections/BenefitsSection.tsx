
import { 
  Building2, 
  Puzzle,
  GraduationCap,
  Users,
  Zap
} from "lucide-react";

export const BenefitsSection = () => {
  const benefits = [
    {
      icon: Building2,
      title: "Industry-Aligned Experiences",
      description: "Work with real companies and real challenges."
    },
    {
      icon: Puzzle,
      title: "Smart Matching System",
      description: "Connects users with the best opportunities."
    },
    {
      icon: GraduationCap,
      title: "Integrated Learning",
      description: "Seamlessly bridges education and employment."
    },
    {
      icon: Users,
      title: "Diverse & Inclusive Community",
      description: "Access talent and opportunities from all backgrounds."
    },
    {
      icon: Zap,
      title: "Fast & Easy to Use",
      description: "No complex applications, just real experience."
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">The Benefits Of this Platform</h2>
          <p className="text-xl text-gray-600">What Makes Our Platform Stand Out</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
