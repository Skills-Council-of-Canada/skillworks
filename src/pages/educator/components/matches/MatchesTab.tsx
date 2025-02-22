
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
      <CardContent className="p-0 md:p-6">
        {matches && matches.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="min-w-[640px] w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Company</TableHead>
                    <TableHead className="whitespace-nowrap hidden md:table-cell">Industry</TableHead>
                    <TableHead className="whitespace-nowrap hidden md:table-cell">Location</TableHead>
                    <TableHead className="whitespace-nowrap">Match Score</TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matches.map((match) => (
                    <TableRow key={match.id}>
                      <TableCell className="font-medium">
                        <div>
                          {match.employers.company_name}
                          <div className="md:hidden text-xs text-gray-500">
                            {match.employers.industry} • {match.employers.location}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{match.employers.industry}</TableCell>
                      <TableCell className="hidden md:table-cell">{match.employers.location}</TableCell>
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
                      <TableCell>
                        {match.status === "pending" && (
                          <div className="flex flex-col md:flex-row gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateMatchStatus(match.id, "accepted")}
                              className="w-full md:w-auto"
                            >
                              <CheckCircle className="h-4 w-4 md:mr-1" />
                              <span className="hidden md:inline">Accept</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateMatchStatus(match.id, "rejected")}
                              className="w-full md:w-auto"
                            >
                              <XCircle className="h-4 w-4 md:mr-1" />
                              <span className="hidden md:inline">Reject</span>
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No matches found for this experience.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
