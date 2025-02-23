
import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Pencil, Mail, Phone, Calendar, Book, Clock, MapPin, GraduationCap, Briefcase } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { EducationList } from "./components/profile/EducationList";
import { WorkExperienceList } from "./components/profile/WorkExperienceList";
import { FeedbackList } from "./components/profile/FeedbackList";
import { ExperienceList } from "./components/profile/ExperienceList";
import { AchievementList } from "./components/profile/AchievementList";
import { useProfileCompletion } from "@/hooks/participant/useProfileCompletion";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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

  const InfoItem = ({ icon: Icon, label, value, className = "" }: { icon: any; label: string; value: string; className?: string }) => (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-full bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400" />
            <div className="relative px-4 sm:px-6 pb-6">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 absolute -top-12 ring-4 ring-white">
                {profile?.avatar_url ? (
                  <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                ) : (
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-3xl sm:text-5xl">
                    {profile?.full_name?.[0] || user?.name?.[0]}
                  </AvatarFallback>
                )}
              </Avatar>
              
              <div className="ml-0 sm:ml-36 pt-14 sm:pt-2">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {profile?.full_name}
                    </h1>
                    <p className="mt-1 text-gray-500">
                      {profile?.bio || "No bio provided"}
                    </p>
                  </div>
                  <Link to="/participant/profile/edit">
                    <Button size={isMobile ? "sm" : "default"} className="gap-2">
                      <Pencil className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  </Link>
                </div>

                {/* Profile Completion */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">Profile Completion</p>
                    <span className="text-sm font-medium text-blue-600">{completionPercentage}%</span>
                  </div>
                  <Progress value={completionPercentage} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <InfoItem icon={Mail} label="Email" value={profile?.email || "Not provided"} />
                <InfoItem icon={Phone} label="Phone" value={profile?.phone || "Not provided"} />
                <InfoItem icon={Phone} label="Preferred Contact" value={profile?.preferred_contact || "Not specified"} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Details</h2>
              <div className="space-y-4">
                <InfoItem icon={GraduationCap} label="Skill Level" value={profile?.skill_level || "Not specified"} />
                <InfoItem icon={Clock} label="Availability" value={profile?.availability || "Not specified"} />
                <InfoItem icon={Book} label="Educational Background" value={profile?.educational_background || "Not provided"} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Preferred Learning Areas</h2>
              <div className="flex flex-wrap gap-2">
                {profile?.preferred_learning_areas?.length ? (
                  profile.preferred_learning_areas.map((area, index) => (
                    <Badge 
                      key={index}
                      variant="secondary"
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                    >
                      {area}
                    </Badge>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No learning areas specified</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Tabs Content */}
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
