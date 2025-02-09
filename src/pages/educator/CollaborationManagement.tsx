
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Building2, Send } from "lucide-react";
import { EmployerCollaboration, CollaborationMessage } from "@/types/collaboration";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [collaborations, setCollaborations] = useState<EmployerCollaboration[]>([]);
  const [selectedEmployer, setSelectedEmployer] = useState<Employer | null>(null);
  const [message, setMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCollaboration, setSelectedCollaboration] = useState<EmployerCollaboration | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState<CollaborationMessage[]>([]);

  // Fetch employers using React Query
  const { data: employers = [] } = useQuery({
    queryKey: ['employers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employers')
        .select('id, company_name, industry, location, logo_url')
        .eq('registration_status', 'approved');
      
      if (error) throw error;
      return data as Employer[];
    },
  });

  useEffect(() => {
    if (user) {
      loadCollaborations();
    }
  }, [user]);

  useEffect(() => {
    if (selectedCollaboration) {
      loadMessages();
      // Subscribe to new messages
      const channel = supabase
        .channel(`collaboration-${selectedCollaboration.id}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'collaboration_messages',
            filter: `collaboration_id=eq.${selectedCollaboration.id}`,
          },
          (payload) => {
            setMessages((prev) => [...prev, payload.new as CollaborationMessage]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [selectedCollaboration]);

  const loadMessages = async () => {
    if (!selectedCollaboration) return;

    try {
      const { data, error } = await supabase
        .from('collaboration_messages')
        .select('*')
        .eq('collaboration_id', selectedCollaboration.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    }
  };

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

  const sendMessage = async () => {
    if (!chatMessage.trim() || !selectedCollaboration) return;

    try {
      const { error } = await supabase
        .from('collaboration_messages')
        .insert({
          collaboration_id: selectedCollaboration.id,
          sender_id: user?.id,
          content: chatMessage,
        });

      if (error) throw error;

      setChatMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  const filteredEmployers = employers.filter(employer => {
    const searchLower = searchTerm.toLowerCase();
    return (
      employer.company_name.toLowerCase().includes(searchLower) ||
      employer.industry.toLowerCase().includes(searchLower) ||
      employer.location.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      {/* Employer Directory */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            Employer Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search employers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEmployers.map((employer) => (
              <Card key={employer.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    {employer.logo_url ? (
                      <img
                        src={employer.logo_url}
                        alt={employer.company_name}
                        className="w-12 h-12 object-contain rounded"
                      />
                    ) : (
                      <Building2 className="w-12 h-12 text-muted-foreground" />
                    )}
                    <div>
                      <h3 className="font-semibold">{employer.company_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {employer.industry} • {employer.location}
                      </p>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      setSelectedEmployer(employer);
                      setIsDialogOpen(true);
                    }}
                  >
                    Request Collaboration
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Collaborations */}
      <Card>
        <CardHeader>
          <CardTitle>Active Collaborations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {collaborations.map((collab) => (
              <Card key={collab.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    {collab.employer?.logo_url ? (
                      <img
                        src={collab.employer.logo_url}
                        alt={collab.employer.company_name}
                        className="w-12 h-12 object-contain rounded"
                      />
                    ) : (
                      <Building2 className="w-12 h-12 text-muted-foreground" />
                    )}
                    <div>
                      <h3 className="font-semibold">{collab.employer?.company_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {collab.employer?.industry} • {collab.employer?.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className={`text-sm px-2 py-1 rounded ${
                      collab.status === 'approved' ? 'bg-green-100 text-green-800' :
                      collab.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {collab.status.charAt(0).toUpperCase() + collab.status.slice(1)}
                    </span>
                    {collab.status === 'approved' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedCollaboration(collab)}
                      >
                        Message
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Collaboration Request Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Collaboration</DialogTitle>
            <DialogDescription>
              Send a collaboration request to {selectedEmployer?.company_name}. Include a message explaining your interest and goals.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={requestCollaboration}>
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Chat Dialog */}
      <Dialog 
        open={!!selectedCollaboration} 
        onOpenChange={(open) => !open && setSelectedCollaboration(null)}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Chat with {selectedCollaboration?.employer?.company_name}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      msg.sender_id === user?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex gap-2 mt-4">
            <Input
              placeholder="Type a message..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button onClick={sendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CollaborationManagement;
