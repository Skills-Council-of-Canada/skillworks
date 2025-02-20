
import { Header } from "@/components/employer/landing/Header";
import { HeroSection } from "@/components/employer/landing/HeroSection";
import { BenefitsSection } from "@/components/employer/landing/BenefitsSection";
import { Footer } from "@/components/employer/landing/Footer";

const EmployerLanding = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <BenefitsSection />
      <Footer />
    </div>
  );
};

export default EmployerLanding;
