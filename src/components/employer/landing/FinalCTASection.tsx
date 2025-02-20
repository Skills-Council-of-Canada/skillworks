
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lightbulb, Target } from "lucide-react";

export const FinalCTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 bg-primary">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Lightbulb className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Join leading employers transforming workforce development.
        </h2>
        <div className="flex items-center justify-center gap-2 mb-8">
          <Target className="h-8 w-8 text-white" />
        </div>
        <Button
          size="lg"
          onClick={() => navigate("/employer/registration")}
          className="bg-white text-primary hover:bg-white/90 text-lg px-8"
        >
          Get Started Today!
        </Button>
      </div>
    </section>
  );
};
