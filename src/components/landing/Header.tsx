
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const location = useLocation();
  
  // If we're on the index page and logged in, perform logout
  useEffect(() => {
    const handleIndexPageLogout = async () => {
      if (location.pathname === "/" && user) {
        console.log("Auto-logging out on index page");
        await logout();
      }
    };
    
    handleIndexPageLogout();
  }, [location.pathname, user, logout]);
  
  const handleAuthAction = async () => {
    if (user) {
      await logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-50 h-16">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/823dbdae-ac03-4c0c-81c9-64e6b55e20c3.png" 
            alt="Skill Works Logo" 
            className="h-8"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => navigate("/")}
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Button>
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
