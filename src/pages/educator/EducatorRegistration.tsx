
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProfileSetupForm from "@/components/educator/registration/ProfileSetupForm";
import ContactVerificationForm from "@/components/educator/registration/ContactVerificationForm";
import AccountSetupForm from "@/components/educator/registration/AccountSetupForm";
import { Steps } from "@/components/educator/registration/Steps";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

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
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login?portal=educator');
      return;
    }
  }, [user, navigate]);

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
    if (!user) return;

    setIsLoading(true);
    try {
      const { error: profileError } = await supabase
        .from('educator_profiles')
        .insert({
          id: user.id,
          full_name: data.fullName,
          institution_name: data.institutionName,
          specialization: data.specialization,
          years_experience: data.yearsExperience,
          phone_number: data.phoneNumber,
          preferred_contact: data.preferredContact,
          job_title: data.jobTitle,
          location: data.location,
          areas_of_interest: data.areasOfInterest,
        });

      if (profileError) throw profileError;

      toast({
        title: "Registration successful!",
        description: "Your educator profile has been created.",
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
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Educator Registration</h1>
          <p className="text-muted-foreground mt-2">Join our community of skilled trades educators</p>
        </div>

        <Steps currentStep={currentStep} />

        <Card className="p-6">
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
            >
              Back to Previous Step
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducatorRegistration;

