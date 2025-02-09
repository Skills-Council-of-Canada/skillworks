
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectSearch = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Search</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Find industry projects for collaboration.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectSearch;
