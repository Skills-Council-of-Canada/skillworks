
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import ProtectedRoute from "@/components/ProtectedRoute";
import NotificationsPage from "@/pages/participant/NotificationsPage";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import EducatorLanding from "./pages/EducatorLanding";
import EmployerLanding from "./pages/EmployerLanding";
import ParticipantLanding from "./pages/ParticipantLanding";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import EducatorRegistration from "./pages/educator/EducatorRegistration";
import Reports from "./pages/admin/Reports";
import EmployerRegistration from "./pages/employer/EmployerRegistration";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import ExperienceOversight from "./pages/admin/ExperienceOversight";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminMessages from "./pages/admin/AdminMessages";
import { default as AdminProjectManagement } from "./pages/admin/ProjectManagement";
import EmployerLayout from "./pages/employer/EmployerLayout";
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import { default as EmployerProjectManagement } from "./pages/employer/ProjectManagement";
import ApplicationsManagement from "./pages/employer/ApplicationsManagement";
import MessagesPage from "./pages/employer/MessagesPage";
import ResourceCenter from "./pages/employer/ResourceCenter";
import ProfileSettings from "./pages/employer/ProfileSettings";
import CreateProject from "./pages/employer/CreateProject";
import ProjectDetails from "./pages/employer/ProjectDetails";
import EducatorLayout from "./pages/educator/EducatorLayout";
import EducatorDashboard from "./pages/educator/EducatorDashboard";
import ExperienceManagement from "./pages/educator/ExperienceManagement";
import CollaborationManagement from "./pages/educator/CollaborationManagement";
import PortalSearch from "./pages/educator/PortalSearch";
import ProjectSearch from "./pages/educator/ProjectSearch";
import StudentManagement from "./pages/educator/StudentManagement";
import MatchRequests from "./pages/educator/MatchRequests";
import TasksActivities from "./pages/educator/TasksActivities";
import EducatorCalendar from "./pages/educator/EducatorCalendar";
import EducatorSettings from "./pages/educator/EducatorSettings";
import CreateExperience from "./pages/educator/CreateExperience";
import ParticipantLayout from "./pages/participant/ParticipantLayout";
import ParticipantDashboard from "./pages/participant/ParticipantDashboard";
import ParticipantRegistration from "./pages/participant/ParticipantRegistration";
import ParticipantExperiences from "./pages/participant/experiences/ParticipantExperiences";
import MyMentors from "./pages/participant/MyMentors";
import Profile from "./pages/participant/Profile";
import CreateParticipantExperience from "./pages/participant/experiences/CreateParticipantExperience";
import ParticipantSettings from "./pages/participant/settings/ParticipantSettings";
import Messages from "./pages/participant/Messages";
import EducatorMessages from "./pages/educator/EducatorMessages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ScrollToTop />
        <Toaster />
        <Sonner />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Index />} />
          <Route path="/educator-landing" element={<EducatorLanding />} />
          <Route path="/employer-landing" element={<EmployerLanding />} />
          <Route path="/participant-landing" element={<ParticipantLanding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Registration routes - explicitly marked as public access */}
          <Route path="/participant/registration" element={<ParticipantRegistration />} />
          <Route path="/employer/registration" element={<EmployerRegistration />} />
          <Route path="/educator/registration" element={<EducatorRegistration />} />

          {/* Protected educator routes */}
          <Route
            path="/educator"
            element={
              <ProtectedRoute allowedRoles={["educator"]}>
                <EducatorLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<EducatorDashboard />} />
            <Route path="dashboard" element={<EducatorDashboard />} />
            <Route path="experiences" element={<ExperienceManagement />} />
            <Route path="collaborations" element={<CollaborationManagement />} />
            <Route path="portals" element={<PortalSearch />} />
            <Route path="projects" element={<ProjectSearch />} />
            <Route path="students" element={<StudentManagement />} />
            <Route path="matches" element={<MatchRequests />} />
            <Route path="tasks" element={<TasksActivities />} />
            <Route path="messages" element={<EducatorMessages />} />
            <Route path="calendar" element={<EducatorCalendar />} />
            <Route path="settings" element={<EducatorSettings />} />
            <Route path="create-experience" element={<CreateExperience />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>

          {/* Protected participant routes */}
          <Route
            path="/participant"
            element={
              <ProtectedRoute allowedRoles={["participant"]}>
                <ParticipantLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ParticipantDashboard />} />
            <Route path="dashboard" element={<ParticipantDashboard />} />
            <Route path="experiences" element={<ParticipantExperiences />} />
            <Route path="create-experience" element={<CreateParticipantExperience />} />
            <Route path="mentors" element={<MyMentors />} />
            <Route path="messages" element={<Messages />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<ParticipantSettings />} />
            <Route path="tasks" element={<TasksActivities />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>

          {/* Protected employer routes */}
          <Route
            path="/employer"
            element={
              <ProtectedRoute allowedRoles={["employer"]}>
                <EmployerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<EmployerDashboard />} />
            <Route path="dashboard" element={<EmployerDashboard />} />
            <Route path="projects" element={<EmployerProjectManagement />} />
            <Route path="applications" element={<ApplicationsManagement />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="resources" element={<ResourceCenter />} />
            <Route path="settings" element={<ProfileSettings />} />
            <Route path="create-project" element={<CreateProject />} />
            <Route path="projects/:projectId" element={<ProjectDetails />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>

          {/* Protected admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="experiences" element={<ExperienceOversight />} />
            <Route path="projects" element={<AdminProjectManagement />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
