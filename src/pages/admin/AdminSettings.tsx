
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { BrandingSettings } from "./components/settings/BrandingSettings";
import { SecuritySettings } from "./components/settings/SecuritySettings";
import { NotificationsSettings } from "./components/settings/NotificationsSettings";
import { ExperienceVisibilitySettings } from "./components/settings/ExperienceVisibilitySettings";
import { useQuery } from "@tanstack/react-query";

const AdminSettings = () => {
  const { data: brandingSettings, isLoading: isBrandingLoading } = useQuery({
    queryKey: ['settings', 'branding'],
    queryFn: async () => {
      // Replace with actual API call
      return [];
    }
  });

  const { data: securitySettings, isLoading: isSecurityLoading } = useQuery({
    queryKey: ['settings', 'security'],
    queryFn: async () => {
      // Replace with actual API call
      return [];
    }
  });

  const { data: notificationSettings, isLoading: isNotificationLoading } = useQuery({
    queryKey: ['settings', 'notifications'],
    queryFn: async () => {
      // Replace with actual API call
      return [];
    }
  });

  const { data: visibilitySettings, isLoading: isVisibilityLoading } = useQuery({
    queryKey: ['settings', 'visibility'],
    queryFn: async () => {
      // Replace with actual API call
      return [];
    }
  });

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
      </div>

      <Card className="p-0">
        <Tabs defaultValue="branding" className="w-full">
          <TabsList className="flex flex-wrap md:flex-nowrap w-full h-auto md:h-10 p-1 bg-gray-50/50">
            <TabsTrigger value="branding" className="flex-1 md:flex-none">Branding</TabsTrigger>
            <TabsTrigger value="security" className="flex-1 md:flex-none">Security</TabsTrigger>
            <TabsTrigger value="notifications" className="flex-1 md:flex-none">Notifications</TabsTrigger>
            <TabsTrigger value="visibility" className="flex-1 md:flex-none">Experience Visibility</TabsTrigger>
          </TabsList>
          <div className="p-6">
            <TabsContent value="branding">
              <BrandingSettings settings={brandingSettings || []} isLoading={isBrandingLoading} />
            </TabsContent>
            <TabsContent value="security">
              <SecuritySettings settings={securitySettings || []} isLoading={isSecurityLoading} />
            </TabsContent>
            <TabsContent value="notifications">
              <NotificationsSettings settings={notificationSettings || []} isLoading={isNotificationLoading} />
            </TabsContent>
            <TabsContent value="visibility">
              <ExperienceVisibilitySettings settings={visibilitySettings || []} isLoading={isVisibilityLoading} />
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  );
};

export default AdminSettings;
