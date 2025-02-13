
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import CompanyDetailsForm from "@/components/employer/registration/CompanyDetailsForm";
import ContactInformationForm from "@/components/employer/registration/ContactInformationForm";
import AccountSetupForm from "@/components/employer/registration/AccountSetupForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Header from "@/components/landing/Header";
import { CheckCircle2, Circle, CircleDot } from "lucide-react";

type RegistrationStep = "company" | "contact" | "account";

interface CompanyDetails {
  name: string;
  industry: string;
  size: string;
  location: string;
}

interface ContactInformation {
  name: string;
  email: string;
  phone: string;
}

interface AccountSetup {
  username: string;
  password: string;
  confirmPassword: string;
}

const steps = [
  { label: "Company Details", status: "company" },
  { label: "Contact Information", status: "contact" },
  { label: "Account Setup", status: "account" }
];

const EmployerRegistration = () => {
  console.log("Rendering EmployerRegistration component");
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<RegistrationStep>("company");
  const [formData, setFormData] = useState<{
    company: CompanyDetails;
    contact: ContactInformation;
    account: AccountSetup;
  }>({
    company: {
      name: "",
      industry: "",
      size: "",
      location: "",
    },
    contact: {
      name: "",
      email: "",
      phone: "",
    },
    account: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const currentStepIndex = steps.findIndex(step => step.status === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const updateFormData = (
    step: RegistrationStep,
    data: CompanyDetails | ContactInformation | AccountSetup
  ) => {
    setFormData((prev) => ({
      ...prev,
      [step]: data,
    }));
  };

  const handleNext = () => {
    if (currentStep === "company") setCurrentStep("contact");
    else if (currentStep === "contact") setCurrentStep("account");
  };

  const handleBack = () => {
    if (currentStep === "contact") setCurrentStep("company");
    else if (currentStep === "account") setCurrentStep("contact");
  };

  const handleSaveAndExit = () => {
    // Save progress to localStorage or backend
    console.log("Saving progress:", formData);
    navigate("/employer-landing");
  };

  return (
    <>
      <Header />
      <div className="container max-w-2xl mx-auto py-8 mt-16">
        <Card className="p-6">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Employer Registration</h1>
              <Button variant="outline" onClick={handleSaveAndExit}>
                Save & Exit
              </Button>
            </div>
            <div className="space-y-4">
              <Progress value={progress} className="h-2" />
              <div className="grid grid-cols-3 gap-4">
                {steps.map((step, index) => {
                  const stepStatus = step.status;
                  const isCompleted = steps[currentStepIndex].status !== stepStatus && index < currentStepIndex;
                  const isCurrent = steps[currentStepIndex].status === stepStatus;

                  return (
                    <div key={index} className="flex items-center gap-3">
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      ) : isCurrent ? (
                        <CircleDot className="h-5 w-5 text-primary" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                      <span className={isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {currentStep === "company" && (
            <CompanyDetailsForm
              initialData={formData.company}
              onSubmit={(data: CompanyDetails) => {
                updateFormData("company", data);
                handleNext();
              }}
            />
          )}

          {currentStep === "contact" && (
            <ContactInformationForm
              initialData={formData.contact}
              onSubmit={(data: ContactInformation) => {
                updateFormData("contact", data);
                handleNext();
              }}
              onBack={handleBack}
            />
          )}

          {currentStep === "account" && (
            <AccountSetupForm
              initialData={formData.account}
              onSubmit={(data: AccountSetup) => {
                updateFormData("account", data);
                console.log("Final submission:", { ...formData, account: data });
              }}
              onBack={handleBack}
            />
          )}
        </Card>
      </div>
    </>
  );
};

export default EmployerRegistration;
