
import { Card, CardTitle } from "@/components/ui/card";

const ProjectDetailsError = () => {
  return (
    <div className="container mx-auto p-6">
      <Card className="p-6">
        <CardTitle className="text-xl mb-4">Error Loading Project</CardTitle>
        <p className="text-muted-foreground">
          There was an error loading the project details. Please try again later.
        </p>
      </Card>
    </div>
  );
};

export default ProjectDetailsError;
