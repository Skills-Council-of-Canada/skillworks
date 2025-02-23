
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ProfileHeaderProps {
  profile: any;
  completionPercentage: number;
  userName?: string;
}

export const ProfileHeader = ({ profile, completionPercentage, userName }: ProfileHeaderProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{userName || "My Profile"}</h1>
          <div className="mt-2">
            <Progress value={completionPercentage} className="w-[60%]" />
            <p className="text-sm text-gray-500 mt-1">
              Profile completion: {completionPercentage}%
            </p>
          </div>
        </div>
        <Link to="edit">
          <Button>Edit Profile</Button>
        </Link>
      </div>
    </div>
  );
};
