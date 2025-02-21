
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays } from "lucide-react";
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
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate("/login")}
            className="group"
          >
            Sign Up Now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="group border-white text-white hover:bg-white hover:text-primary"
          >
            Schedule a Demo
            <CalendarDays className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
