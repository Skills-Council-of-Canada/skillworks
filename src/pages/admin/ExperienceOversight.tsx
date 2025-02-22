
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { ExperienceFilters } from "./components/experience-oversight/ExperienceFilters";
import { ExperienceCard } from "./components/experience-oversight/ExperienceCard";
import { useExperiences } from "./hooks/useExperiences";
import { Experience } from "./types/experience";
import { Skeleton } from "@/components/ui/skeleton";

const ExperienceOversight = () => {
  const [statusFilter, setStatusFilter] = useState<Experience['approval_status'] | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const { data: experiences, isLoading, refetch } = useExperiences({
    statusFilter,
    categoryFilter,
    searchQuery,
    dateRange,
  });

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 md:p-6 rounded-lg border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <Skeleton className="h-6 w-full md:w-1/3" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Experience Oversight</h1>
      </div>

      <div className="flex flex-col space-y-4">
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
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          <LoadingSkeleton />
        ) : experiences?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No experiences found
          </div>
        ) : (
          experiences?.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              onStatusChange={refetch}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ExperienceOversight;
