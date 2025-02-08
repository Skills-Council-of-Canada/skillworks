
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
import { AlertCircle, Edit2, Check, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Props {
  data: Partial<ProjectFormData>;
  onPublish: () => void;
  onSaveDraft: () => void;
  onEdit: (step: number) => void;
}

const ReviewForm = ({ data, onPublish, onSaveDraft, onEdit }: Props) => {
  // Validation check for mandatory fields
  const isComplete = Boolean(
    data.title &&
    data.description &&
    data.tradeType &&
    data.skillLevel &&
    data.startDate &&
    data.endDate &&
    data.locationType &&
    data.positions &&
    (data.locationType !== 'On-site' || data.address) // Address required only for on-site
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
              <CardDescription>Project overview and description</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold">{data.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {data.description}
                    </p>
                  </div>
                  {data.title && data.description ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-destructive" />
                  )}
                </div>
              </div>
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
              <CardDescription>Trade type and skill requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <p><span className="font-medium">Trade Type:</span> {data.tradeType}</p>
                    <p><span className="font-medium">Skill Level:</span> {data.skillLevel}</p>
                    {data.subcategories && data.subcategories.length > 0 && (
                      <p><span className="font-medium">Subcategories:</span> {data.subcategories.join(", ")}</p>
                    )}
                  </div>
                  {data.tradeType && data.skillLevel ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-destructive" />
                  )}
                </div>
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
              <CardDescription>Timeline, location, and positions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <p><span className="font-medium">Duration:</span> {data.startDate?.toLocaleDateString()} - {data.endDate?.toLocaleDateString()}</p>
                    <p><span className="font-medium">Location Type:</span> {data.locationType}</p>
                    {data.address && <p><span className="font-medium">Address:</span> {data.address}</p>}
                    <p><span className="font-medium">Positions Available:</span> {data.positions}</p>
                  </div>
                  {data.startDate && data.endDate && data.locationType && data.positions ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-destructive" />
                  )}
                </div>
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
              <CardDescription>Certifications and safety requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <p><span className="font-medium">Tools Provided:</span> {data.toolsProvided ? "Yes" : "No"}</p>
                    {data.certifications && data.certifications.length > 0 && (
                      <p><span className="font-medium">Required Certifications:</span> {data.certifications.join(", ")}</p>
                    )}
                    {data.safetyRequirements && data.safetyRequirements.length > 0 && (
                      <p><span className="font-medium">Safety Requirements:</span> {data.safetyRequirements.join(", ")}</p>
                    )}
                  </div>
                  <Check className="h-5 w-5 text-green-500" />
                </div>
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
              <CardDescription>Project images and documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <p><span className="font-medium">Images:</span> {data.images?.length || 0} uploaded</p>
                    <p><span className="font-medium">Documents:</span> {data.documents?.length || 0} uploaded</p>
                  </div>
                  <Check className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
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
