
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

interface MatchesTabProps {
  projectMatchStats: any[] | null;
}

export const MatchesTab = ({ projectMatchStats }: MatchesTabProps) => {
  return (
    <div className="space-y-6">
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
                  labelFormatter={(value) => format(new Date(value), "MMMM yyyy")}
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
    </div>
  );
};
