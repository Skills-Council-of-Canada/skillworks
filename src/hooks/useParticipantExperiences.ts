
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
          educator_id,
          educator:profiles!participant_experiences_educator_id_fkey(name),
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

      // Transform the data to match the Experience type
      const transformedExperiences: Experience[] = experiences?.map((exp: any) => ({
        ...exp,
        educator: exp.educator?.[0] || { name: '' }, // Handle the case where educator might be null
        feedback: exp.feedback?.map((f: any) => ({
          ...f,
          profiles: f.profiles?.[0] || { name: '' }
        })) || []
      })) || [];

      return transformedExperiences;
    }
  });

  return {
    data,
    isLoading,
    error
  };
};
