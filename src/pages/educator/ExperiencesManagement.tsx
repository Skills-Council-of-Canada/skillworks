
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { EducatorExperience } from "@/types/educator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const ExperiencesManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [experiences, setExperiences] = useState<EducatorExperience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('educator_experiences')
          .select('*')
          .eq('educator_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Transform and validate all required fields before setting state
        const transformedData = (data || []).map(exp => ({
          ...exp,
          skill_level: (exp.skill_level as 'beginner' | 'intermediate' | 'advanced') || 'beginner',
          screening_questions: Array.isArray(exp.screening_questions) 
            ? exp.screening_questions.map((q: any) => ({
                question: q.question || '',
                required: Boolean(q.required)
              }))
            : []
        })) as EducatorExperience[];

        setExperiences(transformedData);
      } catch (error) {
        console.error('Error fetching experiences:', error);
        toast({
          title: "Error",
          description: "Failed to load experiences. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperiences();
  }, [toast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-yellow-500';
      case 'pending_approval': return 'bg-blue-500';
      case 'published': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Experiences</h1>
          <p className="text-muted-foreground">
            Create and manage your educational experiences
          </p>
        </div>
        <Button onClick={() => navigate("/educator/experiences/create")}>
          Create Experience
        </Button>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          <p className="text-center py-8">Loading experiences...</p>
        ) : experiences.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No experiences created yet. Click the button above to create your first experience.
          </p>
        ) : (
          experiences.map((experience) => (
            <Card key={experience.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold">
                  {experience.title}
                </CardTitle>
                <Badge variant="outline">
                  {experience.unique_code}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {experience.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(experience.status)}>
                      {experience.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(experience.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ExperiencesManagement;

