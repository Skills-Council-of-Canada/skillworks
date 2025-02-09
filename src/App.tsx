
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

// Employer routes
import EmployerLayout from "./pages/employer/EmployerLayout";
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import EmployerRegistration from "./pages/employer/EmployerRegistration";
import CreateProject from "./pages/employer/CreateProject";
import ProjectManagement from "./pages/employer/ProjectManagement";
import ProjectDetails from "./pages/employer/ProjectDetails";
import ApplicationsManagement from "./pages/employer/ApplicationsManagement";
import ApplicantProfile from "./pages/employer/ApplicantProfile";
import MessagesPage from "./pages/employer/MessagesPage";
import ResourceCenter from "./pages/employer/ResourceCenter";
import ProfileSettings from "./pages/employer/ProfileSettings";

// Educator routes
import EducatorLayout from "./pages/educator/EducatorLayout";
import EducatorDashboard from "./pages/educator/EducatorDashboard";
import ExperiencesManagement from "./pages/educator/ExperiencesManagement";
import PortalSearch from "./pages/educator/PortalSearch";
import ProjectSearch from "./pages/educator/ProjectSearch";
import MatchRequests from "./pages/educator/MatchRequests";
import TasksActivities from "./pages/educator/TasksActivities";
import EducatorMessages from "./pages/educator/EducatorMessages";
import EducatorCalendar from "./pages/educator/EducatorCalendar";
import EducatorSettings from "./pages/educator/EducatorSettings";

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
          
          {/* Protected employer routes */}
          <Route path="/employer" element={
            <ProtectedRoute allowedRoles={["employer", "admin"]}>
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
            <ProtectedRoute allowedRoles={["educator", "admin"]}>
              <EducatorLayout />
            </ProtectedRoute>
          }>
            <Route index element={<EducatorDashboard />} />
            <Route path="experiences" element={<ExperiencesManagement />} />
            <Route path="portals" element={<PortalSearch />} />
            <Route path="projects" element={<ProjectSearch />} />
            <Route path="matches" element={<MatchRequests />} />
            <Route path="tasks" element={<TasksActivities />} />
            <Route path="messages" element={<EducatorMessages />} />
            <Route path="calendar" element={<EducatorCalendar />} />
            <Route path="settings" element={<EducatorSettings />} />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
