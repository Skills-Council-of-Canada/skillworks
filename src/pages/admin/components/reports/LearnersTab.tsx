
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

interface LearnersTabProps {
  learnerStats: any[] | null;
}

export const LearnersTab = ({ learnerStats }: LearnersTabProps) => {
  return (
    <div className="space-y-6">
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
                  labelFormatter={(value) => format(new Date(value), "MMMM yyyy")}
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
    </div>
  );
};
