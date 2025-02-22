
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronRight, Users } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { Experience } from '@/types/experience';
import { useIsMobile } from '@/hooks/use-mobile';

interface ExperienceCardProps {
  experience: Experience & { progress: number };
  onViewDetails: () => void;
}

export const ExperienceCard = ({ experience, onViewDetails }: ExperienceCardProps) => {
  const isMobile = useIsMobile();
  
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    draft: "bg-gray-100 text-gray-800"
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader className="flex-shrink-0">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg sm:text-xl font-semibold line-clamp-2">
            {experience.title}
          </CardTitle>
          <Badge className={`${statusColors[experience.status as keyof typeof statusColors]} whitespace-nowrap text-xs`}>
            {experience.status.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {experience.description}
        </p>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 shrink-0" />
              <span className="truncate">
                Started {formatDistanceToNow(new Date(experience.start_date), { addSuffix: true })}
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Users className="w-4 h-4" />
              {experience.team_size || 1}
            </div>
          </div>
          {experience.category_tags && experience.category_tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {experience.category_tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs px-2 py-0.5"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span>Progress</span>
              <span>{experience.progress}%</span>
            </div>
            <Progress value={experience.progress} className="h-2" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 mt-auto">
        <Button 
          onClick={onViewDetails} 
          variant="outline" 
          className="w-full"
          size={isMobile ? "sm" : "default"}
        >
          View Details
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};
