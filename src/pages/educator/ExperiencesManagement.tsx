
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExperiencesManagement = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Experiences Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Manage your educational experiences here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExperiencesManagement;
