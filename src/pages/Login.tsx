
import { useState } from "react";
import AuthForm from "@/components/auth/AuthForm";
import PortalSelection from "@/components/auth/PortalSelection";
import { UserRole } from "@/types/auth";

const Login = () => {
  const [selectedPortal, setSelectedPortal] = useState<string>("");

  const handleBack = () => {
    setSelectedPortal("");
  };

  const handlePortalSelect = (portalId: string, role: UserRole) => {
    setSelectedPortal(portalId);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        {selectedPortal ? (
          <AuthForm onBack={handleBack} />
        ) : (
          <PortalSelection onPortalSelect={handlePortalSelect} />
        )}
      </div>
    </div>
  );
};

export default Login;
