
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
      cta: "Learn More",
      path: "/employer-landing"
    },
    {
      title: "For Educators",
      description: "Integrate real-world projects into your curriculum.",
      icon: GraduationCap,
      cta: "Learn More",
      path: "/educator-landing"
    },
    {
      title: "For Participants",
      description: "Work on employer-backed projects and gain career experience.",
      icon: Users,
      cta: "Learn More",
      path: "/participant-landing"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <img 
            src="/lovable-uploads/cf4d2cec-24d7-47c8-8c38-a58f18481c6e.png" 
            alt="Peel District School Board Logo" 
            className="h-12 mb-8" // Changed from h-24 to h-12 to reduce size by half
          />
          <h2 className="text-4xl font-bold mb-4 text-center">Clear pathway to building employment success</h2>
          <p className="text-xl text-gray-600">Breaking down barriers for employers, educators and students</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {userTypes.map((type, index) => (
            <div key={index} className="flex flex-col h-full bg-white rounded-lg shadow-lg">
              <div className="flex-grow p-8">
                <div className="flex flex-col h-full">
                  <div className="flex justify-center mb-6">
                    <type.icon className="w-16 h-16 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{type.title}</h3>
                  <p className="text-gray-600 flex-grow">{type.description}</p>
                  <div className="pt-8">
                    <Button 
                      onClick={() => navigate(type.path)}
                      className="group bg-[#8B0000] hover:bg-[#8B0000]/90 text-white w-full"
                    >
                      {type.cta}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
