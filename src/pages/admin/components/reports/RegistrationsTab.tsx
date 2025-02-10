
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RegistrationsTabProps {
  registrationStats: any[] | null;
}

export const RegistrationsTab = ({ registrationStats }: RegistrationsTabProps) => {
  return (
    <div className="space-y-6">
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
                  labelFormatter={(value) => format(new Date(value), "MMMM yyyy")}
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
    </div>
  );
};
