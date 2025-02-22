
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { BrandingSettings } from "./components/settings/BrandingSettings";
import { SecuritySettings } from "./components/settings/SecuritySettings";
import { NotificationsSettings } from "./components/settings/NotificationsSettings";
import { ExperienceVisibilitySettings } from "./components/settings/ExperienceVisibilitySettings";

const AdminSettings = () => {
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
              <BrandingSettings />
            </TabsContent>
            <TabsContent value="security">
              <SecuritySettings />
            </TabsContent>
            <TabsContent value="notifications">
              <NotificationsSettings settings={[]} isLoading={false} />
            </TabsContent>
            <TabsContent value="visibility">
              <ExperienceVisibilitySettings settings={[]} isLoading={false} />
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  );
};

export default AdminSettings;
