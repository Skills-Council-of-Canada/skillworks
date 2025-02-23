
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useProfileCompletion } from "@/hooks/participant/useProfileCompletion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { profileFormSchema, type ProfileFormValues } from "./schema";
import { BasicInfoSection } from "./form-sections/BasicInfoSection";
import { ContactSection } from "./form-sections/ContactSection";
import { SkillsSection } from "./form-sections/SkillsSection";

export const EditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile, isLoading } = useProfileCompletion();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      full_name: profile?.full_name || "",
      bio: profile?.bio || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      preferred_contact: profile?.preferred_contact || "",
      skill_level: profile?.skill_level || "beginner",
      availability: profile?.availability || "",
      educational_background: profile?.educational_background || "",
      preferred_learning_areas: profile?.preferred_learning_areas || [],
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user?.id) return;
    
    setIsSubmitting(true);
    try {
      // Update profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          name: values.full_name,
          bio: values.bio,
          email: values.email,
          phone: values.phone,
          preferred_contact: values.preferred_contact,
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Update participant_profiles table with the correct fields
      const { error: participantError } = await supabase
        .from('participant_profiles')
        .update({
          skills: [values.skill_level],
          educational_background: values.educational_background,
          interests: values.preferred_learning_areas,
        })
        .eq('id', user.id);

      if (participantError) throw participantError;

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      
      navigate("/participant/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <BasicInfoSection form={form} />
            <ContactSection form={form} />
            <SkillsSection form={form} />

            <FormField
              control={form.control}
              name="educational_background"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Educational Background</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/participant/profile")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
