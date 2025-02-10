
import { Briefcase, Users, CheckCircle } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center text-secondary mb-12">
          Why Choose TradesConnect?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 space-y-4 text-center">
            <Briefcase className="h-12 w-12 text-primary mx-auto" />
            <h3 className="text-xl font-semibold text-secondary">
              Access Top Talent
            </h3>
            <p className="text-secondary/60">
              Connect with verified skilled professionals ready to join your workforce
            </p>
          </div>
          <div className="p-6 space-y-4 text-center">
            <Users className="h-12 w-12 text-primary mx-auto" />
            <h3 className="text-xl font-semibold text-secondary">
              Efficient Matching
            </h3>
            <p className="text-secondary/60">
              Find candidates that match your specific requirements and company culture
            </p>
          </div>
          <div className="p-6 space-y-4 text-center">
            <CheckCircle className="h-12 w-12 text-primary mx-auto" />
            <h3 className="text-xl font-semibold text-secondary">
              Verified Skills
            </h3>
            <p className="text-secondary/60">
              All professionals are pre-screened and their skills are verified
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
