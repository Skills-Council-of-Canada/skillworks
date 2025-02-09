
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { EmployerCollaboration } from "@/types/collaboration";

interface CollaborationListProps {
  collaborations: EmployerCollaboration[];
  onSelectCollaboration: (collaboration: EmployerCollaboration) => void;
}

export const CollaborationList = ({
  collaborations,
  onSelectCollaboration,
}: CollaborationListProps) => {
  return (
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
                      onClick={() => onSelectCollaboration(collab)}
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
  );
};
