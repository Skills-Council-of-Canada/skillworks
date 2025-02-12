
import { CheckCircle2, Circle, CircleDot } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ParticipantRegistrationStatus } from "@/types/participant";

interface RegistrationProgressProps {
  currentStatus: ParticipantRegistrationStatus;
}

const steps: { status: ParticipantRegistrationStatus; label: string }[] = [
  { status: "pending", label: "Registration Started" },
  { status: "email_verified", label: "Email Verified" },
  { status: "profile_completed", label: "Profile Completed" },
  { status: "admin_approved", label: "Admin Approved" },
  { status: "active", label: "Account Active" },
];

export function RegistrationProgress({ currentStatus }: RegistrationProgressProps) {
  const currentStep = steps.findIndex((step) => step.status === currentStatus) + 1;
  const progress = (currentStep / steps.length) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registration Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="mb-4" />
        <div className="space-y-4">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep - 1;
            const isCurrent = index === currentStep - 1;

            return (
              <div key={step.status} className="flex items-center gap-3">
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : isCurrent ? (
                  <CircleDot className="h-5 w-5 text-primary" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
                <span
                  className={
                    isCompleted || isCurrent
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
