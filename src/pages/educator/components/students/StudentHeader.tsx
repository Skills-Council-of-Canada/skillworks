
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const StudentHeader = () => {
  return (
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
  );
};
