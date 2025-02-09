
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Building2 } from "lucide-react";

interface Employer {
  id: string;
  company_name: string;
  industry: string;
  location: string;
  logo_url?: string;
}

interface EmployerDirectoryProps {
  onSelectEmployer: (employer: Employer) => void;
}

export const EmployerDirectory = ({ onSelectEmployer }: EmployerDirectoryProps) => {
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredEmployers = employers.filter(employer => {
    const searchLower = searchTerm.toLowerCase();
    return (
      employer.company_name.toLowerCase().includes(searchLower) ||
      employer.industry.toLowerCase().includes(searchLower) ||
      employer.location.toLowerCase().includes(searchLower)
    );
  });

  return (
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
                  onClick={() => onSelectEmployer(employer)}
                >
                  Request Collaboration
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
