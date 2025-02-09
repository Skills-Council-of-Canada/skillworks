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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Management</h1>
          <p className="text-muted-foreground">
            Manage your students and track their progress
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <BookCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {students?.filter((s) => 
                s.student_assignments?.some(a => a.status === "in_progress")
              ).length || 0}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Certifications</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
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

      <Card>
        <CardHeader>
          <CardTitle>Students</CardTitle>
          <CardDescription>
            A list of all students under your supervision
          </CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-4">Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Active Projects</TableHead>
                  <TableHead>Certifications</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents?.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      {student.first_name} {student.last_name}
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      {student.student_assignments?.length || 0}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {student.student_certifications?.map((cert) => (
                          <Badge
                            key={cert.id}
                            variant={cert.status === "completed" ? "default" : "secondary"}
                          >
                            {cert.name}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentManagement;
