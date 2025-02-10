
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "./components/reports/DateRangePicker";
import { OverviewTab } from "./components/reports/OverviewTab";
import { RegistrationsTab } from "./components/reports/RegistrationsTab";
import { ExperiencesTab } from "./components/reports/ExperiencesTab";
import { MatchesTab } from "./components/reports/MatchesTab";
import { LearnersTab } from "./components/reports/LearnersTab";

const Reports = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 6)),
    to: new Date(),
  });

  // Registration stats query
  const { data: registrationStats } = useQuery({
    queryKey: ["registration-stats", date],
    queryFn: async () => {
      if (!date?.from || !date?.to) return null;

      const { data, error } = await supabase.rpc("get_registration_stats", {
        start_date: date.from.toISOString(),
        end_date: date.to.toISOString(),
      });

      if (error) throw error;
      return data;
    },
  });

  // Experience stats query
  const { data: experienceStats } = useQuery({
    queryKey: ["experience-stats", date],
    queryFn: async () => {
      if (!date?.from || !date?.to) return null;

      const { data, error } = await supabase.rpc("get_experience_stats", {
        start_date: date.from.toISOString(),
        end_date: date.to.toISOString(),
      });

      if (error) throw error;
      return data;
    },
  });

  // Project match stats query
  const { data: projectMatchStats } = useQuery({
    queryKey: ["project-match-stats", date],
    queryFn: async () => {
      if (!date?.from || !date?.to) return null;

      const { data, error } = await supabase.rpc("get_project_match_stats", {
        start_date: date.from.toISOString(),
        end_date: date.to.toISOString(),
      });

      if (error) throw error;
      return data;
    },
  });

  // Learner participation stats query
  const { data: learnerStats } = useQuery({
    queryKey: ["learner-stats", date],
    queryFn: async () => {
      if (!date?.from || !date?.to) return null;

      const { data, error } = await supabase.rpc("get_learner_participation_stats", {
        start_date: date.from.toISOString(),
        end_date: date.to.toISOString(),
      });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <DateRangePicker date={date} setDate={setDate} />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="registrations">Registrations</TabsTrigger>
          <TabsTrigger value="experiences">Experiences</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="learners">Learner Participation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab
            registrationStats={registrationStats}
            experienceStats={experienceStats}
          />
        </TabsContent>

        <TabsContent value="registrations">
          <RegistrationsTab registrationStats={registrationStats} />
        </TabsContent>

        <TabsContent value="experiences">
          <ExperiencesTab experienceStats={experienceStats} />
        </TabsContent>

        <TabsContent value="matches">
          <MatchesTab projectMatchStats={projectMatchStats} />
        </TabsContent>

        <TabsContent value="learners">
          <LearnersTab learnerStats={learnerStats} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
