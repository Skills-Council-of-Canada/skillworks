
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ParticipantAchievement } from "@/types/participant";
import { useToast } from "@/hooks/use-toast";

export const useParticipantAchievements = (participantId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: achievements, isLoading } = useQuery({
    queryKey: ["participant-achievements", participantId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("participant_achievements")
        .select("*")
        .eq("participant_id", participantId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ParticipantAchievement[];
    },
  });

  const uploadBadgeImage = useMutation({
    mutationFn: async (file: File) => {
      const fileExt = file.name.split(".").pop();
      const filePath = `${participantId}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("participant-files")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      return filePath;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participant-achievements"] });
      toast({
        title: "Success",
        description: "Badge image uploaded successfully",
      });
    },
    onError: (error) => {
      console.error("Error uploading badge image:", error);
      toast({
        title: "Error",
        description: "Failed to upload badge image",
        variant: "destructive",
      });
    },
  });

  return {
    achievements,
    isLoading,
    uploadBadgeImage,
  };
};
