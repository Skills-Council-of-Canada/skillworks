
import { ParticipantIntegrations } from "@/types/participant";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, FileText, Linkedin } from "lucide-react";

interface IntegrationsCardProps {
  integrations: ParticipantIntegrations;
  onConnectGoogle: () => void;
  onConnectLinkedIn: () => void;
}

export function IntegrationsCard({
  integrations,
  onConnectGoogle,
  onConnectLinkedIn,
}: IntegrationsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Services</CardTitle>
        <CardDescription>
          Connect your accounts to enhance your experience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5" />
            <div>
              <p className="font-medium">Google Calendar</p>
              <p className="text-sm text-muted-foreground">
                Sync your deadlines and events
              </p>
            </div>
          </div>
          <Button
            variant={integrations.google_calendar_connected ? "outline" : "default"}
            onClick={onConnectGoogle}
          >
            {integrations.google_calendar_connected ? "Connected" : "Connect"}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Linkedin className="h-5 w-5" />
            <div>
              <p className="font-medium">LinkedIn</p>
              <p className="text-sm text-muted-foreground">
                Import your professional profile
              </p>
            </div>
          </div>
          <Button
            variant={
              integrations.linkedin_oauth_token ? "outline" : "default"
            }
            onClick={onConnectLinkedIn}
          >
            {integrations.linkedin_oauth_token ? "Connected" : "Connect"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
