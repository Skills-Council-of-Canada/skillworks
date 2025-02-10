
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Users, FileText, BarChart, GraduationCap, UserCheck, ClipboardList, Clock, Briefcase } from "lucide-react";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

interface DashboardStats {
  educators: number;
  employers: number;
  participants: number;
  pendingApprovals: number;
  activeExperiences: number;
  matchedProjects: number;
}

type CountQueryResponse = PostgrestSingleResponse<{ count: number }>;

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user?.id)
        .maybeSingle();

      if (profile?.role !== 'admin') {
        throw new Error('Unauthorized access');
      }

      const [
        { data: educatorCount },
        { data: employerCount },
        { data: participantCount },
        { data: pendingApprovalsCount },
        { data: activeExperiencesCount },
        { data: matchedProjectsCount }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'educator').then(result => result as CountQueryResponse),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'employer').then(result => result as CountQueryResponse),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'participant').then(result => result as CountQueryResponse),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('verified', false).then(result => result as CountQueryResponse),
        supabase.from('educator_experiences').select('*', { count: 'exact', head: true }).eq('status', 'published').then(result => result as CountQueryResponse),
        supabase.from('experience_matches').select('*', { count: 'exact', head: true }).eq('status', 'matched').then(result => result as CountQueryResponse)
      ]);

      return {
        educators: educatorCount?.count || 0,
        employers: employerCount?.count || 0,
        participants: participantCount?.count || 0,
        pendingApprovals: pendingApprovalsCount?.count || 0,
        activeExperiences: activeExperiencesCount?.count || 0,
        matchedProjects: matchedProjectsCount?.count || 0
      };
    },
    meta: {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to load dashboard statistics",
          variant: "destructive",
        });
      }
    }
  });

  const quickActions = [
    {
      title: "Approve Users",
      icon: UserCheck,
      onClick: () => navigate("/admin/users"),
      description: `${stats?.pendingApprovals || 0} pending approvals`
    },
    {
      title: "Review Experiences",
      icon: ClipboardList,
      onClick: () => navigate("/admin/experiences"),
      description: "Review and manage experiences"
    },
    {
      title: "View Reports",
      icon: BarChart,
      onClick: () => navigate("/admin/reports"),
      description: "Access system analytics"
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
      
      {/* Summary Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Educators</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : stats?.educators}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employers</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : stats?.employers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : stats?.participants}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : stats?.pendingApprovals}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Experiences</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : stats?.activeExperiences}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Matched Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : stats?.matchedProjects}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:bg-accent cursor-pointer" onClick={action.onClick}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{action.title}</CardTitle>
                <action.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
