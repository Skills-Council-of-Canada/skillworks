
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import EmployerLayout from "./pages/employer/EmployerLayout";
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import EmployerRegistration from "./pages/employer/EmployerRegistration";
import CreateProject from "./pages/employer/CreateProject";
import ProjectManagement from "./pages/employer/ProjectManagement";
import ProjectDetails from "./pages/employer/ProjectDetails";
import ApplicationsManagement from "./pages/employer/ApplicationsManagement";
import ApplicantProfile from "./pages/employer/ApplicantProfile";
import MessagesPage from "./pages/employer/MessagesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/employer/register" element={<EmployerRegistration />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route
              path="/employer"
              element={
                <ProtectedRoute allowedRoles={["employer", "admin"]}>
                  <EmployerLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<EmployerDashboard />} />
              <Route path="create-project" element={<CreateProject />} />
              <Route path="projects" element={<ProjectManagement />} />
              <Route path="projects/:projectId" element={<ProjectDetails />} />
              <Route path="applications" element={<ApplicationsManagement />} />
              <Route path="applicants/:applicantId" element={<ApplicantProfile />} />
              <Route path="messages" element={<MessagesPage />}>
                <Route path=":conversationId" element={<MessagesPage />} />
              </Route>
            </Route>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
