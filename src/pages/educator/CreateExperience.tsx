
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Copy } from "lucide-react";
import { CreateExperienceSteps } from "@/components/educator/experience/CreateExperienceSteps";
import { SelectionCard } from "@/components/educator/experience/SelectionCard";

type CreationMode = "scratch" | "duplicate" | null;

const CreateExperience = () => {
  const [mode, setMode] = useState<CreationMode>(null);
  const navigate = useNavigate();

  if (!mode) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Create New Experience</h1>
          <Button 
            variant="outline" 
            onClick={() => navigate("/educator/experiences")}
          >
            Cancel
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <SelectionCard
            icon={Plus}
            title="Start from Scratch"
            description="Create a new experience from scratch with our guided workflow"
            onClick={() => setMode("scratch")}
          />
          <SelectionCard
            icon={Copy}
            title="Duplicate Existing"
            description="Start with a copy of an existing experience as your template"
            onClick={() => setMode("duplicate")}
          />
        </div>
      </div>
    );
  }

  return <CreateExperienceSteps mode={mode} onCancel={() => setMode(null)} />;
};

export default CreateExperience;
