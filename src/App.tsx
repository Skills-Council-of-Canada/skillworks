import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import EducatorLanding from "./pages/EducatorLanding";
import EmployerLanding from "./pages/EmployerLanding";
import ParticipantLanding from "./pages/ParticipantLanding";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import EducatorRegistration from "./pages/educator/EducatorRegistration";

// Admin routes
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ExperienceOversight from "./pages/admin/ExperienceOversight";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/educator-landing" element={<EducatorLanding />} />
          <Route path="/employer-landing" element={<EmployerLanding />} />
          <Route path="/participant-landing" element={<ParticipantLanding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="experiences" element={<ExperienceOversight />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Protected educator registration route */}
          <Route path="/educator/registration" element={<EducatorRegistration />} />
          
          {/* Protected employer routes */}
          <Route path="/employer" element={
            <ProtectedRoute allowedRoles={["employer"]}>
              <EmployerLayout />
            </ProtectedRoute>
          }>
            <Route index element={<EmployerDashboard />} />
            <Route path="create-project" element={<CreateProject />} />
            <Route path="projects" element={<ProjectManagement />} />
            <Route path="projects/:projectId" element={<ProjectDetails />} />
            <Route path="applications" element={<ApplicationsManagement />} />
            <Route path="applicants/:applicantId" element={<ApplicantProfile />} />
            <Route path="messages" element={<MessagesPage />}>
              <Route path=":conversationId" element={<MessagesPage />} />
            </Route>
            <Route path="resources" element={<ResourceCenter />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>
          
          {/* Protected educator routes */}
          <Route path="/educator" element={
            <ProtectedRoute allowedRoles={["educator"]}>
              <EducatorLayout />
            </ProtectedRoute>
          }>
            <Route index element={<EducatorDashboard />} />
            <Route path="experiences" element={<ExperiencesManagement />} />
            <Route path="collaborations" element={<CollaborationManagement />} />
            <Route path="portals" element={<PortalSearch />} />
            <Route path="projects" element={<ProjectSearch />} />
            <Route path="matches" element={<MatchRequests />} />
            <Route path="tasks" element={<TasksActivities />} />
            <Route path="messages" element={<EducatorMessages />} />
            <Route path="calendar" element={<EducatorCalendar />} />
            <Route path="settings" element={<EducatorSettings />} />
            <Route path="students" element={<StudentManagement />} />
            <Route path="experiences/create" element={<CreateExperience />} />
          </Route>

          {/* Protected participant routes */}
          <Route path="/participant" element={
            <ProtectedRoute allowedRoles={["participant"]}>
              <ParticipantLayout />
            </ProtectedRoute>
          }>
            <Route index element={<ParticipantDashboard />} />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
