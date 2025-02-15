
import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Pencil } from "lucide-react";
import { EducationList } from "./components/profile/EducationList";
import { WorkExperienceList } from "./components/profile/WorkExperienceList";
import { FeedbackList } from "./components/profile/FeedbackList";
import { ExperienceList } from "./components/profile/ExperienceList";
import { AchievementList } from "./components/profile/AchievementList";

interface ParticipantProfileData {
  id: string;
  avatar_url: string | null;
  bio: string | null;
  certifications: string[] | null;
  created_at: string;
  full_name: string | null;
  interests: string[] | null;
  skills: string[] | null;
  updated_at: string;
  location: string | null;
  email_verified: boolean | null;
  onboarding_completed: boolean | null;
  profile_completion_percentage: number | null;
  steps_completed: Record<string, boolean> | null;
}

interface DatabaseParticipantProfile {
  id: string;
  avatar_url: string | null;
  bio: string | null;
  certifications: any[] | null;
  created_at: string;
  full_name: string | null;
  interests: any[] | null;
  skills: any[] | null;
  updated_at: string;
  location: string | null;
  email_verified: boolean | null;
  onboarding_completed: boolean | null;
  profile_completion_percentage: number | null;
  steps_completed: Record<string, boolean> | null;
}

export const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  // Fetch participant profile data
  const { data: profile, isLoading } = useQuery<ParticipantProfileData, Error>({
    queryKey: ["participant-profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("participant_profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      
      const dbProfile = data as DatabaseParticipantProfile;
      
      // Ensure all required fields are present, even if null, and convert arrays to string[]
      const profileData: ParticipantProfileData = {
        id: dbProfile.id,
        avatar_url: dbProfile.avatar_url || null,
        bio: dbProfile.bio || null,
        certifications: dbProfile.certifications?.map(String) || null,
        created_at: dbProfile.created_at,
        full_name: dbProfile.full_name || null,
        interests: dbProfile.interests?.map(String) || null,
        skills: dbProfile.skills?.map(String) || null,
        updated_at: dbProfile.updated_at,
        location: dbProfile.location || null,
        email_verified: dbProfile.email_verified || null,
        onboarding_completed: dbProfile.onboarding_completed || null,
        profile_completion_percentage: dbProfile.profile_completion_percentage || null,
        steps_completed: dbProfile.steps_completed || null
      };

      return profileData;
    },
    enabled: !!user?.id,
  });

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
              <AvatarFallback className="bg-blue-100 text-blue-600 text-4xl">
                {profile?.full_name?.[0] || user?.name?.[0]}
              </AvatarFallback>
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
          <h1 className="text-2xl font-bold">{profile?.full_name || user?.name}</h1>
          <p className="text-gray-600">{profile?.bio || "No bio yet"}</p>
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
            {/* Location & Categories */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">LOCATION</h2>
              <p className="text-gray-600">{profile?.location || "Location not set"}</p>
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
