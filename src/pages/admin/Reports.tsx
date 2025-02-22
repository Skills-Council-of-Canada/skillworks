
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./components/reports/OverviewTab";
import { RegistrationsTab } from "./components/reports/RegistrationsTab";
import { ExperiencesTab } from "./components/reports/ExperiencesTab";
import { MatchesTab } from "./components/reports/MatchesTab";
import { LearnersTab } from "./components/reports/LearnersTab";
import { DateRangePicker } from "./components/reports/DateRangePicker";
import { ExportButton } from "./components/reports/ExportButton";
import { useQuery } from "@tanstack/react-query";

const Reports = () => {
  const [date, setDate] = useState<DateRange | undefined>();

  const { data: registrationStats = [], isLoading: isRegistrationStatsLoading } = useQuery({
    queryKey: ['stats', 'registrations', date],
    queryFn: async () => {
      // Replace with actual API call
      return [];
    }
  });

  const { data: experienceStats = [], isLoading: isExperienceStatsLoading } = useQuery({
    queryKey: ['stats', 'experiences', date],
    queryFn: async () => {
      // Replace with actual API call
      return [];
    }
  });

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Reports</h1>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
          <DateRangePicker date={date} setDate={setDate} />
          <ExportButton data={[]} filename="report" type="csv" />
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="flex flex-wrap md:flex-nowrap w-full h-auto md:h-10 p-1">
          <TabsTrigger value="overview" className="flex-1 md:flex-none">Overview</TabsTrigger>
          <TabsTrigger value="registrations" className="flex-1 md:flex-none">Registrations</TabsTrigger>
          <TabsTrigger value="experiences" className="flex-1 md:flex-none">Experiences</TabsTrigger>
          <TabsTrigger value="matches" className="flex-1 md:flex-none">Matches</TabsTrigger>
          <TabsTrigger value="learners" className="flex-1 md:flex-none">Learners</TabsTrigger>
        </TabsList>
        <div className="mt-6">
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
            <MatchesTab projectMatchStats={[]} />
          </TabsContent>
          <TabsContent value="learners">
            <LearnersTab learnerStats={[]} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Reports;
