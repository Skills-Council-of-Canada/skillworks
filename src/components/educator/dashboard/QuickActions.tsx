
import { Button } from "@/components/ui/button";
import { Plus, Briefcase, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4">
      <Button
        className="flex-1"
        onClick={() => navigate("/educator/experiences")}
      >
        <Plus className="mr-2 h-4 w-4" />
        Create Experience
      </Button>
      <Button
        className="flex-1"
        onClick={() => navigate("/educator/projects")}
      >
        <Briefcase className="mr-2 h-4 w-4" />
        Find Projects
      </Button>
      <Button
        className="flex-1"
        onClick={() => navigate("/educator/matches")}
      >
        <Users className="mr-2 h-4 w-4" />
        Assign Students
      </Button>
    </div>
  );
};
