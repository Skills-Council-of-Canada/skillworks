
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExperienceCard } from '@/components/participant/experiences/ExperienceCard';
import { Button } from '@/components/ui/button';
import { StatusFilter } from '@/components/participant/experiences/StatusFilter';
import { useParticipantExperiences } from '@/hooks/useParticipantExperiences';
import { calculateProgress } from '@/utils/experienceUtils';

const ParticipantExperiences = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const { data: experiences, isLoading } = useParticipantExperiences(statusFilter);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Experiences</h1>
        <div className="flex items-center gap-4">
          <StatusFilter 
            value={statusFilter}
            onValueChange={setStatusFilter}
          />
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

export default ParticipantExperiences;
