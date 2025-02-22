
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
    <div className="w-full max-w-full overflow-hidden">
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
              <div className="flex-1 min-w-0"> {/* Added min-w-0 to prevent flex item from overflowing */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left sm:flex-row justify-between gap-3 sm:gap-4">
                  <div className="w-full sm:w-auto">
                    <h1 className="text-xl sm:text-2xl font-bold truncate max-w-[200px] sm:max-w-none">
                      {profile?.full_name}
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base mt-1 break-words">
                      {profile?.educational_background || "No educational background provided"}
                    </p>
                  </div>
                  <Link to="/participant/settings" className="sm:self-start shrink-0">
                    <Button size={isMobile ? "sm" : "default"} className="gap-2">
                      <Pencil className="h-4 w-4" />
                      <span className="whitespace-nowrap">Edit profile</span>
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
          <div className="overflow-x-auto no-scrollbar -mx-3 px-3"> {/* Negative margin to allow full-width scroll */}
            <TabsList className="mb-6 sm:mb-8 w-full flex justify-start bg-transparent p-0 h-auto">
              <TabsTrigger 
                value="profile" 
                className="flex-1 sm:flex-none text-sm py-2.5 px-2 sm:px-6 min-w-[80px]"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger 
                value="feedback" 
                className="flex-1 sm:flex-none text-sm py-2.5 px-2 sm:px-6 min-w-[80px]"
              >
                Feedback
              </TabsTrigger>
              <TabsTrigger 
                value="experiences" 
                className="flex-1 sm:flex-none text-sm py-2.5 px-2 sm:px-6 min-w-[80px]"
              >
                Experiences
              </TabsTrigger>
              <TabsTrigger 
                value="achievements" 
                className="flex-1 sm:flex-none text-sm py-2.5 px-2 sm:px-6 min-w-[80px]"
              >
                Achievements
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="profile" className="focus-visible:outline-none">
            <div className="space-y-4 sm:space-y-6">
              {/* Basic Information */}
              <div className="bg-white p-3 sm:p-6 rounded-lg shadow-sm">
                <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Basic Information</h2>
                <div className="space-y-2 sm:space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-gray-50 rounded-md overflow-hidden">
                      <p className="text-gray-600 text-sm sm:text-base">
                        <span className="font-medium block sm:inline">Email:</span>{' '}
                        <span className="break-all">{profile?.email}</span>
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 bg-gray-50 rounded-md">
                      <p className="text-gray-600 text-sm sm:text-base">
                        <span className="font-medium block sm:inline">Phone:</span>{' '}
                        <span className="break-all">{profile?.phone || "Not provided"}</span>
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 bg-gray-50 rounded-md">
                      <p className="text-gray-600 text-sm sm:text-base">
                        <span className="font-medium block sm:inline">Preferred Contact:</span>{' '}
                        <span className="break-all">{profile?.preferred_contact || "Not specified"}</span>
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 bg-gray-50 rounded-md">
                      <p className="text-gray-600 text-sm sm:text-base">
                        <span className="font-medium block sm:inline">Date of Birth:</span>{' '}
                        <span className="break-all">
                          {profile?.date_of_birth ? format(new Date(profile.date_of_birth), 'PPP') : "Not provided"}
                        </span>
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 bg-gray-50 rounded-md">
                      <p className="text-gray-600 text-sm sm:text-base">
                        <span className="font-medium block sm:inline">Skill Level:</span>{' '}
                        <span className="break-all">{profile?.skill_level}</span>
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 bg-gray-50 rounded-md">
                      <p className="text-gray-600 text-sm sm:text-base">
                        <span className="font-medium block sm:inline">Availability:</span>{' '}
                        <span className="break-all">{profile?.availability}</span>
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

          <TabsContent value="feedback" className="focus-visible:outline-none">
            <FeedbackList />
          </TabsContent>

          <TabsContent value="experiences" className="focus-visible:outline-none">
            <ExperienceList />
          </TabsContent>

          <TabsContent value="achievements" className="focus-visible:outline-none">
            <AchievementList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
