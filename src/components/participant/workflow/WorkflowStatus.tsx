
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParticipantWorkflow } from "@/hooks/participant/useParticipantWorkflow";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { ParticipantRegistrationStatus } from "@/types/participant";

export function WorkflowStatus() {
  const { workflowStatus, isLoading } = useParticipantWorkflow();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const getStatusIcon = () => {
    switch (workflowStatus?.registration_status) {
      case "admin_approved":
      case "active":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
      case "email_verified":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon()}
          Workflow Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Registration Status</span>
            <span className="text-sm text-muted-foreground">
              {workflowStatus?.registration_status}
            </span>
          </div>
          {workflowStatus?.needs_admin_review && (
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Pending Review
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>Your profile is currently under admin review.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
