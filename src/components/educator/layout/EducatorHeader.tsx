
import { NotificationBell } from "./NotificationBell";
import { UserMenu } from "./UserMenu";
import { TooltipProvider } from "@/components/ui/tooltip";

interface EducatorHeaderProps {
  pageTitle: string;
}

export const EducatorHeader = ({ pageTitle }: EducatorHeaderProps) => {
  return (
    <header className="h-16 border-b flex items-center px-6 bg-card justify-between">
      <h1 className="text-2xl font-bold">{pageTitle}</h1>
      
      <div className="flex items-center gap-4">
        <TooltipProvider>
          <NotificationBell />
          <UserMenu />
        </TooltipProvider>
      </div>
    </header>
  );
};
