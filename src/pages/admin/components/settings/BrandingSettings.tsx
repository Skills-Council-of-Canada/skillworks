
import { SystemSetting } from "@/types/admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useHandleSettingUpdate } from "../../hooks/useHandleSettingUpdate";

interface BrandingSettingsProps {
  settings: SystemSetting[];
  isLoading: boolean;
}

export const BrandingSettings = ({ settings, isLoading }: BrandingSettingsProps) => {
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
            <div className="space-y-2">
              <Label htmlFor={setting.key}>{setting.key.replace(/_/g, " ").toUpperCase()}</Label>
              {setting.key.includes("color") ? (
                <div className="flex gap-4 items-center">
                  <Input
                    id={setting.key}
                    type="color"
                    value={parseSettingValue(setting)}
                    onChange={(e) =>
                      handleSettingUpdate({
                        settingId: setting.id,
                        newValue: JSON.stringify(e.target.value),
                      })
                    }
                    className="w-20 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={parseSettingValue(setting)}
                    onChange={(e) =>
                      handleSettingUpdate({
                        settingId: setting.id,
                        newValue: JSON.stringify(e.target.value),
                      })
                    }
                    placeholder="#000000"
                    className="flex-1"
                  />
                </div>
              ) : (
                <Input
                  id={setting.key}
                  type="text"
                  value={parseSettingValue(setting)}
                  onChange={(e) =>
                    handleSettingUpdate({
                      settingId: setting.id,
                      newValue: JSON.stringify(e.target.value),
                    })
                  }
                />
              )}
            </div>
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
