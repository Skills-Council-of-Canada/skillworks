
import { ParticipantAchievement } from "@/types/participant";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Award, Clock } from "lucide-react";
import { format } from "date-fns";

interface AchievementsListProps {
  achievements: ParticipantAchievement[];
}

export function AchievementsList({ achievements }: AchievementsListProps) {
  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4 p-4">
        {achievements?.map((achievement) => (
          <Card key={achievement.id}>
            <CardContent className="flex items-start gap-4 pt-6">
              <div className="rounded-full bg-primary/10 p-2">
                <Award className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">{achievement.title}</h4>
                {achievement.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {achievement.description}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>
                    Earned on {format(new Date(achievement.issued_at), "PP")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {(!achievements || achievements.length === 0) && (
          <div className="text-center text-muted-foreground py-8">
            No achievements yet. Complete experiences to earn badges and
            certifications!
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
