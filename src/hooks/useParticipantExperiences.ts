
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Experience } from '@/types/experience';
import { useToast } from '@/hooks/use-toast';

interface DatabaseExperience {
  id: string;
  title: string;
  description: string;
  status: string;
  start_date: string;
  end_date: string | null;
  educator_profiles: {
    full_name: string;
  } | null;
  trade_category: string | null;
  subcategories: string[] | null;
  skill_tags: string[] | null;
  expected_outcomes: string[] | null;
  project_examples: any[] | null;
  learner_capabilities: string | null;
  media_urls: string[] | null;
  video_url: string | null;
  team_structure: string | null;
  team_size: number | null;
  preferred_companies: any | null;
  duration_hours: number | null;
  learner_level: string | null;
  max_learners: number | null;
  milestones: Array<{
    id: string;
    title: string;
    due_date: string;
    status: string;
  }> | null;
  feedback: Array<{
    id: string;
    rating: number;
    comment: string;
    created_at: string;
    profiles: {
      name: string;
    } | null;
  }> | null;
}

export const useParticipantExperiences = (statusFilter: string) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['participant-experiences', statusFilter],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      let query = supabase
        .from("participant_experiences")
        .select(`
          id,
          title,
          description,
          status,
          start_date,
          end_date,
          trade_category,
          subcategories,
          skill_tags,
          expected_outcomes,
          project_examples,
          learner_capabilities,
          media_urls,
          video_url,
          team_structure,
          team_size,
          preferred_companies,
          duration_hours,
          learner_level,
          max_learners,
          educator_profiles(
            full_name
          ),
          milestones:experience_milestones(
            id,
            title,
            due_date,
            status
          ),
          feedback:experience_feedback(
            id,
            rating,
            comment,
            created_at,
            profiles(
              name
            )
          )
        `)
        .eq('participant_id', user.id);

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query.returns<DatabaseExperience[]>();

      if (error) {
        console.error('Error fetching experiences:', error);
        throw error;
      }

      // Transform the data to match our Experience interface
      const transformedData: Experience[] = (data || []).map(exp => ({
        ...exp,
        educator: {
          name: exp.educator_profiles?.full_name || 'Unknown Educator'
        },
        feedback: (exp.feedback || []).map(f => ({
          ...f,
          reviewer: {
            name: f.profiles?.name || 'Anonymous Reviewer'
          }
        }))
      }));

      return transformedData;
    },
    meta: {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to load experiences",
          variant: "destructive",
        });
      }
    }
  });
};
