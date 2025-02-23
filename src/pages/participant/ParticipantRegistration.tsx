
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PersonalInfoForm } from "@/components/participant/registration/PersonalInfoForm";
import { ProfileSetupForm } from "@/components/participant/registration/ProfileSetupForm";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/landing/Header";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, CircleDot, ChevronLeft, ChevronRight } from "lucide-react";

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
    if (step < currentStep || isStepValid) {
      setCurrentStep(step);
    }
  };

  const handlePersonalInfoSubmit = (data: any) => {
    console.log("Personal info submitted:", data);
    setFormData({ ...formData, ...data });
    setCurrentStep(2);
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

      console.log("User created successfully:", authData.user);

      const { error: registrationError } = await supabase
        .from('participant_registrations')
        .insert({
          user_id: authData.user.id,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          date_of_birth: formData.date_of_birth,
          skill_level: data.skill_level,
          preferred_learning_areas: data.preferred_learning_areas,
          educational_background: data.educational_background,
          availability: data.availability,
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
                  const isClickable = stepNumber <= currentStep || isStepValid;

                  return (
                    <button
                      key={index}
                      onClick={() => isClickable && handleStepChange(stepNumber)}
                      className={`flex items-center gap-3 ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                      disabled={!isClickable}
                    >
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
                    </button>
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

            <div className="flex justify-between mt-6">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleStepChange(currentStep - 1)}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}
              {currentStep === 1 ? (
                <Button
                  type="submit"
                  className="ml-auto"
                  disabled={!isStepValid}
                  onClick={() => document.querySelector('form')?.requestSubmit()}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  className="ml-auto"
                  disabled={!isStepValid || isSubmitting}
                  onClick={() => document.querySelector('form')?.requestSubmit()}
                >
                  {isSubmitting ? "Registering..." : "Complete Registration"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ParticipantRegistration;
