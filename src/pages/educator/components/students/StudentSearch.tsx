
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface StudentSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const StudentSearch = ({ searchQuery, setSearchQuery }: StudentSearchProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Search className="h-4 w-4 text-gray-600 dark:text-gray-400" />
      <Input
        placeholder="Search students..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-sm"
      />
    </div>
  );
};
