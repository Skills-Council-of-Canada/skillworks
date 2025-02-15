
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useParticipantSettings } from "@/hooks/participant/useParticipantSettings";
import { GeneralSection } from "./sections/GeneralSection";
import { AppearanceSection } from "./sections/AppearanceSection";
import { PrivacySection } from "./sections/PrivacySection";
import { NotificationsSection } from "./sections/NotificationsSection";
import { SecuritySection } from "./sections/SecuritySection";
import { ParticipantSettings } from "@/types/participant";

const formSchema = z.object({
  id: z.string(),
  participant_id: z.string(),
  mentorship_mode: z.enum(["self_guided", "mentor_assisted"]),
  privacy_settings: z.object({
    work_visibility: z.enum(["mentor", "public", "private"]),
    profile_visibility: z.enum(["public", "private"]),
    profile_indexing: z.enum(["public", "not_indexed", "hidden"])
  }),
  notification_preferences: z.object({
    mentor_feedback: z.boolean(),
    project_approvals: z.boolean(),
    experience_milestones: z.boolean(),
    match_requests: z.boolean(),
    match_comments: z.boolean(),
    matched_projects: z.boolean(),
    experience_updates: z.boolean(),
    feedback_reminders: z.boolean(),
    company_applications: z.boolean(),
    date_changes: z.boolean(),
    new_feedback: z.boolean(),
    member_requests: z.boolean(),
    account_merge: z.boolean()
  }),
  language_preference: z.string(),
  timezone: z.string(),
  appearance_settings: z.object({
    cover_photo_url: z.string().nullable(),
    banner_color: z.string(),
    use_default_settings: z.boolean()
  }),
  digest_settings: z.object({
    email_frequency: z.enum(["daily", "weekly"]),
    disable_all_emails: z.boolean(),
    disable_all_sms: z.boolean()
  }),
  security_settings: z.object({
    mfa_enabled: z.boolean(),
    last_password_change: z.string().nullable(),
    account_merged: z.boolean()
  }),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
}) satisfies z.ZodType<ParticipantSettings>;

export function ParticipantSettingsForm() {
  const { settings, updateSettings, isLoading } = useParticipantSettings();

  const form = useForm<ParticipantSettings>({
    resolver: zodResolver(formSchema),
    defaultValues: settings
  });

  async function onSubmit(values: ParticipantSettings) {
    await updateSettings(values);
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[250px] w-full" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <GeneralSection form={form} />
        <AppearanceSection form={form} />
        <PrivacySection form={form} />
        <NotificationsSection form={form} />
        <SecuritySection form={form} />

        <div className="flex justify-between gap-4">
          <Button type="submit" className="flex-1">
            Save Settings
          </Button>
          <Button type="button" variant="destructive">
            Delete Account
          </Button>
        </div>
      </form>
    </Form>
  );
}
