
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

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
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="registrations">Registrations</TabsTrigger>
          <TabsTrigger value="experiences">Experiences</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="learners">Learner Participation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {registrationStats?.[0]?.total_count || 0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Experiences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {experienceStats?.[0]?.active_experiences || 0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Learners
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {experienceStats?.[0]?.total_learners || 0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {experienceStats?.[0]?.avg_completion_rate || 0}%
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Registration Trends</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={registrationStats}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tickFormatter={(value) => format(new Date(value), "MMM yy")}
                    />
                    <YAxis />
                    <Tooltip
                      labelFormatter={(value) =>
                        format(new Date(value), "MMMM yyyy")
                      }
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="educators_count"
                      name="Educators"
                      stroke="#8884d8"
                    />
                    <Line
                      type="monotone"
                      dataKey="employers_count"
                      name="Employers"
                      stroke="#82ca9d"
                    />
                    <Line
                      type="monotone"
                      dataKey="participants_count"
                      name="Participants"
                      stroke="#ffc658"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="registrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Registration Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={registrationStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tickFormatter={(value) => format(new Date(value), "MMM yy")}
                    />
                    <YAxis />
                    <Tooltip
                      labelFormatter={(value) =>
                        format(new Date(value), "MMMM yyyy")
                      }
                    />
                    <Legend />
                    <Bar
                      dataKey="educators_count"
                      name="Educators"
                      fill="#8884d8"
                    />
                    <Bar
                      dataKey="employers_count"
                      name="Employers"
                      fill="#82ca9d"
                    />
                    <Bar
                      dataKey="participants_count"
                      name="Participants"
                      fill="#ffc658"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experiences" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Active Experiences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {experienceStats?.[0]?.active_experiences || 0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Total Learners
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {experienceStats?.[0]?.total_learners || 0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Completion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {experienceStats?.[0]?.avg_completion_rate || 0}%
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="matches" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Match Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectMatchStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tickFormatter={(value) => format(new Date(value), "MMM yy")}
                    />
                    <YAxis />
                    <Tooltip
                      labelFormatter={(value) =>
                        format(new Date(value), "MMMM yyyy")
                      }
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="total_projects"
                      name="Total Projects"
                      stroke="#8884d8"
                    />
                    <Line
                      type="monotone"
                      dataKey="total_matches"
                      name="Total Matches"
                      stroke="#82ca9d"
                    />
                    <Line
                      type="monotone"
                      dataKey="match_rate"
                      name="Match Rate (%)"
                      stroke="#ffc658"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learners" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Learner Participation Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={learnerStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tickFormatter={(value) => format(new Date(value), "MMM yy")}
                    />
                    <YAxis />
                    <Tooltip
                      labelFormatter={(value) =>
                        format(new Date(value), "MMMM yyyy")
                      }
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="active_learners"
                      name="Active Learners"
                      stroke="#8884d8"
                    />
                    <Line
                      type="monotone"
                      dataKey="ongoing_experiences"
                      name="Ongoing Experiences"
                      stroke="#82ca9d"
                    />
                    <Line
                      type="monotone"
                      dataKey="completed_experiences"
                      name="Completed Experiences"
                      stroke="#ffc658"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
