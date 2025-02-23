
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/types/supabase";

type Tables = Database['public']['Tables'];
type Profile = Tables['profiles']['Row'];
type ParticipantProfile = Tables['participant_profiles']['Row'];

export type CombinedProfile = {
  full_name: string;
  bio: string | null;
} & Omit<Profile, 'name'> & {
  skill_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  availability: string;
  date_of_birth: string | null;
  educational_background: string | null;
  preferred_learning_areas: string[];
};

const fetchProfile = async (userId: string | undefined) => {
  if (!userId) return null;

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (profileError) throw profileError;
  if (!profile) return null;

  const { data: details, error: detailsError } = await supabase
    .from('participant_profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (detailsError && detailsError.code !== 'PGRST116') {
    throw detailsError;
  }

  const combinedProfile: CombinedProfile = {
    ...profile,
    full_name: profile.name,
    bio: profile.bio,
    skill_level: (details?.skill_level as CombinedProfile['skill_level']) || 'beginner',
    availability: details?.availability || 'flexible',
    date_of_birth: details?.date_of_birth || null,
    educational_background: details?.educational_background || null,
    preferred_learning_areas: details?.preferred_learning_areas || [],
  };

  return combinedProfile;
};

const calculateCompletionPercentage = (profile: CombinedProfile | null) => {
  if (!profile) return 0;

  const requiredFields = [
    'full_name',
    'email',
    'phone',
    'skill_level',
    'availability',
    'date_of_birth',
    'preferred_learning_areas',
    'educational_background'
  ];

  const completedFields = requiredFields.filter(field => {
    const value = profile[field as keyof CombinedProfile];
    return value !== null && value !== undefined && 
           (Array.isArray(value) ? value.length > 0 : value !== '');
  });

  return Math.round((completedFields.length / requiredFields.length) * 100);
};

export const useProfileCompletion = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const query = useQuery({
    queryKey: ["participant-profile", user?.id],
    queryFn: () => fetchProfile(user?.id),
    enabled: !!user?.id,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 0,
    meta: {
      onError: (error: any) => {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: "Failed to fetch profile data",
          variant: "destructive",
        });
      }
    }
  });

  return {
    profile: query.data,
    isLoading: query.isLoading,
    completionPercentage: query.data ? calculateCompletionPercentage(query.data) : 0
  };
};
