
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export const useProfileCompletion = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["participant-registration", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      console.log("Fetching registration profile for user:", user.id);
      
      const { data, error } = await supabase
        .from("participant_registrations")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching registration:", error);
        toast({
          title: "Error",
          description: "Failed to fetch profile data",
          variant: "destructive",
        });
        return null;
      }

      if (!data) {
        console.log("No registration found for this user");
        return null;
      }

      console.log("Existing registration found:", data);
      return {
        ...data,
        full_name: `${data.first_name} ${data.last_name}`.trim(),
      };
    },
    enabled: !!user?.id,
    staleTime: 30000, // Consider data fresh for 30 seconds
    retry: 1,
  });

  const calculateCompletionPercentage = (profile: any) => {
    if (!profile) return 0;

    const requiredFields = [
      'first_name',
      'last_name',
      'email',
      'skill_level',
      'availability',
      'date_of_birth',
      'preferred_learning_areas'
    ];

    const completedFields = requiredFields.filter(field => {
      const value = profile[field];
      return value !== null && value !== undefined && 
             (Array.isArray(value) ? value.length > 0 : value !== '');
    });

    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  return {
    profile,
    isLoading,
    completionPercentage: profile ? calculateCompletionPercentage(profile) : 0,
  };
};
