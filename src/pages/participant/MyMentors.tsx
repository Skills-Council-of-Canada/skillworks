
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, CheckSquare, Star } from "lucide-react";
import { MentorMessaging } from "@/components/participant/mentors/MentorMessaging";
import { FeedbackRequests } from "@/components/participant/mentors/FeedbackRequests";
import { SkillAssessments } from "@/components/participant/mentors/SkillAssessments";

const MyMentors = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Mentors</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="messages" className="space-y-4">
            <TabsList>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="feedback">Feedback Requests</TabsTrigger>
              <TabsTrigger value="assessments">Skill Assessments</TabsTrigger>
            </TabsList>
            <TabsContent value="messages">
              <MentorMessaging />
            </TabsContent>
            <TabsContent value="feedback">
              <FeedbackRequests />
            </TabsContent>
            <TabsContent value="assessments">
              <SkillAssessments />
            </TabsContent>
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyMentors;
