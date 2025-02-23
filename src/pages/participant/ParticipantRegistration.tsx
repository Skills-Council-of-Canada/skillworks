
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonalInfoForm } from "@/components/participant/registration/PersonalInfoForm";
import { ProfileSetupForm } from "@/components/participant/registration/ProfileSetupForm";
import { RegistrationStepper } from "@/components/participant/registration/RegistrationStepper";
import { RegistrationNavigation } from "@/components/participant/registration/RegistrationNavigation";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/landing/Header";

const steps = [
  { label: "Personal Information" },
  { label: "Profile Setup" }
];

const ParticipantRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isStepValid, setIsStepValid] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStepChange = (step: number) => {
    if (step < currentStep || isStepValid) {
      setCurrentStep(step);
      setIsStepValid(false);
    }
  };

  const handlePersonalInfoSubmit = async (data: any) => {
    console.log("Personal info submitted:", data);
    setFormData({ ...formData, ...data });
    setCurrentStep(2);
    setIsStepValid(false);
  };

  const handleProfileSetupSubmit = async (data: any) => {
    try {
      if (isSubmitting) return;
      setIsSubmitting(true);
      
      const finalData = {
        ...formData,
        ...data
      };
      
      console.log("Attempting registration with data:", finalData);

      // First create the auth user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            role: 'participant',
          },
        },
      });

      if (signUpError) {
        console.error("Sign up error:", signUpError);
        throw signUpError;
      }

      if (!authData.user) {
        throw new Error("No user data returned from signup");
      }

      // Then create the participant registration record
      const { error: registrationError } = await supabase
        .from('participant_registrations')
        .insert({
          user_id: authData.user.id,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          date_of_birth: formData.date_of_birth,
          skill_level: data.skill_level,
          availability: data.availability,
          educational_background: data.educational_background,
          preferred_learning_areas: data.preferred_learning_areas,
          registration_completed: true,
          email_verified: false // Will be updated when they verify their email
        });

      if (registrationError) {
        console.error("Registration error:", registrationError);
        throw registrationError;
      }

      toast({
        title: "Registration successful",
        description: "Please check your email to verify your account. You can then log in to access your dashboard.",
      });

      navigate("/login", { replace: true });
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = () => {
    const form = document.querySelector('form');
    if (form) {
      const submitEvent = new Event('submit', {
        cancelable: true,
        bubbles: true
      });
      form.dispatchEvent(submitEvent);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background px-4 py-8 sm:py-12 mt-16">
        <Card className="w-full max-w-lg mx-auto">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-center">
              Participant Registration
            </CardTitle>
            <RegistrationStepper
              steps={steps}
              currentStep={currentStep}
              onStepChange={handleStepChange}
            />
          </CardHeader>
          <CardContent className="space-y-6 p-4 sm:p-6">
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

            <RegistrationNavigation
              currentStep={currentStep}
              isLastStep={currentStep === steps.length}
              isStepValid={isStepValid}
              isSubmitting={isSubmitting}
              onBack={() => handleStepChange(currentStep - 1)}
              onSubmit={handleFormSubmit}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ParticipantRegistration;
