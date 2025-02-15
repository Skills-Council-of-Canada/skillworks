
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Conversation } from "@/types/message";

export const useMessages = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["conversations", user?.id],
    queryFn: async () => {
      const { data: applications } = await supabase
        .from("applications")
        .select(`
          id,
          project_id,
          employer_id,
          messages (
            id,
            content,
            created_at,
            sender_id
          )
        `)
        .eq("learner_id", user?.id)
        .order("created_at", { foreignTable: "messages", ascending: false });

      if (!applications) return [];

      return applications.map((app): Conversation => {
        const messages = app.messages || [];
        const lastMessage = messages[0];
        const unreadCount = messages.filter(
          (msg) => msg.sender_id !== user?.id && !msg.read_at
        ).length;

        return {
          applicationId: app.id,
          projectId: app.project_id,
          employerId: app.employer_id,
          learnerId: user?.id || "",
          lastMessage: lastMessage
            ? {
                id: lastMessage.id,
                content: lastMessage.content,
                timestamp: new Date(lastMessage.created_at),
              }
            : undefined,
          unreadCount,
          updatedAt: lastMessage ? new Date(lastMessage.created_at) : new Date(),
        };
      });
    },
    enabled: !!user?.id,
  });
};
