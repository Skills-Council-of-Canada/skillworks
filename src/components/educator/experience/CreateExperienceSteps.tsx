
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Steps } from "@/components/educator/experience/Steps";
import { useForm } from "react-hook-form";
import { ExperienceFormValues } from "@/types/educator";
import DetailsStep from "./DetailsStep";
import MetaInformationStep from "./MetaInformationStep";
import LearnerDetailsStep from "./LearnerDetailsStep";
import TimelineStep from "./TimelineStep";
import CompanyPreferencesStep from "./CompanyPreferencesStep";
import { Form } from "@/components/ui/form";

const STEPS = [
  { id: "details", title: "Experience Details" },
  { id: "category", title: "Category & Skills" },
  { id: "learners", title: "Learner Details" },
  { id: "timeline", title: "Timeline" },
  { id: "employer", title: "Company Preferences" },
  { id: "review", title: "Review & Publish" },
];

interface CreateExperienceStepsProps {
  mode: "scratch" | "duplicate";
  onCancel: () => void;
}

export const CreateExperienceSteps = ({ mode, onCancel }: CreateExperienceStepsProps) => {
  const [currentStep, setCurrentStep] = useState("details");
  const navigate = useNavigate();

  const form = useForm<ExperienceFormValues>({
    defaultValues: {
      title: "",
      description: "",
      expected_outcomes: [],
      example_projects: [],
      media: [],
      trade_category: "",
      subcategories: [],
      skill_tags: [],
      class_size: 1,
      team_size: 1,
      skill_level: "beginner",
      duration_weeks: 1,
      program_type: "certificate",
      team_structure: "individual",
      matching_type: "admin",
      start_date: "",
      end_date: "",
      milestones: [],
      preferred_industries: [],
      company_types: [],
      compensation_type: undefined,
      screening_questions: [],
    },
  });

  // Auto-save functionality will be implemented here
  useEffect(() => {
    const saveProgress = async () => {
      // Implementation will come in the next step
    };

    if (currentStep !== "details") {
      saveProgress();
    }
  }, [currentStep]);

  const handleNext = () => {
    const stepIndex = STEPS.findIndex(step => step.id === currentStep);
    if (stepIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[stepIndex + 1].id);
    }
  };

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

          <Form {...form}>
            <form className="mt-6">
              <TabsContent value="details">
                <DetailsStep form={form} onNext={handleNext} />
              </TabsContent>
              
              <TabsContent value="category">
                <MetaInformationStep form={form} onNext={handleNext} />
              </TabsContent>

              <TabsContent value="learners">
                <LearnerDetailsStep form={form} onNext={handleNext} />
              </TabsContent>

              <TabsContent value="timeline">
                <TimelineStep form={form} onNext={handleNext} />
              </TabsContent>

              <TabsContent value="employer">
                <CompanyPreferencesStep form={form} onNext={handleNext} />
              </TabsContent>

              <TabsContent value="review">
                <p className="text-muted-foreground">
                  Review step will be implemented next
                </p>
              </TabsContent>
            </form>
          </Form>
        </Tabs>
      </Card>
    </div>
  );
};
