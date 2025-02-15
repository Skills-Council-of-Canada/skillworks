
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Experience } from '@/types/experience';

export const useParticipantExperiences = (statusFilter: string = 'all') => {
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['participant-experiences', statusFilter],
    queryFn: async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      let query = supabase
        .from('participant_experiences')
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
            reviewer_profile_id,
            profiles!experience_feedback_reviewer_profile_id_fkey(name)
          )
        `)
        .eq('participant_id', user?.id);

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data: experiences, error: experiencesError } = await query;

      if (experiencesError) {
        console.error('Error fetching experiences:', experiencesError);
        setError(experiencesError.message);
        return [];
      }

      return experiences as Experience[];
    }
  });

  return {
    data,
    isLoading,
    error
  };
};
