
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProfileCompletion } from "@/hooks/participant/useProfileCompletion";
import { ProfileHeader } from "./components/profile/ProfileHeader";
import { ProfileInfo } from "./components/profile/ProfileInfo";
import { TabContent } from "./components/profile/TabContent";
import { EditProfile } from "./components/profile/EditProfile";

const ViewProfile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  // Use suspense to prevent multiple re-renders during data fetching
  const { profile, isLoading, completionPercentage } = useProfileCompletion();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Only render components once data is available */}
        {profile && (
          <>
            <ProfileHeader 
              profile={profile} 
              completionPercentage={completionPercentage} 
              userName={user?.name}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <ProfileInfo profile={profile} />
              <TabContent activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const Profile = () => {
  return (
    <Routes>
      <Route index element={<ViewProfile />} />
      <Route path="edit" element={<EditProfile />} />
    </Routes>
  );
};

export default Profile;
