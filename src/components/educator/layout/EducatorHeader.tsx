
import { NotificationBell } from "./NotificationBell";
import { UserMenu } from "./UserMenu";
import { TooltipProvider } from "@/components/ui/tooltip";

interface EducatorHeaderProps {
  pageTitle: string;
}

export const EducatorHeader = ({ pageTitle }: EducatorHeaderProps) => {
  return (
    <header className="h-16 border-b flex items-center px-6 bg-card justify-between">
      <div className="flex items-center gap-2">
        <img 
          src="/lovable-uploads/f55205da-68be-4106-a1f8-a42fa33f103f.png" 
          alt="Skill Works Logo" 
          className="h-8"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <TooltipProvider>
          <NotificationBell />
          <UserMenu />
        </TooltipProvider>
      </div>
    </header>
  );
};
