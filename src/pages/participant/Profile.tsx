
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

export const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const { profile, isLoading, completionPercentage } = useProfileCompletion();

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Profile Header */}
      <div className="mb-8">
        <div className="relative">
          <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 rounded-t-lg" />
          <div className="absolute -bottom-16 left-8">
            <Avatar className="h-32 w-32 border-4 border-white">
              {profile?.avatar_url ? (
                <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
              ) : (
                <AvatarFallback className="bg-blue-100 text-blue-600 text-4xl">
                  {profile?.full_name?.[0] || user?.name?.[0]}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
          <div className="absolute bottom-4 right-4">
            <Link to="/participant/settings">
              <Button className="gap-2">
                <Pencil className="h-4 w-4" />
                Edit profile
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-20 px-8">
          <h1 className="text-2xl font-bold">{profile?.full_name}</h1>
          <p className="text-gray-600">{profile?.educational_background || "No educational background provided"}</p>
          
          {/* Profile Completion Progress */}
          <div className="mt-4">
            <Progress value={completionPercentage} className="mb-2" />
            <p className="text-sm text-gray-600">
              Profile Completion: {completionPercentage}%
            </p>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="experiences">Experiences</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {profile?.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Phone:</span> {profile?.phone || "Not provided"}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Preferred Contact:</span> {profile?.preferred_contact || "Not specified"}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Date of Birth:</span> {profile?.date_of_birth ? format(new Date(profile.date_of_birth), 'PPP') : "Not provided"}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Skill Level:</span> {profile?.skill_level}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Availability:</span> {profile?.availability}
                </p>
              </div>
            </div>

            {/* Learning Areas */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Preferred Learning Areas</h2>
              <div className="flex flex-wrap gap-2">
                {profile?.preferred_learning_areas?.map((area, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {area}
                  </span>
                )) || "No learning areas specified"}
              </div>
            </div>

            {/* Work Experience */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Work experience</h2>
              <WorkExperienceList />
            </div>

            {/* Education */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Education</h2>
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
