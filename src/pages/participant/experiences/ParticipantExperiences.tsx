import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Filter } from 'lucide-react';
import { ExperienceCard } from '@/components/participant/experiences/ExperienceCard';
import { StatusFilter } from '@/components/participant/experiences/StatusFilter';
import { useParticipantExperiences } from '@/hooks/useParticipantExperiences';
import { calculateProgress } from '@/utils/experienceUtils';

const ParticipantExperiences = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const { data: experiences, isLoading } = useParticipantExperiences(statusFilter);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Experiences</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your learning experiences
          </p>
        </div>
        <div className="flex items-center gap-4">
          <StatusFilter 
            value={statusFilter}
            onValueChange={setStatusFilter}
          />
          <Button onClick={() => navigate('/participant/create-experience')} className="bg-primary">
            <Plus className="w-4 h-4 mr-2" />
            Create Experience
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full justify-start bg-gray-50">
          <TabsTrigger value="all">
            All Experiences
          </TabsTrigger>
          <TabsTrigger value="active">
            Active
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed
          </TabsTrigger>
          <TabsTrigger value="drafts">
            Drafts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <Card key={n} className="p-6 h-[280px] animate-pulse">
                  <div className="w-2/3 h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="w-full h-24 bg-gray-100 rounded"></div>
                </Card>
              ))}
            </div>
          ) : !experiences?.length ? (
            <Card className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No experiences found</h3>
              <p className="text-muted-foreground">
                Start by creating your first experience or adjust your filters
              </p>
              <Button 
                onClick={() => navigate('/participant/create-experience')} 
                className="mt-4"
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Experience
              </Button>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {experiences.map((experience) => (
                <ExperienceCard
                  key={experience.id}
                  experience={{
                    ...experience,
                    progress: calculateProgress(experience.milestones || [])
                  }}
                  onViewDetails={() => navigate(`/participant/experiences/${experience.id}`)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="active">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {experiences?.filter(exp => exp.status === 'in_progress').map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={{
                  ...experience,
                  progress: calculateProgress(experience.milestones || [])
                }}
                onViewDetails={() => navigate(`/participant/experiences/${experience.id}`)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {experiences?.filter(exp => exp.status === 'completed').map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={{
                  ...experience,
                  progress: calculateProgress(experience.milestones || [])
                }}
                onViewDetails={() => navigate(`/participant/experiences/${experience.id}`)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drafts">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {experiences?.filter(exp => exp.status === 'draft').map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={{
                  ...experience,
                  progress: calculateProgress(experience.milestones || [])
                }}
                onViewDetails={() => navigate(`/participant/experiences/${experience.id}`)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParticipantExperiences;
