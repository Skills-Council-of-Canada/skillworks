
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

interface LandingHeaderProps {
  signUpPath: string;
  buttonText?: string;
}

export const LandingHeader = ({ signUpPath, buttonText = "Sign Up" }: LandingHeaderProps) => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    console.log("Navigating to:", signUpPath);
    navigate(signUpPath, { replace: true });
  };

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
              src="/lovable-uploads/823dbdae-ac03-4c0c-81c9-64e6b55e20c3.png" 
              alt="Skill Works Logo" 
              className="h-8"
            />
          </button>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={handleSignUp}
            className="bg-[#8B0000] hover:bg-[#8B0000]/90"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </header>
  );
};
