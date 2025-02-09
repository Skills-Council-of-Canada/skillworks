
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

export const RequestsTab = () => {
  const { experienceId } = useParams();
  const { toast } = useToast();

  const { data: requests, isLoading } = useQuery({
    queryKey: ["experience-requests", experienceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experience_requests")
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
        console.error("Error fetching requests:", error);
        toast({
          title: "Error",
          description: "Failed to load requests",
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
    enabled: !!experienceId,
  });

  const updateRequestStatus = async (requestId: string, status: 'approved' | 'rejected') => {
    const { error } = await supabase
      .from("experience_requests")
      .update({ status })
      .eq("id", requestId);

    if (error) {
      console.error("Error updating request:", error);
      toast({
        title: "Error",
        description: "Failed to update request status",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: `Request ${status} successfully`,
    });
  };

  if (isLoading) {
    return <div>Loading requests...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Incoming Requests</CardTitle>
      </CardHeader>
      <CardContent>
        {requests && requests.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.employers.company_name}</TableCell>
                  <TableCell>{request.employers.industry}</TableCell>
                  <TableCell className="max-w-md truncate">
                    {request.message}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "approved"
                          ? "default"
                          : request.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-2">
                    {request.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateRequestStatus(request.id, "approved")}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateRequestStatus(request.id, "rejected")}
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
            No requests found for this experience.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

