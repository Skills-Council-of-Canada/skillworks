
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Briefcase, InboxIcon, Users2, MessageSquare, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { EducatorExperience } from "@/types/educator";

const ExperienceManagement = () => {
  const { experienceId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: experience, isLoading } = useQuery({
    queryKey: ["experience", experienceId],
    queryFn: async () => {
      if (!experienceId) throw new Error("No experience ID provided");

      const { data, error } = await supabase
        .from("educator_experiences")
        .select("*")
        .eq("id", experienceId)
        .single();

      if (error) {
        console.error("Error fetching experience:", error);
        toast({
          title: "Error",
          description: "Failed to load experience details",
          variant: "destructive",
        });
        throw error;
      }

      return data as EducatorExperience;
    },
    enabled: !!experienceId,
  });

  if (isLoading) {
    return <div className="p-8">Loading experience details...</div>;
  }

  if (!experience) {
    return <div className="p-8">Experience not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/educator/experiences")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{experience.title}</h1>
            <p className="text-sm text-muted-foreground">
              Manage learners, matches, and progress
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="learners" className="space-y-6">
        <TabsList>
          <TabsTrigger value="learners" className="space-x-2">
            <Users className="h-4 w-4" />
            <span>Learners</span>
          </TabsTrigger>
          <TabsTrigger value="matches" className="space-x-2">
            <Briefcase className="h-4 w-4" />
            <span>Matches</span>
          </TabsTrigger>
          <TabsTrigger value="requests" className="space-x-2">
            <InboxIcon className="h-4 w-4" />
            <span>Requests</span>
          </TabsTrigger>
          <TabsTrigger value="members" className="space-x-2">
            <Users2 className="h-4 w-4" />
            <span>Members</span>
          </TabsTrigger>
          <TabsTrigger value="updates" className="space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Updates</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="space-x-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="learners">
          <div className="rounded-lg border p-4">
            <h2 className="text-lg font-semibold mb-4">Learners</h2>
            {/* Learner management content will go here */}
          </div>
        </TabsContent>

        <TabsContent value="matches">
          <div className="rounded-lg border p-4">
            <h2 className="text-lg font-semibold mb-4">Employer Matches</h2>
            {/* Matches content will go here */}
          </div>
        </TabsContent>

        <TabsContent value="requests">
          <div className="rounded-lg border p-4">
            <h2 className="text-lg font-semibold mb-4">Incoming Requests</h2>
            {/* Requests content will go here */}
          </div>
        </TabsContent>

        <TabsContent value="members">
          <div className="rounded-lg border p-4">
            <h2 className="text-lg font-semibold mb-4">Team Members</h2>
            {/* Members management content will go here */}
          </div>
        </TabsContent>

        <TabsContent value="updates">
          <div className="rounded-lg border p-4">
            <h2 className="text-lg font-semibold mb-4">Updates</h2>
            {/* Updates content will go here */}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="rounded-lg border p-4">
            <h2 className="text-lg font-semibold mb-4">Experience Settings</h2>
            {/* Settings content will go here */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExperienceManagement;
