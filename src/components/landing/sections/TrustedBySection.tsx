
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const TrustedBySection = () => {
  const partners = [
    { name: "Tech Corp", logo: "placeholder.svg" },
    { name: "City University", logo: "placeholder.svg" },
    { name: "Gov Agency", logo: "placeholder.svg" },
    { name: "Industry Leader", logo: "placeholder.svg" }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted By</h2>
          <p className="text-gray-600">Leading organizations that trust our platform</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-12 w-auto grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" className="group">
            Become a Partner
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};
