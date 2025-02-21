
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const handleAuthAction = async () => {
    if (user) {
      await logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/f55205da-68be-4106-a1f8-a42fa33f103f.png" 
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
