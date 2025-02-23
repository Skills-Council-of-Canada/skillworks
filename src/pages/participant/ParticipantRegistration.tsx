
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RegistrationStepper } from "@/components/participant/registration/RegistrationStepper";
import { PersonalInfoForm } from "@/components/participant/registration/PersonalInfoForm";
import { ProfileSetupForm } from "@/components/participant/registration/ProfileSetupForm";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/landing/Header";
import { CheckCircle2, Circle, CircleDot } from "lucide-react";

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

  const progress = (currentStep / steps.length) * 100;

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handlePersonalInfoSubmit = (data: any) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(2);
  };

  const handleProfileSetupSubmit = async (data: any) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
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

        if (registrationError) {
          console.error("Registration error:", registrationError);
          throw registrationError;
        }

        toast({
          title: "Registration successful",
          description: "You can now log in to access your dashboard.",
        });

        // Use replace to prevent back navigation to registration page
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background px-4 py-8 sm:py-12 mt-16">
        <Card className="w-full max-w-lg mx-auto">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-center">Participant Registration</CardTitle>
            <div className="space-y-4 mt-4">
              <Progress value={progress} className="h-2" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {steps.map((step, index) => {
                  const stepNumber = index + 1;
                  const isCompleted = stepNumber < currentStep;
                  const isCurrent = stepNumber === currentStep;

                  return (
                    <div key={index} className="flex items-center gap-3">
                      {isCompleted ? (
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      ) : isCurrent ? (
                        <CircleDot className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      ) : (
                        <Circle className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                      )}
                      <span className={`text-sm sm:text-base ${isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"}`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
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
