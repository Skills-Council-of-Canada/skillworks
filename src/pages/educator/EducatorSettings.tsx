
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationSettings } from "@/components/educator/notifications/NotificationSettings";

const EducatorSettings = () => {
  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Settings</h1>
      <Card className="border">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <div className="space-y-4 p-6">
              <h2 className="text-xl font-semibold text-foreground">Profile Settings</h2>
              <p className="text-muted-foreground">Manage your profile information and preferences.</p>
            </div>
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
          <TabsContent value="privacy">
            <div className="space-y-4 p-6">
              <h2 className="text-xl font-semibold text-foreground">Privacy Settings</h2>
              <p className="text-muted-foreground">Manage your privacy and security preferences.</p>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default EducatorSettings;
