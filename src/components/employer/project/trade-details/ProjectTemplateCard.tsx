
import { ProjectTemplate } from "@/types/project";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface Props {
  template: ProjectTemplate;
  onClick: (template: ProjectTemplate) => void;
}

const ProjectTemplateCard = ({ template, onClick }: Props) => {
  return (
    <Card 
      className="cursor-pointer hover:bg-[#F1F1F1] transition-colors duration-200" 
      onClick={() => onClick(template)}
    >
      <CardHeader>
        <CardTitle className="text-lg">{template.title}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ProjectTemplateCard;
