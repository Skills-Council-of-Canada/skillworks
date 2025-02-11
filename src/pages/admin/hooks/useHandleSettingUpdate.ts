
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SystemSetting } from "@/types/admin";
import { useAuth } from "@/contexts/AuthContext";

export const useHandleSettingUpdate = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const updateSetting = useMutation({
    mutationFn: async ({
      settingId,
      newValue,
    }: {
      settingId: string;
      newValue: any;
    }) => {
      const { data: settings } = await supabase
        .from("system_settings")
        .select("*")
        .eq("id", settingId)
        .single();

      if (!settings) throw new Error("Setting not found");

      if (settings.requires_approval) {
        const { error } = await supabase.from("settings_change_requests").insert({
          setting_id: settingId,
          old_value: settings.value,
          new_value: newValue,
          reason: "Updated via admin panel",
          requested_by: user?.id,
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

  const parseSettingValue = (setting: SystemSetting) => {
    try {
      if (typeof setting.value === "string") {
        return JSON.parse(setting.value);
      }
      return setting.value;
    } catch (error) {
      console.error("Error parsing setting value:", error);
      return "";
    }
  };

  return {
    handleSettingUpdate: updateSetting.mutate,
    parseSettingValue,
  };
};
