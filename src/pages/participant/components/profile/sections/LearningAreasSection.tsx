
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CombinedProfile } from "@/hooks/participant/useProfileCompletion";

interface LearningAreasSectionProps {
  profile: CombinedProfile | null;
  onEdit: () => void;
}

export const LearningAreasSection = ({ profile, onEdit }: LearningAreasSectionProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Preferred Learning Areas</h2>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
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
  );
};
