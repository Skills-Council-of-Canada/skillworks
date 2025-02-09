
import { Card } from "@/components/ui/card";
import { Calendar, MessageSquare, BookOpen, Trophy } from "lucide-react";

const ParticipantDashboard = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your learning journey</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
              <h3 className="text-2xl font-bold">3</h3>
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
              <h3 className="text-2xl font-bold">7</h3>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
              <h3 className="text-2xl font-bold">2</h3>
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
              <h3 className="text-2xl font-bold">5</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-8">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <BookOpen className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Completed Module 3</p>
                <p className="text-sm text-muted-foreground">Introduction to Safety</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Trophy className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Earned Certificate</p>
                <p className="text-sm text-muted-foreground">Workplace Safety Basics</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Upcoming Sessions</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Calendar className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Safety Equipment Training</p>
                <p className="text-sm text-muted-foreground">Tomorrow at 10:00 AM</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Calendar className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Mentorship Meeting</p>
                <p className="text-sm text-muted-foreground">Friday at 2:00 PM</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ParticipantDashboard;
