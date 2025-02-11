
import { SystemSetting } from "@/types/admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useHandleSettingUpdate } from "../../hooks/useHandleSettingUpdate";

interface SecuritySettingsProps {
  settings: SystemSetting[];
  isLoading: boolean;
}

export const SecuritySettings = ({ settings, isLoading }: SecuritySettingsProps) => {
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
            {setting.key === "password_policy" ? (
              <div className="space-y-2">
                <Input
                  type="number"
                  value={parseSettingValue(setting)?.min_length || 8}
                  onChange={(e) =>
                    handleSettingUpdate({
                      settingId: setting.id,
                      newValue: {
                        ...parseSettingValue(setting),
                        min_length: parseInt(e.target.value),
                      },
                    })
                  }
                  placeholder="Minimum length"
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={parseSettingValue(setting)?.require_special || false}
                    onCheckedChange={(checked) =>
                      handleSettingUpdate({
                        settingId: setting.id,
                        newValue: {
                          ...parseSettingValue(setting),
                          require_special: checked,
                        },
                      })
                    }
                  />
                  <Label>Require special characters</Label>
                </div>
              </div>
            ) : (
              <Switch
                checked={parseSettingValue(setting) === true}
                onCheckedChange={(checked) =>
                  handleSettingUpdate({ settingId: setting.id, newValue: checked })
                }
              />
            )}
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
