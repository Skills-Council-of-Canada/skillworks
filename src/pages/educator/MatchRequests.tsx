
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MatchRequests = () => {
  return (
    <div className="space-y-4 md:space-y-6 p-2 md:p-6">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl text-gray-900 dark:text-white">Match Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">Manage employer-learner match requests.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchRequests;
