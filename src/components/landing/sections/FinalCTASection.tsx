
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const FinalCTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Start Your Journey Today!</h2>
        <p className="text-xl mb-12 text-primary-foreground/90">
          Join thousands of learners, educators, and employers making real-world connections.
        </p>
        
        <Button 
          size="lg" 
          variant="secondary"
          onClick={() => navigate("/login")}
          className="group"
        >
          Sign Up Now
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
};
