
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectDetails = () => {
  const { projectId } = useParams();

  // Mock project data - replace with actual data fetching
  const project = {
    id: projectId,
    title: "Electrical Maintenance Training",
    description: "Hands-on training program for electrical maintenance...",
    tradeType: "Electrical",
    skillLevel: "Intermediate",
    startDate: "2024-03-01",
    endDate: "2024-06-01",
    locationType: "On-site",
    positions: 5,
    applications: 3,
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{project.title}</h1>
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
                      {project.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold">Trade Type</h3>
                      <p className="text-sm text-muted-foreground">
                        {project.tradeType}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Skill Level</h3>
                      <p className="text-sm text-muted-foreground">
                        {project.skillLevel}
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
                        {project.startDate}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold">End Date</h3>
                      <p className="text-sm text-muted-foreground">
                        {project.endDate}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold">Location Type</h3>
                      <p className="text-sm text-muted-foreground">
                        {project.locationType}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Positions</h3>
                      <p className="text-sm text-muted-foreground">
                        {project.positions}
                      </p>
                    </div>
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
              <p className="text-muted-foreground">
                {project.applications} applications received
              </p>
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
