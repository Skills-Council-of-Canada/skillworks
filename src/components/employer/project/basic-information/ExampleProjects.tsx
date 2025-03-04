
import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const EXAMPLE_PROJECTS = [
  "Install electrical wiring for a residential project",
  "Complete plumbing installation for a commercial kitchen",
  "Renovate and upgrade HVAC system in an office building",
];

const ExampleProjects = () => {
  return (
    <Card className="p-4 sm:p-6 bg-[#F1F1F1]">
      <h3 className="font-semibold mb-2">Example Projects</h3>
      <ul className="space-y-2 text-muted-foreground max-w-full">
        {EXAMPLE_PROJECTS.map((example, index) => (
          <li key={index} className="flex items-start break-words">
            <AlertCircle className="h-5 w-5 mr-2 shrink-0 text-primary" />
            <span className="inline-block">{example}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ExampleProjects;
