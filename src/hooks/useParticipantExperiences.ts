
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Experience, RawSupabaseResponse } from '@/types/experience';
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
          educator:educator_id(name),
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
            reviewer:reviewer_id(name)
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

      // First cast to unknown, then to our expected raw response type
      const rawData = data as unknown as RawSupabaseResponse[];

      // Transform the data to match our Experience interface
      const transformedData: Experience[] = rawData.map(exp => ({
        ...exp,
        educator: {
          name: exp.educator?.[0]?.name || 'Unknown Educator'
        },
        feedback: exp.feedback?.map(f => ({
          ...f,
          reviewer: {
            name: f.reviewer?.[0]?.name || 'Unknown Reviewer'
          }
        })) || []
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
