
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectTemplate } from "@/types/project";
import ProjectTemplateCard from "./ProjectTemplateCard";

interface Props {
  templates: ProjectTemplate[];
  onTemplateSelect: (template: ProjectTemplate) => void;
}

const ProjectTemplatesSection = ({ templates, onTemplateSelect }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Templates</CardTitle>
        <CardDescription>
          Start with a template or create your own custom project
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <ProjectTemplateCard
            key={template.id}
            template={template}
            onClick={onTemplateSelect}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default ProjectTemplatesSection;

