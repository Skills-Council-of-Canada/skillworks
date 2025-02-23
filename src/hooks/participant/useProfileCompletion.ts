
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/types/supabase";

type Tables = Database['public']['Tables'];
type Profile = Tables['profiles']['Row'];
type ParticipantProfile = {
  id: string;
  skill_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  availability: string;
  date_of_birth: string | null;
  educational_background: string | null;
  preferred_learning_areas: string[];
  // Include other fields from participant_profiles but we only need these for now
  onboarding_completed: boolean;
  email_verified: boolean;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type CombinedProfile = {
  full_name: string;
  bio: string | null;
} & Omit<Profile, 'name'> & 
  Pick<ParticipantProfile, 'skill_level' | 'availability' | 'date_of_birth' | 'educational_background' | 'preferred_learning_areas'>;

const fetchProfile = async (userId: string | undefined) => {
  if (!userId) return null;

  // Use Promise.all to fetch both profiles concurrently
  const [profileResponse, detailsResponse] = await Promise.all([
    supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single(),
    supabase
      .from('participant_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()
  ]);

  if (profileResponse.error) throw profileResponse.error;
  if (!profileResponse.data) return null;

  if (detailsResponse.error && detailsResponse.error.code !== 'PGRST116') {
    throw detailsResponse.error;
  }

  const combinedProfile: CombinedProfile = {
    ...profileResponse.data,
    full_name: profileResponse.data.name,
    bio: profileResponse.data.bio,
    skill_level: detailsResponse.data?.skill_level || 'beginner',
    availability: detailsResponse.data?.availability || 'flexible',
    date_of_birth: detailsResponse.data?.date_of_birth || null,
    educational_background: detailsResponse.data?.educational_background || null,
    preferred_learning_areas: detailsResponse.data?.preferred_learning_areas || [],
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
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
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
