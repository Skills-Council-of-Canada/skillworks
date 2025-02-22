
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export const Header = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    console.log("Navigating to employer registration");
    navigate("/employer/registration");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-primary hover:bg-primary/10"
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
        <div>
          <Button
            onClick={handleSignUp}
            className="bg-primary text-white hover:bg-primary/90"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};
