
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Users, Briefcase, Award, Gift } from "lucide-react";

export const BenefitsSection = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Access Top Talent",
      description: "Connect with skilled professionals who are actively seeking opportunities in the trades.",
    },
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      title: "Streamlined Hiring",
      description: "Our platform simplifies the recruitment process, saving you time and resources.",
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Quality Assurance",
      description: "All candidates are pre-screened and verified for their skills and experience.",
    },
    {
      icon: <Gift className="h-8 w-8 text-primary" />,
      title: "Cost Effective",
      description: "Reduce hiring costs while maintaining high standards in recruitment.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          Why Choose TradesConnect?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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
        <div className="text-center">
          <Button
            onClick={() => navigate("/employer/registration")}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white gap-2"
          >
            Join Now <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
