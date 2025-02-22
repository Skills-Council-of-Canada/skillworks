
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';
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

  const filteredExperiences = React.useMemo(() => {
    if (!experiences) return [];
    switch (statusFilter) {
      case 'in_progress':
        return experiences.filter(exp => exp.status === 'in_progress');
      case 'completed':
        return experiences.filter(exp => exp.status === 'completed');
      case 'draft':
        return experiences.filter(exp => exp.status === 'draft');
      default:
        return experiences;
    }
  }, [experiences, statusFilter]);

  return (
    <div className="w-full min-h-0 overflow-hidden">
      <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col h-full max-w-full">
        {/* Header Section */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="flex-shrink-0">
              <h1 className="text-2xl sm:text-3xl font-bold">My Experiences</h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                Manage and track your learning experiences
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <div className="w-full sm:w-[180px]">
                <StatusFilter 
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                />
              </div>
              <Button 
                onClick={() => navigate('/participant/create-experience')} 
                className="w-full sm:w-auto bg-primary"
                size={isMobile ? "sm" : "default"}
              >
                <Plus className="w-4 h-4 mr-2" />
                <span>Create Experience</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="all" className="flex-1 flex flex-col min-h-0">
          <div className="overflow-x-auto scrollbar-none -mx-3 px-3">
            <TabsList className="w-full inline-flex sm:flex justify-start bg-gray-50 p-1">
              <TabsTrigger 
                value="all" 
                className="flex-1 sm:flex-initial text-sm py-2 px-3 sm:px-6 min-w-[100px]"
              >
                All Experiences
              </TabsTrigger>
              <TabsTrigger 
                value="active" 
                className="flex-1 sm:flex-initial text-sm py-2 px-3 sm:px-6 min-w-[80px]"
              >
                Active
              </TabsTrigger>
              <TabsTrigger 
                value="completed" 
                className="flex-1 sm:flex-initial text-sm py-2 px-3 sm:px-6 min-w-[100px]"
              >
                Completed
              </TabsTrigger>
              <TabsTrigger 
                value="drafts" 
                className="flex-1 sm:flex-initial text-sm py-2 px-3 sm:px-6 min-w-[80px]"
              >
                Drafts
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto mt-6">
            {isLoading ? (
              <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((n) => (
                  <Card key={n} className="p-4 sm:p-6 h-[280px] animate-pulse">
                    <div className="w-2/3 h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="w-full h-24 bg-gray-100 rounded"></div>
                  </Card>
                ))}
              </div>
            ) : !filteredExperiences.length ? (
              <Card className="p-4 sm:p-8 text-center">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">No experiences found</h3>
                <p className="text-muted-foreground text-sm sm:text-base mb-4">
                  {statusFilter === 'all' 
                    ? 'Start by creating your first experience' 
                    : 'Try adjusting your filters to find more experiences'}
                </p>
                <Button 
                  onClick={() => navigate('/participant/create-experience')} 
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Experience
                </Button>
              </Card>
            ) : (
              <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredExperiences.map((experience) => (
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
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ParticipantExperiences;
