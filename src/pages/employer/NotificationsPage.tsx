
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[200px]">Loading...</div>;
  }

  return (
    <div className="container max-w-3xl mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="h-5 w-5" />
        <h1 className="text-2xl font-semibold">Notifications</h1>
      </div>

      {notifications?.length === 0 ? (
        <Card className="p-6 text-center text-muted-foreground">
          No notifications yet
        </Card>
      ) : (
        <div className="space-y-4">
          {notifications?.map((notification) => (
            <Card key={notification.id} className="p-4 hover:bg-accent/50 transition-colors">
              <h3 className="font-medium">{notification.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
              <div className="text-xs text-muted-foreground mt-2">
                {new Date(notification.created_at).toLocaleDateString()}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
