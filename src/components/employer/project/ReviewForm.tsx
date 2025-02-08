
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectFormData } from "@/types/project";
import { Edit2 } from "lucide-react";

interface Props {
  data: Partial<ProjectFormData>;
  onPublish: () => void;
  onSaveDraft: () => void;
  onEdit: (step: number) => void;
}

const ReviewForm = ({ data, onPublish, onSaveDraft, onEdit }: Props) => {
  return (
    <div className="space-y-6">
      <ScrollArea className="h-[60vh] pr-4">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Basic Information</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(1)}
                  className="flex items-center"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold">{data.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {data.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Trade Details</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(2)}
                  className="flex items-center"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>Trade Type: {data.tradeType}</p>
                <p>Skill Level: {data.skillLevel}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Project Specifications</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(3)}
                  className="flex items-center"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>Duration: {data.startDate?.toLocaleDateString()} - {data.endDate?.toLocaleDateString()}</p>
                <p>Location Type: {data.locationType}</p>
                {data.address && <p>Address: {data.address}</p>}
                <p>Positions Available: {data.positions}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Learner Requirements</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(4)}
                  className="flex items-center"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>Tools Provided: {data.toolsProvided ? "Yes" : "No"}</p>
                <p>Safety Requirements: {data.safetyRequirements?.join(", ")}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Media</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(5)}
                  className="flex items-center"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>Images: {data.images?.length || 0} uploaded</p>
                <p>Documents: {data.documents?.length || 0} uploaded</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onSaveDraft}>
          Save as Draft
        </Button>
        <Button onClick={onPublish}>
          Publish Project
        </Button>
      </div>
    </div>
  );
};

export default ReviewForm;
