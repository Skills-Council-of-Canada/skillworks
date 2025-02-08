
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectFormData } from "@/types/project";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import BasicInfoSection from "./review/BasicInfoSection";
import TradeDetailsSection from "./review/TradeDetailsSection";
import ProjectSpecificationsSection from "./review/ProjectSpecificationsSection";
import LearnerRequirementsSection from "./review/LearnerRequirementsSection";
import MediaSection from "./review/MediaSection";

interface Props {
  data: Partial<ProjectFormData>;
  onPublish: () => void;
  onSaveDraft: () => void;
  onEdit: (step: number) => void;
}

const ReviewForm = ({ data, onPublish, onSaveDraft, onEdit }: Props) => {
  const isComplete = Boolean(
    data.title &&
    data.description &&
    data.tradeType &&
    data.skillLevel &&
    data.startDate &&
    data.endDate &&
    data.locationType &&
    data.positions &&
    (data.locationType !== 'On-site' || data.address)
  );

  return (
    <div className="space-y-6">
      {!isComplete && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please complete all mandatory fields before publishing.
          </AlertDescription>
        </Alert>
      )}

      <ScrollArea className="h-[60vh] pr-4">
        <div className="space-y-6">
          <BasicInfoSection data={data} onEdit={() => onEdit(1)} />
          <TradeDetailsSection data={data} onEdit={() => onEdit(2)} />
          <ProjectSpecificationsSection data={data} onEdit={() => onEdit(3)} />
          <LearnerRequirementsSection data={data} onEdit={() => onEdit(4)} />
          <MediaSection data={data} onEdit={() => onEdit(5)} />
        </div>
      </ScrollArea>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onSaveDraft}>
          Save as Draft
        </Button>
        <Button 
          onClick={onPublish}
          disabled={!isComplete}
          className="bg-primary hover:bg-primary/90"
        >
          Publish Project
        </Button>
      </div>
    </div>
  );
};

export default ReviewForm;
