
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import { useSkillAssessments } from "@/hooks/participant/useSkillAssessments";

export const SkillAssessments = () => {
  const { assessments, isLoading } = useSkillAssessments();

  if (isLoading) {
    return <div>Loading assessments...</div>;
  }

  return (
    <div className="space-y-4">
      {assessments?.map((assessment) => (
        <Card key={assessment.id}>
          <CardHeader>
            <CardTitle className="text-lg">{assessment.skill_name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Current Level: {assessment.current_level}</span>
                  <span className="text-sm">Target: {assessment.target_level}</span>
                </div>
                <Progress 
                  value={(assessment.current_level / assessment.target_level) * 100} 
                />
              </div>
              {assessment.notes && (
                <p className="text-sm text-muted-foreground">{assessment.notes}</p>
              )}
              <div className="text-sm text-muted-foreground">
                Next Assessment: {new Date(assessment.next_assessment_date).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
