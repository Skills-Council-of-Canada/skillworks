
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MessagesTabContent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">No messages yet</p>
      </CardContent>
    </Card>
  );
};

export default MessagesTabContent;
