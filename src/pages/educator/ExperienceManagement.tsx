
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Briefcase, InboxIcon, Users2, MessageSquare, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { EducatorExperience } from "@/types/educator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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

      const transformedData = {
        ...data,
        screening_questions: Array.isArray(data.screening_questions)
          ? data.screening_questions.map((q: any) => ({
              question: q.question || '',
              required: Boolean(q.required),
            }))
          : [],
        skill_level: (data.skill_level as 'beginner' | 'intermediate' | 'advanced') || 'beginner',
        status: (data.status as 'incomplete' | 'draft' | 'pending_approval' | 'published') || 'draft',
        subcategories: Array.isArray(data.subcategories) ? data.subcategories : [],
        skill_tags: Array.isArray(data.skill_tags) ? data.skill_tags : [],
        company_types: Array.isArray(data.company_types) ? data.company_types : [],
        required_certifications: Array.isArray(data.required_certifications) ? data.required_certifications : [],
        preferred_industries: Array.isArray(data.preferred_industries) ? data.preferred_industries : [],
      } as EducatorExperience;

      return transformedData;
    },
    enabled: !!experienceId,
  });

  // Query for learners assigned to this experience
  const { data: learners, isLoading: isLoadingLearners } = useQuery({
    queryKey: ["learners", experienceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experience_assignments")
        .select(`
          id,
          status,
          created_at,
          students (
            id,
            first_name,
            last_name,
            email
          )
        `)
        .eq("experience_id", experienceId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load learners",
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
    enabled: !!experienceId,
  });

  if (isLoading) {
    return <div className="p-8">Loading experience details...</div>;
  }

  if (!experience) {
    return <div className="p-8">Experience not found</div>;
  }

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: "bg-yellow-500",
      accepted: "bg-green-500",
      completed: "bg-blue-500",
      declined: "bg-red-500",
    };
    return statusStyles[status as keyof typeof statusStyles] || "bg-gray-500";
  };

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
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Learners</CardTitle>
                  <CardDescription>
                    Manage students enrolled in this experience
                  </CardDescription>
                </div>
                <Button>
                  <Users className="mr-2 h-4 w-4" />
                  Add Learner
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingLearners ? (
                <div className="text-center py-4">Loading learners...</div>
              ) : !learners?.length ? (
                <div className="text-center py-4 text-muted-foreground">
                  No learners enrolled yet
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {learners.map((enrollment) => (
                      <TableRow key={enrollment.id}>
                        <TableCell>
                          {enrollment.students?.first_name}{" "}
                          {enrollment.students?.last_name}
                        </TableCell>
                        <TableCell>{enrollment.students?.email}</TableCell>
                        <TableCell>
                          <Badge
                            className={getStatusBadge(enrollment.status)}
                          >
                            {enrollment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(enrollment.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
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
