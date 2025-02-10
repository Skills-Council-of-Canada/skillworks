
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import PortalSelection from "@/components/auth/PortalSelection";
import { UserRole } from "@/types/auth";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handlePortalSelect = (portalId: string, role: UserRole) => {
    switch (portalId) {
      case "employer":
        navigate("/employer-landing");
        break;
      case "educator":
        navigate("/educator-landing");
        break;
      case "participant":
        navigate("/participant-landing");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to TradesConnect</h1>
      <PortalSelection onPortalSelect={handlePortalSelect} />
      <p className="mt-4 text-sm text-muted-foreground">
        Recommended email: employ@skillscouncil.ca
      </p>
    </div>
  );
};

export default Index;

