
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const NotificationBell = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: unreadCount = 0 } = useQuery({
    queryKey: ["unread-notifications", user?.id] as const,
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
      onClick={() => navigate('/educator/notifications')}
      className="relative"
    >
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 h-4 w-4 bg-[#ea384c] text-white rounded-full text-xs flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </Button>
  );
};
