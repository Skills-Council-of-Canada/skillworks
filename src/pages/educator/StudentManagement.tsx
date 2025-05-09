
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { StudentHeader } from "./components/students/StudentHeader";
import { StatCards } from "./components/students/StatCards";
import { StudentSearch } from "./components/students/StudentSearch";
import { StudentTable } from "./components/students/StudentTable";

const StudentManagement = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showStats, setShowStats] = useState(true);
  const isMobile = useIsMobile();

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

  const activeProjects = students?.filter((s) => 
    s.student_assignments?.some(a => a.status === "in_progress")
  ).length || 0;

  const pendingCertifications = students?.filter((s) => 
    s.student_certifications?.some(c => c.status === "pending")
  ).length || 0;

  return (
    <div className="space-y-2 md:space-y-6 p-2 md:p-6">
      <StudentHeader />
      
      <StatCards 
        totalStudents={students?.length || 0}
        activeProjects={activeProjects}
        pendingCertifications={pendingCertifications}
        showStats={showStats}
        setShowStats={setShowStats}
        isMobile={isMobile}
      />

      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="space-y-2 md:space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Students</CardTitle>
              <CardDescription className="text-sm">
                A list of all students under your supervision
              </CardDescription>
            </div>
          </div>
          <StudentSearch 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </CardHeader>
        <CardContent className="overflow-x-auto p-0 md:p-6">
          <StudentTable 
            students={filteredStudents || []}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentManagement;
