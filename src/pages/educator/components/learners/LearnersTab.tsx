
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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

interface LearnersTabProps {
  experienceId: string;
}

export const LearnersTab = ({ experienceId }: LearnersTabProps) => {
  const { toast } = useToast();

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
                    <Badge className={getStatusBadge(enrollment.status)}>
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
  );
};
