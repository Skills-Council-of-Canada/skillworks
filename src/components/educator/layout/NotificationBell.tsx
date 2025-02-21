
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const NotificationBell = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["unread-notifications", user?.id],
    queryFn: async () => {
      if (!user?.id) return 0;
      
      const { count, error } = await supabase
        .from("notifications")
        .select("*", { count: 'exact', head: true })
        .eq("user_id", user.id)
        .is("read_at", null);
      
      if (error) {
        console.error("Error fetching notifications:", error);
        return 0;
      }
      
      return count || 0;
    },
    enabled: !!user?.id,
  });

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative text-foreground hover:bg-transparent hover:text-foreground focus:text-foreground"
      onClick={() => navigate('/educator/notifications')}
    >
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </Button>
  );
};
