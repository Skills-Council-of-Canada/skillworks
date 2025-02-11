
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SystemSetting } from "@/types/admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useHandleSettingUpdate } from "../../hooks/useHandleSettingUpdate";

interface NotificationsSettingsProps {
  settings: SystemSetting[];
  isLoading: boolean;
}

export const NotificationsSettings = ({ settings, isLoading }: NotificationsSettingsProps) => {
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
                <SelectValue placeholder="Select notification level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="important">Important</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="none">None</SelectItem>
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
