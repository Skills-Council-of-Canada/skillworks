
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        navigate("/login", { replace: true });
      }
    };

    checkSession();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to TradesConnect</h1>
      <p className="text-lg text-muted-foreground text-center mb-8">
        Please log in to access your portal
      </p>
      <Button 
        onClick={() => navigate("/login")}
        className="gap-2"
      >
        Go to Login
        <ArrowRight className="h-4 w-4" />
      </Button>
      <p className="mt-4 text-sm text-muted-foreground">
        Recommended email: employ@skillscouncil.ca
      </p>
    </div>
  );
};

export default Index;
