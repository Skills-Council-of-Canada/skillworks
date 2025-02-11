
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TicketsTable } from "./TicketsTable";
import type { SupportTicket } from "@/types/support";

interface TicketsContentProps {
  tickets: SupportTicket[];
  onViewDetails: (ticket: SupportTicket) => void;
}

export function TicketsContent({ tickets, onViewDetails }: TicketsContentProps) {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Support Tickets</CardTitle>
        <CardDescription>
          Manage and respond to user support requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TicketsTable tickets={tickets} onViewDetails={onViewDetails} />
      </CardContent>
    </Card>
  );
}
