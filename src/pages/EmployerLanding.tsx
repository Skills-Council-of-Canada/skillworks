
import { Header } from "@/components/employer/landing/Header";
import { HeroSection } from "@/components/employer/landing/HeroSection";
import { HowItWorksSection } from "@/components/employer/landing/HowItWorksSection";
import { BenefitsSection } from "@/components/employer/landing/BenefitsSection";
import { Footer } from "@/components/employer/landing/Footer";
import { LandingHeader } from "@/components/landing/shared/LandingHeader";

const EmployerLanding = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader signUpPath="/employer/registration" buttonText="Sign Up" />
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
};

export default EmployerLanding;
