
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectDetailsHeader from "@/components/employer/project/details/ProjectDetailsHeader";
import ProjectOverviewCard from "@/components/employer/project/details/ProjectOverviewCard";
import ProjectSpecificationsCard from "@/components/employer/project/details/ProjectSpecificationsCard";
import ApplicationsTabContent from "@/components/employer/project/details/ApplicationsTabContent";
import MessagesTabContent from "@/components/employer/project/details/MessagesTabContent";
import ProjectDetailsError from "@/components/employer/project/details/ProjectDetailsError";
import { useProjectDetails } from "@/components/employer/project/details/useProjectDetails";

const ProjectDetails = () => {
  const {
    project,
    isLoading,
    error,
    applicationsCount,
    isLoadingApplications,
    formattedStartDate,
    formattedEndDate
  } = useProjectDetails();

  // Handle error state
  if (error) {
    return <ProjectDetailsError />;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <ProjectDetailsHeader 
        title={project?.title || ""}
        isLoading={isLoading}
      />

      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <div className="grid gap-6 md:grid-cols-2">
            <ProjectOverviewCard 
              project={project}
              isLoading={isLoading}
            />
            <ProjectSpecificationsCard 
              project={project}
              isLoading={isLoading}
              formattedStartDate={formattedStartDate}
              formattedEndDate={formattedEndDate}
            />
          </div>
        </TabsContent>

        <TabsContent value="applications">
          <ApplicationsTabContent 
            applicationsCount={applicationsCount}
            isLoading={isLoadingApplications}
          />
        </TabsContent>

        <TabsContent value="messages">
          <MessagesTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetails;
