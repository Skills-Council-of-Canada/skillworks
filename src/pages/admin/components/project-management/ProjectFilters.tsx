
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProjectReviewStatus } from "../../ProjectManagement";

interface ProjectFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: ProjectReviewStatus | "";
  setStatusFilter: (status: ProjectReviewStatus | "") => void;
}

export function ProjectFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}: ProjectFiltersProps) {
  return (
    <div className="flex gap-4 items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ProjectReviewStatus | "")}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All statuses</SelectItem>
          <SelectItem value="pending_review">Pending Review</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
          <SelectItem value="needs_modification">Needs Modification</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
