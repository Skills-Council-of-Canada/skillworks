import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, Briefcase, Clock, AlertCircle, LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const QuickStatCard = ({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string;
  value: number;
  description?: string;
  icon: LucideIcon;
}) => (
  <Card className="p-4 sm:p-6">
    <div className="flex items-center space-x-4">
      <div className="p-2 sm:p-3 bg-primary/10 rounded-full shrink-0">
        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <h3 className="text-xl sm:text-2xl font-bold text-foreground">{value}</h3>
        {description && (
          <p className="text-xs sm:text-sm text-foreground/80 mt-1 line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </div>
  </Card>
);

const EmployerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const stats = {
    activeProjects: {
      value: 3,
      description: "Ongoing projects in your portfolio"
    },
    pendingApplications: {
      value: 12,
      description: "Applications awaiting review"
    },
    totalApplicants: {
      value: 45,
      description: "Total learner applications received"
    }
  };

  if (isLoading) {
    return <div className="text-foreground">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {!employerProfile && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please complete your profile setup before creating projects.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full">
          <p className="text-foreground text-sm sm:text-base">
            Here's what's happening with your projects today.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <QuickStatCard
          title="Active Projects"
          value={stats.activeProjects.value}
          description={stats.activeProjects.description}
          icon={Briefcase}
        />
        <QuickStatCard
          title="Pending Applications"
          value={stats.pendingApplications.value}
          description={stats.pendingApplications.description}
          icon={Clock}
        />
        <QuickStatCard
          title="Total Applicants"
          value={stats.totalApplicants.value}
          description={stats.totalApplicants.description}
          icon={Users}
        />
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
        <Card className="p-4 sm:p-6">
          <h3 className="font-semibold mb-4 text-foreground">Recent Activity</h3>
          <div className="space-y-4">
            <p className="text-sm text-foreground/80">
              No recent activity to display.
            </p>
          </div>
        </Card>
        <Card className="p-4 sm:p-6">
          <h3 className="font-semibold mb-4 text-foreground">Upcoming Deadlines</h3>
          <div className="space-y-4">
            <p className="text-sm text-foreground/80">
              No upcoming deadlines to display.
            </p>
          </div>
        </Card>
      </div>

      {!employerProfile && (
        <div className="flex justify-center">
          <Button 
            onClick={() => navigate("/employer/settings")}
            className="w-full sm:w-auto"
          >
            Complete Profile Setup
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;
