
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EducatorSettings = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-300">Manage your profile and preferences.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducatorSettings;
