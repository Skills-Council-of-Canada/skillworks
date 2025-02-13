
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold text-primary">TradesConnect</div>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={() => navigate("/login")}
        >
          <LogIn className="h-4 w-4" />
          Login
        </Button>
      </div>
    </header>
  );
};

export default Header;
