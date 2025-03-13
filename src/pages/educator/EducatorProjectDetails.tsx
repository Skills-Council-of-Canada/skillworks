
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProjectDetails } from "@/hooks/educator/useProjectDetails";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EducatorProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { project, isLoading, error } = useProjectDetails(projectId);

  if (error) {
    return (
      <Card className="p-6">
        <CardTitle className="text-xl mb-4">Error Loading Project</CardTitle>
        <p className="text-muted-foreground">
          There was an error loading the project details. Please try again later.
        </p>
        <Button onClick={() => navigate(-1)} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </Card>
    );
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => navigate(-1)} size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Button>
      </div>

      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{project?.title}</h1>
            <p className="text-muted-foreground">{project?.trade_type}</p>
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList>
              <TabsTrigger value="details">Project Details</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="company">Company Info</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-medium text-sm">Description</h3>
                        <p className="text-sm whitespace-pre-wrap">{project?.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Timeline</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(project?.start_date).toLocaleDateString()} - {new Date(project?.end_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Location</p>
                          <p className="text-sm text-muted-foreground">
                            {project?.location_type}{' '}
                            {project?.location_type === 'On-site' && project?.site_address ? `- ${project.site_address}` : ''}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Positions</p>
                          <p className="text-sm text-muted-foreground">
                            {project?.positions} available 
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="requirements">
              <Card>
                <CardHeader>
                  <CardTitle>Project Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium text-sm">Skill Level</h3>
                      <p>{project?.skill_level}</p>
                    </div>
                    
                    {project?.certifications_required && project.certifications_required.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="font-medium text-sm">Required Certifications</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {project.certifications_required.map((cert, index) => (
                            <li key={index} className="text-sm">{cert}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {project?.safety_requirements && project.safety_requirements.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="font-medium text-sm">Safety Requirements</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {project.safety_requirements.map((req, index) => (
                            <li key={index} className="text-sm">{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="company">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To view detailed company information, please express interest in this project.
                  </p>
                  <Button className="mt-4">Express Interest</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

const LoadingState = () => (
  <>
    <Skeleton className="h-10 w-64 mb-4" />
    <Skeleton className="h-6 w-40 mb-6" />
    
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-20" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-28" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  </>
);

export default EducatorProjectDetails;
