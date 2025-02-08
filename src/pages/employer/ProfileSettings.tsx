
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyInfoForm from "@/components/employer/settings/CompanyInfoForm";
import AccountSettingsForm from "@/components/employer/settings/AccountSettingsForm";
import SecuritySettingsForm from "@/components/employer/settings/SecuritySettingsForm";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const ProfileSettings = () => {
  const { toast } = useToast();

  const handleSettingsUpdate = (message: string) => {
    toast({
      title: "Settings Updated",
      description: message,
    });
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
      <Card className="p-6">
        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="company">Company Information</TabsTrigger>
            <TabsTrigger value="account">Account Settings</TabsTrigger>
            <TabsTrigger value="security">Security Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="company">
            <CompanyInfoForm onUpdate={() => handleSettingsUpdate("Company information updated successfully")} />
          </TabsContent>
          <TabsContent value="account">
            <AccountSettingsForm onUpdate={() => handleSettingsUpdate("Account settings updated successfully")} />
          </TabsContent>
          <TabsContent value="security">
            <SecuritySettingsForm onUpdate={() => handleSettingsUpdate("Security settings updated successfully")} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ProfileSettings;
