
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Experience } from '@/types/experience';
import { useToast } from '@/hooks/use-toast';

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
          educator:profiles!participant_experiences_educator_id_fkey(
            name
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
            reviewer:profiles!experience_feedback_reviewer_id_fkey(
              name
            )
          )
        `)
        .eq('participant_id', user.id);

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching experiences:', error);
        throw error;
      }

      // Transform the data to match our Experience interface
      const transformedData: Experience[] = (data || []).map(exp => ({
        ...exp,
        educator: {
          name: exp.educator?.name || 'Unknown Educator'
        },
        feedback: (exp.feedback || []).map(f => ({
          ...f,
          reviewer: {
            name: f.reviewer?.name || 'Anonymous Reviewer'
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
