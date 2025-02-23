
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Users, BarChart, GraduationCap, UserCheck, ClipboardList, Clock, Briefcase } from "lucide-react";
import { StatsCard } from "./components/StatsCard";
import { QuickActionCard } from "./components/QuickActionCard";
import { useAdminStats } from "./hooks/useAdminStats";
import { Loader2 } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { data: stats, isLoading: isStatsLoading } = useAdminStats(user);

  const isLoading = isAuthLoading || isStatsLoading;

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

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

  const statsCards = [
    { title: "Total Educators", value: stats?.educators || 0, icon: Users },
    { title: "Total Employers", value: stats?.employers || 0, icon: Briefcase },
    { title: "Total Participants", value: stats?.participants || 0, icon: Users },
    { title: "Pending Approvals", value: stats?.pendingApprovals || 0, icon: Clock },
    { title: "Active Experiences", value: stats?.activeExperiences || 0, icon: GraduationCap },
    { title: "Matched Projects", value: stats?.matchedProjects || 0, icon: Users }
  ];

  return (
    <div className="space-y-6 p-6">      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statsCards.map((card, index) => (
          <StatsCard
            key={index}
            title={card.title}
            value={isStatsLoading ? "..." : card.value}
            icon={card.icon}
          />
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {quickActions.map((action, index) => (
            <QuickActionCard
              key={index}
              title={action.title}
              description={action.description}
              icon={action.icon}
              onClick={action.onClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
