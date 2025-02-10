
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import type { SystemSetting } from "@/types/admin";

const AdminSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("notifications");

  const { data: settings, isLoading } = useQuery({
    queryKey: ["system-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("system_settings")
        .select("*")
        .order("category");

      if (error) throw error;
      return data as SystemSetting[];
    },
  });

  const updateSetting = useMutation({
    mutationFn: async ({
      settingId,
      newValue,
    }: {
      settingId: string;
      newValue: any;
    }) => {
      const setting = settings?.find((s) => s.id === settingId);
      if (!setting) throw new Error("Setting not found");

      if (setting.requires_approval) {
        const { error } = await supabase.from("settings_change_requests").insert({
          setting_id: settingId,
          old_value: setting.value,
          new_value: newValue,
          reason: "Updated via admin panel",
        });
        if (error) throw error;
        toast({
          title: "Change request submitted",
          description: "Your changes will be reviewed by an administrator.",
        });
      } else {
        const { error } = await supabase
          .from("system_settings")
          .update({ value: newValue })
          .eq("id", settingId);
        if (error) throw error;
        toast({
          title: "Settings updated",
          description: "Your changes have been saved successfully.",
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["system-settings"] });
    },
    onError: (error) => {
      toast({
        title: "Error updating settings",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const renderSettingInput = (setting: SystemSetting) => {
    const value = typeof setting.value === "string" ? JSON.parse(setting.value) : setting.value;

    switch (setting.key) {
      case "global_notification_level":
        return (
          <Select
            value={value}
            onValueChange={(newValue) =>
              updateSetting.mutate({ settingId: setting.id, newValue: JSON.stringify(newValue) })
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
        );

      case "require_admin_approval":
        return (
          <Switch
            checked={value === true}
            onCheckedChange={(checked) =>
              updateSetting.mutate({ settingId: setting.id, newValue: checked })
            }
          />
        );

      case "password_policy":
        return (
          <div className="space-y-2">
            <Input
              type="number"
              value={value.min_length}
              onChange={(e) =>
                updateSetting.mutate({
                  settingId: setting.id,
                  newValue: { ...value, min_length: parseInt(e.target.value) },
                })
              }
              placeholder="Minimum length"
            />
            <div className="flex items-center space-x-2">
              <Switch
                checked={value.require_special}
                onCheckedChange={(checked) =>
                  updateSetting.mutate({
                    settingId: setting.id,
                    newValue: { ...value, require_special: checked },
                  })
                }
              />
              <Label>Require special characters</Label>
            </div>
          </div>
        );

      default:
        return (
          <Input
            value={typeof value === "string" ? value : JSON.stringify(value)}
            onChange={(e) =>
              updateSetting.mutate({
                settingId: setting.id,
                newValue: e.target.value,
              })
            }
          />
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const settingsByCategory = settings?.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = [];
    }
    acc[setting.category].push(setting);
    return acc;
  }, {} as Record<string, SystemSetting[]>);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">System Settings</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="experience_visibility">Experience Visibility</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>

        {Object.entries(settingsByCategory || {}).map(([category, categorySettings]) => (
          <TabsContent key={category} value={category}>
            <div className="grid gap-6">
              {categorySettings.map((setting) => (
                <Card key={setting.id}>
                  <CardHeader>
                    <CardTitle>{setting.key.replace(/_/g, " ").toUpperCase()}</CardTitle>
                    <CardDescription>{setting.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderSettingInput(setting)}
                    {setting.requires_approval && (
                      <p className="text-sm text-muted-foreground mt-2">
                        * Changes require admin approval
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AdminSettings;
