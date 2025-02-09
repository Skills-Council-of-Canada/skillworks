
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const experienceSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  trade_category: z.string().min(1, "Trade category is required"),
  skill_level: z.enum(["beginner", "intermediate", "advanced"]),
  duration_weeks: z.number().min(1, "Duration must be at least 1 week"),
  required_certifications: z.array(z.string()).optional(),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

const ExperiencesManagement = () => {
  const [currentStep, setCurrentStep] = useState("overview");
  const { toast } = useToast();
  const navigate = useNavigate();
  
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
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("educator_experiences")
        .insert({
          educator_id: user.id,
          title: data.title,
          description: data.description,
          trade_category: data.trade_category,
          skill_level: data.skill_level,
          duration_weeks: data.duration_weeks,
          required_certifications: data.required_certifications,
          status: "active",
          start_date: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: "Experience created",
        description: "Your experience has been created successfully.",
      });
      
      navigate("/educator/experiences");
    } catch (error) {
      console.error("Error creating experience:", error);
      toast({
        title: "Error",
        description: "There was an error creating your experience. Please try again.",
        variant: "destructive",
      });
    }
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
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter experience name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe the experience" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="trade_category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Trade Category</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter trade category" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="skill_level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skill Level</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select skill level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="duration_weeks"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration (Weeks)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min={1} 
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button 
                      type="button"
                      onClick={() => setCurrentStep("employer")}
                      disabled={!form.formState.isValid}
                    >
                      Next: Employer Details
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="employer">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Employer collaboration features coming soon...
                    </p>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep("overview")}
                    >
                      Back
                    </Button>
                    <Button 
                      type="button"
                      onClick={() => setCurrentStep("students")}
                    >
                      Next: Student Assignment
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="students">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Student assignment features coming soon...
                    </p>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep("employer")}
                    >
                      Back
                    </Button>
                    <Button type="submit">
                      Create Experience
                    </Button>
                  </div>
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
