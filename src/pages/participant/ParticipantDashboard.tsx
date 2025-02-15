import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  MessageSquare, 
  BookOpen, 
  Trophy,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Clock,
  BookMarked,
  FileText
} from "lucide-react";
import { useParticipantDashboard } from "@/hooks/useParticipantDashboard";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useProfileCompletion } from "@/hooks/participant/useProfileCompletion";

const ParticipantDashboard = () => {
  const { data, isLoading } = useParticipantDashboard();
  const { profile, completionPercentage } = useProfileCompletion();
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const getTaskPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-blue-500";
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
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground">Here's an overview of your learning journey</p>
        </div>
        {completionPercentage < 100 && (
          <Button onClick={() => navigate('/participant/profile')}>
            Complete Profile
          </Button>
        )}
      </div>

      {/* Profile Completion Progress */}
      <Card className="p-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <h3 className="font-semibold">Profile Completion</h3>
            <span>{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} />
          {completionPercentage < 100 && (
            <p className="text-sm text-muted-foreground mt-2">
              Complete your profile to unlock all features
            </p>
          )}
        </div>
      </Card>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Active Experiences</p>
              <h3 className="text-2xl font-bold">{data?.stats.activeExperiences}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Trophy className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Completed</p>
              <h3 className="text-2xl font-bold">{data?.stats.completedExperiences}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Pending Tasks</p>
              <h3 className="text-2xl font-bold">{data?.stats.pendingTasks}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageSquare className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Unread Messages</p>
              <h3 className="text-2xl font-bold">{data?.stats.unreadMessages}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Tasks Overview */}
        <Card className="col-span-1">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Tasks Overview</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {data?.tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      task.status === 'completed' ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {task.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Clock className={`h-4 w-4 ${getTaskPriorityColor(task.priority)}`} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{task.title}</p>
                      {task.due_date && (
                        <p className="text-sm text-muted-foreground">
                          Due: {format(new Date(task.due_date), 'PPp')}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className={`text-sm ${getTaskPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
              ))}
              {!data?.tasks.length && (
                <p className="text-muted-foreground text-center py-4">No pending tasks</p>
              )}
            </div>
          </div>
        </Card>

        {/* Pending Applications */}
        <Card className="col-span-1">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Pending Applications</h2>
            </div>
            <div className="space-y-4">
              {data?.pendingApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{application.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Submitted: {format(new Date(application.submitted_at), 'PP')}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm capitalize">{application.status}</span>
                </div>
              ))}
              {!data?.pendingApplications.length && (
                <p className="text-muted-foreground text-center py-4">No pending applications</p>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recommended Experiences</h2>
          <Button
            variant="outline"
            onClick={() => navigate('/participant/experiences')}
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.recommendations.map((recommendation) => (
            <Card key={recommendation.id} className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BookMarked className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Match Score: {recommendation.match_score}%</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto font-normal text-muted-foreground"
                    onClick={() => navigate(`/participant/experiences/${recommendation.experience_id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          {!data?.recommendations.length && (
            <p className="text-muted-foreground col-span-3 text-center py-4">
              No recommendations available yet
            </p>
          )}
        </div>
      </Card>

      {/* Recent Activity & Upcoming Events */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {data?.recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {getActivityIcon(activity.activity_type)}
                </div>
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(activity.created_at), 'PP')}
                  </p>
                </div>
              </div>
            ))}
            {!data?.recentActivities.length && (
              <p className="text-muted-foreground text-center py-4">No recent activities</p>
            )}
          </div>
        </Card>

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
              <div key={event.id} className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Calendar className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(event.start_time), 'PPp')}
                  </p>
                </div>
              </div>
            ))}
            {!data?.upcomingEvents.length && (
              <p className="text-muted-foreground text-center py-4">No upcoming events</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ParticipantDashboard;
