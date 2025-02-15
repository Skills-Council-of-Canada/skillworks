
import { useParticipantSettings } from "@/hooks/participant/useParticipantSettings";
import { ParticipantSettingsForm } from "@/components/participant/settings/ParticipantSettingsForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ParticipantSettings() {
  const { isLoading } = useParticipantSettings();

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-6 w-48" />
            </div>
          </CardHeader>
        </Card>
        <div className="space-y-8">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[250px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Settings className="h-8 w-8" />
            <CardTitle>Participant Settings</CardTitle>
          </div>
        </CardHeader>
      </Card>
      <ParticipantSettingsForm />
    </div>
  );
}
