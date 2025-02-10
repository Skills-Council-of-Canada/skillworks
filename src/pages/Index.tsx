
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Only check if there's an active session, don't try to load profile
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // If user is authenticated, redirect to their default route based on role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profile?.role) {
          const redirectPath = profile.role === 'admin' 
            ? '/admin/dashboard'
            : profile.role === 'educator'
            ? '/educator/dashboard'
            : profile.role === 'employer'
            ? '/employer/dashboard'
            : '/participant/dashboard';
            
          navigate(redirectPath, { replace: true });
        }
      }
    };

    checkSession();
  }, [navigate]);

  // Show welcome screen for non-authenticated users without trying to load profile
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
