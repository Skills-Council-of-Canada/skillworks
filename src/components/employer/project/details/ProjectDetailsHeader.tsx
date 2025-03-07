
import { Skeleton } from "@/components/ui/skeleton";

interface ProjectDetailsHeaderProps {
  title: string;
  isLoading: boolean;
}

const ProjectDetailsHeader = ({ title, isLoading }: ProjectDetailsHeaderProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-64" />
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  );
};

export default ProjectDetailsHeader;
