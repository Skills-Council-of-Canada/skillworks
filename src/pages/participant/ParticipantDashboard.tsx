
import { Card } from "@/components/ui/card";
import { Calendar, MessageSquare, BookOpen, Trophy } from "lucide-react";
import { useParticipantDashboard } from "@/hooks/useParticipantDashboard";
import { format } from "date-fns";

const ParticipantDashboard = () => {
  const { data, isLoading } = useParticipantDashboard();

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
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Experiences</p>
              <h3 className="text-2xl font-bold">{data?.stats.activeExperiences || 0}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Trophy className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Completed</p>
              <h3 className="text-2xl font-bold">{data?.stats.completedExperiences || 0}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Upcoming Events</p>
              <h3 className="text-2xl font-bold">{data?.stats.upcomingEvents || 0}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <MessageSquare className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Messages</p>
              <h3 className="text-2xl font-bold">{data?.stats.unreadMessages || 0}</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
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
              <p className="text-sm text-muted-foreground">No recent activities</p>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Upcoming Events</h3>
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
              <p className="text-sm text-muted-foreground">No upcoming events</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ParticipantDashboard;
