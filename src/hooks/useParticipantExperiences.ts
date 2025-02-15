
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Experience } from '@/types/experience';

export const useParticipantExperiences = (statusFilter: string = 'all') => {
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['participant-experiences', statusFilter],
    queryFn: async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user) throw new Error('No user found');

        // Optimize the query by reducing nested selects and only fetching needed fields
        const query = supabase
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
            educator:profiles(id, full_name),
            milestones:experience_milestones!participant_id_fkey(
              id,
              title,
              due_date,
              status
            ),
            feedback:experience_feedback!participant_id_fkey(
              id,
              rating,
              comment,
              created_at,
              reviewer:profiles(id, full_name)
            )
          `)
          .eq('participant_id', user.id)
          .order('created_at', { ascending: false });

        // Add status filter if needed
        const finalQuery = statusFilter !== 'all' 
          ? query.eq('status', statusFilter)
          : query;

        const { data: experiences, error: experiencesError } = await finalQuery;

        if (experiencesError) {
          console.error('Error fetching experiences:', experiencesError);
          throw experiencesError;
        }

        // Optimize transformation by reducing object spread operations
        return (experiences || []).map((exp: any): Experience => ({
          id: exp.id,
          title: exp.title,
          description: exp.description,
          status: exp.status,
          start_date: exp.start_date,
          end_date: exp.end_date,
          trade_category: exp.trade_category,
          subcategories: exp.subcategories,
          skill_tags: exp.skill_tags,
          expected_outcomes: exp.expected_outcomes,
          project_examples: exp.project_examples,
          learner_capabilities: exp.learner_capabilities,
          media_urls: exp.media_urls,
          video_url: exp.video_url,
          team_structure: exp.team_structure,
          team_size: exp.team_size,
          preferred_companies: exp.preferred_companies,
          duration_hours: exp.duration_hours,
          learner_level: exp.learner_level,
          max_learners: exp.max_learners,
          educator: {
            name: exp.educator?.[0]?.full_name || ''
          },
          milestones: exp.milestones || [],
          feedback: (exp.feedback || []).map((f: any) => ({
            id: f.id,
            rating: f.rating,
            comment: f.comment,
            created_at: f.created_at,
            reviewer_profile_id: f.reviewer_profile_id,
            profiles: {
              name: f.reviewer?.[0]?.full_name || ''
            }
          }))
        }));

      } catch (err) {
        console.error('Error in useParticipantExperiences:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        return [];
      }
    },
    retry: 1,
    staleTime: 30000, // Cache data for 30 seconds
    cacheTime: 60000, // Keep in cache for 1 minute
  });

  return {
    data,
    isLoading,
    error
  };
};
