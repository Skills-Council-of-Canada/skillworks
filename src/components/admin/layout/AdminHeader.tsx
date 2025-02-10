
import { User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface AdminHeaderProps {
  pageTitle: string;
}

export const AdminHeader = ({ pageTitle }: AdminHeaderProps) => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    try {
      await login("admin@skillscouncil.ca", "Bloiselle5!")
        .then((result) => {
          if (result?.user?.role === 'admin') {
            navigate("/admin", { replace: true });
            toast({
              title: "Success",
              description: "Logged in as admin successfully",
            });
          } else {
            toast({
              title: "Error",
              description: "Unauthorized access",
              variant: "destructive",
            });
          }
        });
    } catch (error) {
      console.error("Admin login failed:", error);
      toast({
        title: "Error",
        description: "Login failed",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{pageTitle}</h1>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user?.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                    logout();
                    navigate('/login');
                  }}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button onClick={handleAdminLogin}>
              Admin Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
