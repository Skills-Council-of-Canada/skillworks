
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

interface HeaderProps {
  onAdminLoginClick: () => void;
}

const Header = ({ onAdminLoginClick }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold text-primary">TradesConnect</div>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={onAdminLoginClick}
        >
          <LogIn className="h-4 w-4" />
          Admin Login
        </Button>
      </div>
    </header>
  );
};

export default Header;
