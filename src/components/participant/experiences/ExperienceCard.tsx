
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
      <CardHeader className="flex-shrink-0 p-3 sm:p-4">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-base sm:text-lg font-semibold line-clamp-2">
            {experience.title}
          </CardTitle>
          <Badge className={`${statusColors[experience.status as keyof typeof statusColors]} whitespace-nowrap text-xs`}>
            {experience.status.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-3 sm:p-4 pt-0">
        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
          {experience.description}
        </p>
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-1 sm:gap-2">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate">
                Started {formatDistanceToNow(new Date(experience.start_date), { addSuffix: true })}
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              {experience.team_size || 1}
            </div>
          </div>
          {experience.category_tags && experience.category_tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {experience.category_tags.slice(0, 3).map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-[10px] sm:text-xs px-1.5 py-0.5"
                >
                  {tag}
                </Badge>
              ))}
              {experience.category_tags.length > 3 && (
                <Badge 
                  variant="secondary" 
                  className="text-[10px] sm:text-xs px-1.5 py-0.5"
                >
                  +{experience.category_tags.length - 3}
                </Badge>
              )}
            </div>
          )}
          <div>
            <div className="flex justify-between text-xs sm:text-sm mb-1">
              <span>Progress</span>
              <span>{experience.progress}%</span>
            </div>
            <Progress value={experience.progress} className="h-1.5 sm:h-2" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 p-3 sm:p-4 mt-auto">
        <Button 
          onClick={onViewDetails} 
          variant="outline" 
          className="w-full text-xs sm:text-sm"
          size={isMobile ? "sm" : "default"}
        >
          View Details
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};
