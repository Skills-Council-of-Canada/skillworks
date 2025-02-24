import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const ExperiencesManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Experiences Management</h1>
        <Button 
          onClick={() => navigate("/educator/experiences/create")} 
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Create New Experience
        </Button>
      </div>
      
      <div className="grid gap-4">
        <p className="text-muted-foreground">No experiences created yet. Click the button above to create your first experience.</p>
      </div>
    </div>
  );
};

export default ExperiencesManagement;
