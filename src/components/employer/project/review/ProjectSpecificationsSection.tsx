
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectFormData } from "@/types/project";
import { CalendarIcon, MapPinIcon, Pencil, UsersIcon } from "lucide-react";
import ReviewSectionCard from "./ReviewSectionCard";

interface Props {
  data: Partial<ProjectFormData>;
  onEdit: () => void;
}

const ProjectSpecificationsSection = ({ data, onEdit }: Props) => {
  // Helper function to safely format dates
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "Not specified";
    
    // Handle string dates (ISO strings)
    if (typeof date === 'string') {
      return new Date(date).toLocaleDateString();
    }
    
    // Handle Date objects
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }
    
    return "Invalid date";
  };

  return (
    <ReviewSectionCard
      title="Project Specifications"
      onEdit={onEdit}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-500">Start Date</h4>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-gray-500" />
            <span>{formatDate(data.startDate)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-500">End Date</h4>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-gray-500" />
            <span>{formatDate(data.endDate)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-500">Location Type</h4>
          <Badge variant="outline">
            {data.locationType || "Not specified"}
          </Badge>
        </div>

        {data.locationType === 'On-site' && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-500">Address</h4>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-gray-500" />
              <span>{data.address || "No address provided"}</span>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-500">Available Positions</h4>
          <div className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4 text-gray-500" />
            <span>{data.positions || 0} positions</span>
          </div>
        </div>
      </div>
    </ReviewSectionCard>
  );
};

export default ProjectSpecificationsSection;
