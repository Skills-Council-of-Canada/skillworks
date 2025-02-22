
import { Users, BookCheck, Award, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StatCardsProps {
  totalStudents: number;
  activeProjects: number;
  pendingCertifications: number;
  showStats: boolean;
  setShowStats: (show: boolean) => void;
  isMobile: boolean;
}

export const StatCards = ({ 
  totalStudents, 
  activeProjects, 
  pendingCertifications,
  showStats,
  setShowStats,
  isMobile
}: StatCardsProps) => {
  if (!isMobile) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <BookCheck className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects}</div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Certifications</CardTitle>
            <Award className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCertifications}</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Button
        variant="ghost"
        className="w-full flex justify-between items-center p-4 h-auto"
        onClick={() => setShowStats(!showStats)}
      >
        <span className="font-semibold">Quick Stats</span>
        {showStats ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
      
      {showStats && (
        <div className="grid grid-cols-3 gap-2">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader className="p-3">
              <div className="flex items-center justify-between">
                <Users className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span className="text-xs font-medium">Students</span>
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="text-lg font-bold">{totalStudents}</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader className="p-3">
              <div className="flex items-center justify-between">
                <BookCheck className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span className="text-xs font-medium">Projects</span>
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="text-lg font-bold">{activeProjects}</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader className="p-3">
              <div className="flex items-center justify-between">
                <Award className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span className="text-xs font-medium">Certs</span>
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="text-lg font-bold">{pendingCertifications}</div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
