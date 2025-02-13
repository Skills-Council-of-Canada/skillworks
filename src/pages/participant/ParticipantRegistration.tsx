
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegistrationStepper } from "@/components/participant/registration/RegistrationStepper";
import { PersonalInfoForm } from "@/components/participant/registration/PersonalInfoForm";
import { ProfileSetupForm } from "@/components/participant/registration/ProfileSetupForm";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/landing/Header";

const ParticipantRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isStepValid, setIsStepValid] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handlePersonalInfoSubmit = async (data: any) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(2);
  };

  const handleProfileSetupSubmit = async (data: any) => {
    const finalData = { ...formData, ...data };
    
    try {
      // Sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: finalData.email,
        password: finalData.password,
        options: {
          data: {
            role: 'participant',
          },
        },
      });

      if (signUpError) throw signUpError;

      if (authData.user) {
        // Create participant registration record
        const { error: registrationError } = await supabase
          .from('participant_registrations')
          .insert({
            user_id: authData.user.id,
            first_name: finalData.firstName,
            last_name: finalData.lastName,
            email: finalData.email,
            date_of_birth: finalData.dateOfBirth,
            skill_level: finalData.skillLevel,
            preferred_learning_areas: finalData.preferredLearningAreas || [],
            educational_background: finalData.educationalBackground,
            availability: finalData.availability,
            registration_completed: true
          });

        if (registrationError) throw registrationError;

        toast({
          title: "Registration successful",
          description: "You can now log in to access your dashboard.",
        });

        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background flex items-center justify-center p-4 mt-16">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Participant Registration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <PersonalInfoForm
                onSubmit={handlePersonalInfoSubmit}
                onValidityChange={setIsStepValid}
              />
            )}
            
            {currentStep === 2 && (
              <ProfileSetupForm
                onSubmit={handleProfileSetupSubmit}
                onValidityChange={setIsStepValid}
              />
            )}

            <RegistrationStepper
              currentStep={currentStep}
              onStepChange={handleStepChange}
              isStepValid={isStepValid}
              onSubmit={() => handleProfileSetupSubmit(formData)}
              isLastStep={currentStep === 2}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ParticipantRegistration;
