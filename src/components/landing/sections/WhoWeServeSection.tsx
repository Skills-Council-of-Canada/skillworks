
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, GraduationCap, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const WhoWeServeSection = () => {
  const navigate = useNavigate();

  const userTypes = [
    {
      title: "For Employers",
      description: "Find top talent, assign projects, and hire skilled professionals.",
      icon: Building2,
      cta: "Post a Project",
      path: "/employer-landing"
    },
    {
      title: "For Educators",
      description: "Integrate real-world projects into your curriculum.",
      icon: GraduationCap,
      cta: "Join as an Educator",
      path: "/educator-landing"
    },
    {
      title: "For Participants",
      description: "Work on employer-backed projects and gain career experience.",
      icon: Users,
      cta: "Find a Project",
      path: "/participant-landing"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Clear pathway to building employment success</h2>
          <p className="text-xl text-gray-600">Find the right experience for your journey</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {userTypes.map((type, index) => (
            <div key={index} className="flex flex-col items-center text-center p-8 bg-white rounded-lg shadow-lg">
              <type.icon className="w-16 h-16 text-primary mb-6" />
              <h3 className="text-2xl font-semibold mb-4">{type.title}</h3>
              <p className="text-gray-600 mb-8">{type.description}</p>
              <Button 
                onClick={() => navigate(type.path)}
                className="group"
              >
                {type.cta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <div className="relative w-full max-w-3xl">
            <div className="absolute inset-0 bg-primary/5 rounded-lg transform -rotate-1"></div>
            <div className="relative bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1 text-center">Employers</div>
                <ArrowRight className="mx-4 text-primary" />
                <div className="flex-1 text-center">Projects</div>
                <ArrowRight className="mx-4 text-primary" />
                <div className="flex-1 text-center">Participants</div>
                <ArrowRight className="mx-4 text-primary" />
                <div className="flex-1 text-center">Educators</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
