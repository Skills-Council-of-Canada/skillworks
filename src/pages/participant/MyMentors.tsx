
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, CheckSquare, Star } from "lucide-react";
import { MentorMessaging } from "@/components/participant/mentors/MentorMessaging";
import { FeedbackRequests } from "@/components/participant/mentors/FeedbackRequests";
import { SkillAssessments } from "@/components/participant/mentors/SkillAssessments";
import { useIsMobile } from "@/hooks/use-mobile";

const MyMentors = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-white">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="max-w-[100vw] mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6">
          <Card className="border-0 sm:border">
            <CardHeader className="px-2 sm:px-6 py-3 sm:py-4">
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold">My Mentors</CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6 py-3 sm:py-4">
              <Tabs defaultValue="messages" className="space-y-4">
                <div className="w-full overflow-x-auto no-scrollbar -mx-2 px-2">
                  <TabsList className="w-full inline-flex justify-start bg-gray-50 p-1 min-w-max">
                    <TabsTrigger 
                      value="messages" 
                      className="flex items-center gap-1.5 text-xs sm:text-sm py-1.5 px-2 sm:px-4"
                    >
                      <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="whitespace-nowrap">Messages</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="feedback" 
                      className="flex items-center gap-1.5 text-xs sm:text-sm py-1.5 px-2 sm:px-4"
                    >
                      <CheckSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="whitespace-nowrap">Feedback Requests</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="assessments" 
                      className="flex items-center gap-1.5 text-xs sm:text-sm py-1.5 px-2 sm:px-4"
                    >
                      <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="whitespace-nowrap">Skill Assessments</span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="mt-4 sm:mt-6">
                  <TabsContent value="messages" className="m-0">
                    <MentorMessaging />
                  </TabsContent>
                  <TabsContent value="feedback" className="m-0">
                    <FeedbackRequests />
                  </TabsContent>
                  <TabsContent value="assessments" className="m-0">
                    <SkillAssessments />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyMentors;
