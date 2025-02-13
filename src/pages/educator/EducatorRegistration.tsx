import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import ProfileSetupForm from "@/components/educator/registration/ProfileSetupForm";
import ContactVerificationForm from "@/components/educator/registration/ContactVerificationForm";
import AccountSetupForm from "@/components/educator/registration/AccountSetupForm";
import { Steps } from "@/components/educator/registration/Steps";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/landing/Header";
import { CheckCircle2, Circle, CircleDot } from "lucide-react";

const steps = [
  { label: "Profile Setup" },
  { label: "Contact & Verification" },
  { label: "Account Setup" }
];

export type RegistrationData = {
  fullName: string;
  institutionName: string;
  specialization: string;
  yearsExperience: number;
  jobTitle: string;
  location: string;
  areasOfInterest: string[];
  email: string;
  phoneNumber?: string;
  preferredContact: 'email' | 'phone';
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const EducatorRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<RegistrationData>>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const progress = (currentStep / steps.length) * 100;

  const handleStepSubmit = async (stepData: Partial<RegistrationData>) => {
    const updatedData = { ...formData, ...stepData };
    setFormData(updatedData);

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      await handleRegistration(updatedData as RegistrationData);
    }
  };

  const handleRegistration = async (data: RegistrationData) => {
    setIsLoading(true);
    try {
      // First create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Failed to create user");

      const { error: profileError } = await supabase
        .from('educator_profiles')
        .insert({
          id: authData.user.id,
          full_name: data.fullName,
          institution_name: data.institutionName,
          specialization: data.specialization,
          years_experience: data.yearsExperience,
          phone_number: data.phoneNumber,
          preferred_contact: data.preferredContact,
          job_title: data.jobTitle,
          location: data.location,
          areas_of_interest: data.areasOfInterest,
          role: 'educator'
        });

      if (profileError) throw profileError;

      toast({
        title: "Registration successful!",
        description: "Your educator account has been created. Please check your email to verify your account.",
      });

      navigate("/login?portal=educator&registered=true");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background px-4 py-8 sm:py-12 mt-16">
        <div className="container max-w-2xl mx-auto space-y-6 sm:space-y-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">Educator Registration</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">Join our community of skilled trades educators</p>
          </div>

          <div className="space-y-4">
            <Progress value={progress} className="h-2" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

          <Card className="p-4 sm:p-6">
            {currentStep === 1 && (
              <ProfileSetupForm 
                onSubmit={handleStepSubmit}
                initialData={formData}
                isLoading={isLoading}
              />
            )}
            {currentStep === 2 && (
              <ContactVerificationForm
                onSubmit={handleStepSubmit}
                initialData={formData}
                isLoading={isLoading}
              />
            )}
            {currentStep === 3 && (
              <AccountSetupForm
                onSubmit={handleStepSubmit}
                initialData={formData}
                isLoading={isLoading}
              />
            )}
          </Card>

          {currentStep > 1 && (
            <div className="flex justify-center">
              <Button
                variant="ghost"
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                Back to Previous Step
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EducatorRegistration;
