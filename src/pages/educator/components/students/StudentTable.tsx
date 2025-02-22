
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface StudentTableProps {
  students: any[];
  isLoading: boolean;
}

export const StudentTable = ({ students, isLoading }: StudentTableProps) => {
  return (
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
          ) : students?.map((student) => (
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
                  {student.student_certifications?.map((cert: any) => (
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
  );
};
