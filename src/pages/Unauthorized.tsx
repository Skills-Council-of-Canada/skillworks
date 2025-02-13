
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <div className="text-center space-y-6 animate-fadeIn max-w-md mx-auto">
        <Lock className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-secondary/40" />
        <h1 className="text-2xl sm:text-4xl font-bold text-secondary">Access Denied</h1>
        <p className="text-sm sm:text-base text-secondary/60">
          You don't have permission to access this page. Please contact your
          administrator if you think this is a mistake.
        </p>
        <Button
          onClick={() => navigate("/dashboard")}
          className="w-full sm:w-auto bg-primary hover:bg-primary/90"
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
