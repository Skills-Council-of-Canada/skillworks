
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { MessageSquare, Calendar, User } from "lucide-react";

interface ExperienceCardProps {
  experience: {
    id: string;
    title: string;
    description: string;
    status: string;
    start_date: string;
    end_date?: string;
    progress: number;
    educator: {
      name: string;
    };
  };
  onViewDetails: (id: string) => void;
}

export const ExperienceCard = ({ experience, onViewDetails }: ExperienceCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{experience.title}</h3>
          <Badge className={getStatusColor(experience.status)}>
            {experience.status.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {experience.description}
        </p>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4" />
            <span>
              {format(new Date(experience.start_date), 'PP')} - 
              {experience.end_date ? format(new Date(experience.end_date), 'PP') : 'Ongoing'}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <User className="mr-2 h-4 w-4" />
            <span>Mentor: {experience.educator.name}</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{experience.progress}%</span>
            </div>
            <Progress value={experience.progress} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onViewDetails(experience.id)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
