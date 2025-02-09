
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Steps } from "@/components/educator/experience/Steps";

const STEPS = [
  { id: "details", title: "Experience Details" },
  { id: "meta", title: "Meta Information" },
  { id: "learner", title: "Learner Details" },
  { id: "timeline", title: "Timeline" },
  { id: "company", title: "Company Preferences" },
  { id: "preview", title: "Preview & Publish" },
];

interface CreateExperienceStepsProps {
  mode: "scratch" | "duplicate";
  onCancel: () => void;
}

export const CreateExperienceSteps = ({ mode, onCancel }: CreateExperienceStepsProps) => {
  const [currentStep, setCurrentStep] = useState("details");
  const navigate = useNavigate();

  // Auto-save functionality will be implemented here
  useEffect(() => {
    // Save progress when step changes
    const saveProgress = async () => {
      // Implementation will come in the next step
    };

    if (currentStep !== "details") {
      saveProgress();
    }
  }, [currentStep]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Create New Experience</h1>
      </div>

      <Steps currentStep={STEPS.findIndex(step => step.id === currentStep) + 1} />

      <Card className="p-6">
        <Tabs value={currentStep} onValueChange={setCurrentStep}>
          <TabsList className="grid grid-cols-6 w-full">
            {STEPS.map((step) => (
              <TabsTrigger
                key={step.id}
                value={step.id}
                disabled={step.id !== currentStep}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {step.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Form content will be implemented in the next step */}
          {STEPS.map((step) => (
            <TabsContent key={step.id} value={step.id}>
              <p className="text-muted-foreground">
                Step content for {step.title} will be implemented next
              </p>
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
};
