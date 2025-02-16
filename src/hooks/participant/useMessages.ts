
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Conversation, DatabaseApplication, Message } from "@/types/message";

export const useMessages = () => {
  const { user } = useAuth();

  const query = useQuery<Conversation[]>({
    queryKey: ["conversations", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select(`
          id,
          employer_id,
          learner_id,
          last_message,
          last_message_at,
          project:projects (
            id,
            title
          ),
          messages (
            id,
            content,
            created_at,
            sender_id,
            read_at
          )
        `)
        .eq("learner_id", user?.id)
        .order("last_message_at", { ascending: false });

      if (error) throw error;
      if (!data) return [];

      const applications = data as DatabaseApplication[];

      return applications.map((app): Conversation => {
        const messages = app.messages || [];
        const unreadCount = messages.filter(
          (msg) => msg.sender_id !== user?.id && !msg.read_at
        ).length;

        const lastMessage: Message | undefined = app.last_message ? {
          id: messages[0]?.id || 'temp',
          applicationId: app.id,
          senderId: messages[0]?.sender_id || app.employer_id || '',
          senderType: messages[0]?.sender_id === user?.id ? "learner" : "employer",
          content: app.last_message,
          timestamp: new Date(app.last_message_at || new Date()),
          readAt: messages[0]?.read_at ? new Date(messages[0].read_at) : undefined,
        } : undefined;

        return {
          applicationId: app.id,
          projectId: app.project?.id || "",
          projectTitle: app.project?.title || "Untitled Project",
          employerId: app.employer_id || "",
          learnerId: app.learner_id || "",
          lastMessage,
          unreadCount,
          updatedAt: app.last_message_at ? new Date(app.last_message_at) : new Date(),
          type: 'direct',
        };
      });
    },
    enabled: !!user?.id,
  });

  return {
    conversations: query.data ?? [],
    isLoading: query.isLoading,
  };
};
