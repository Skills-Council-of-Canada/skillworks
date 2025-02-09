
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { loadExperienceSettings, updateExperienceSettings } from "./settingsService";

export const SettingsTab = () => {
  const { experienceId } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: settings, isLoading, error } = useQuery({
    queryKey: ["experience-settings", experienceId],
    queryFn: () => loadExperienceSettings(experienceId!),
    enabled: !!experienceId,
  });

  const mutation = useMutation({
    mutationFn: updateExperienceSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experience-settings", experienceId] });
      toast({
        title: "Settings Updated",
        description: "Your experience settings have been saved successfully.",
      });
    },
    onError: (error) => {
      console.error("Error updating settings:", error);
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleToggle = (
    section: "display" | "communication" | "access",
    key: string,
    value: boolean
  ) => {
    if (!settings || !experienceId) return;

    const updatedSettings = {
      ...settings,
      [`${section}_preferences`]: {
        ...settings[`${section}_preferences`],
        [key]: value,
      },
    };

    mutation.mutate({ experienceId, settings: updatedSettings });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load experience settings. Please try refreshing the page.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="progress-bar">Show Progress Bar</Label>
            <Switch
              id="progress-bar"
              checked={settings?.display_preferences?.show_progress_bar ?? true}
              onCheckedChange={(checked) =>
                handleToggle("display", "show_progress_bar", checked)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="completion-status">Show Completion Status</Label>
            <Switch
              id="completion-status"
              checked={settings?.display_preferences?.show_completion_status ?? true}
              onCheckedChange={(checked) =>
                handleToggle("display", "show_completion_status", checked)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="deadline-reminders">Show Deadline Reminders</Label>
            <Switch
              id="deadline-reminders"
              checked={settings?.display_preferences?.show_deadline_reminders ?? true}
              onCheckedChange={(checked) =>
                handleToggle("display", "show_deadline_reminders", checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Communication Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="team-chat">Allow Team Chat</Label>
            <Switch
              id="team-chat"
              checked={settings?.communication_settings?.allow_team_chat ?? true}
              onCheckedChange={(checked) =>
                handleToggle("communication", "allow_team_chat", checked)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="direct-messages">Allow Direct Messages</Label>
            <Switch
              id="direct-messages"
              checked={settings?.communication_settings?.allow_direct_messages ?? true}
              onCheckedChange={(checked) =>
                handleToggle("communication", "allow_direct_messages", checked)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="announcements">Enable Announcements</Label>
            <Switch
              id="announcements"
              checked={settings?.communication_settings?.enable_announcements ?? true}
              onCheckedChange={(checked) =>
                handleToggle("communication", "enable_announcements", checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Access Control</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="require-approval">Require Approval for Join Requests</Label>
            <Switch
              id="require-approval"
              checked={settings?.access_control?.require_approval ?? false}
              onCheckedChange={(checked) =>
                handleToggle("access", "require_approval", checked)
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="late-submissions">Allow Late Submissions</Label>
            <Switch
              id="late-submissions"
              checked={settings?.access_control?.allow_late_submissions ?? true}
              onCheckedChange={(checked) =>
                handleToggle("access", "allow_late_submissions", checked)
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
