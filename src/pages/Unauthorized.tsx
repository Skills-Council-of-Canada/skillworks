
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="text-center space-y-6 animate-fadeIn">
        <Lock className="mx-auto h-16 w-16 text-secondary/40" />
        <h1 className="text-4xl font-bold text-secondary">Access Denied</h1>
        <p className="text-secondary/60 max-w-md">
          You don't have permission to access this page. Please contact your
          administrator if you think this is a mistake.
        </p>
        <Button
          onClick={() => navigate("/dashboard")}
          className="bg-primary hover:bg-primary/90"
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
