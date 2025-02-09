
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import { useExperienceSubmission } from "@/hooks/useExperienceSubmission";
import OverviewStep from "@/components/educator/experience/OverviewStep";
import EmployerStep from "@/components/educator/experience/EmployerStep";
import StudentsStep from "@/components/educator/experience/StudentsStep";
import { ExperienceFormValues } from "@/types/educator";

const experienceSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  trade_category: z.string().min(1, "Trade category is required"),
  skill_level: z.enum(["beginner", "intermediate", "advanced"]),
  duration_weeks: z.number().min(1, "Duration must be at least 1 week"),
  required_certifications: z.array(z.string()).optional(),
});

const ExperiencesManagement = () => {
  const [currentStep, setCurrentStep] = useState("overview");
  const { submitExperience, isSubmitting } = useExperienceSubmission();
  
  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      title: "",
      description: "",
      trade_category: "",
      skill_level: "beginner",
      duration_weeks: 1,
      required_certifications: [],
    },
  });

  const onSubmit = async (data: ExperienceFormValues) => {
    await submitExperience(data);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create New Experience</CardTitle>
          <CardDescription>
            Create a new hands-on training experience for your students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={currentStep} onValueChange={setCurrentStep}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="employer" disabled={!form.formState.isValid}>
                Employer
              </TabsTrigger>
              <TabsTrigger value="students" disabled={!form.formState.isValid}>
                Students
              </TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                <TabsContent value="overview">
                  <OverviewStep 
                    form={form} 
                    onNext={() => setCurrentStep("employer")} 
                  />
                </TabsContent>

                <TabsContent value="employer">
                  <EmployerStep 
                    form={form}
                    onBack={() => setCurrentStep("overview")}
                    onNext={() => setCurrentStep("students")}
                  />
                </TabsContent>

                <TabsContent value="students">
                  <StudentsStep 
                    form={form}
                    onBack={() => setCurrentStep("employer")}
                    onSubmit={form.handleSubmit(onSubmit)}
                    isSubmitting={isSubmitting}
                  />
                </TabsContent>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExperiencesManagement;
