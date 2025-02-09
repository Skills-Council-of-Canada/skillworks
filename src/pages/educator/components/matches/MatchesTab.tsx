
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const MatchesTab = () => {
  const { experienceId } = useParams();
  const { toast } = useToast();

  const { data: matches, isLoading } = useQuery({
    queryKey: ["experience-matches", experienceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experience_matches")
        .select(`
          *,
          employers (
            company_name,
            industry,
            location
          )
        `)
        .eq("experience_id", experienceId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching matches:", error);
        toast({
          title: "Error",
          description: "Failed to load matches",
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
    enabled: !!experienceId,
  });

  const updateMatchStatus = async (matchId: string, status: 'accepted' | 'rejected') => {
    const { error } = await supabase
      .from("experience_matches")
      .update({ status })
      .eq("id", matchId);

    if (error) {
      console.error("Error updating match:", error);
      toast({
        title: "Error",
        description: "Failed to update match status",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: `Match ${status} successfully`,
    });
  };

  if (isLoading) {
    return <div>Loading matches...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employer Matches</CardTitle>
      </CardHeader>
      <CardContent>
        {matches && matches.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Match Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matches.map((match) => (
                <TableRow key={match.id}>
                  <TableCell>{match.employers.company_name}</TableCell>
                  <TableCell>{match.employers.industry}</TableCell>
                  <TableCell>{match.employers.location}</TableCell>
                  <TableCell>{match.match_score}%</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        match.status === "accepted"
                          ? "default"
                          : match.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {match.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-2">
                    {match.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateMatchStatus(match.id, "accepted")}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateMatchStatus(match.id, "rejected")}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No matches found for this experience.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

