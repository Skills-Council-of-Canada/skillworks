
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import EducatorDashboard from "./pages/educator/EducatorDashboard";
import EducatorLayout from "./pages/educator/EducatorLayout";
import EducatorMessages from "./pages/educator/EducatorMessages";
import EducatorSettings from "./pages/educator/EducatorSettings";
import StudentManagement from "./pages/educator/StudentManagement";
import TasksActivities from "./pages/educator/TasksActivities";
import EducatorCalendar from "./pages/educator/EducatorCalendar";
import ParticipantDashboard from "./pages/participant/ParticipantDashboard";
import ParticipantLayout from "./pages/participant/ParticipantLayout";
import NotificationsPage from "./pages/educator/NotificationsPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          <Route path="/educator" element={<EducatorLayout />}>
            <Route index element={<EducatorDashboard />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="students" element={<StudentManagement />} />
            <Route path="tasks" element={<TasksActivities />} />
            <Route path="messages" element={<EducatorMessages />} />
            <Route path="calendar" element={<EducatorCalendar />} />
            <Route path="settings" element={<EducatorSettings />} />
          </Route>

          <Route path="/participant" element={<ParticipantLayout />}>
            <Route index element={<ParticipantDashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
