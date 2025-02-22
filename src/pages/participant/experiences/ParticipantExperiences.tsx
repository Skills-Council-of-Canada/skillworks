
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
import { useIsMobile } from '@/hooks/use-mobile';

const ParticipantExperiences = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const { data: experiences, isLoading } = useParticipantExperiences(statusFilter);
  const isMobile = useIsMobile();

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="container mx-auto p-3 sm:p-6 space-y-6 sm:space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">My Experiences</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Manage and track your learning experiences
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <div className="flex-1 sm:flex-initial">
              <StatusFilter 
                value={statusFilter}
                onValueChange={setStatusFilter}
              />
            </div>
            <Button 
              onClick={() => navigate('/participant/create-experience')} 
              className="bg-primary shrink-0"
              size={isMobile ? "sm" : "default"}
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="whitespace-nowrap">Create Experience</span>
            </Button>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="all" className="w-full">
          <div className="overflow-x-auto scrollbar-none -mx-3 px-3">
            <TabsList className="w-full inline-flex sm:flex justify-start bg-gray-50 p-1">
              <TabsTrigger value="all" className="flex-1 sm:flex-none">
                All Experiences
              </TabsTrigger>
              <TabsTrigger value="active" className="flex-1 sm:flex-none">
                Active
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex-1 sm:flex-none">
                Completed
              </TabsTrigger>
              <TabsTrigger value="drafts" className="flex-1 sm:flex-none">
                Drafts
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-6">
            {isLoading ? (
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((n) => (
                  <Card key={n} className="p-4 sm:p-6 h-[280px] animate-pulse">
                    <div className="w-2/3 h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="w-full h-24 bg-gray-100 rounded"></div>
                  </Card>
                ))}
              </div>
            ) : !experiences?.length ? (
              <Card className="p-6 sm:p-8 text-center">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">No experiences found</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
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
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
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
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
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
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
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
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
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
    </div>
  );
};

export default ParticipantExperiences;
