
import { Progress } from "@/components/ui/progress";

interface CompletionProgressProps {
  completionPercentage: number;
}

export const CompletionProgress = ({ completionPercentage }: CompletionProgressProps) => {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-700">Profile Completion</p>
        <span className="text-sm font-medium text-blue-600">{completionPercentage}%</span>
      </div>
      <Progress value={completionPercentage} className="h-2" />
    </div>
  );
};
