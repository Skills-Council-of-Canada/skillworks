
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  MessageSquare, 
  BookOpen, 
  Trophy,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useParticipantDashboard } from "@/hooks/useParticipantDashboard";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const ParticipantDashboard = () => {
  const { data, isLoading } = useParticipantDashboard();
  const navigate = useNavigate();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "experience_completed":
        return <Trophy className="h-4 w-4 text-gray-600" />;
      case "module_completed":
        return <BookOpen className="h-4 w-4 text-gray-600" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <div className="text-center py-8">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
      </div>

      {/* Required Actions */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Required Actions</h2>
        <div className="space-y-4">
          {(!data?.stats.activeExperiences || data?.stats.activeExperiences === 0) && (
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                <span>Join a portal to start your learning journey</span>
              </div>
              <Button
                variant="outline"
                className="ml-4"
                onClick={() => navigate('/participant/portals')}
              >
                Browse Portals
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Active Experiences */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">My Experiences</h2>
          <Button
            variant="outline"
            onClick={() => navigate('/participant/experiences')}
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-4">
          {!data?.stats.activeExperiences ? (
            <p className="text-muted-foreground">No active experiences</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Active Experiences</p>
                    <h3 className="text-2xl font-bold">{data.stats.activeExperiences}</h3>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Tasks & Activity */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {data?.recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {getActivityIcon(activity.activity_type)}
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
              </div>
            ))}
            {!data?.recentActivities.length && (
              <p className="text-muted-foreground">No recent activities</p>
            )}
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Upcoming Events</h2>
            <Button
              variant="outline"
              onClick={() => navigate('/participant/calendar')}
            >
              Calendar
              <Calendar className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {data?.upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Calendar className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(event.start_time), "PPp")}
                  </p>
                </div>
              </div>
            ))}
            {!data?.upcomingEvents.length && (
              <p className="text-muted-foreground">No upcoming events</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ParticipantDashboard;
