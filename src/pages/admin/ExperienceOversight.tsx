
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Search } from "lucide-react";

interface Experience {
  id: string;
  title: string;
  description: string;
  educator_id: string;
  created_at: string;
  trade_category: string;
  approval_status: 'pending_review' | 'approved' | 'rejected' | 'needs_modification';
  educator: {
    full_name: string;
    institution_name: string;
  };
}

const ExperienceOversight = () => {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const { data: experiences, isLoading } = useQuery({
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

      if (categoryFilter) {
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
      onError: (error: Error) => {
        toast({
          title: "Error",
          description: "Failed to load experiences",
          variant: "destructive",
        });
      }
    }
  });

  const getStatusBadgeColor = (status: Experience['approval_status']) => {
    const colors = {
      pending_review: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      needs_modification: "bg-orange-100 text-orange-800"
    };
    return colors[status];
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Experience Oversight</h1>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="pending_review">Pending Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="needs_modification">Needs Modification</SelectItem>
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="trades">Trades</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search experiences..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start text-left font-normal",
                !dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Experience List */}
      <div className="grid gap-4">
        {isLoading ? (
          <div>Loading experiences...</div>
        ) : experiences?.length === 0 ? (
          <div>No experiences found</div>
        ) : (
          experiences?.map((experience) => (
            <Card key={experience.id} className="hover:bg-accent/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold">
                  {experience.title}
                </CardTitle>
                <Badge className={getStatusBadgeColor(experience.approval_status)}>
                  {experience.approval_status.replace('_', ' ').toUpperCase()}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {experience.description}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Category:</span> {experience.trade_category}
                    </p>
                  </div>
                  <div className="text-sm space-y-1">
                    <p>
                      <span className="font-semibold">Educator:</span>{" "}
                      {experience.educator.full_name}
                    </p>
                    <p>
                      <span className="font-semibold">Institution:</span>{" "}
                      {experience.educator.institution_name}
                    </p>
                    <p>
                      <span className="font-semibold">Submitted:</span>{" "}
                      {format(new Date(experience.created_at), "PPp")}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline">View Details</Button>
                  {experience.approval_status === 'pending_review' && (
                    <>
                      <Button variant="destructive">Reject</Button>
                      <Button variant="default">Approve</Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ExperienceOversight;
