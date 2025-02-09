
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EducatorMessages = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Communicate with students and employers.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducatorMessages;
