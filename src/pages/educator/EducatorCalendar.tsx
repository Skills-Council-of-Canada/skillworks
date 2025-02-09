
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EducatorCalendar = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Manage your schedule and upcoming events.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducatorCalendar;
