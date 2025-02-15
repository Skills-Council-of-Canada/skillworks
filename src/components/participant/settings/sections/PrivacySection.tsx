
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ParticipantSettings } from "@/types/participant";

interface PrivacySectionProps {
  form: UseFormReturn<ParticipantSettings>;
}

export function PrivacySection({ form }: PrivacySectionProps) {
  return (
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
          name="privacy_settings.profile_indexing"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Visibility</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select profile visibility" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="not_indexed">Not Indexed</SelectItem>
                  <SelectItem value="hidden">Hidden</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Control who can see your profile
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="privacy_settings.work_visibility"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Visibility</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
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
                value={field.value}
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
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
