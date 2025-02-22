
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationSettings } from "@/components/educator/notifications/NotificationSettings";

const EducatorSettings = () => {
  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Card className="p-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Profile Settings</h2>
              <p className="text-gray-600">Manage your profile information and preferences.</p>
            </div>
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
          <TabsContent value="privacy">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Privacy Settings</h2>
              <p className="text-gray-600">Manage your privacy and security preferences.</p>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default EducatorSettings;
