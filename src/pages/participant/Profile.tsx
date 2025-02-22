
import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Pencil } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { EducationList } from "./components/profile/EducationList";
import { WorkExperienceList } from "./components/profile/WorkExperienceList";
import { FeedbackList } from "./components/profile/FeedbackList";
import { ExperienceList } from "./components/profile/ExperienceList";
import { AchievementList } from "./components/profile/AchievementList";
import { useProfileCompletion } from "@/hooks/participant/useProfileCompletion";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";

export const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const { profile, isLoading, completionPercentage } = useProfileCompletion();
  const isMobile = useIsMobile();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Profile Header */}
      <div className="mb-6 sm:mb-8">
        <div className="relative bg-white rounded-lg shadow-sm p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-6">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 shrink-0">
              {profile?.avatar_url ? (
                <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
              ) : (
                <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl sm:text-4xl">
                  {profile?.full_name?.[0] || user?.name?.[0]}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1 w-full">
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left sm:flex-row justify-between gap-3 sm:gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold truncate max-w-[250px] sm:max-w-none">
                    {profile?.full_name}
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base mt-1">
                    {profile?.educational_background || "No educational background provided"}
                  </p>
                </div>
                <Link to="/participant/settings" className="sm:self-start">
                  <Button size={isMobile ? "sm" : "default"} className="gap-2 whitespace-nowrap">
                    <Pencil className="h-4 w-4" />
                    Edit profile
                  </Button>
                </Link>
              </div>
              
              {/* Profile Completion Progress */}
              <div className="mt-4 w-full">
                <Progress value={completionPercentage} className="mb-2" />
                <p className="text-sm text-gray-600 text-center sm:text-left">
                  Profile Completion: {completionPercentage}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 sm:mb-8 w-full flex overflow-x-auto no-scrollbar justify-start bg-transparent p-0 h-auto">
          <TabsTrigger 
            value="profile" 
            className="flex-1 sm:flex-none text-sm py-2.5 px-3 sm:px-6"
          >
            Profile
          </TabsTrigger>
          <TabsTrigger 
            value="feedback" 
            className="flex-1 sm:flex-none text-sm py-2.5 px-3 sm:px-6"
          >
            Feedback
          </TabsTrigger>
          <TabsTrigger 
            value="experiences" 
            className="flex-1 sm:flex-none text-sm py-2.5 px-3 sm:px-6"
          >
            Experiences
          </TabsTrigger>
          <TabsTrigger 
            value="achievements" 
            className="flex-1 sm:flex-none text-sm py-2.5 px-3 sm:px-6"
          >
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="space-y-4 sm:space-y-6">
            {/* Basic Information */}
            <div className="bg-white p-3 sm:p-6 rounded-lg shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Basic Information</h2>
              <div className="space-y-2 sm:space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-gray-50 rounded-md">
                    <p className="text-gray-600 text-sm sm:text-base">
                      <span className="font-medium">Email:</span><br className="sm:hidden" /> {profile?.email}
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 bg-gray-50 rounded-md">
                    <p className="text-gray-600 text-sm sm:text-base">
                      <span className="font-medium">Phone:</span><br className="sm:hidden" /> {profile?.phone || "Not provided"}
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 bg-gray-50 rounded-md">
                    <p className="text-gray-600 text-sm sm:text-base">
                      <span className="font-medium">Preferred Contact:</span><br className="sm:hidden" /> {profile?.preferred_contact || "Not specified"}
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 bg-gray-50 rounded-md">
                    <p className="text-gray-600 text-sm sm:text-base">
                      <span className="font-medium">Date of Birth:</span><br className="sm:hidden" /> {profile?.date_of_birth ? format(new Date(profile.date_of_birth), 'PPP') : "Not provided"}
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 bg-gray-50 rounded-md">
                    <p className="text-gray-600 text-sm sm:text-base">
                      <span className="font-medium">Skill Level:</span><br className="sm:hidden" /> {profile?.skill_level}
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 bg-gray-50 rounded-md">
                    <p className="text-gray-600 text-sm sm:text-base">
                      <span className="font-medium">Availability:</span><br className="sm:hidden" /> {profile?.availability}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Areas */}
            <div className="bg-white p-3 sm:p-6 rounded-lg shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Preferred Learning Areas</h2>
              <div className="flex flex-wrap gap-2">
                {profile?.preferred_learning_areas?.map((area, index) => (
                  <span 
                    key={index}
                    className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm"
                  >
                    {area}
                  </span>
                )) || "No learning areas specified"}
              </div>
            </div>

            {/* Work Experience */}
            <div className="bg-white p-3 sm:p-6 rounded-lg shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Work experience</h2>
              <WorkExperienceList />
            </div>

            {/* Education */}
            <div className="bg-white p-3 sm:p-6 rounded-lg shadow-sm">
              <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Education</h2>
              <EducationList />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="feedback">
          <FeedbackList />
        </TabsContent>

        <TabsContent value="experiences">
          <ExperienceList />
        </TabsContent>

        <TabsContent value="achievements">
          <AchievementList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
