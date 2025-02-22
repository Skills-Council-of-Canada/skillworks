
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DateRange } from "react-day-picker";
import { Experience } from "../types/experience";
import { useToast } from "@/hooks/use-toast";

interface UseExperiencesProps {
  statusFilter: Experience['approval_status'] | null;
  categoryFilter: string;
  searchQuery: string;
  dateRange: DateRange | undefined;
}

export const useExperiences = ({
  statusFilter,
  categoryFilter,
  searchQuery,
  dateRange,
}: UseExperiencesProps) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["admin-experiences", statusFilter, categoryFilter, searchQuery, dateRange],
    queryFn: async () => {
      let query = supabase
        .from('educator_experiences')
        .select(`
          *,
          educator:educator_profiles(full_name, institution_name)
        `)
        .order('created_at', { ascending: false });

      if (statusFilter) {
        query = query.eq('approval_status', statusFilter);
      }

      if (categoryFilter && categoryFilter !== 'all') {
        query = query.eq('trade_category', categoryFilter);
      }

      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      if (dateRange?.from) {
        query = query.gte('created_at', dateRange.from.toISOString());
      }

      if (dateRange?.to) {
        query = query.lte('created_at', dateRange.to.toISOString());
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return data as Experience[];
    },
    meta: {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to load experiences",
          variant: "destructive",
        });
      }
    },
    staleTime: 30000, // Data will be considered fresh for 30 seconds
    gcTime: 300000, // Cache will be kept for 5 minutes (renamed from cacheTime)
  });
};
