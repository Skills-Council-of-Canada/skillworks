
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Home, GraduationCap } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const handleAuthAction = async () => {
    if (user) {
      await logout();
    } else {
      navigate("/login");
    }
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-50 h-16">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/">
            <img 
              src="/lovable-uploads/823dbdae-ac03-4c0c-81c9-64e6b55e20c3.png" 
              alt="Skill Works Logo" 
              className="h-8"
            />
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => navigate("/")}
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Button>
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
            {user ? (
              <>
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
