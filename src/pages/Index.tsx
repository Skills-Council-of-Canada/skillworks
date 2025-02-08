
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Index = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-muted p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary mb-2">
              Welcome, {user?.name}
            </h1>
            <p className="text-secondary/60">
              You are logged in as: {user?.role}
            </p>
          </div>
          <Button
            onClick={logout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm animate-fadeIn">
          <h2 className="text-xl font-semibold mb-4">Quick Start Guide</h2>
          <p className="text-secondary/70">
            This is a temporary dashboard. The full platform with role-specific
            features will be implemented in the next steps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
