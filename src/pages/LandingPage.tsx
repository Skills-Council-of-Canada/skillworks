
import { useState } from "react";
import Header from "@/components/landing/Header";
import AdminLoginDialog from "@/components/landing/AdminLoginDialog";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import Footer from "@/components/landing/Footer";
import PortalSelection from "@/components/auth/PortalSelection";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showAdminLogin, setShowAdminLogin] = useState(false);

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
      <Header onAdminLoginClick={() => setShowAdminLogin(true)} />
      
      <AdminLoginDialog 
        showAdminLogin={showAdminLogin}
        setShowAdminLogin={setShowAdminLogin}
      />

      {/* Portal Selection Section */}
      <section className="pt-24 pb-8 px-4">
        <div className="container mx-auto max-w-6xl flex justify-center">
          <PortalSelection onPortalSelect={handlePortalSelect} />
        </div>
      </section>

      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
