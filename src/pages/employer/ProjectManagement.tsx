
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectList } from "@/components/employer/project/ProjectList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ProjectManagement = () => {
  const [activeTab, setActiveTab] = useState("active");
  const navigate = useNavigate();

  const handleCreateProject = () => {
    navigate("/employer/projects/create");
  };

  return (
    <div className="container mx-auto p-2 sm:p-6 space-y-4 sm:space-y-6 max-w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold">My Projects</h1>
        <Button onClick={handleCreateProject}>
          <Plus className="mr-2 h-4 w-4" />
          Create Project
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full flex justify-start mb-4 overflow-x-auto no-scrollbar">
          <TabsTrigger value="active" className="flex-1 sm:flex-none">Active Projects</TabsTrigger>
          <TabsTrigger value="drafts" className="flex-1 sm:flex-none">Drafts</TabsTrigger>
          <TabsTrigger value="completed" className="flex-1 sm:flex-none">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-0">
          <ProjectList status="active" />
        </TabsContent>

        <TabsContent value="drafts" className="mt-0">
          <ProjectList status="draft" />
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          <ProjectList status="completed" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectManagement;
