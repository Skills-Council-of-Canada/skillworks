
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectSearchFiltersProps {
  filters: {
    locationType: string;
    projectType: string;
    industry: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

export const ProjectSearchFilters = ({
  filters,
  onFilterChange,
}: ProjectSearchFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Select
        value={filters.locationType}
        onValueChange={(value) => onFilterChange("locationType", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Location Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="On-site">On-site</SelectItem>
          <SelectItem value="Remote">Remote</SelectItem>
          <SelectItem value="Hybrid">Hybrid</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.projectType}
        onValueChange={(value) => onFilterChange("projectType", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Project Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apprenticeship">Apprenticeship</SelectItem>
          <SelectItem value="training">Training Program</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.industry}
        onValueChange={(value) => onFilterChange("industry", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Industry" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Construction">Construction</SelectItem>
          <SelectItem value="Automotive">Automotive</SelectItem>
          <SelectItem value="Manufacturing">Manufacturing</SelectItem>
          <SelectItem value="Other">Other</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
