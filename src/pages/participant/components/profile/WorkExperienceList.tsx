
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const WorkExperienceList = () => {
  return (
    <div>
      <Button variant="outline" className="mb-4">
        <Plus className="h-4 w-4 mr-2" />
        Add work experience
      </Button>
      <div className="text-gray-500 text-center py-8">
        No work experience added yet
      </div>
    </div>
  );
};
