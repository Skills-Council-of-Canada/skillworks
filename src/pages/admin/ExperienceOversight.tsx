
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { ExperienceFilters } from "./components/experience-oversight/ExperienceFilters";
import { ExperienceCard } from "./components/experience-oversight/ExperienceCard";
import { useExperiences } from "./hooks/useExperiences";
import { Experience } from "./types/experience";

const ExperienceOversight = () => {
  const [statusFilter, setStatusFilter] = useState<Experience['approval_status'] | ''>('');
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const { data: experiences, isLoading } = useExperiences({
    statusFilter,
    categoryFilter,
    searchQuery,
    dateRange,
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Experience Oversight</h1>
      </div>

      <ExperienceFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <div className="grid gap-4">
        {isLoading ? (
          <div>Loading experiences...</div>
        ) : experiences?.length === 0 ? (
          <div>No experiences found</div>
        ) : (
          experiences?.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ExperienceOversight;
