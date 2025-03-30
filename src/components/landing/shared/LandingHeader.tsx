
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const LandingHeader = ({ 
  signUpPath, 
  buttonText 
}: { 
  signUpPath: string, 
  buttonText: string 
}) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
            <img 
              src="/lovable-uploads/8bbf2276-ce55-4852-8104-36d43f6e2082.png" 
              alt="Skills Council of Canada Logo" 
              className="h-8"
            />
          </button>
        </div>
        <div>
          <Button
            onClick={() => navigate(signUpPath)}
            className="bg-primary text-white hover:bg-primary/90"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </header>
  );
};
