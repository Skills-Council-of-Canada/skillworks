
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const ProjectDetails = () => {
  const { projectId } = useParams();

  // Fetch project data with React Query for caching and better loading states
  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      if (!projectId) throw new Error("Project ID is required");
      
      const { data, error } = await supabase
        .from('projects')
        .select(`
          id,
          title,
          description,
          trade_type,
          skill_level,
          start_date,
          end_date,
          location_type,
          site_address,
          positions,
          status
        `)
        .eq('id', projectId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!projectId,
  });

  // Fetch applications count with a separate query
  const { data: applicationsCount = 0, isLoading: isLoadingApplications } = useQuery({
    queryKey: ['projectApplications', projectId],
    queryFn: async () => {
      if (!projectId) return 0;
      
      const { count, error } = await supabase
        .from('applications')
        .select('id', { count: 'exact', head: true })
        .eq('project_id', projectId);
      
      if (error) throw error;
      return count || 0;
    },
    enabled: !!projectId,
  });

  // Render loading skeletons while data is being fetched
  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-64" />
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card className="p-6">
          <CardTitle className="text-xl mb-4">Error Loading Project</CardTitle>
          <p className="text-muted-foreground">
            There was an error loading the project details. Please try again later.
          </p>
        </Card>
      </div>
    );
  }

  // Format dates if they exist
  const formattedStartDate = project?.start_date 
    ? format(new Date(project.start_date), 'MMM d, yyyy')
    : 'Not specified';
  
  const formattedEndDate = project?.end_date 
    ? format(new Date(project.end_date), 'MMM d, yyyy')
    : 'Not specified';

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{project?.title}</h1>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Description</h3>
                    <p className="text-sm text-muted-foreground">
                      {project?.description || 'No description provided'}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold">Trade Type</h3>
                      <p className="text-sm text-muted-foreground">
                        {project?.trade_type || 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Skill Level</h3>
                      <p className="text-sm text-muted-foreground">
                        {project?.skill_level || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold">Start Date</h3>
                      <p className="text-sm text-muted-foreground">
                        {formattedStartDate}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold">End Date</h3>
                      <p className="text-sm text-muted-foreground">
                        {formattedEndDate}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold">Location Type</h3>
                      <p className="text-sm text-muted-foreground">
                        {project?.location_type || 'Not specified'}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Positions</h3>
                      <p className="text-sm text-muted-foreground">
                        {project?.positions || 'Not specified'}
                      </p>
                    </div>
                  </div>
                  {project?.site_address && (
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-sm text-muted-foreground">
                        {project.site_address}
                      </p>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">Status</h3>
                    <p className="text-sm text-muted-foreground capitalize">
                      {project?.status || 'Unknown'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Applications</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingApplications ? (
                <Skeleton className="h-4 w-1/2" />
              ) : (
                <p className="text-muted-foreground">
                  {applicationsCount} application{applicationsCount !== 1 ? 's' : ''} received
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No messages yet</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetails;
