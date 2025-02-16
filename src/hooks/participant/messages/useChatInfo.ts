
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ChatInfo } from "./types";

export const useChatInfo = (conversationId: string) => {
  return useQuery({
    queryKey: ["chat", conversationId],
    queryFn: async () => {
      const { data: application } = await supabase
        .from("applications")
        .select("employer_id, project:projects(title)")
        .eq("id", conversationId)
        .single();

      if (!application) {
        throw new Error("Application not found");
      }

      return {
        name: application.project?.title || "Direct Message",
        type: 'direct' as const,
        memberCount: 2
      } satisfies ChatInfo;
    },
    enabled: !!conversationId
  });
};
