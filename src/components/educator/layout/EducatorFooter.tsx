
import { Link2 } from "lucide-react";

export const EducatorFooter = () => {
  return (
    <footer className="h-16 border-t flex items-center justify-between px-6 bg-card text-sm text-muted-foreground">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          Skill<Link2 className="h-3 w-3" size={12} />Works
        </span>
        <span>&copy; {new Date().getFullYear()}</span>
      </div>
      <div className="flex gap-4">
        <a href="#" className="hover:text-foreground">Terms</a>
        <a href="#" className="hover:text-foreground">Privacy</a>
        <a href="#" className="hover:text-foreground">Support</a>
      </div>
    </footer>
  );
};
