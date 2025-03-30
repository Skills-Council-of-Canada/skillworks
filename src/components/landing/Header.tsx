
import { Button } from "@/components/ui/button";
import { LogIn, Home, GraduationCap } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Header = () => {
  const navigate = useNavigate();
  
  const handleAuthAction = () => {
    navigate("/login");
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-50 h-16">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/">
            <img 
              src="/lovable-uploads/04df2519-2be9-436b-b58c-2f34c0d1710e.png" 
              alt="Skills Council of Canada Logo" 
              className="h-[11.52px]"
            />
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link 
            to="/career-pathways"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <GraduationCap className="h-4 w-4" />
            <span className="hidden sm:inline">Career Pathways</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={handleAuthAction}
          >
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline">Login</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
