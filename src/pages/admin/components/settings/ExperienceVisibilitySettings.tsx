
import { SystemSetting } from "@/types/admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useHandleSettingUpdate } from "../../hooks/useHandleSettingUpdate";

interface ExperienceVisibilitySettingsProps {
  settings: SystemSetting[];
  isLoading: boolean;
}

export const ExperienceVisibilitySettings = ({ settings, isLoading }: ExperienceVisibilitySettingsProps) => {
  const { handleSettingUpdate, parseSettingValue } = useHandleSettingUpdate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {settings.map((setting) => (
        <Card key={setting.id}>
          <CardHeader>
            <CardTitle>{setting.key.replace(/_/g, " ").toUpperCase()}</CardTitle>
            <CardDescription>{setting.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              value={parseSettingValue(setting)}
              onValueChange={(newValue) =>
                handleSettingUpdate({ settingId: setting.id, newValue: JSON.stringify(newValue) })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select visibility rule" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="registered">Registered Users</SelectItem>
                <SelectItem value="verified">Verified Users</SelectItem>
                <SelectItem value="admin_approved">Admin Approved</SelectItem>
              </SelectContent>
            </Select>
            {setting.requires_approval && (
              <p className="text-sm text-muted-foreground mt-2">
                * Changes require admin approval
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
