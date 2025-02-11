import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { NotificationsSettings } from "./components/settings/NotificationsSettings";
import { SecuritySettings } from "./components/settings/SecuritySettings";
import type { SystemSetting } from "@/types/admin";

const AdminSettings = () => {
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

        <TabsContent value="notifications">
          <NotificationsSettings 
            settings={settingsByCategory?.notifications || []}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings 
            settings={settingsByCategory?.security || []}
            isLoading={isLoading}
          />
        </TabsContent>

        {/* Additional tabs content will be similar components */}
        {/* We can implement ExperienceVisibilitySettings and BrandingSettings components as needed */}
      </Tabs>
    </div>
  );
};

export default AdminSettings;
