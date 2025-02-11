
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { SupportHeader } from "@/components/admin/support/SupportHeader";
import { TicketsContent } from "@/components/admin/support/TicketsContent";
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
      <SupportHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <TabsContent value="tickets">
        <TicketsContent tickets={tickets || []} onViewDetails={setSelectedTicket} />
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

      <TicketDetailsDialog
        ticket={selectedTicket}
        open={!!selectedTicket}
        onOpenChange={(open) => !open && setSelectedTicket(null)}
      />
    </div>
  );
};

export default AdminSupport;
