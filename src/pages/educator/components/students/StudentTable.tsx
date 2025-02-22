
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
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] font-medium">Name</TableHead>
              <TableHead className="font-medium hidden md:table-cell">Email</TableHead>
              <TableHead className="font-medium w-[100px]">Projects</TableHead>
              <TableHead className="font-medium hidden md:table-cell">Certifications</TableHead>
              <TableHead className="font-medium w-[80px]">Actions</TableHead>
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
                <TableCell className="font-medium">
                  <div className="space-y-1">
                    <div className="truncate">{student.first_name} {student.last_name}</div>
                    <div className="text-xs text-gray-500 md:hidden truncate">{student.email}</div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{student.email}</TableCell>
                <TableCell className="text-center">{student.student_assignments?.length || 0}</TableCell>
                <TableCell className="hidden md:table-cell">
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
                    size="sm"
                    className="w-full text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
