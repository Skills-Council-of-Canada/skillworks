
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Building2 } from "lucide-react";
import { EmployerCollaboration } from "@/types/collaboration";
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

      // Explicitly type and validate the status
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
                      <Button variant="outline" size="sm">
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
    </div>
  );
};

export default CollaborationManagement;
