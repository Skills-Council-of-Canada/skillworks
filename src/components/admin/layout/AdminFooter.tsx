
import { Link2 } from "lucide-react";

export const AdminFooter = () => {
  return (
    <footer className="border-t py-4 px-6">
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            Skill<Link2 className="h-3 w-3" size={12} />Works
          </span>
          <span className="mx-2">·</span>
          <a href="/terms" className="hover:underline">Terms</a>
          <span className="mx-2">·</span>
          <a href="/privacy" className="hover:underline">Privacy</a>
        </div>
        <div>
          <a href="/support" className="hover:underline">Contact Support</a>
        </div>
      </div>
    </footer>
  );
};
