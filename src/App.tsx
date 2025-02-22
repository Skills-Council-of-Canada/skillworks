import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import EmployerLayout from "./pages/employer/EmployerLayout";
import EmployerProfile from "./pages/employer/EmployerProfile";
import EmployerSettings from "./pages/employer/EmployerSettings";
import EmployerNotifications from "./pages/employer/EmployerNotifications";
import EducatorDashboard from "./pages/educator/EducatorDashboard";
import EducatorLayout from "./pages/educator/EducatorLayout";
import ExperienceForm from "./pages/educator/ExperienceForm";
import ExperienceManagement from "./pages/educator/ExperienceManagement";
import EducatorSettings from "./pages/educator/EducatorSettings";
import TasksActivities from "./pages/educator/TasksActivities";
import StudentManagement from "./pages/educator/StudentManagement";
import EducatorExperiences from "./pages/educator/EducatorExperiences";
import EducatorCollaborations from "./pages/educator/EducatorCollaborations";
import EducatorPortals from "./pages/educator/EducatorPortals";
import EducatorProjects from "./pages/educator/EducatorProjects";
import EducatorMatches from "./pages/educator/EducatorMatches";
import EducatorMessages from "./pages/educator/EducatorMessages";
import EducatorCalendar from "./pages/educator/EducatorCalendar";
import ParticipantDashboard from "./pages/participant/ParticipantDashboard";
import ParticipantLayout from "./pages/participant/ParticipantLayout";
import ParticipantProfile from "./pages/participant/ParticipantProfile";
import NotificationsPage from "./pages/educator/NotificationsPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          <Route path="/employer" element={<EmployerLayout />}>
            <Route index element={<EmployerDashboard />} />
            <Route path="profile" element={<EmployerProfile />} />
            <Route path="settings" element={<EmployerSettings />} />
            <Route path="notifications" element={<EmployerNotifications />} />
          </Route>

          <Route path="/educator" element={<EducatorLayout />}>
            <Route index element={<EducatorDashboard />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="experiences" element={<EducatorExperiences />} />
            <Route path="collaborations" element={<EducatorCollaborations />} />
            <Route path="portals" element={<EducatorPortals />} />
            <Route path="projects" element={<EducatorProjects />} />
            <Route path="students" element={<StudentManagement />} />
            <Route path="matches" element={<EducatorMatches />} />
            <Route path="tasks" element={<TasksActivities />} />
            <Route path="messages" element={<EducatorMessages />} />
            <Route path="calendar" element={<EducatorCalendar />} />
            <Route path="settings" element={<EducatorSettings />} />
            <Route path="experience/create" element={<ExperienceForm />} />
            <Route path="experience/:experienceId" element={<ExperienceManagement />} />
          </Route>

          <Route path="/participant" element={<ParticipantLayout />}>
            <Route index element={<ParticipantDashboard />} />
            <Route path="profile" element={<ParticipantProfile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
