
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  onLogout: () => void;
}

export const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  return (
    <div className="p-4">
      <button
        onClick={onLogout}
        className="flex w-full items-center text-destructive hover:bg-destructive/10 px-2 py-1.5 rounded-md transition-colors"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Log Out
      </button>
    </div>
  );
};
