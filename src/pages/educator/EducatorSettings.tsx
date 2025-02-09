
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EducatorSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Manage your profile and preferences.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducatorSettings;
