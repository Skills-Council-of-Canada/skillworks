
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Award, BookCheck, Search, UserPlus, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const StudentManagement = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: students, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      console.log("Fetching students...");
      const { data, error } = await supabase
        .from("students")
        .select(`
          *,
          student_certifications (
            id,
            name,
            status
          ),
          student_assignments (
            id,
            status,
            project_id
          )
        `);

      if (error) {
        console.error("Error fetching students:", error);
        toast({
          title: "Error",
          description: "Failed to load students. Please try again.",
          variant: "destructive",
        });
        throw error;
      }

      console.log("Students fetched:", data);
      return data;
    },
    enabled: !!user?.id,
  });

  const filteredStudents = students?.filter(
    (student) =>
      student.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 md:space-y-6 p-2 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <div>
          <h1 className="text-xl md:text-3xl font-bold tracking-tight">Student Management</h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Manage your students and track their progress
          </p>
        </div>
        <Button className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students?.length || 0}</div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <BookCheck className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {students?.filter((s) => 
                s.student_assignments?.some(a => a.status === "in_progress")
              ).length || 0}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Certifications</CardTitle>
            <Award className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {students?.filter((s) => 
                s.student_certifications?.some(c => c.status === "pending")
              ).length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Students</CardTitle>
          <CardDescription>
            A list of all students under your supervision
          </CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="w-full min-w-[640px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Name</TableHead>
                  <TableHead className="font-medium">Email</TableHead>
                  <TableHead className="font-medium">Active Projects</TableHead>
                  <TableHead className="font-medium">Certifications</TableHead>
                  <TableHead className="font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredStudents?.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      {student.first_name} {student.last_name}
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      {student.student_assignments?.length || 0}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {student.student_certifications?.map((cert) => (
                          <Badge
                            key={cert.id}
                            variant={cert.status === "completed" ? "default" : "secondary"}
                            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 whitespace-nowrap"
                          >
                            {cert.name}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentManagement;
