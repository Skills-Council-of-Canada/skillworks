import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParticipantSettings } from "@/hooks/participant/useParticipantSettings";
import { Brain, Eye, Bell } from "lucide-react";
import { ParticipantSettings } from "@/types/participant";

const formSchema = z.object({
  mentorship_mode: z.enum(["self_guided", "mentor_assisted"]),
  privacy_settings: z.object({
    work_visibility: z.enum(["mentor", "public", "private"]),
    profile_visibility: z.enum(["public", "private"]),
  }),
  notification_preferences: z.object({
    mentor_feedback: z.boolean(),
    project_approvals: z.boolean(),
    experience_milestones: z.boolean(),
  }),
});

type FormData = z.infer<typeof formSchema>;

export function ParticipantSettingsForm() {
  const { settings, updateSettings, isLoading } = useParticipantSettings();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: settings || {
      mentorship_mode: "self_guided",
      privacy_settings: {
        work_visibility: "mentor",
        profile_visibility: "public",
      },
      notification_preferences: {
        mentor_feedback: true,
        project_approvals: true,
        experience_milestones: true,
      },
    },
  });

  async function onSubmit(values: FormData) {
    await updateSettings(values as Partial<ParticipantSettings>);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Mentorship Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="mentorship_mode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mentorship Mode</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select mentorship mode" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="self_guided">Self-Guided</SelectItem>
                      <SelectItem value="mentor_assisted">
                        Mentor-Assisted
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose how you want to be guided through your learning journey
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Privacy Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="privacy_settings.work_visibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Visibility</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select work visibility" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="mentor">Mentor Only</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Control who can see your work and progress
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="privacy_settings.profile_visibility"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Visibility</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select profile visibility" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Control who can see your profile information
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="notification_preferences.mentor_feedback"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Mentor Feedback</FormLabel>
                    <FormDescription>
                      Receive notifications when mentors provide feedback
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notification_preferences.project_approvals"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Project Approvals</FormLabel>
                    <FormDescription>
                      Get notified about project approval status changes
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notification_preferences.experience_milestones"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Experience Milestones
                    </FormLabel>
                    <FormDescription>
                      Receive updates about your learning milestones
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" className="w-full">
          Save Settings
        </Button>
      </form>
    </Form>
  );
}
