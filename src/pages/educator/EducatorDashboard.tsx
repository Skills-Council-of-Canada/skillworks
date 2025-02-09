
import { QuickActions } from "@/components/educator/dashboard/QuickActions";
import { StatsOverview } from "@/components/educator/dashboard/StatsOverview";
import { TasksAndEvents } from "@/components/educator/dashboard/TasksAndEvents";
import { ActiveExperiences } from "@/components/educator/dashboard/ActiveExperiences";
import { useEducatorDashboard } from "@/hooks/useEducatorDashboard";

const EducatorDashboard = () => {
  const { tasks, events, experiences, isLoading } = useEducatorDashboard();

  return (
    <div className="space-y-6">
      <QuickActions />
      <StatsOverview
        tasks={tasks}
        events={events}
        experiences={experiences}
        isLoading={isLoading}
      />
      <TasksAndEvents
        tasks={tasks}
        events={events}
        isLoading={isLoading}
      />
      <ActiveExperiences
        experiences={experiences}
        isLoading={isLoading}
      />
    </div>
  );
};

export default EducatorDashboard;
