
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Experience } from "../../types/experience";
import { ExperienceDetailsDialog } from "./ExperienceDetailsDialog";

interface ExperienceCardProps {
  experience: Experience;
  onStatusChange: () => void;
}

export const getStatusBadgeColor = (status: Experience['approval_status']) => {
  const colors = {
    pending_review: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    needs_modification: "bg-orange-100 text-orange-800"
  };
  return colors[status];
};

export const ExperienceCard = ({ experience, onStatusChange }: ExperienceCardProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <>
      <Card className="hover:bg-accent/50 transition-colors">
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
            <Button variant="outline" onClick={() => setIsDetailsOpen(true)}>
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>

      <ExperienceDetailsDialog
        experience={experience}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        onStatusChange={onStatusChange}
      />
    </>
  );
};
