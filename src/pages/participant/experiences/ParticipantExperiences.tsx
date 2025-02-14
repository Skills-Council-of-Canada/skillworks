
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ExperienceCard } from '@/components/participant/experiences/ExperienceCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Experience {
  id: string;
  title: string;
  description: string;
  status: string;
  start_date: string;
  end_date?: string;
  educator: {
    name: string;
  };
  milestones: Array<{
    id: string;
    title: string;
    due_date: string;
    status: string;
  }>;
  feedback: Array<{
    id: string;
    rating: number;
    comment: string;
    created_at: string;
    reviewer: {
      name: string;
    };
  }>;
}

interface RawSupabaseResponse {
  id: string;
  title: string;
  description: string;
  status: string;
  start_date: string;
  end_date: string | null;
  educator: { name: string }[];
  milestones: {
    id: string;
    title: string;
    due_date: string;
    status: string;
  }[];
  feedback: {
    id: string;
    rating: number;
    comment: string;
    created_at: string;
    reviewer: { name: string }[];
  }[];
}

const ParticipantExperiences = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = React.useState<string>('all');

  const { data: experiences, isLoading } = useQuery({
    queryKey: ['participant-experiences', statusFilter],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('Not authenticated');

      let query = supabase
        .from('participant_experiences')
        .select(`
          id,
          title,
          description,
          status,
          start_date,
          end_date,
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
            reviewer:profiles!experience_feedback_reviewer_id_fkey(name)
          )
        `)
        .eq('participant_id', userData.user.id);

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

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Experiences</h1>
        <div className="flex items-center gap-4">
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Experiences</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading experiences...</div>
      ) : !experiences?.length ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No experiences found</p>
          <Button onClick={() => navigate('/participant/portals')}>
            Browse Available Experiences
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={{
                ...experience,
                educator: {
                  name: experience.educator.name
                },
                progress: calculateProgress(experience.milestones || [])
              }}
              onViewDetails={() => navigate(`/participant/experiences/${experience.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const calculateProgress = (milestones: any[]) => {
  if (!milestones.length) return 0;
  const completed = milestones.filter(m => m.status === 'completed').length;
  return Math.round((completed / milestones.length) * 100);
};

export default ParticipantExperiences;
