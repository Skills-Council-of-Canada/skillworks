
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import { WhoWeServeSection } from "@/components/landing/sections/WhoWeServeSection";
import { HowItWorksSection } from "@/components/landing/sections/HowItWorksSection";
import { BenefitsSection } from "@/components/landing/sections/BenefitsSection";
import { Footer } from "@/components/landing/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <WhoWeServeSection />
        <BenefitsSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
