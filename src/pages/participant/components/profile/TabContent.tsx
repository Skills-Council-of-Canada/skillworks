
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EducationList } from "./EducationList";
import { WorkExperienceList } from "./WorkExperienceList";
import { FeedbackList } from "./FeedbackList";
import { ExperienceList } from "./ExperienceList";
import { AchievementList } from "./AchievementList";
import { Separator } from "@/components/ui/separator";

interface TabContentProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export const TabContent = ({ activeTab, setActiveTab }: TabContentProps) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Experience</h3>
                <WorkExperienceList />
              </div>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
                <EducationList />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="experiences">
            <ExperienceList />
          </TabsContent>

          <TabsContent value="feedback">
            <FeedbackList />
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
