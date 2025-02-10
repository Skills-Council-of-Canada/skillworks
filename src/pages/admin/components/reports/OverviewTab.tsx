
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface OverviewTabProps {
  registrationStats: any[] | null;
  experienceStats: any[] | null;
}

export const OverviewTab = ({
  registrationStats,
  experienceStats,
}: OverviewTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
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
            <CardTitle className="text-sm font-medium">Total Learners</CardTitle>
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
                  labelFormatter={(value) => format(new Date(value), "MMMM yyyy")}
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
    </div>
  );
};
