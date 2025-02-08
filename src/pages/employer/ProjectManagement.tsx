
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectList } from "@/components/employer/project/ProjectList";

const ProjectManagement = () => {
  const [activeTab, setActiveTab] = useState("active");
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Projects</h1>
      </div>

      <Tabs defaultValue="active" className="w-full" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Active Projects</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <ProjectList status="active" />
        </TabsContent>

        <TabsContent value="drafts">
          <ProjectList status="draft" />
        </TabsContent>

        <TabsContent value="completed">
          <ProjectList status="completed" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectManagement;
