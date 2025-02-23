
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Book, Clock, GraduationCap } from "lucide-react";
import { User } from "@/types/auth";

interface InfoItemProps {
  icon: any;
  label: string;
  value: string;
  className?: string;
}

const InfoItem = ({ icon: Icon, label, value, className = "" }: InfoItemProps) => (
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

interface ProfileInfoProps {
  profile: User | null;
}

export const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  return (
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
  );
};
