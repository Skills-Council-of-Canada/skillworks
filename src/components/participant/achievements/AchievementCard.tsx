
import { ParticipantAchievement } from "@/types/participant";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Award, Calendar } from "lucide-react";
import { format } from "date-fns";

interface AchievementCardProps {
  achievement: ParticipantAchievement;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        {achievement.badge_url ? (
          <img
            src={achievement.badge_url}
            alt={achievement.title}
            className="h-12 w-12 rounded-full"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Award className="h-6 w-6 text-primary" />
          </div>
        )}
        <div>
          <h3 className="font-semibold">{achievement.title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              Earned on {format(new Date(achievement.issued_at), "PP")}
            </span>
          </div>
        </div>
      </CardHeader>
      {achievement.description && (
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {achievement.description}
          </p>
        </CardContent>
      )}
    </Card>
  );
}
