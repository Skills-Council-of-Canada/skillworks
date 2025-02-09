
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { EmployerCollaboration } from "@/types/collaboration";
import { EmployerDirectory } from "@/components/educator/collaboration/EmployerDirectory";
import { CollaborationList } from "@/components/educator/collaboration/CollaborationList";
import { CollaborationRequestDialog } from "@/components/educator/collaboration/CollaborationRequestDialog";
import { ChatDialog } from "@/components/educator/collaboration/ChatDialog";

interface Employer {
  id: string;
  company_name: string;
  industry: string;
  location: string;
  logo_url?: string;
}

const CollaborationManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [collaborations, setCollaborations] = useState<EmployerCollaboration[]>([]);
  const [selectedEmployer, setSelectedEmployer] = useState<Employer | null>(null);
  const [message, setMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCollaboration, setSelectedCollaboration] = useState<EmployerCollaboration | null>(null);

  useEffect(() => {
    if (user) {
      loadCollaborations();
    }
  }, [user]);

  const loadCollaborations = async () => {
    try {
      const { data, error } = await supabase
        .from('educator_employer_collaborations')
        .select(`
          *,
          employer:employers (
            company_name,
            industry,
            location,
            logo_url
          )
        `)
        .eq('educator_id', user?.id);

      if (error) throw error;

      const validatedData: EmployerCollaboration[] = (data || []).map(item => ({
        ...item,
        status: item.status as 'pending' | 'approved' | 'rejected',
      }));

      setCollaborations(validatedData);
    } catch (error) {
      console.error('Error loading collaborations:', error);
      toast({
        title: "Error",
        description: "Failed to load collaborations",
        variant: "destructive",
      });
    }
  };

  const requestCollaboration = async () => {
    if (!selectedEmployer || !message.trim()) return;

    try {
      const { error } = await supabase
        .from('educator_employer_collaborations')
        .insert({
          educator_id: user?.id,
          employer_id: selectedEmployer.id,
          message,
          status: 'pending' as const,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Collaboration request sent successfully",
      });
      
      setIsDialogOpen(false);
      setMessage("");
      setSelectedEmployer(null);
      loadCollaborations();
    } catch (error) {
      console.error('Error requesting collaboration:', error);
      toast({
        title: "Error",
        description: "Failed to send collaboration request",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <EmployerDirectory
        onSelectEmployer={(employer) => {
          setSelectedEmployer(employer);
          setIsDialogOpen(true);
        }}
      />

      <CollaborationList
        collaborations={collaborations}
        onSelectCollaboration={setSelectedCollaboration}
      />

      <CollaborationRequestDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedEmployer={selectedEmployer}
        message={message}
        onMessageChange={setMessage}
        onSubmit={requestCollaboration}
      />

      <ChatDialog
        open={!!selectedCollaboration}
        onOpenChange={(open) => !open && setSelectedCollaboration(null)}
        collaboration={selectedCollaboration}
      />
    </div>
  );
};

export default CollaborationManagement;
