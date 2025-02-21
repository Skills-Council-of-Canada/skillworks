
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

interface LandingHeaderProps {
  signUpPath: string;
  buttonText?: string;
}

export const LandingHeader = ({ signUpPath, buttonText = "Sign Up" }: LandingHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-secondary hover:text-primary"
          >
            <Home className="h-5 w-5" />
          </Button>
          <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
            <img 
              src="/lovable-uploads/f55205da-68be-4106-a1f8-a42fa33f103f.png" 
              alt="Skill Works Logo" 
              className="h-8"
            />
          </button>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => navigate(signUpPath)}
            className="bg-[#8B0000] hover:bg-[#8B0000]/90"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </header>
  );
};
