
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationSettings } from "@/components/educator/notifications/NotificationSettings";

const EducatorSettings = () => {
  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-[#1A1F2C]">Settings</h1>
      <Card className="border bg-white">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-card">
            <TabsTrigger value="profile" className="text-[#1A1F2C] data-[state=active]:text-primary">Profile</TabsTrigger>
            <TabsTrigger value="notifications" className="text-[#1A1F2C] data-[state=active]:text-primary">Notifications</TabsTrigger>
            <TabsTrigger value="privacy" className="text-[#1A1F2C] data-[state=active]:text-primary">Privacy</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <div className="space-y-4 p-6">
              <h2 className="text-xl font-semibold text-[#1A1F2C]">Profile Settings</h2>
              <p className="text-[#6B7280]">Manage your profile information and preferences.</p>
            </div>
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
          <TabsContent value="privacy">
            <div className="space-y-4 p-6">
              <h2 className="text-xl font-semibold text-[#1A1F2C]">Privacy Settings</h2>
              <p className="text-[#6B7280]">Manage your privacy and security preferences.</p>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default EducatorSettings;
