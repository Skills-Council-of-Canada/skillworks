
import { Button } from "@/components/ui/button";

interface ActionButtonsProps {
  onGenerateProject: () => void;
  onUseTemplate: () => void;
  isMobile: boolean;
}

const ActionButtons = ({ onGenerateProject, onUseTemplate, isMobile }: ActionButtonsProps) => {
  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2`}>
      <Button
        type="button"
        onClick={onGenerateProject}
        className="bg-orange-500 hover:bg-orange-600"
        size={isMobile ? "sm" : "default"}
      >
        Generate Project
      </Button>
      <Button
        type="submit"
        variant="secondary"
        size={isMobile ? "sm" : "default"}
        className="whitespace-normal text-left h-auto py-2"
      >
        Create Project from Scratch
      </Button>
      <Button
        type="button"
        variant="secondary"
        onClick={onUseTemplate}
        size={isMobile ? "sm" : "default"}
      >
        Use Template
      </Button>
    </div>
  );
};

export default ActionButtons;
