
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Building2, Users } from "lucide-react";
import { EmployerCollaboration } from "@/types/collaboration";

const CollaborationManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [collaborations, setCollaborations] = useState<EmployerCollaboration[]>([]);
  const [loading, setLoading] = useState(true);

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
      setCollaborations(data || []);
    } catch (error) {
      console.error('Error loading collaborations:', error);
      toast({
        title: "Error",
        description: "Failed to load collaborations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const requestCollaboration = async (employerId: string, message: string) => {
    try {
      const { error } = await supabase
        .from('educator_employer_collaborations')
        .insert({
          educator_id: user?.id,
          employer_id: employerId,
          message,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Collaboration request sent successfully",
      });
      
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            Employer Collaborations
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
    </div>
  );
};

export default CollaborationManagement;
