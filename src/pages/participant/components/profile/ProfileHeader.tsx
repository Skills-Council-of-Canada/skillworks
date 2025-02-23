
import { CombinedProfile } from "@/hooks/participant/useProfileCompletion";
import { ProfileAvatar } from "./components/ProfileAvatar";
import { ProfileInfo } from "./components/ProfileInfo";
import { CompletionProgress } from "./components/CompletionProgress";

interface ProfileHeaderProps {
  profile: CombinedProfile | null;
  completionPercentage: number;
  userName?: string | null;
}

export const ProfileHeader = ({ profile, completionPercentage, userName }: ProfileHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="h-40 bg-gradient-to-r from-blue-900 to-white" />
        <div className="relative px-4 sm:px-6 pb-6">
          <div className="flex justify-between items-start">
            <ProfileAvatar 
              avatarUrl={profile?.avatar_url}
              fullName={profile?.full_name}
              userName={userName}
            />
          </div>
          
          <ProfileInfo 
            name={profile?.full_name}  {/* Changed from fullName to name */}
            bio={profile?.bio}
            userName={userName}
          />

          <CompletionProgress completionPercentage={completionPercentage} />
        </div>
      </div>
    </div>
  );
};
