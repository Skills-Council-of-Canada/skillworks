import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/pages/admin/AdminLayout";
import ParticipantLayout from "@/pages/participant/ParticipantLayout";
import LoginPage from "@/pages/auth/LoginPage";
import EmployerLayout from "@/pages/employer/EmployerLayout";
import EducatorLayout from "@/pages/educator/EducatorLayout";
import LandingPage from "@/pages/landing/LandingPage";
import EmployerLandingPage from "@/pages/employer/landing/EmployerLandingPage";
import EducatorLandingPage from "@/pages/educator/landing/EducatorLandingPage";
import ParticipantLandingPage from "@/pages/participant/landing/ParticipantLandingPage";
import RegistrationPage from "@/pages/auth/RegistrationPage";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/employer-landing" element={<EmployerLandingPage />} />
        <Route path="/educator-landing" element={<EducatorLandingPage />} />
        <Route path="/participant-landing" element={<ParticipantLandingPage />} />
        <Route path="/registration/:portal" element={<RegistrationPage />} />
        
        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        />

        {/* Participant Routes */}
        <Route
          path="/participant/*"
          element={
            <ProtectedRoute allowedRoles={["participant"]}>
              <ParticipantLayout />
            </ProtectedRoute>
          }
        />

        {/* Employer Routes */}
        <Route
          path="/employer/*"
          element={
            <ProtectedRoute allowedRoles={["employer"]}>
              <EmployerLayout />
            </ProtectedRoute>
          }
        />

        {/* Educator Routes */}
        <Route
          path="/educator/*"
          element={
            <ProtectedRoute allowedRoles={["educator"]}>
              <EducatorLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </AuthProvider>
  );
};

export default App;
