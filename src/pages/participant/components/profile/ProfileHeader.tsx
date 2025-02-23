
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Pencil } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { User } from "@/types/auth";

interface ProfileHeaderProps {
  profile: User | null;
  userName?: string | null;
}

export const ProfileHeader = ({ profile, userName }: ProfileHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="mb-8">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-900 to-white" />
        <div className="relative px-4 sm:px-6 pb-6">
          <Avatar className="h-24 w-24 sm:h-32 sm:w-32 absolute -top-12 ring-4 ring-white">
            {profile?.avatar_url ? (
              <AvatarImage src={profile.avatar_url} alt={profile.name} />
            ) : (
              <AvatarFallback className="bg-blue-100 text-blue-600 text-3xl sm:text-5xl">
                {profile?.name?.[0] || userName?.[0]}
              </AvatarFallback>
            )}
          </Avatar>
          
          <div className="ml-0 sm:ml-36 pt-14 sm:pt-2">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {profile?.name}
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
          </div>
        </div>
      </div>
    </div>
  );
};
