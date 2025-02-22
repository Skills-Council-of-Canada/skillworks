
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export const NotificationSettings = () => {
  return (
    <Card className="p-4">
      <h2 className="font-semibold mb-4">Notification Settings</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm">Email Notifications</label>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-sm">Student Sign-ups</label>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-sm">Progress Updates</label>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-sm">Submissions</label>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-sm">Feedback Requests</label>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-sm">Classroom Activity</label>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-sm">Certifications</label>
          <Switch defaultChecked />
        </div>
      </div>
    </Card>
  );
};
