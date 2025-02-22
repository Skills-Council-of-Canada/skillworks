
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface StatusFilterProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const StatusFilter = ({ value, onValueChange }: StatusFilterProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger 
        className={`w-full ${isMobile ? 'h-9 text-sm' : 'h-10'}`}
      >
        <Filter className="w-4 h-4 mr-2" />
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Experiences</SelectItem>
        <SelectItem value="draft">Draft</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="in_progress">In Progress</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
      </SelectContent>
    </Select>
  );
};
