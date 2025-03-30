
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
              <img 
                src="/lovable-uploads/04df2519-2be9-436b-b58c-2f34c0d1710e.png" 
                alt="Skills Council of Canada Logo" 
                className="h-8"
              />
            </button>
            <Separator orientation="vertical" className="h-6" />
            <img 
              src="/lovable-uploads/6e901ee2-903c-46fa-8815-47d08d59ae7a.png" 
              alt="Peel District School Board Logo" 
              className="h-8"
            />
          </div>
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
