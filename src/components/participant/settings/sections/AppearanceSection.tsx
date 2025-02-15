
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ParticipantSettings } from "@/types/participant";

interface AppearanceSectionProps {
  form: UseFormReturn<ParticipantSettings>;
}

export function AppearanceSection({ form }: AppearanceSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Appearance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="appearance_settings.banner_color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banner Color</FormLabel>
              <FormControl>
                <Input type="color" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="appearance_settings.use_default_settings"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Use Default Settings</FormLabel>
                <FormDescription>
                  Reset appearance to system defaults
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
  );
}
