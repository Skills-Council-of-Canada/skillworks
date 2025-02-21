
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PlusCircle, Users, Briefcase, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const QuickStatCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
}) => (
  <Card className="p-6">
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-primary/10 rounded-full">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  </Card>
);

const EmployerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch employer profile
  const { data: employerProfile, isLoading } = useQuery({
    queryKey: ['employerProfile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employers')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  // Mock data - replace with real data later
  const stats = {
    activeProjects: 3,
    pendingApplications: 12,
    totalApplicants: 45,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Get first name by splitting the full name and taking the first part
  const firstName = user?.name?.split(' ')[0] || "there";

  return (
    <div className="space-y-8">
      {!employerProfile && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please complete your profile setup before creating projects.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome back, {firstName}
          </h2>
          <p className="text-muted-foreground mt-2">
            Here's what's happening with your projects today.
          </p>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => navigate("create-project")}
          disabled={!employerProfile}
        >
          <PlusCircle className="h-4 w-4" />
          Create New Project
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <QuickStatCard
          title="Active Projects"
          value={stats.activeProjects}
          icon={Briefcase}
        />
        <QuickStatCard
          title="Pending Applications"
          value={stats.pendingApplications}
          icon={Clock}
        />
        <QuickStatCard
          title="Total Applicants"
          value={stats.totalApplicants}
          icon={Users}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              No recent activity to display.
            </p>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Upcoming Deadlines</h3>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              No upcoming deadlines to display.
            </p>
          </div>
        </Card>
      </div>

      {!employerProfile && (
        <div className="flex justify-center">
          <Button onClick={() => navigate("/employer/settings")}>
            Complete Profile Setup
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;
