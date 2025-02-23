
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const EducationList = () => {
  const { user } = useAuth();

  const { data: educationData, isLoading } = useQuery({
    queryKey: ['education-background', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('participant_registrations')
        .select('educational_background')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div className="text-gray-500 text-center py-8">Loading education history...</div>;
  }

  return (
    <div>
      <Button variant="outline" className="mb-4">
        <Plus className="h-4 w-4 mr-2" />
        Add education
      </Button>
      {educationData?.educational_background ? (
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="font-medium text-gray-900">Educational Background</h3>
          <p className="text-gray-600 mt-1">{educationData.educational_background}</p>
        </div>
      ) : (
        <div className="text-gray-500 text-center py-8">
          No education history added yet
        </div>
      )}
    </div>
  );
};
