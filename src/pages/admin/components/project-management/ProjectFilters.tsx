
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectReviewStatus } from "../../types/project";

type StatusFilterType = ProjectReviewStatus | "all";

interface ProjectFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: StatusFilterType;
  setStatusFilter: (status: StatusFilterType) => void;
}

export function ProjectFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
      <Input
        type="search"
        placeholder="Search projects..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full sm:w-[240px]"
      />
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
          <SelectItem value="needs_modification">Needs Modification</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
