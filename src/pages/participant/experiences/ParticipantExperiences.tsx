
import React, { useState } from 'react';
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

const ParticipantExperiences = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = React.useState<string>('all');

  const { data: experiences, isLoading } = useQuery({
    queryKey: ['participant-experiences', statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('participant_experiences')
        .select(`
          *,
          educator:profiles!participant_experiences_educator_id_fkey(name),
          milestones:experience_milestones!participant_experience_id(
            id,
            title,
            due_date,
            status
          ),
          feedback:experience_feedback!participant_experience_id(
            id,
            rating,
            comment,
            created_at,
            reviewer:profiles!experience_feedback_reviewer_id_fkey(name)
          )
        `);

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching experiences:', error);
        throw error;
      }

      return data;
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
                  name: experience.educator?.name || 'Unknown Educator'
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
