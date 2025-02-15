
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const EducationList = () => {
  return (
    <div>
      <Button variant="outline" className="mb-4">
        <Plus className="h-4 w-4 mr-2" />
        Add education
      </Button>
      <div className="text-gray-500 text-center py-8">
        No education history added yet
      </div>
    </div>
  );
};
