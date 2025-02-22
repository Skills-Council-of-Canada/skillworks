
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MatchRequests = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Match Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-300">Manage employer-learner match requests.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchRequests;
