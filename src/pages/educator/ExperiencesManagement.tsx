import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ExperiencesManagement = () => {
  const navigate = useNavigate();

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

      {/* Experience list will be implemented separately */}
      <div className="grid gap-4">
        <p className="text-muted-foreground text-center py-8">
          No experiences created yet. Click the button above to create your first experience.
        </p>
      </div>
    </div>
  );
};

export default ExperiencesManagement;
