
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import Footer from "@/components/landing/Footer";
import PortalSelection from "@/components/auth/PortalSelection";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handlePortalSelect = (portalId: string) => {
    switch (portalId) {
      case "employer":
        navigate("/employer-landing");
        break;
      case "educator":
        navigate("/educator-landing");
        break;
      case "participant":
        navigate("/participant-landing");
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Portal Selection Section */}
      <section className="pt-24 pb-8 px-4">
        <div className="container mx-auto max-w-6xl flex justify-center">
          <PortalSelection onSelect={handlePortalSelect} />
        </div>
      </section>

      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
