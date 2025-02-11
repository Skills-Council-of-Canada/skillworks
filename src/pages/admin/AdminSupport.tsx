
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
import { Loader2, MessageSquare, Book, AlertCircle } from "lucide-react";
import { TicketDetailsDialog } from "@/components/admin/support/TicketDetailsDialog";
import { KnowledgeBaseManager } from "@/components/admin/support/KnowledgeBaseManager";
import { UserNotesManager } from "@/components/admin/support/UserNotesManager";
import type { SupportTicket } from "@/types/support";

const AdminSupport = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("tickets");
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  const { data: tickets, isLoading } = useQuery({
    queryKey: ["support-tickets"],
    queryFn: async () => {
      if (!user || user.role !== 'admin') {
        throw new Error('Unauthorized');
      }

      const { data, error } = await supabase
        .from("support_tickets")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching tickets:", error);
        toast({
          title: "Error",
          description: "Failed to load support tickets",
          variant: "destructive",
        });
        throw error;
      }
      return data as SupportTicket[];
    },
    enabled: !!user && user.role === 'admin',
  });

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "bg-gray-500",
      medium: "bg-blue-500",
      high: "bg-yellow-500",
      urgent: "bg-red-500",
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      open: "bg-green-500",
      in_progress: "bg-blue-500",
      resolved: "bg-gray-500",
      closed: "bg-gray-700",
    };
    return colors[status as keyof typeof colors] || colors.open;
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Unauthorized Access</h1>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Support & Helpdesk</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-background">
        <TabsList className="mb-6 bg-card">
          <TabsTrigger value="tickets" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <MessageSquare className="w-4 h-4" />
            Support Tickets
          </TabsTrigger>
          <TabsTrigger value="knowledge" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Book className="w-4 h-4" />
            Knowledge Base
          </TabsTrigger>
          <TabsTrigger value="user-notes" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <AlertCircle className="w-4 h-4" />
            User Notes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tickets">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>
                Manage and respond to user support requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets?.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>{ticket.title}</TableCell>
                      <TableCell className="capitalize">{ticket.category}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(ticket.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedTicket(ticket)}
                          className="hover:bg-primary hover:text-primary-foreground"
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="knowledge">
          <Card className="bg-card">
            <CardContent>
              <KnowledgeBaseManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="user-notes">
          <Card className="bg-card">
            <CardContent>
              <UserNotesManager />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <TicketDetailsDialog
        ticket={selectedTicket}
        open={!!selectedTicket}
        onOpenChange={(open) => !open && setSelectedTicket(null)}
      />
    </div>
  );
};

export default AdminSupport;
