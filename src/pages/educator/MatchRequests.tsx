
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MatchRequests = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Match Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Manage employer-learner match requests.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchRequests;
